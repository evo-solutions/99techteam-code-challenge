# Currency Swap Form

A modern, feature-rich currency swap application built with **Vite**, **React**, **TypeScript**, **Material-UI (MUI)**, and **Tailwind CSS**. This project demonstrates best practices in state management, internationalization, and component architecture.

## 🚀 Features

- ✅ **Token Swap Functionality** - Swap between different cryptocurrencies
- 🎨 **Modern UI Design** - Built with Material-UI and Tailwind CSS
- 🌍 **Internationalization (i18n)** - Support for English and Vietnamese
- 🔄 **Real-time Exchange Rates** - Fetches live token prices from API
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎯 **Form Validation** - Comprehensive input validation with error messages
- ⚡ **Redux State Management** - Centralized state with Redux Toolkit
- 🔍 **Token Search** - Quick search functionality in token selection
- ⏳ **Loading States** - Smooth loading indicators and error handling
- 🎭 **Simulated Swap** - Mock backend interaction with 2-second delay

## 🏗️ Project Structure

The project follows a component-based architecture with clear separation of concerns:

```
src/
├── components/                 # Reusable UI components
│   ├── shared/                # Shared components
│   │   └── layout/           # Layout components
│   │       └── index.tsx
│   └── ui/                    # UI-specific components
│       ├── language-switcher/ # Language switching component
│       │   └── index.tsx
│       ├── swap-button/       # Swap action button
│       │   └── index.tsx
│       ├── swap-form/         # Main swap form component
│       │   └── index.tsx
│       ├── theme/             # Theme-related components
│       │   ├── index.tsx
│       │   ├── mui-theme.provider.tsx
│       │   ├── theme-swicher.tsx
│       │   └── theme.context.ts
│       ├── token-input/       # Token amount input component
│       │   └── index.tsx
│       └── token-selector/    # Token selection dropdown
│           └── index.tsx
├── constants/                 # Application constants
│   ├── api.const.ts          # API-related constants
│   ├── cache.const.ts        # Cache configuration
│   ├── index.ts              # Main constants export
│   └── ui.const.ts           # UI-related constants
├── lib/                      # Core libraries and configurations
│   ├── i18n/                 # Internationalization
│   │   ├── config.ts         # i18n configuration
│   │   └── messages/         # Translation files
│   │       ├── en.json       # English translations
│   │       └── vi.json       # Vietnamese translations
│   ├── mui/                  # Material-UI configuration
│   │   ├── index.tsx         # MUI provider setup
│   │   └── mui.theme.ts      # MUI theme configuration
│   └── redux/                # Redux state management
│       ├── hooks.ts          # Redux hooks
│       ├── provider.tsx      # Redux provider
│       ├── rootReducer.ts    # Root reducer
│       ├── store.ts          # Redux store configuration
│       └── slices/           # Redux slices
│           ├── swap.slice.ts # Swap state management
│           └── tokens.slice.ts # Token state management
├── pages/                    # Page components
│   └── swap-token/          # Swap token page
│       └── index.tsx
├── services/                # API and business logic services
│   ├── http-get.service.ts  # HTTP GET service
│   ├── index.ts             # Services export
│   ├── swap.service.ts      # Swap business logic
│   ├── token.service.ts     # Token API service
│   └── token.type.ts        # Token type definitions
├── utils/                   # Utility functions
│   └── token.utils.ts       # Token-related utilities
├── App.tsx                  # Root application component
├── main.tsx                 # Application entry point
└── index.css                # Global styles
```

## 🛠️ Tech Stack

- **Vite** - Next-generation frontend tooling
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI) v6** - React component library
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **i18next** - Internationalization
- **Axios** - HTTP client

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎨 Design System

### Color Palette

The application uses a carefully crafted color system defined in CSS variables:

**Light Mode:**
- Primary: `hsl(24.6, 95%, 53.1%)` - Vibrant orange
- Background: `hsl(0, 0%, 100%)` - Pure white
- Foreground: `hsl(20, 14.3%, 4.1%)` - Dark text

**Dark Mode:**
- Primary: `hsl(20.5, 90.2%, 48.2%)` - Rich orange
- Background: `hsl(20, 14.3%, 4.1%)` - Dark background
- Foreground: `hsl(60, 9.1%, 97.8%)` - Light text

### Material-UI Integration

