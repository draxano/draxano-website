# Clean Architecture Documentation

This project follows **Clean Architecture** principles, ensuring separation of concerns, maintainability, and testability.

## Architecture Overview

The application is organized into four main layers:

```
src/
├── domain/              # Domain Layer (Business Logic)
│   └── entities/       # Domain models/entities
├── application/         # Application Layer (Use Cases)
│   └── services/       # Business logic services
├── infrastructure/      # Infrastructure Layer (External Concerns)
│   ├── dataSources/    # Data sources (API, Local, etc.)
│   ├── repositories/   # Data access layer
│   └── di/             # Dependency Injection
├── presentation/       # Presentation Layer (UI)
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   └── styles/        # CSS files
└── shared/            # Shared utilities
    ├── constants/     # Application constants
    └── utils/         # Utility functions
```

## Layer Responsibilities

### 1. Domain Layer (`domain/`)
**Purpose**: Contains business entities and core business logic.

- **Entities**: Pure JavaScript classes representing domain models
  - `Project.js` - Project entity with validation
  - `Writing.js` - Writing entity with date formatting
  - `Contact.js` - Contact entity with email validation
  - `Social.js` - Social media link entity

**Rules**:
- No dependencies on other layers
- Contains only business logic
- Entities are framework-agnostic

### 2. Application Layer (`application/`)
**Purpose**: Contains use cases and application-specific business logic.

- **Services**: Business logic that orchestrates domain entities
  - `ProjectService.js` - Project-related operations
  - `WritingService.js` - Writing-related operations
  - `ContactService.js` - Contact form submission logic

**Rules**:
- Depends only on domain layer
- No framework-specific code
- Contains use cases and business workflows

### 3. Infrastructure Layer (`infrastructure/`)
**Purpose**: Handles external concerns (data access, APIs, etc.).

- **Data Sources**: Where data comes from
  - `LocalDataSource.js` - Local/mock data (can be replaced with API)
  
- **Repositories**: Data access abstraction
  - `ProjectRepository.js` - Project data access
  - `WritingRepository.js` - Writing data access

- **Dependency Injection**: Centralized dependency management
  - `di/container.js` - DI container for service instantiation

**Rules**:
- Implements interfaces defined by application layer
- Can depend on domain layer
- Handles all external concerns (APIs, databases, etc.)

### 4. Presentation Layer (`presentation/`)
**Purpose**: User interface and React-specific code.

- **Components**: Reusable UI components
  - `Navigation.jsx` - Navigation bar
  - `Contact.jsx` - Contact form
  - `Socials.jsx` - Social media links

- **Pages**: Page-level components
  - `Home.jsx`, `About.jsx`, `Projects.jsx`, `Writings.jsx`

- **Hooks**: Custom React hooks that bridge UI and application layer
  - `useProjects.js` - Projects data hook
  - `useWritings.js` - Writings data hook
  - `useContact.js` - Contact form hook

**Rules**:
- Depends on application layer through hooks
- Contains all React-specific code
- No direct data access (goes through services)

### 5. Shared Layer (`shared/`)
**Purpose**: Shared utilities and constants used across layers.

- **Constants**: Application-wide constants
  - `routes.js` - Route definitions
  - `socials.js` - Social media configuration

- **Utils**: Utility functions
  - `index.js` - Helper functions (date formatting, validation, etc.)

## Dependency Flow

```
Presentation → Application → Domain
     ↓              ↓
Infrastructure → Domain
```

**Key Principle**: Dependencies point inward. Outer layers depend on inner layers, but inner layers never depend on outer layers.

## Data Flow Example

### Fetching Projects:

1. **Presentation Layer** (`useProjects` hook)
   - React hook calls service

2. **Application Layer** (`ProjectService`)
   - Service orchestrates business logic
   - Calls repository

3. **Infrastructure Layer** (`ProjectRepository` → `LocalDataSource`)
   - Repository fetches data from data source
   - Maps raw data to domain entities

4. **Domain Layer** (`Project` entity)
   - Entity validates and structures data

5. **Back to Presentation**
   - Hook returns data to component
   - Component renders UI

## Adding New Features

### Example: Adding a Blog Feature

1. **Domain**: Create `BlogPost.js` entity
2. **Infrastructure**: Create `BlogPostRepository.js` and add to data source
3. **Application**: Create `BlogPostService.js`
4. **Presentation**: Create `BlogPost.jsx` page and `useBlogPosts.js` hook
5. **DI**: Register service in `container.js`

## Benefits of This Architecture

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear separation of concerns
3. **Scalability**: Easy to add new features
4. **Flexibility**: Easy to swap implementations (e.g., replace LocalDataSource with API)
5. **Independence**: Business logic is independent of frameworks and UI

## Migration Path

To migrate from local data to API:

1. Create `ApiDataSource.js` in `infrastructure/dataSources/`
2. Update `container.js` to use `ApiDataSource` instead of `LocalDataSource`
3. No changes needed in application or presentation layers!

## Best Practices

1. **Never import from outer layers in inner layers**
   - Domain should never import from Application/Infrastructure/Presentation

2. **Use dependency injection**
   - All dependencies should be injected, not instantiated directly

3. **Keep entities pure**
   - Domain entities should contain only business logic

4. **Use hooks for data fetching**
   - All data access should go through custom hooks

5. **Centralize constants**
   - Use `shared/constants` for all application constants

