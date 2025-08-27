# AilesTravel - Study Abroad & Scholarship Platform

A modern, comprehensive study abroad and scholarship platform built with Next.js 15, React, TypeScript, and Tailwind CSS. The platform helps students find international education opportunities, manage applications, and receive AI-powered guidance.

## Features

### 🔐 User Authentication
- Secure login/logout with NextAuth.js
- Email/password authentication
- Protected routes for authenticated users
- Demo accounts for testing

### 🔍 Smart Program Search
- Advanced filtering system (country, field, scholarships, deadlines)
- Real-time search with pagination
- Comprehensive program database
- Detailed program information pages

### 💰 Scholarship Tracking
- Scholarship amount display and filtering
- Application deadline alerts
- Potential scholarship value calculation
- Merit-based scholarship information

### 👤 User Dashboard
- Personal profile management
- Saved programs tracking
- Active applications monitoring
- Upcoming deadline notifications
- Progress statistics and insights

### 🤖 AI Chat Advisor
- Integrated OpenAI GPT-4 powered chat
- Study abroad guidance and advice
- Visa and application assistance
- 24/7 availability with chat history
- Expandable/minimizable chat widget

### 📱 Responsive Design
- Fully responsive across all devices
- Modern UI with Tailwind CSS
- Accessible design patterns
- Smooth animations and transitions

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js v5
- **AI Integration**: OpenAI GPT-4 API
- **UI Components**: Custom components with Radix UI patterns
- **Icons**: Lucide React
- **Database**: Mock data (easily replaceable with real database)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (optional for AI chat functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ailestravel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-api-key-here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Accounts

For testing authentication, use these demo accounts:

**Account 1:**
- Email: demo@example.com
- Password: password123

**Account 2:**
- Email: student@example.com
- Password: student123

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── programs/          # Program detail pages
│   ├── search/            # Search page
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── ui/               # UI components
│   ├── ChatWidget.tsx    # AI chat component
│   └── Navigation.tsx    # Main navigation
├── data/                 # Mock data
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## Key Features Implementation

### Authentication Flow
- NextAuth.js configuration with credentials provider
- Protected route middleware
- User session management
- Secure API endpoints

### Search & Filtering
- Dynamic filtering with multiple criteria
- Real-time search results
- Pagination for large datasets
- URL state management

### AI Chat Integration
- OpenAI GPT-4 API integration
- Context-aware conversations
- Fallback responses for API issues
- Persistent chat sessions

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Accessible form controls
- Optimized for all screen sizes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting
- Component-based architecture

## Deployment

The application can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- Railway
- AWS
- Google Cloud Platform

### Environment Variables for Production

Ensure these environment variables are set in your production environment:

- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - Your production URL
- `OPENAI_API_KEY` - OpenAI API key for chat functionality

## Contributing

This is a demonstration project. For production use, consider:

- Implementing a real database (PostgreSQL, MongoDB)
- Adding comprehensive testing
- Implementing email verification
- Adding more authentication providers
- Enhancing error handling and logging
- Adding analytics and monitoring

## License

MIT License - see LICENSE file for details.

## Support

For questions about this demo project, please refer to the documentation or create an issue in the repository.
