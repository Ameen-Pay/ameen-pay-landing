# Ameen Pay Landing Page

A React landing page for Ameen Pay - a commission advance solution for real estate agencies in UAE.

## Overview

Ameen Pay solves cashflow issues for real estate agencies by providing instant commission advances. This landing page includes:

- Hero section with value proposition
- Problem statement explaining cashflow challenges
- Solution overview
- 6-step process flow
- Waitlist signup form with Airtable integration

## Features

- ✅ Modern, responsive design
- ✅ Waitlist form with Airtable integration
- ✅ Error handling and loading states
- ✅ Smooth scrolling navigation
- ✅ Mobile-friendly layout

## Tech Stack

- React 18
- Vite
- Airtable API for form submissions

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Airtable

#### Create Airtable Base

1. Go to [Airtable](https://airtable.com) and sign in
2. Create a new base (or use an existing one)
3. Create a table named "Waitlist" (or your preferred name)
4. Add the following fields to your table:
   - `Company Name` (Single line text)
   - `Contact Name` (Single line text)
   - `Email` (Email)
   - `Phone` (Phone number)
   - `Monthly Commissions` (Single select with options: 50k-100k, 100k-250k, 250k-500k, 500k+)
   - `Submission Date` (Date)

#### Get Airtable Credentials

1. **API Key**: Already provided in the `.env` file
2. **Base ID**: 
   - Open your Airtable base
   - Go to Help → API documentation
   - The Base ID will be shown in the URL and documentation (starts with "app")
   - Example: `appXXXXXXXXXXXXXX`

#### Update Environment Variables

Edit the `.env` file in the project root:

```env
VITE_AIRTABLE_API_KEY=your_api_key
VITE_AIRTABLE_BASE_ID=your_base_id_here  # Replace with your actual Base ID
VITE_AIRTABLE_TABLE_NAME=Waitlist         # Or your table name if different
```

**Important**: Replace `your_base_id_here` with your actual Airtable Base ID.

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## Project Structure

```
ameen-pay-landing/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── .env                 # Environment variables (not committed to git)
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Form Submission Flow

1. User fills out the waitlist form
2. Form data is validated on submit
3. Data is sent to Airtable via REST API
4. Success/error message is displayed
5. On success, form is reset and thank you message shown

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_AIRTABLE_API_KEY` | Your Airtable Personal Access Token | Yes |
| `VITE_AIRTABLE_BASE_ID` | Your Airtable Base ID | Yes |
| `VITE_AIRTABLE_TABLE_NAME` | Name of your Airtable table | Yes (default: "Waitlist") |

## Security Notes

- The `.env` file is gitignored and should never be committed
- API keys should be kept secure
- For production, consider using a backend proxy to hide API keys
- Current implementation is suitable for MVP/demo purposes

## Troubleshooting

### Form submission fails

1. Check that your Base ID is correct in `.env`
2. Verify the table name matches exactly (case-sensitive)
3. Ensure all field names in Airtable match the code
4. Check browser console for detailed error messages

### Airtable API errors

- **401 Unauthorized**: Check your API key
- **404 Not Found**: Verify Base ID and table name
- **422 Unprocessable**: Check field names and types in Airtable

## Customization

### Updating Content

Edit `src/App.jsx` to modify:
- Hero section text
- Problem cards
- Solution content
- Process steps
- Form fields

### Styling

Edit `src/App.css` to customize:
- Colors (CSS variables in `:root`)
- Typography
- Spacing
- Responsive breakpoints

## License

Copyright © 2024 Ameen Pay. All rights reserved.

## Support

For issues or questions, contact: info@ameenpay.com
