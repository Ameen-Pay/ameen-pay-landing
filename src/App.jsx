import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    monthlyCommissions: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY
      const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID
      const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Waitlist'

      if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        throw new Error('Airtable configuration is missing. Please check your environment variables.')
      }

      const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`

      const response = await fetch(airtableUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'Company Name': formData.companyName,
            'Contact Name': formData.contactName,
            'Email Address': formData.email,
            'Phone Number': formData.phone,
            'Estimated Monthly Commissions (AED)': formData.monthlyCommissions
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to submit form')
      }

      console.log('Form submitted successfully:', formData)
      setSubmitted(true)
      
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        monthlyCommissions: ''
      })
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err.message || 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <span className="logo-icon">💰</span>
            <span className="logo-text">Ameen Pay</span>
          </div>
          <nav className="nav">
            <a href="#problem">Problem</a>
            <a href="#solution">Solution</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#waitlist">Join Waitlist</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Get Your Real Estate Commissions <span className="highlight">Today</span>
          </h1>
          <p className="hero-subtitle">
            Stop waiting months for commission payments. Ameen Pay provides instant commission advances to real estate agencies in the UAE.
          </p>
          <div className="hero-cta">
            <a href="#waitlist" className="btn btn-primary">Join the Waitlist</a>
            <a href="#how-it-works" className="btn btn-secondary">Learn More</a>
          </div>
          <div className="hero-badge">
            <span>🇦🇪 Starting in UAE</span>
            <span>🌍 Expanding to MENA</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="problem-section">
        <div className="container">
          <h2 className="section-title">The Cashflow Challenge</h2>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">⏰</div>
              <h3>Delayed Payments</h3>
              <p>Developers can delay commission payments for months, creating cashflow issues for agencies</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">💼</div>
              <h3>Operational Strain</h3>
              <p>Agencies struggle to cover salaries, marketing, and other expenses while waiting for commissions</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">📉</div>
              <h3>Growth Limitations</h3>
              <p>Limited cashflow restricts your ability to invest in growth and new opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="solution-section">
        <div className="container">
          <h2 className="section-title">Our Solution</h2>
          <div className="solution-content">
            <div className="solution-text">
              <h3>Commission Advances When You Need Them</h3>
              <p>
                Ameen Pay bridges the gap between earning your commission and receiving payment. 
                Get immediate access to your hard-earned commissions without waiting for developers.
              </p>
              <ul className="benefits-list">
                <li>✓ Instant liquidity for your business</li>
                <li>✓ Maintain healthy cashflow</li>
                <li>✓ Invest in growth opportunities</li>
                <li>✓ Focus on selling, not waiting</li>
              </ul>
            </div>
            <div className="solution-visual">
              <div className="comparison">
                <div className="before">
                  <h4>Before Ameen Pay</h4>
                  <p className="timeline">Wait 2-6 months</p>
                  <p>😰 Cashflow problems</p>
                </div>
                <div className="arrow">→</div>
                <div className="after">
                  <h4>With Ameen Pay</h4>
                  <p className="timeline">Get paid in days</p>
                  <p>😊 Steady cashflow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple, transparent, and secure process</p>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Request Advance</h3>
                <p>Real estate agency submits commission advance request to Ameen Pay</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Validation</h3>
                <p>Ameen Pay validates documents with the developer</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Transfer Agreement</h3>
                <p>Ameen Pay and agency sign transfer of receivables ownership</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Get Paid</h3>
                <p>Ameen Pay releases money transfer to your agency</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Notice Sent</h3>
                <p>Ameen Pay sends Notice of Assignment to developer</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h3>Settlement</h3>
                <p>Developer sends commission payment to Ameen Pay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="waitlist-section">
        <div className="container">
          <h2 className="section-title">Join the Waitlist</h2>
          <p className="section-subtitle">
            Be among the first real estate agencies to access commission advances
          </p>
          
          {!submitted ? (
            <form className="waitlist-form" onSubmit={handleSubmit}>
              {error && (
                <div className="error-message">
                  <p>⚠️ {error}</p>
                </div>
              )}
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Your Real Estate Agency"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactName">Contact Name *</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="monthlyCommissions">Estimated Monthly Commissions (AED)</label>
                <select
                  id="monthlyCommissions"
                  name="monthlyCommissions"
                  value={formData.monthlyCommissions}
                  onChange={handleChange}
                >
                  <option value="">Select range</option>
                  <option value="50k-100k">50,000 - 100,000 AED</option>
                  <option value="100k-250k">100,000 - 250,000 AED</option>
                  <option value="250k-500k">250,000 - 500,000 AED</option>
                  <option value="500k+">500,000+ AED</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-large btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>We've received your information and will contact you soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Ameen Pay</h3>
              <p>Empowering real estate agencies with instant commission access</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@ameen-pay.com</p>
              <p>UAE Based</p>
            </div>
            <div className="footer-section">
              <h4>Links</h4>
              <a href="#problem">Problem</a>
              <a href="#solution">Solution</a>
              <a href="#how-it-works">How It Works</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Ameen Pay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
