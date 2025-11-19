# Todo App

A modern, responsive Todo application built with Next.js 16 and React 19.

## Features

- **Authentication**: Secure Login and Registration pages.
- **Dashboard**: Overview of your tasks.
- **Todo Management**:
  - Create, Read, Update, and Delete (CRUD) todos.
  - Drag and drop to reorder tasks.
  - Filter tasks by status, priority, and search.
  - Priority levels (Extreme, Moderate, Low).
- **Responsive Design**: Built with Tailwind CSS 4 for a seamless experience on all devices.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management / Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Main application source code (Next.js App Router).
  - `components/`: Reusable UI components.
  - `hooks/`: Custom React hooks (including React Query hooks).
  - `services/`: API service layer.
  - `Types/`: TypeScript type definitions.
