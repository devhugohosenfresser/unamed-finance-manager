# Finance Manager

A modern web application for personal finance management. Track expenses, manage budgets, and gain insights into your spending habits.

## Features

-   Expense tracking and categorization
-   Budget management
-   Transaction history
-   Financial insights and analytics
-   User authentication
-   Responsive design for all devices

## Technologies

-   Frontend: Nuxt.js 3, Vue 3, TypeScript
-   Styling: CSS
-   Backend: Node.js, Express
-   Database: PostgreSQL

## Prerequisites

-   Node.js 18.0.0 or higher
-   npm, pnpm, yarn, or bun package manager
-   PostgreSQL 12 or higher

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/finance-manager.git
    cd finance-manager
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    # or
    bun install
    ```

3. Set up environment variables:

    - Copy `.env.example` to `.env`
    - Update the environment variables with your configuration

4. Set up the database:
    - Create a new PostgreSQL database
    - Update the database connection string in `.env`
    - Run database migrations

## Development

Start the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To create a production build:

```bash
npm run build
# or
pnpm build
# or
yarn build
# or
bun run build
```

To preview the production build locally:

```bash
npm run preview
# or
pnpm preview
# or
yarn preview
# or
bun run preview
```

## Testing

Run unit tests:

```bash
npm test
# or
pnpm test
# or
yarn test
# or
bun test
```

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
