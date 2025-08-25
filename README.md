# FuelShare - Fuel Cost Calculator with Trip Sharing

## Project Overview

FuelShare is a full-stack web application that allows users to calculate and split fuel costs for trips. Users can input origin and destination addresses, and the application automatically calculates the driving distance and fuel costs, then splits the cost among multiple passengers.

### Current State Analysis

- **Frontend**: React + TypeScript with Vite, basic fuel calculator UI implemented
- **Backend**: Express.js skeleton with PostgreSQL dependency
- **Status**: Basic frontend calculator exists, backend is empty, no authentication or API integration

## Technology Stack

### Frontend

- React 19 with TypeScript
- Vite (build tool)
- React Router (navigation)
- Zustand (state management)

### Backend

- Node.js with Express.js
- PostgreSQL (database)
- JWT (authentication)
- OpenRouteService API (geocoding & routing)

### Security & Best Practices

- Password hashing with bcrypt
- SQL injection prevention with parameterized queries
- CORS configuration
- Environment variable management
- Input validation and sanitization

---

## Development Plan - Step by Step Guide

### Phase 1: Backend Foundation & Database Setup

#### Step 1.1: PostgreSQL Database Setup

**What you need to learn**: PostgreSQL installation, database creation, table design
**Research keywords**: "postgresql installation mac", "postgresql create database", "postgresql user management"
**Documentation**: https://www.postgresql.org/docs/current/

**Tasks**:

1. Install PostgreSQL locally
2. Create database named `fuelshare_db`
3. Create database user with appropriate permissions
4. Design and create tables (see database schema below)

**Files to create/modify**:

- `backend/database/schema.sql` - Database schema definitions
- `backend/database/connection.js` - Database connection configuration
- `backend/.env` - Environment variables (add to .gitignore!)

**Database Schema Design**:

```sql
-- Research "postgresql create table", "postgresql data types", "postgresql constraints"
-- Tables needed: users, user_trips
-- Users table: id (primary key), email (unique), password_hash, created_at, updated_at
-- User_trips table: id, user_id (foreign key), origin, destination, distance, fuel_cost, split_count, created_at
```

#### Step 1.2: Express.js Server Setup

**Research keywords**: "express.js setup", "express middleware", "express cors", "dotenv nodejs"
**Documentation**: https://expressjs.com/en/starter/installing.html

**Files to create/modify**:

- `backend/server.js` - Main server file
- `backend/package.json` - Add required dependencies
- `backend/.env` - Environment configuration
- `backend/middleware/` - Create middleware directory

**Dependencies to add**:

