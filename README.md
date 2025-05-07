# Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Contentful CMS.

## Features

- 🌓 Dark/light mode support
- 📱 Fully responsive design with mobile sidebar navigation
- 🔍 Filterable project showcase
- 🖼️ Rich content rendering from Contentful
- 🚀 Smooth animations and transitions using Framer Motion
- 💅 Styled with Tailwind CSS and Shadcn UI components

## Tech Stack

- **Framework**: Next.js (App Router)
- **Frontend**: React, TypeScript
- **Content Management**: Contentful CMS
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion (motion)
- **Icons**: Lucide React, React Simple Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Contentful CMS account

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   ```

4. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contentful Setup

This portfolio uses Contentful CMS to manage project data. You'll need to set up the following content models:

- **Project**: Your portfolio projects

  - Title (Text)
  - Slug (Text)
  - Year (Number)
  - Overview (Text)
  - Description (Rich Text)
  - Image (Media)
  - Platforms (References to Platform)
  - Languages (References to Language)
  - Technologies (References to Technology)
  - Links (Array of Text)
  - Collaborators (References to Collaborator)

- **Platform**: For categorizing projects by platform

  - Name (Text)
  - Link (Text, optional)

- **Language**: Programming languages used

  - Name (Text)
  - Link (Text, optional)

- **Technology**: Frameworks, libraries, tools used

  - Name (Text)
  - Link (Text, optional)

- **Collaborator**: People who worked on your projects
  - Name (Text)
  - Link (Text, optional)

## Project Structure

```
/
├── public/                  # Static assets
├── src/
│   ├── app/                 # App Router pages
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   ├── work/            # Projects listing page
│   │   │   └── [slug]/      # Individual project page
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── ui/              # UI components (Shadcn)
│   │   └── ...              # Custom components
│   ├── lib/                 # Utilities
│   │   ├── contentful.ts    # Contentful client
│   │   ├── contentful-types.ts # TypeScript types for Contentful
│   │   └── utils.ts         # Helper functions
│   └── ...
├── tailwind.config.js       # Tailwind CSS config
└── ...
```

## Deployment

This project can be deployed to Vercel with minimal configuration:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add your environment variables
4. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Contentful](https://www.contentful.com/) for the headless CMS
- [Framer Motion](https://www.framer.com/motion/) for the animations
- [Next.js](https://nextjs.org/) for the React framework
