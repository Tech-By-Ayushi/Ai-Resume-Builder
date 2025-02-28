
# AI Resume Builder — Full Stack (Frontend & Backend)

> **Revamp your CV in one click!**  
> This repository contains both **React (Vite) + Tailwind CSS (Frontend)** and **Strapi (Backend)** for an AI-powered resume builder.  
> Maintained by **[Tech-By-Ayushi](https://github.com/Tech-By-Ayushi)**.

---

## Table of Contents
1. [Features](#features)  
2. [Screenshots](#screenshots)  
3. [Tech Stack](#tech-stack)  
4. [Prerequisites](#prerequisites)  
5. [Installation](#installation)  
6. [Usage](#usage)  
7. [Backend Overview](#backend-overview)  
8. [Contributing](#contributing)  
9. [License](#license)

---

## Features

- **AI-Generated Resume Sections**  
  Uses an AI service (e.g., Gemini) to generate professional summaries, skill suggestions, and job descriptions.

- **Dark/Light Theme Toggle**  
  Switch seamlessly between dark and light modes.

- **Multiple Templates**  
  Choose from various resume layouts.

- **Skill Rating**  
  Integrates [smastrom/react-rating](https://github.com/smastrom/react-rating) for displaying skill levels.

- **Rich Text Editing**  
  Uses [react-simple-wysiwyg](https://www.npmjs.com/package/react-simple-wysiwyg) to create or modify resume sections.

- **Print & Download**  
  Preview your resume in the browser, then print or download as a PDF.

- **Responsive Design**  
  Styled with [Tailwind CSS](https://tailwindcss.com/) to look great on all devices.

---

## Screenshots

| Home Page                         | Resume Builder                    |
|-----------------------------------|-----------------------------------|
|![Screenshot 2025-02-28 151803](https://github.com/user-attachments/assets/b058d5f4-4c89-4e06-afb6-bfa08d6b7383)|![Screenshot 2025-02-28 152402](https://github.com/user-attachments/assets/c9a5c0cf-2980-4afa-9fbc-26c36c0ec3ca) |
|![Screenshot 2025-02-28 151818](https://github.com/user-attachments/assets/f8bb8642-7e79-4d96-9ac7-ef39d3301b1c)|![Screenshot 2025-02-28 163707](https://github.com/user-attachments/assets/2aec11ac-2190-40df-8c0a-02ffc376ff89) |

| Editing Skills                    | Print Preview                     |
|-----------------------------------|-----------------------------------|
| ![Screenshot 2025-02-28 152300](https://github.com/user-attachments/assets/c951651e-0149-492b-9f36-19266fb1cc69) | ![Screenshot 2025-02-28 152449](https://github.com/user-attachments/assets/acc3a484-fc8b-4252-9421-cac1b2aba090) |

> **Note:** Ensure your screenshots are stored in the correct folder and update paths accordingly.

---

## Tech Stack

### **Frontend**
- **React (Vite)**
- **Tailwind CSS**
- **Lucide React** (icons)
- **smastrom/react-rating** (skill rating)
- **react-simple-wysiwyg** (rich text editor)

### **Backend**
- **Strapi v5** (Headless CMS)
- **Node.js** (API & Server-side logic)
- **PostgreSQL** (Database hosted on Render)
- **AI API (Gemini or OpenAI)** (for AI-powered suggestions)
- **Render** (Cloud deployment for backend & database)

---

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (or **yarn**)
- **PostgreSQL (Cloud DB on Render)**
- **Strapi v5 installed** (for backend management)
- **Render Account** (for cloud deployment)

---

## Installation

### **1. Clone the Repository**
```bash
git clone https://github.com/Tech-By-Ayushi/ai-resume-builder.git
cd ai-resume-builder
```

---

### **2. Install Frontend**
```bash
cd frontend
npm install
```

### **Start Frontend Server**
```bash
npm run dev
```
By default, the frontend runs at: **[http://localhost:5173](http://localhost:5173)**.

### **Build for Production**
```bash
npm run build
```
This generates a `dist` folder with optimized production files.

---

### **3. Install Backend**
```bash
cd ../backend
npm install
```

### **Configure Environment Variables**
Create a `.env` file in the `backend` directory and add:
```env
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host.render.com
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_user
DATABASE_PASSWORD=your_database_password
JWT_SECRET=your_secret_key
AI_API_KEY=your_ai_api_key

```
> Replace your-db-host.render.com, your_database_name, your_database_user, and your_database_password with actual values from Render.

### **Start Backend Server**
```bash
npm run develop
```
By default, the backend runs at: **[http://localhost:1337](http://localhost:1337)**.

---

## Usage

1. **Start the Backend**
   ```bash
   cd backend
   npm run develop
   ```
2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
3. **Open Your Browser**  
   Visit **[http://localhost:5173](http://localhost:5173)** to build, edit, or manage your resumes.

---

## Backend Overview

A **Strapi (v5) backend** (running on Node.js) manages:

- **User Authentication** (JWT-based)
- **Content Types** for resumes, templates, user data, etc.
- **API Routes** to create, read, update, and delete resume information.
- **AI Integration** (e.g., Gemini API) for generating text suggestions.
- **Database Support** (PostgreSQL)

> **Note:** Ensure MongoDB/PostgreSQL is running before starting the backend.

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork the repository.**
2. **Create a new branch for your feature or bug fix:**
   ```bash
   git checkout -b my-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add new feature"
   ```
4. **Push to your branch:**
   ```bash
   git push origin my-feature
   ```
5. **Open a Pull Request** in the original repository.

---

## License

This project is licensed under the **MIT License**.  
You’re free to modify, distribute, or use it for personal or commercial projects.

---

### **Thank you for using the AI Resume Builder! 🚀**  
If you have any questions or suggestions, feel free to open an issue or reach out.
```

---

