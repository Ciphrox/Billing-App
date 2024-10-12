# Shop Management System

A web-based shop management system built with Next.js, Clerk for authentication, Prisma for database management, and NextUI for UI components. This system allows users to manage items, create bills, and process payments.

## Features

- **Authentication**: Secure login and registration using Clerk.
- **Item Management**: Manage shop items with the ability to add, update, and delete items.
- **Bill Creation**: Generate bills by adding items to the bill, with automatic total calculation.
- **Responsive Design**: Built using Tailwind CSS for a mobile-friendly, responsive layout.

## Tech Stack

- **Next.js 13**: For building the application with server-side rendering.
- **Clerk**: For user authentication and management.
- **Prisma**: For managing the database and API queries.
- **NextUI**: For modern UI components.
- **Tailwind CSS**: For styling and responsive layouts.
- **PostgreSQL** (or other relational databases): For storing data.

## Setup Instructions

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/shop-management-system.git
cd shop-management-system
```

### 2. Install dependencies

```bash
npm install
#or 
yarn install
```

### 3. Configure environment variables

Create a .env.local file in the root directory and add the following environment variables:

```js
# Clerk API keys and URLs
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key-here
CLERK_SECRET_KEY=your-clerk-secret-key-here
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/
WEBHOOK_SECRET=your-webhook-secret-here

# API URL
NEXT_PUBLIC_API_URL="https://your-url-here" or "http://localhost:3000"

# Prisma & Database Configuration
DATABASE_URL="your-database-url-here"

# Vercel Postgres Database
POSTGRES_URL="your-postgres-url-here"
POSTGRES_PRISMA_URL="your-postgres-prisma-url-here"
POSTGRES_URL_NO_SSL="your-postgres-no-ssl-url-here"
POSTGRES_URL_NON_POOLING="your-postgres-non-pooling-url-here"
POSTGRES_USER="your-postgres-user-here"
POSTGRES_HOST="your-postgres-host-here"
POSTGRES_PASSWORD="your-postgres-password-here"
POSTGRES_DATABASE="your-postgres-database-here"
```

#### Clerk API keys and URLs

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: The public API key from Clerk for frontend authentication.
- CLERK_SECRET_KEY: The secret API key from Clerk for backend authentication.
- NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: URL to redirect users after signing in.
- NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: URL to redirect users after signing up.
- WEBHOOK_SECRET: Secret used to verify Clerk webhooks.

#### API URL

- NEXT_PUBLIC_API_URL: The base API URL for your application (e.g., "<https://your-url-here>" for production or "<http://localhost:3000>" for development).

#### Prisma & Database Configuration

- DATABASE_URL: The connection string for your database (PostgreSQL, MySQL, etc.).

#### Vercel Postgres Database

- POSTGRES_URL: The connection string for PostgreSQL without connection pooling.
- POSTGRES_PRISMA_URL: The connection string for PostgreSQL with Prisma connection pooling.
- POSTGRES_URL_NO_SSL: The connection string for PostgreSQL without SSL.
- POSTGRES_URL_NON_POOLING: The connection string for PostgreSQL with non-pooling (use cautiously).
- POSTGRES_USER: The username for your PostgreSQL database.
- POSTGRES_HOST: The host for your PostgreSQL database (e.g., db.example.com).
- POSTGRES_PASSWORD: The password for your PostgreSQL database.
- POSTGRES_DATABASE: The name of your PostgreSQL database.

### 4. Set up the database

Make sure you have your database set up. Then, run the following command to apply the Prisma migrations and set up the schema:

```bash
npx prisma migrate dev --name init
```

### 5. Run the development server

```bash
npm run dev
#or
yarn dev
```

The application will be available at <http://localhost:3000>.

## API Endpoints

- POST `/api/item/add-item`: Add a new item to the inventory.
- GET `/api/item/list-items`: Fetch all items in the inventory.
- DELETE `/api/item`: Delete an item from the inventory.
- POST `/api/billing/create-bill`: Create a new bill for selected items.
- POST `/api/webhook/clerk-webhook`: Clerk webhook to handle user events like sign-up or login.

## Contributing

We welcome contributions! If you'd like to contribute, fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
