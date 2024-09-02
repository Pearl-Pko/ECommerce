# ECommerce

## Project Overview

This project is a simple eCommerce platform built using Next.js, with a focus on server-side rendering (SSR) and dynamic routing to ensure a seamless user experience. The application allows users to browse products, view product details, and edit product information. The backend is handled via Next.js API routes, enabling dynamic data fetching and updates.

## Setup and Running the Project Locally
Prerequisites
- Node.js (version 14 or above)
- npm package manager

### Installation 
1. Clone the repository
   ```
   git clone  https://github.com/Pearl-Pko/ECommerce.git
   cd ecommerce
2.  Install dependencies
    ```
    npm install
3.  Run the development server:
    ```
    npm run dev
4.  Open the application:
    Navigate to `http://localhost:3000` in your web browser to see the application in action

## Notes on Design Decisions, Optimizations, and Trade-offs
- **Server-side Rendering (SSR)**: I opted for SSR using Next.js's getServerSideProps to ensure that pages are rendered with the necessary data on the server before being sent to the client. This decision was driven by the need for better SEO and faster initial page loads, especially for product pages that benefit from preloaded data.
- **API Routes**: Next.js API routes were used to handle CRUD operations for the products. This allows for a unified server-client environment and simplifies data fetching within the app.
- **Schema Validation**: I used zod for schema validation,  Zod ensures that data is correctly validated both on the server and client, reducing potential runtime errors.
- **Hosting**: I used vercel to host the server as it integrates well with github for CI/CD

The tradeoff I encountered while taking on this project was not deploying an actual database to host the data. This makes the data volatile to server restarts