```bash
# Research each package: "npm package-name documentation"
npm install express cors helmet dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

**Server structure to implement**:

- CORS configuration for frontend communication
- JSON parsing middleware
- Security headers with helmet
- Environment variable loading
- Basic error handling middleware

#### Step 1.3: Database Connection & Models

**Research keywords**: "nodejs postgresql connection", "pg npm package", "database connection pooling"
**Documentation**: https://node-postgres.com/

**Files to create**:

- `backend/models/User.js` - User model with database operations
- `backend/models/Trip.js` - Trip model for storing calculation history
- `backend/config/database.js` - Database configuration and connection pool

**Key concepts to research**:

- Connection pooling vs single connections
- Prepared statements for SQL injection prevention
- Database transaction handling
- Error handling for database operations

### Phase 2: Authentication System Implementation

#### Step 2.1: Password Security Implementation

**Research keywords**: "bcrypt nodejs", "password hashing best practices", "salt rounds bcrypt"
**Documentation**: https://www.npmjs.com/package/bcryptjs

**Files to create/modify**:

- `backend/utils/passwordUtils.js` - Password hashing and verification utilities
- `backend/models/User.js` - Add password methods to user model

**Security concepts to research**:

- Why salt passwords (research "password salting")
- Appropriate bcrypt salt rounds (research "bcrypt salt rounds security")
- Password strength validation
- Timing attack prevention

#### Step 2.2: JWT Token System (Access + Refresh Tokens)

**Research keywords**: "jwt nodejs", "access refresh token pattern", "jwt security best practices"
**Documentation**: https://jwt.io/introduction/, https://www.npmjs.com/package/jsonwebtoken

**Files to create**:

- `backend/utils/tokenUtils.js` - JWT generation and verification
- `backend/middleware/auth.js` - Authentication middleware
- `backend/models/RefreshToken.js` - Refresh token storage model

**Key concepts to research**:

- Difference between access and refresh tokens
- JWT payload structure and claims
- Token expiration strategies
- Secure token storage (httpOnly cookies vs localStorage)
- Token rotation and revocation

**Database additions needed**:

- refresh_tokens table for storing valid refresh tokens

#### Step 2.3: Registration & Login Endpoints

**Research keywords**: "express.js routes", "input validation express", "email validation regex"
**Documentation**: Express.js routing guide

**Files to create**:

- `backend/routes/auth.js` - Authentication routes
- `backend/controllers/authController.js` - Authentication logic
- `backend/middleware/validation.js` - Input validation middleware

**Endpoints to implement**:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout (token invalidation)

**Security considerations to research**:

- Input sanitization (research "express-validator")
- Rate limiting for auth endpoints (research "express-rate-limit")
- Email format validation
- Password complexity requirements

#### Step 2.4: Authentication Middleware

**Research keywords**: "express middleware", "jwt verification", "authorization vs authentication"

**Files to create/modify**:

- `backend/middleware/auth.js` - JWT verification middleware
- `backend/middleware/requireAuth.js` - Route protection middleware

**Middleware concepts to research**:

- Middleware execution order in Express
- Error handling in middleware
- Request object modification
- Next() function usage

### Phase 3: OpenRouteService API Integration

#### Step 3.1: API Setup and Configuration

**Research keywords**: "openrouteservice api", "geocoding api", "directions api", "api key management"
**Documentation**: https://openrouteservice.org/dev/#/api-docs

**Files to create**:

- `backend/services/geocodingService.js` - Address to coordinates conversion
- `backend/services/routingService.js` - Distance calculation between coordinates
- `backend/utils/apiClient.js` - HTTP client for external API calls

**API concepts to research**:

- RESTful API consumption
- HTTP status code handling
- API rate limiting and error handling
- Environment variable for API keys

#### Step 3.2: Geocoding Implementation

**Research keywords**: "geocoding address to coordinates", "openrouteservice geocoding", "address validation"

**Functions to implement in geocodingService.js**:

- Address validation and normalization
- Coordinate extraction from API response
- Error handling for invalid addresses
- Caching mechanisms for repeated queries

#### Step 3.3: Route Distance Calculation

**Research keywords**: "openrouteservice directions", "driving route calculation", "distance matrix api"

**Functions to implement in routingService.js**:

- Calculate driving distance between two coordinates
- Handle multiple route options
- Extract distance from API response
- Fallback mechanisms for API failures

#### Step 3.4: Fuel Cost Calculation Integration

**Files to modify**:

- `backend/controllers/tripController.js` - Main trip calculation logic
- `backend/services/fuelCalculationService.js` - Business logic for fuel costs

**Integration points**:

- Combine geocoding + routing + fuel calculation
- Validate all inputs before API calls
- Store calculation results in database
- Return formatted response to frontend

### Phase 4: Protected API Endpoints

#### Step 4.1: Trip Calculation Endpoint

**Files to create**:

- `backend/routes/trips.js` - Trip-related routes
- `backend/controllers/tripController.js` - Trip calculation logic

**Endpoint to implement**:

- `POST /api/trips/calculate` - Protected endpoint for fuel cost calculation

**Request/Response structure to design**:

- Input validation for origin, destination, fuel efficiency, fuel price, split count
- Error responses for invalid inputs or API failures
- Successful response with distance, total cost, cost per person

#### Step 4.2: Trip History Endpoints

**Additional endpoints to consider**:

- `GET /api/trips/history` - User's calculation history
- `DELETE /api/trips/:id` - Delete calculation from history

### Phase 5: Frontend Authentication Integration

#### Step 5.1: Authentication Context Setup

**Research keywords**: "react context api", "react authentication", "jwt storage frontend"
**Documentation**: React Context API docs

**Files to create**:

- `frontend/src/contexts/AuthContext.tsx` - Authentication state management
- `frontend/src/hooks/useAuth.tsx` - Authentication hook
- `frontend/src/utils/tokenStorage.ts` - Token management utilities

**Concepts to research**:

- React Context vs Zustand for auth state
- Token storage security (localStorage vs sessionStorage vs cookies)
- Automatic token refresh implementation
- Protected route components

#### Step 5.2: Authentication Components

**Files to create**:

- `frontend/src/components/Login.tsx` - Login form component
- `frontend/src/components/Register.tsx` - Registration form component
- `frontend/src/components/ProtectedRoute.tsx` - Route protection wrapper

**UI/UX concepts to research**:

- Form validation in React
- Error message display
- Loading states during authentication
- Responsive form design

#### Step 5.3: API Client Setup

**Research keywords**: "axios react", "fetch api react", "api error handling"

**Files to create**:

- `frontend/src/services/apiClient.ts` - HTTP client with auth headers
- `frontend/src/services/authService.ts` - Authentication API calls
- `frontend/src/services/tripService.ts` - Trip calculation API calls

**Features to implement**:

- Automatic JWT token attachment
- Token refresh on 401 errors
- Request/response interceptors
- Error handling and user feedback

### Phase 6: Address Autocomplete Integration

#### Step 6.1: Free Geocoding Service Research

**Research keywords**: "free geocoding api", "nominatim api", "mapbox geocoding free tier"
**Options to evaluate**:

- Nominatim (OpenStreetMap) - Completely free
- MapBox - Free tier available
- Google Places API - Requires credit card

**Recommended**: Nominatim for truly free solution

#### Step 6.2: Autocomplete Component Implementation

**Research keywords**: "react autocomplete", "debouncing input react", "dropdown component react"

**Files to create**:

- `frontend/src/components/AddressAutocomplete.tsx` - Reusable autocomplete component
- `frontend/src/hooks/useDebounce.tsx` - Debouncing hook for API calls

**Features to implement**:

- Debounced input to prevent excessive API calls
- Dropdown with address suggestions
- Keyboard navigation (arrow keys, enter, escape)
- Loading and error states

#### Step 6.3: Integration with Existing Form

**Files to modify**:

- `frontend/src/components/AddDestination.tsx` - Replace text inputs with autocomplete

### Phase 7: Security Hardening & Best Practices

#### Step 7.1: SQL Injection Prevention

**Research keywords**: "sql injection prevention nodejs", "parameterized queries postgresql", "prepared statements"

**Security measures to implement**:

- Use parameterized queries exclusively (never string concatenation)
- Input validation and sanitization
- Whitelist allowed characters for specific fields
- Database user with minimal required permissions

**Files to audit**:

- All database query functions in `backend/models/`
- Input validation in `backend/middleware/validation.js`

#### Step 7.2: Additional Security Measures

**Research keywords**: "nodejs security best practices", "express security", "owasp top 10"

**Security checklist**:

- HTTPS enforcement (research "express https redirect")
- CORS configuration (research "cors express configuration")
- Rate limiting (research "express-rate-limit")
- Input sanitization (research "express-validator sanitization")
- Security headers (research "helmet.js")
- Environment variable security (research "dotenv security")

#### Step 7.3: Error Handling & Logging

**Research keywords**: "nodejs error handling", "express error middleware", "logging best practices"

**Files to create**:

- `backend/middleware/errorHandler.js` - Centralized error handling
- `backend/utils/logger.js` - Logging utility

**Error handling principles**:

- Never expose internal errors to client
- Log all errors with context
- Graceful degradation for API failures
- User-friendly error messages

---

## File Structure Reference

```
FuelShare/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── tripController.js
│   ├── database/
│   │   ├── schema.sql
│   │   └── connection.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Trip.js
│   │   └── RefreshToken.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── trips.js
│   ├── services/
│   │   ├── geocodingService.js
│   │   ├── routingService.js
│   │   └── fuelCalculationService.js
│   ├── utils/
│   │   ├── passwordUtils.js
│   │   ├── tokenUtils.js
│   │   └── logger.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddDestination.tsx (existing)
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── AddressAutocomplete.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.tsx
│   │   │   └── useDebounce.tsx
│   │   ├── services/
│   │   │   ├── apiClient.ts
│   │   │   ├── authService.ts
│   │   │   └── tripService.ts
│   │   └── utils/
│   │       └── tokenStorage.ts
│   └── (existing files...)
└── README.md
```

---

## Learning Resources & Documentation

### Essential Documentation

1. **Express.js**: https://expressjs.com/en/guide/routing.html
2. **PostgreSQL**: https://www.postgresql.org/docs/current/
3. **JWT**: https://jwt.io/introduction/
4. **React**: https://react.dev/learn
5. **OpenRouteService**: https://openrouteservice.org/dev/#/api-docs

### Security Resources

1. **OWASP Top 10**: https://owasp.org/www-project-top-ten/
2. **Node.js Security**: https://nodejs.org/en/docs/guides/security/
3. **SQL Injection Prevention**: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

### Google Search Keywords by Topic

- **Authentication**: "jwt nodejs tutorial", "bcrypt password hashing", "refresh token implementation"
- **Database**: "postgresql nodejs tutorial", "sql injection prevention", "database connection pooling"
- **API Integration**: "openrouteservice nodejs", "geocoding api tutorial", "http client nodejs"
- **React**: "react authentication tutorial", "react context api", "react form validation"
- **Security**: "nodejs security checklist", "express security middleware", "input validation express"

---

## Development Workflow Recommendations

### Phase-by-Phase Approach

1. **Start with backend foundation** - Get database and basic server running first
2. **Implement authentication** - Critical for API protection
3. **Add API integrations** - Core functionality for distance calculation
4. **Build frontend auth** - Connect frontend to backend auth
5. **Integrate APIs in frontend** - Complete the full-stack flow
6. **Security hardening** - Final security review and testing

### Testing Strategy

- Test each endpoint with Postman or similar tool
- Validate database operations manually
- Test authentication flow completely before moving to frontend
- Test API integrations with mock data first

### Common Junior Developer Pitfalls to Avoid

1. **Hardcoding secrets** - Always use environment variables
2. **Ignoring error handling** - Implement proper error handling from the start
3. **SQL injection vulnerabilities** - Never concatenate user input into SQL queries
4. **Storing passwords in plain text** - Always hash passwords
5. **Not validating inputs** - Validate and sanitize all user inputs
6. **Exposing internal errors** - Return generic error messages to clients
7. **Not using HTTPS** - Always enforce HTTPS in production
8. **Poor token management** - Implement proper token expiration and refresh

### Senior Developer Expectations

- Clean, readable code with consistent formatting
- Proper error handling and logging
- Security-first mindset
- Input validation on all endpoints
- Proper database design with foreign keys and constraints
- RESTful API design principles
- Separation of concerns (controllers, services, models)
- Environment-based configuration
- Basic testing coverage
- Clear commit messages and code comments

---

## Environment Variables Template

Create `backend/.env` file:

```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fuelshare_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# OpenRouteService
ORS_API_KEY=your_openrouteservice_api_key

# Server
PORT=3001
NODE_ENV=development
```

Remember: Add `.env` to `.gitignore` immediately!

---

This README provides the roadmap for building FuelShare from its current state to a fully functional, secure application. Each phase builds upon the previous one, and the research keywords will help you find the specific implementation details you need to learn and implement each feature.
