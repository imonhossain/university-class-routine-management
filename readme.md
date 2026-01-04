# University Class Routine Management System

A full-stack monorepo application for managing university class schedules, including courses, teachers, rooms, time slots, and bookings.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Monorepo** | Nx | 20.8.0 |
| **Runtime** | Node.js | 25.x LTS |
| **Frontend** | React | 19.x |
| **Frontend Build** | Vite | 6.x |
| **Styling** | Tailwind CSS | 4.x |
| **UI Components** | Shadcn/ui, Radix UI | Latest |
| **State Management** | TanStack Query | 5.x |
| **Backend** | NestJS | 10.x |
| **ORM** | TypeORM | 0.3.x |
| **Database** | PostgreSQL | 16.x |
| **Language** | TypeScript | 5.9.x |
| **Container** | Docker & Docker Compose | Latest |

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 25 LTS** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Docker** - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** - [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Git** - [Download](https://git-scm.com/)

### Optional (for development)

- **NestJS CLI** - `npm i -g @nestjs/cli`
- **TypeORM CLI** - `npm i -g typeorm`

## Project Structure

```
university-class-routine-management/
├── apps/
│   ├── api/                        # NestJS Backend API
│   │   ├── src/
│   │   │   ├── auth/               # Authentication (JWT)
│   │   │   ├── controllers/        # API Controllers
│   │   │   ├── dto/                # Data Transfer Objects
│   │   │   ├── entities/           # TypeORM Entities
│   │   │   ├── modules/            # Feature Modules
│   │   │   │   ├── booking/
│   │   │   │   ├── course/
│   │   │   │   ├── room/
│   │   │   │   ├── teacher/
│   │   │   │   └── timeslot/
│   │   │   ├── services/           # Business Logic
│   │   │   └── configs/            # App Configurations
│   │   ├── migrations/             # Database Migrations
│   │   └── test/                   # E2E Tests
│   │
│   └── web/                        # React Frontend
│       ├── src/
│       │   ├── components/         # React Components
│       │   ├── pages/              # Page Components
│       │   ├── context/            # React Context
│       │   ├── services/           # API Services
│       │   ├── interfaces/         # TypeScript Interfaces
│       │   ├── enums/              # Frontend Enums
│       │   └── routes/             # Routing Config
│       └── public/                 # Static Assets
│
├── libs/
│   └── shared/                     # Shared Library
│       └── src/
│           └── enums/              # Shared Enums
│               ├── Department.ts
│               ├── Section.ts
│               ├── UserRoleType.ts
│               └── UserStatusType.ts
│
├── docker-compose.yml              # PostgreSQL Container
├── nx.json                         # Nx Configuration
├── tsconfig.base.json              # Base TypeScript Config
└── package.json                    # Root Package
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd university-class-routine-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create environment files for both applications:

**API Environment** (`apps/api/.env`):
```bash
# Copy sample env file
cp apps/api/.env.sample apps/api/.env
```

**Web Environment** (`apps/web/.env`):
```bash
# Copy sample env file
cp apps/web/.env.sample apps/web/.env
```

### 4. Start Database

```bash
npm run docker:db
```

This starts a PostgreSQL 16 container with:
- **Host**: localhost
- **Port**: 5432
- **Database**: routine
- **Username**: postgres
- **Password**: password

### 5. Run Database Migrations

```bash
npm run migration
```

### 6. Start Development Servers

```bash
# Start both API and Web
npm run dev

# Or start individually
npm run dev:api    # API on http://localhost:7010
npm run dev:web    # Web on http://localhost:3000
```

## Available Commands

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in development mode |
| `npm run dev:api` | Start API server (port 7010) |
| `npm run dev:web` | Start Web app (port 3000) |

### Build

| Command | Description |
|---------|-------------|
| `npm run build` | Build all apps for production |
| `npm run build:api` | Build API only |
| `npm run build:web` | Build Web only |

### Testing

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests |
| `npm run test:api` | Run API tests |
| `npm run test:web` | Run Web tests |

### Linting & Formatting

| Command | Description |
|---------|-------------|
| `npm run lint` | Lint all projects |
| `npm run lint:api` | Lint API code |
| `npm run lint:web` | Lint Web code |
| `npm run format` | Format all code with Prettier |
| `npm run format:check` | Check code formatting |

### Database

| Command | Description |
|---------|-------------|
| `npm run docker:db` | Start PostgreSQL container |
| `npm run migration` | Run database migrations |
| `npm run migration:generate` | Generate new migration |

### Nx Utilities

| Command | Description |
|---------|-------------|
| `npm run graph` | View project dependency graph |
| `npm run affected` | List affected projects |
| `npm run affected:build` | Build only affected projects |
| `npm run affected:test` | Test only affected projects |

## API Documentation

Once the API is running, access the Swagger UI documentation at:

**[http://localhost:7010/rest/api-service/swagger/](http://localhost:7010/rest/api-service/swagger/)**

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /rest/api-service/auth/sign-in` | User authentication |
| `/rest/api-service/course` | Course management |
| `/rest/api-service/teacher` | Teacher management |
| `/rest/api-service/room` | Room management |
| `/rest/api-service/timeslot` | Time slot management |
| `/rest/api-service/booking` | Booking management |

## Default Access Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@gmail.com | admin | ADMIN |

## Using the Shared Library

Import shared types in your code:

```typescript
import { Department, Section, UserRoleType, UserStatusType } from '@routine/shared';
```

## Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs -f

# Reset database (removes all data)
docker-compose down -v
docker-compose up -d
```

## Contributing

1. Create a feature branch from `master`
2. Make your changes
3. Run tests: `npm run test`
4. Run lint: `npm run lint`
5. Build: `npm run build`
6. Create a Pull Request

## Useful Resources

- [Nx Documentation](https://nx.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [TypeORM Documentation](https://typeorm.io)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## License

This project is private and unlicensed.

---

Built with Nx Monorepo
