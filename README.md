# DevForge

A modern, full-featured development platform built with React, TypeScript, and Vite.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## About

DevForge is a professional development workspace designed for teams and individual developers. It provides a comprehensive set of tools for project management, task tracking, analytics, AI integration, and more.

## Features

- 🚀 **Fast & Modern**: Built with Vite for lightning-fast development
- 🎨 **Beautiful UI**: Modern, responsive interface with Tailwind CSS
- 📊 **Analytics Dashboard**: Real-time project and team metrics
- 📝 **Task Management**: Organize and track project tasks efficiently
- 📁 **Project Workspace**: Manage multiple projects with ease
- 🔧 **API Workspace**: Integrate and test APIs seamlessly
- 🤖 **AI Integration**: Leverage AI capabilities for enhanced productivity
- 📚 **Documentation**: Built-in documentation viewer
- 🎯 **Team Collaboration**: Work together with your team
- ⚙️ **Customizable Settings**: Personalize your workspace
- 🔍 **Powerful Search**: Find what you need quickly
- 🔔 **Notifications**: Stay updated with real-time alerts
- 🌙 **Dark/Light Theme**: Switch between themes

## Tech Stack

### Core Technologies

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### Key Dependencies

- **@tanstack/react-router** - File-based routing
- **@tanstack/react-query** - Data fetching and caching
- **Zustand** - State management
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Animations
- **Sonner** - Toast notifications
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Recharts** - Charts and data visualization
- **Axios** - HTTP client
- **cmdk** - Command palette

### Development Tools

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Lint staged files
- **Oxlint** - Fast linter

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lelixn/DevForge.git
cd DevForge
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

## Project Structure

```
DevForge/
├── public/                 # Static assets
├── src/
│   ├── app/               # App initialization and providers
│   ├── assets/            # Images and other assets
│   ├── components/        # Reusable components
│   │   ├── shared/        # Shared components
│   │   └── ui/            # UI primitives
│   ├── features/          # Feature modules
│   ├── hooks/             # Custom hooks
│   ├── layouts/           # Layout components
│   ├── routes/            # Route definitions
│   ├── services/          # API services
│   ├── shared/            # Shared utilities and data
│   ├── stores/            # Zustand stores
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── .env.example           # Environment variables example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Scripts

| Script             | Description               |
| ------------------ | ------------------------- |
| `npm run dev`      | Start development server  |
| `npm run build`    | Build for production      |
| `npm run preview`  | Preview production build  |
| `npm run lint`     | Run ESLint                |
| `npm run lint:fix` | Fix linting issues        |
| `npm run format`   | Format code with Prettier |
| `npm run prepare`  | Set up Husky git hooks    |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
