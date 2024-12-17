# books store Project Setup Guide

This document provides a step-by-step guide on how to run the project using the **pnpm** package manager. Additionally, it includes instructions for setting up the required environment variables.

---

## **Prerequisites**

Before running the project, make sure you have the following installed:

- **Node.js** (v16+ recommended)
- **pnpm** (v7+)
- **MongoDB** connection URL (for database setup)

---

## **Installation**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/chrhi/book-store.git

   ```

2. **Install Dependencies**:
   Use `pnpm` to install the project dependencies.
   ```bash
   pnpm install
   ```

---

## **Environment Variables**

To run the project successfully, you need to configure the required environment variables.

1. Create a `.env` file in the root directory of the project.
2. Add the following variables to the file:

   ```env
   NEXT_PUBLIC_BASE_URL=your_base_url_here
   MONGODB_URL=your_mongodb_connection_string_here
   ```

   - Replace `your_base_url_here` with your application base URL (e.g., `http://localhost:3000`).
   - Replace `your_mongodb_connection_string_here` with your MongoDB connection string.

---

## **Running the Project**

Once the environment variables are set and dependencies are installed, you can start the development server.

### **Start the Development Server**:

```bash
pnpm dev
```

- The project will run on **http://localhost:3000** by default.

---

## **Build and Production**

To create an optimized production build, run:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

---

## **Scripts**

Here are the main scripts you can use:

- **`pnpm dev`**: Runs the development server.
- **`pnpm build`**: Builds the project for production.
- **`pnpm start`**: Starts the production server.
- **`pnpm lint`**: Lints the project for errors.

---

## **Additional Notes**

- Ensure that MongoDB is running or accessible via the provided `MONGODB_URL`.
- If you face any issues with `pnpm`, refer to the official documentation: [https://pnpm.io](https://pnpm.io).
