# VKT Services Corporate Website

This is the official corporate website for VKT Services, a leading provider of professional communication and security solutions. The site is a modern React-based single-page application built with TypeScript and Vite, featuring an AI-powered chatbot.

**Live Demo:** [https://deekshitvegi.github.io/](https://deekshitvegi.github.io/)

## Features

- **Modern & Responsive Design**: A clean, professional UI that works on all devices.
- **Light & Dark Themes**: User-selectable themes for optimal viewing comfort.
- **Comprehensive Product Catalog**: Detailed pages for a wide range of communication products.
- **AI-Powered Chatbot**: An integrated chatbot powered by the Google Gemini API with **Function Calling** to:
    -   Navigate users to product pages.
    -   Provide direct links to downloadable product brochures.
- **Dynamic Content Pages**: Includes detailed pages for "About Us", "Contact Us", "Solutions", "Partners", and "Support".
- **Automated Deployment**: Deploys automatically to GitHub Pages on every push to the `main` branch.

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API

---

## Getting Started

To run this project on your local machine or deploy it, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher is recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/deekshitvegi/deekshitvegi.github.io.git
cd deekshitvegi.github.io
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Place Your Assets (CRITICAL STEP)

For the product images, logo, and brochures to appear on the site, you **must** place them in the `public` folder.

1.  In the root of your project, find or create the `public` folder.
2.  Move your `Two-way-Radios` folder (which contains the `Two way Radios` folder inside it) directly into the `public` folder.
3.  Move your `vkt services logo.png` file directly inside the `public` folder.
4.  Inside the `public` folder, create a new folder named `brochures`.
5.  Place all your PDF brochure files inside this new `public/brochures` folder.

The final structure must look exactly like this:

```
project-root/
├── public/
│   ├── Two-way-Radios/      <-- YOUR FOLDER OF PRODUCT IMAGES
│   │   └── Two way Radios/
│   │       ├── DMR/
│   │       └── ...
│   ├── brochures/           <-- YOUR FOLDER FOR BROCHURES
│   │   ├── HP 788 Brochure.pdf
│   │   └── ...
│   └── vkt services logo.png  <-- YOUR LOGO FILE
│
├── src/
└── ...
```

### 4. Configure API Key for Local Development

The AI Chatbot requires a Google Gemini API key to function.

- In the root directory of the project, create a new file named `.env.local`.
- Add your API key to this file like so:

```
VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
```
_This `.env.local` file is listed in `.gitignore` and will **not** be uploaded to GitHub, keeping your key safe._

### 5. Run the Development Server

```bash
npm run dev
```

This will start the Vite development server, and you can view your website at `http://localhost:5173`.

---

## Deployment to GitHub Pages

This project is configured to deploy automatically using GitHub Actions.

For the deployment and the live chatbot to succeed, you must configure two settings in your GitHub repository:

1.  **Add the API Key as a Secret**:
    - Go to your repository's **Settings** > **Secrets and variables** > **Actions**.
    - Click **New repository secret**.
    - Name the secret `VITE_GEMINI_API_KEY`.
    - Paste your Google Gemini API key into the value field.

2.  **Set Pages Deployment Source**:
    - Go to your repository's **Settings** > **Pages**.
    - Under "Build and deployment", set the **Source** to **GitHub Actions**.

Every time you `git push` to the `main` branch, the action will automatically build your site and deploy it to your GitHub Pages URL.