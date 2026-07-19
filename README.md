<div align="center">

# ⚡ NOVA://OS — Developer Cockpit

**A cyberpunk-themed Chrome New Tab extension built for developers.**
Tasks, Pomodoro, GitHub, LeetCode, Terminal Snippets, Bookmarks & more — all in one sleek dashboard.

[![License: MIT](https://img.shields.io/badge/License-MIT-blueviolet.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Dashboard** | At-a-glance overview with widgets, weather, and quick stats |
| ✅ **Task Manager** | Full-featured to-do list with priorities, due dates, and drag-and-drop |
| 🍅 **Pomodoro Timer** | Focus sessions with customizable work/break intervals and desktop notifications |
| 🐙 **GitHub Integration** | View your repos, recent commits, pull requests, and contribution stats |
| 🧩 **LeetCode Tracker** | Track solved problems, streaks, and difficulty breakdown |
| 💻 **Terminal Snippets** | Store, organize, and copy frequently used CLI commands instantly |
| 🔖 **Bookmarks** | Manage your Chrome bookmarks with a beautiful card-based UI |
| 🔍 **Universal Search** | `Ctrl+K` to search across tasks, bookmarks, snippets, and the web |
| ⚙️ **Settings** | Customize themes, backgrounds, particles, and behaviour |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev) + [TypeScript 6](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev) with [`@crxjs/vite-plugin`](https://crxjs.dev/) for Chrome Extension bundling
- **Styling**: [TailwindCSS v4](https://tailwindcss.com) + custom CSS design tokens
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Drag & Drop**: [dnd-kit](https://dndkit.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [Oxlint](https://oxc.rs/docs/guide/usage/linter)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Google Chrome or any Chromium-based browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lelixn/DevForge.git
   cd DevForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer Mode** (top-right toggle)
   - Click **Load unpacked**
   - Select the `dist/` folder in the project directory

   > **Note:** Run `npm run build` first to generate the `dist/` folder before loading unpacked.

### Build for Production

```bash
npm run build
```

The built extension will be in the `dist/` directory, ready to be loaded or packaged.

---

## 📁 Project Structure

```
DevForge/
├── public/                  # Static assets (icons, fonts)
├── src/
│   ├── App.tsx              # Root app component with lazy-loaded routes
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles & design tokens
│   ├── background/          # Chrome service worker
│   ├── features/            # Feature-based modules
│   │   ├── auth/            # Authentication
│   │   ├── bookmarks/       # Bookmarks manager
│   │   ├── github/          # GitHub integration
│   │   ├── hero/            # Dashboard / home page
│   │   ├── leetcode/        # LeetCode tracker
│   │   ├── pomodoro/        # Pomodoro timer
│   │   ├── search/          # Universal search overlay
│   │   ├── settings/        # Settings panel
│   │   ├── terminal/        # Terminal snippet manager
│   │   └── todo/            # Task manager
│   ├── shared/              # Shared components, utilities & types
│   │   ├── components/      # Sidebar, Header, Footer, Toast, etc.
│   │   ├── types/           # Global TypeScript types
│   │   └── utils/           # Helper functions & Chrome API wrappers
│   └── store/               # Zustand global stores
├── manifest.json            # Chrome Extension Manifest v3
├── vite.config.ts           # Vite + CRXJS configuration
└── package.json
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+K` | Open Universal Search |
| `Alt+Shift+N` | Open / focus the extension |

---

## 🔒 Permissions Used

| Permission | Reason |
|---|---|
| `storage` | Persist tasks, settings, and snippets across sessions |
| `notifications` | Pomodoro timer desktop alerts |
| `alarms` | Background Pomodoro tick |
| `tabs` | Navigation and search integration |
| `bookmarks` | Read/write Chrome bookmarks |
| `identity` | GitHub OAuth authentication |
| `geolocation` | Weather widget on dashboard |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ⚡ by the NOVA Team</sub>
</div>
