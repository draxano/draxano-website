# Draxano Website

A modern, responsive React website built with Vite, following **Clean Architecture** principles.

## Features

- 🏠 **Home Page** - Welcome page with hero section
- 👤 **About Page** - Personal information and introduction
- 💼 **Projects Page** - Showcase your projects with descriptions and technologies
- ✍️ **Writings Page** - Display your writings in PDF format
- 📧 **Contact Section** - Contact form for visitors to reach out
- 🔗 **Socials Section** - Links to your social media profiles

## Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

- **Domain Layer**: Business entities and core logic
- **Application Layer**: Use cases and business services
- **Infrastructure Layer**: Data access and external services
- **Presentation Layer**: React components and UI
- **Shared Layer**: Utilities and constants

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Project Structure

```
src/
├── domain/              # Domain entities (Project, Writing, Contact, Social)
├── application/         # Business services (ProjectService, WritingService, etc.)
├── infrastructure/      # Data sources, repositories, DI container
├── presentation/        # React components, pages, hooks, styles
└── shared/             # Constants and utilities
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customization

### Adding Your PDF Writings

1. Place PDF files in `public/writings/`
2. Update `src/infrastructure/dataSources/LocalDataSource.js` with your writing data
3. The writings will automatically appear on the Writings page

### Updating Social Links

Edit `src/shared/constants/socials.js` with your actual social media URLs.

### Customizing Projects

Update the projects array in `src/infrastructure/dataSources/LocalDataSource.js` with your actual project information.

### Styling

All styles are in `src/presentation/styles/`. The color scheme can be customized by modifying the CSS variables in `src/index.css`.

## Technologies Used

- React 18
- React Router DOM
- Vite
- CSS3
- Clean Architecture principles

## Architecture Benefits

- ✅ **Testable**: Each layer can be tested independently
- ✅ **Maintainable**: Clear separation of concerns
- ✅ **Scalable**: Easy to add new features
- ✅ **Flexible**: Easy to swap implementations (e.g., replace local data with API)
- ✅ **Framework Independent**: Business logic is independent of React

## License

MIT
