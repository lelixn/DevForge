
<br />
<div align="center">
  <h1 align="center">
    DevForge
  </h1>

  <p align="center">
    Your Modern Development Workspace
    <br />
    <br />
    <a href="https://github.com/lelixn/DevForge">View Demo</a>
    ·
    <a href="https://github.com/lelixn/DevForge/issues">Report Bug</a>
    ·
    <a href="https://github.com/lelixn/DevForge/issues">Request Feature</a>
  </p>
</div>

## About The Project

DevForge is a professional development platform designed for teams and individual developers. It provides a comprehensive set of tools for project management, task tracking, analytics, AI integration, and more — all in one beautiful, modern interface.

### Built With

- [![React][React.js]][React-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Vite][Vite]][Vite-url]
- [![Tailwind CSS][TailwindCSS]][Tailwind-url]
- [![TanStack][TanStack]][TanStack-url]
- [![Zustand][Zustand]][Zustand-url]

## Features

- 🚀 **Fast & Modern** - Built with Vite for lightning-fast development and HMR
- 🎨 **Beautiful UI** - Modern, responsive interface with Tailwind CSS and Radix UI primitives
- 📊 **Analytics Dashboard** - Real-time project and team metrics with Recharts
- 📝 **Task Management** - Organize and track project tasks efficiently
- 📁 **Project Workspace** - Manage multiple projects with ease
- 🔧 **API Workspace** - Integrate and test APIs seamlessly
- 🤖 **AI Integration** - Leverage AI capabilities for enhanced productivity
- 📚 **Documentation** - Built-in documentation viewer
- 🎯 **Team Collaboration** - Work together with your team
- ⚙️ **Customizable Settings** - Personalize your workspace
- 🔍 **Powerful Search** - Find what you need quickly with command palette
- 🔔 **Notifications** - Stay updated with real-time alerts (Sonner)
- 🌙 **Dark/Light Theme** - Switch between themes with ThemeProvider
- 📱 **Responsive Design** - Works perfectly on all devices

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repo

```bash
git clone https://github.com/lelixn/DevForge.git
```

2. Install NPM packages

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server

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
│   │   └── ui/            # UI primitives (Radix UI)
│   ├── features/          # Feature modules
│   ├── hooks/             # Custom hooks
│   ├── layouts/           # Layout components (AppShell, Header, Sidebar)
│   ├── routes/            # Route definitions (TanStack Router)
│   ├── services/          # API services (Axios)
│   ├── shared/            # Shared utilities and data
│   ├── stores/            # Zustand state management
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

| Script           | Description                                      |
|------------------|--------------------------------------------------|
| `npm run dev`    | Start development server                         |
| `npm run build`  | Build for production                             |
| `npm run preview`| Preview production build                         |
| `npm run lint`   | Run ESLint                                       |
| `npm run lint:fix` | Fix linting issues                              |
| `npm run format` | Format code with Prettier                        |
| `npm run prepare`| Set up Husky git hooks                           |

## Roadmap

- [ ] Add authentication
- [ ] Add database integration
- [ ] Add more AI features
- [ ] Add team chat
- [ ] Add file uploads
- [ ] Add more customization options

See the [open issues](https://github.com/lelixn/DevForge/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Project Link: [https://github.com/lelixn/DevForge](https://github.com/lelixn/DevForge)

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/)
- [Lucide](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack](https://tanstack.com/)

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[TanStack]: https://img.shields.io/badge/TanStack-FF4154?style=for-the-badge&logo=tanstack&logoColor=white
[TanStack-url]: https://tanstack.com/
[Zustand]: https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white
[Zustand-url]: https://github.com/pmndrs/zustand
