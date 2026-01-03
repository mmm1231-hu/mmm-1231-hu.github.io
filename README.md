# Respect CFW - Frontend Client

The public-facing website and admin dashboard for the Respect CFW community. Built with React, TypeScript, and Vite, focusing on high performance, SEO, and a premium user experience.

## 🚀 Features

*   **Modern UI**: Built with Tailwind CSS v4, Shadcn UI, and Framer Motion animations.
*   **SEO Optimized**: Dynamic meta tags, JSON-LD structured data, and automated sitemap generation.
*   **Performance**: Code splitting, Gzip/Brotli asset compression, and optimized build pipeline.
*   **Admin Dashboard**: Protected area for managing Streamers, Rules, and Site Settings.
*   **State Management**: Lightweight global state using Zustand.
*   **Responsive**: Fully responsive design for all devices.

## 🛠️ Tech Stack

*   **Framework**: React 19
*   **Build Tool**: Vite
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS, Shadcn UI
*   **Routing**: React Router v6
*   **State**: Zustand
*   **HTTP**: Axios

## 📦 Installation

1.  **Navigate to the client directory**:
    ```bash
    cd client
    ```
2.  **Install dependencies**:
    ```bash
    bun install
    # or
    npm install
    ```

## ⚙️ Configuration

Create a `.env` file in the root of the `client` directory if needed (though Vite handles env vars automatically for the build).

**Example Variables:**
```env
VITE_API_URL=http://localhost:4000/api
```

## 🏃‍♂️ Running the Client

### Development Mode
Starts the development server with HMR.
```bash
bun run dev
# or
npm run dev
```

### Production Build
Builds the application for production. Output is generated in `dist/public`.
```bash
bun run build
# or
npm run build
```
*Note: The build process automatically generates `sitemap.xml` and `robots.txt`.*

### Preview Production Build
Preview the built application locally.
```bash
bun run preview
# or
npm run preview
```

## 📂 Project Structure

```
src/
├── components/     # UI Components & SEO
├── lib/            # Utilities & Helpers
├── pages/          # Route Components
│   ├── Dashboard/  # Admin Pages
│   └── ...         # Public Pages
├── stores/         # Zustand Stores
├── App.tsx         # Main App Component
└── main.tsx        # Entry Point
```

## 🔍 SEO Implementation

The project uses `react-helmet-async` for managing the document head.
*   **`SEO.tsx`**: A reusable component for setting Title, Description, Open Graph tags, and Structured Data.
*   **Sitemap**: Generated via `scripts/generate-sitemap.js` post-build.
