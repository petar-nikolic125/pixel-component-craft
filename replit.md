# Component Landing Page Builder

## Overview

This is a full-stack web application for creating landing pages using a drag-and-drop visual editor. The application features a modern design with a React frontend, Express backend, and PostgreSQL database. Users can create components, export code, and manage their projects through an intuitive interface.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the main UI
- **Vite** as the build tool and development server
- **TailwindCSS** for styling with custom CSS variables for theming
- **Shadcn/ui** component library for consistent UI elements
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation for form handling

### Backend Architecture
- **Express.js** server with TypeScript
- **Drizzle ORM** for database operations with PostgreSQL dialect
- **Session-based authentication** (infrastructure in place)
- **RESTful API design** with `/api` prefix for all routes
- **Custom middleware** for request logging and error handling

### Component System
The application uses a modular component architecture:
- **UI Components**: Reusable Shadcn/ui components
- **Landing Components**: Hero sections, feature grids, pricing tables
- **Editor Components**: Visual editor, component library, configuration panels
- **Layout Components**: Navigation, page structures

## Key Components

### Visual Editor System
- **Component Canvas**: Main editing area with drag-and-drop functionality
- **Component Library**: Palette of available components (hero, feature, button, testimonial)
- **Configuration Panel**: Properties editor for selected components
- **Layer Management**: Visual hierarchy management
- **History System**: Undo/redo functionality with action tracking
- **Transform Controls**: Position, size, rotation, and opacity controls

### Database Schema
```sql
users table:
- id (serial, primary key)
- username (text, unique, not null)
- password (text, not null)
```

### Component Configuration
Each component follows a standard configuration interface:
- **Component Type**: hero, feature, button, testimonial
- **Properties**: Dynamic props based on component type
- **Transform**: Position, size, rotation, opacity
- **Styling**: Border radius, shadow, blend modes
- **State**: Visibility, lock status, z-index

## Data Flow

1. **User Interaction**: User interacts with the visual editor
2. **State Management**: Component configurations stored in React state
3. **Real-time Updates**: Changes reflected immediately in canvas
4. **History Tracking**: All actions logged for undo/redo functionality
5. **Export Process**: Components converted to HTML/CSS or React code
6. **Database Persistence**: User data and projects saved via API

## External Dependencies

### Frontend Dependencies
- **@radix-ui/***: Accessible UI primitives for all interactive components
- **@tanstack/react-query**: Server state management and caching
- **@hookform/resolvers**: Form validation integration
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette functionality
- **date-fns**: Date manipulation utilities
- **embla-carousel-react**: Carousel components

### Backend Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe database operations
- **drizzle-zod**: Schema validation integration
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **esbuild**: Fast bundling for production builds
- **tsx**: TypeScript execution for development
- **drizzle-kit**: Database migration and schema management

## Deployment Strategy

### Development Environment
- **Replit-optimized**: Configured for Replit development environment
- **Hot Module Replacement**: Vite HMR for instant updates
- **Development Middleware**: Error overlays and debugging tools
- **Database**: PostgreSQL 16 module enabled

### Production Build Process
1. **Frontend Build**: Vite bundles React app to `dist/public`
2. **Backend Bundle**: esbuild packages server code to `dist/index.js`
3. **Static Assets**: Client files served through Express static middleware
4. **Database Migrations**: Drizzle handles schema updates

### Deployment Configuration
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port Configuration**: 5000 (internal) → 80 (external)
- **Auto-scaling**: Configured for Replit autoscale deployment

## Changelog

```
Changelog:
- June 26, 2025. Initial setup
- June 26, 2025. Comprehensive Photoshop-grade features implemented:
  * Advanced Canvas with smart guides, transform handles, and real-time info
  * Export Engine supporting PNG, HTML/CSS, React components, JSON schema, and CodePen
  * Tier system (Free/Premium/Deluxe) with feature differentiation
  * Advanced Layers Panel with grouping, alignment, and thumbnails
  * Blend Modes Panel with 16 CSS blend modes and opacity controls
  * Masking & Clipping system with rectangle, ellipse, polygon, and freeform tools
  * Keyboard shortcuts (V=Move, R=Rotate, S=Scale, Ctrl+Z/Y=Undo/Redo)
  * CI/CD pipeline with GitHub Actions for automated builds
  * PNG export automation with Puppeteer
- June 26, 2025. Expanded to 40+ components in prototype mode:
  * Hero variants: video background, split-screen, carousel
  * Button styles: solid, outline, 3D neon, glassmorphic, icon buttons
  * Feature blocks: grid, list, icon-driven, alternating layouts
  * Testimonials: slider, card stack, video quotes
  * Forms: contact, login/register, multi-step wizard, newsletter
  * Widgets: pricing tables, countdown timers, charts (bar/line/pie), FAQ accordion
  * Media: image galleries, video players, background masks
  * Navigation: navbar, multi-column footer, minimal footer, breadcrumbs
  * All components unlocked in prototype mode with "✓ Active" badges
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```