MUI components are configured to use CSS variables from Tailwind, ensuring consistent theming across both libraries. The `tailwind.config.js` has `preflight: false` to avoid conflicts with MUI's base styles.

## 🌐 Internationalization

The app supports multiple languages out of the box:

- **English (en)** - Default language
- **Vietnamese (vi)** - Full translation

Switch languages using the language selector in the top-right corner.

### Adding New Languages

1. Create a new JSON file in `src/lib/i18n/messages/` (e.g., `fr.json`)
2. Add translations following the existing structure
3. Import and register in `src/lib/i18n/config.ts`

## 🔄 State Management

Redux Toolkit is used for global state management with two main slices:

### Swap Slice
- Manages form data (fromToken, toToken, amounts)
- Handles swap submission
- Tracks loading and error states

### Tokens Slice
- Fetches token prices from API
- Caches token data
- Handles loading and error states

## 📡 API Integration

Token prices are fetched from:
```
https://interview.switcheo.com/prices.json
```

Token icons are loaded from:
```
https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{TOKEN}.svg
```

## 🧪 Key Features Explained

### Automatic Exchange Rate Calculation
When you enter an amount in the "From" field and select both tokens, the "To" amount is automatically calculated using real-time exchange rates.

### Token Swap Button
Click the swap icon (⇅) in the middle to instantly swap the "From" and "To" tokens along with their amounts.

### Form Validation
- Required field validation
- Numeric input validation
- Minimum amount validation (> 0)
- Prevents swapping the same token

### Loading States
- Initial token loading
- Swap submission with 2-second simulated delay
- Refresh token prices functionality

### Error Handling
- Network error handling
- API error messages
- Form validation errors
- Retry functionality

## 🎯 Component Architecture

The project follows a modular component architecture:

### Component Organization
- **`components/ui/`** - Core UI components (swap-form, token-selector, etc.)
- **`components/shared/`** - Shared layout and common components
- **`pages/`** - Page-level components that compose UI components
- **`services/`** - Business logic and API integration
- **`lib/`** - Core libraries (Redux, MUI, i18n configurations)

### Component Structure
Each component follows this pattern:
1. **Component File (`index.tsx`)** - UI presentation and component logic
2. **Services** - Business logic separated into service files
3. **Types** - TypeScript definitions for type safety

This architecture ensures:
- Clean, maintainable code
- Easy testing and debugging
- Reusable components
- Clear separation of concerns
- Scalable structure for future enhancements

## 🚀 Performance Optimizations

- **Memoization** - Uses `useMemo` and `useCallback` to prevent unnecessary re-renders
- **Token Caching** - Token list is cached in Redux to avoid redundant API calls
- **Debounced Search** - Token search is optimized for performance
- **Code Splitting** - Components are loaded efficiently

## 📝 Code Style & Development Tools

The project follows these conventions and includes comprehensive development tools:

### Code Quality
- **ESLint** - Advanced linting with TypeScript, React, and accessibility rules
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety and better development experience
- **Husky** - Git hooks for pre-commit and commit message validation
- **lint-staged** - Run linters on staged files only
- **commitlint** - Enforce conventional commit messages

### Development Scripts
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking

# Git Hooks (automatic)
# Pre-commit: Runs lint-staged (ESLint + Prettier)
# Commit-msg: Validates commit message format
```

### Commit Message Format
Follow conventional commits:
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
perf: performance improvements
test: add or update tests
chore: maintenance tasks
```

### VS Code Integration
The project includes VS Code settings for:
- Auto-formatting on save
- ESLint auto-fix on save
- Import organization
- Tailwind CSS IntelliSense
- TypeScript support

## 🔮 Future Enhancements

Potential improvements:
- [ ] Add dark mode toggle
- [ ] Transaction history
- [ ] Multiple swap routes
- [ ] Slippage tolerance settings
- [ ] Gas fee estimation
- [ ] Connect wallet integration
- [ ] Real blockchain integration
- [ ] Price charts
- [ ] Favorites/Recently used tokens

## 📄 License

This project is created as a coding challenge submission.

## 🤝 Contributing

This is a challenge submission, but suggestions are welcome!

## 📧 Contact

For questions or feedback, please refer to the challenge submission guidelines.

---

**Built with ❤️ using Vite, React, MUI, and Tailwind CSS**

