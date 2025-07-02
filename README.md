# IntelliMail - AI-Powered Email Client


## Overview

IntelliMail is a modern, full-stack AI-powered email client built with cutting-edge technologies. This application provides an intelligent email management experience with AI-driven features, clean UI design, and seamless integrations with popular email providers.

### Key Features

- **🤖 AI-Powered Email Assistant**: GPT-4 integration for intelligent email composition and responses
- **🔍 Advanced Search**: Vector-based search with RAG (Retrieval Augmented Generation) for contextual email discovery  
- **📧 Multi-Provider Support**: Gmail and Outlook integration with OAuth2 authentication
- **⚡ Real-time Sync**: Automatic email synchronization and threading
- **💳 Subscription Management**: Stripe-powered premium features and billing
- **⌨️ Keyboard Shortcuts**: Efficient navigation with customizable hotkeys
- **🎨 Modern UI**: Beautiful, responsive interface with dark/light theme support
- **📱 Mobile Responsive**: Optimized experience across all devices

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Server state management
- **Jotai** - Atomic state management

### Backend & Database
- **tRPC** - End-to-end typesafe APIs
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Robust relational database
- **Clerk** - Authentication and user management
- **Stripe** - Payment processing and subscriptions

### AI & Search
- **OpenAI GPT-4** - Advanced language model for email assistance
- **Orama** - Full-text search with vector capabilities
- **AI SDK** - Streamlined AI integration
- **Vector Embeddings** - Semantic search and context understanding

### Email Integration
- **Gmail API** - Google email service integration
- **Nylas** - Unified email API platform
- **OAuth2** - Secure authentication flow
- **Webhooks** - Real-time email synchronization

### Development & Deployment
- **Vercel** - Serverless deployment platform
- **Docker** - Containerized development environment
- **ESLint & Prettier** - Code quality and formatting
- **Husky** - Git hooks for quality assurance

## Installation & Setup

### Prerequisites
- Node.js 18.17.0 or higher
- PostgreSQL database
- Gmail API credentials
- OpenAI API key
- Stripe account (for payments)
- Clerk account (for authentication)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/intellimail.git
cd intellimail
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/intellimail"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Gmail API
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_URL=http://localhost:3000
```

### 4. Database Setup

```bash
# Start PostgreSQL database
npm run db:start

# Run database migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate
```

### 5. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
intellimail/
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma      # Prisma database schema
│   └── migrations/        # Database migration files
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── mail/         # Email client interface
│   │   └── (auth)/       # Authentication pages
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utility functions and integrations
│   ├── server/           # Server-side code (tRPC, database)
│   └── trpc/             # tRPC client configuration
├── package.json
└── README.md
```

## Core Features

### AI Email Assistant
- **Smart Composition**: AI-powered email drafting with context awareness
- **Intelligent Responses**: Automated response suggestions based on email content
- **Context Search**: Vector-based search through email history for relevant information
- **Natural Language Processing**: Understanding and categorization of email content

### Email Management
- **Multi-Account Support**: Connect multiple Gmail and Outlook accounts
- **Thread Organization**: Automatic email threading and conversation management
- **Labels & Filters**: Smart categorization and filtering options
- **Search & Discovery**: Advanced search with full-text and semantic capabilities

### User Experience
- **Keyboard Navigation**: Vim-style shortcuts and custom hotkey support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Theme Customization**: Light and dark mode with system preference detection
- **Real-time Updates**: Live email synchronization and notifications

### Subscription & Billing
- **Freemium Model**: Basic features available for free users
- **Premium Features**: Advanced AI capabilities and increased account limits
- **Stripe Integration**: Secure payment processing and subscription management
- **Usage Tracking**: Monitor API usage and feature access

## API Routes

### Authentication
- `POST /api/auth/callback/gmail` - Gmail OAuth callback
- `POST /api/auth/callback/nylas` - Nylas OAuth callback

### Email Operations
- `GET /api/gmail/emails` - Fetch Gmail messages
- `POST /api/completion` - AI email completion
- `POST /api/chat` - AI chat interface

### Account Management
- `GET /api/accounts` - List connected accounts
- `POST /api/accounts` - Add new email account
- `DELETE /api/accounts/delete` - Remove email account

### Payments
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: User accounts and authentication
- **Account**: Connected email accounts
- **Thread**: Email conversation threads
- **Email**: Individual email messages
- **EmailAddress**: Email address entities
- **StripeSubscription**: Subscription and billing information

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Deployment

Use a managed PostgreSQL service like:
- Neon Database
- Supabase
- Railway
- PlanetScale (with MySQL adapter)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Email: support@intellimail.dev
- Documentation: [docs.intellimail.dev](https://docs.intellimail.dev)

---

Built with ❤️ using Next.js, AI, and modern web technologies.


