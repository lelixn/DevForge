# Features Directory

This workspace uses a feature-based architecture. Group your code by business capabilities.
Each feature folder should be self-contained and structured as:

`src/features/feature-name/`

- `components/` - Feature-specific UI components
- `hooks/` - Feature-specific custom hooks
- `services/` - Feature-specific API calls/axios clients
- `stores/` - Feature-specific Zustand state stores
- `types/` - Feature-specific TypeScript models/interfaces
- `index.ts` - Public API exposing only what other parts of the app need to access
