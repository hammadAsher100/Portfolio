<h1 align="center">Portfolio Website</h1>
<h1 align="center">Muhammad Hammad Asher</h1>
<p align="center">
  A modern, responsive, single-page developer portfolio built with vanilla HTML, CSS & JavaScript.<br/>
  Designed to showcase projects, skills, education, and certifications for internship applications.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>
Visit Website: https://hammadasher100.github.io/Portfolio/
---

## ✨ Features

| Feature | Description |
|---|---|
| **Dark / Light Theme** | Toggle between dark and light modes with preference saved to `localStorage` |
| **Responsive Design** | Fully responsive layout — mobile, tablet, and desktop |
| **Glassmorphism UI** | Frosted-glass cards with `backdrop-filter` blur effects |
| **Animated Hero** | Floating gradient orbs, code-window mockup, and time-based greeting |
| **Scroll Animations** | Elements fade in on scroll via `IntersectionObserver` |
| **Project Filtering** | Filter projects by category (Web, Desktop, Data Science, Java) |
| **Interactive Timeline** | Education history displayed on an animated gradient timeline |
| **Staggered Skill Badges** | Skill badges animate in sequence when scrolled into view |
| **Contact Form** | Client-side validated contact form with simulated submission |
| **Resume Download** | Placeholder for downloadable PDF resume |
| **Back to Top** | Floating button that appears on scroll for quick navigation |
| **SEO Optimized** | Open Graph meta tags, semantic HTML, and proper heading hierarchy |

---

## 📂 Project Structure

```
portfolio-website/
├── index.html      # Main HTML — all sections (hero, about, education, skills, projects, certificates, contact, footer)
├── style.css       # Complete stylesheet — CSS variables, glass cards, responsive breakpoints, animations
├── script.js       # Interactivity — theme toggle, scroll effects, project filters, form handling, observers
└── README.md       # Project documentation (this file)
```

---

## 🖥️ Sections Overview

### 1. Hero
- Time-aware greeting (Good Morning / Afternoon / Evening)
- Animated Python-style code window showcasing personal info
- Call-to-action buttons: Get In Touch, View Projects, Download Resume
- Social links: Phone, Email, LinkedIn, GitHub

### 2. About Me
- Professional summary and career objective
- Highlight cards: 5+ Projects, 3.63 CGPA, 1+ Certifications, 10+ Technologies
- Info cards: Degree, University, Location, Current Status

### 3. Education
- Vertical timeline with gradient markers
- **Bahria University** — BSE Software Engineering (2024–2028), CGPA 3.63/4.00 with animated progress bar
- **Saylani Mass IT Training (SMIT)** — Diploma in AI & Data Science (July 2025–Present)

### 4. Skills & Technologies
- **Languages & Web**: C++, Python, Java, C#/.NET, JavaScript, MySQL, SQL Server, Git, GitHub
- **Data Science & ML**: scikit-learn, TensorFlow/Keras, Deep Learning (CNNs, RNNs), NumPy, pandas, Matplotlib, Docker, Streamlit
- **Soft Skills**: Problem-Solving, Team Collaboration, Adaptability, Time Management, Leadership, Analytical Thinking

### 5. Featured Projects

| # | Project | Category | Tech Stack |
|---|---------|----------|------------|
| 1 | **Cinema Schedule Website** | Web | HTML, CSS, JavaScript, Fetch API, JSON |
| 2 | **C# Quiz Application** | Desktop | C#, Windows Forms, XML |
| 3 | **Java Food Delivery Simulator** | Java | Java, OOP, Multithreading, MySQL |
| 4 | **ZipIT-Smart** | Desktop | C#, Data Structures |
| 5 | **Weather & Finance ETL Dashboard** | Data Science | Python, Streamlit, scikit-learn, pandas, Plotly |

### 6. Certifications
- **Modern AI – Introduction to Modern AI** by Cisco Networking Academy

### 7. Contact
- Direct contact info (Email, Phone, LinkedIn, GitHub)
- Message form with client-side validation

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Markup** | HTML5, Semantic Elements |
| **Styling** | Vanilla CSS3, CSS Custom Properties, Glassmorphism, CSS Grid & Flexbox |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) (UI), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Code) |
| **Icons** | [Font Awesome 6.5](https://fontawesome.com/) |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No build tools, package managers, or servers required

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/portfolio-website.git
   cd portfolio-website
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html directly, or use a local server:
   # Python
   python -m http.server 8000

   # Node.js (if installed)
   npx serve .
   ```

3. **Visit** `http://localhost:8000` in your browser.

---

## 🎨 Customization Guide

### Personal Information
Edit `index.html` to replace:
- Name, title, and bio in the **Hero** and **About** sections
- Education details in the **Education** section
- Project descriptions in the **Projects** section
- Contact details (email, phone, social links)

### Theme Colors
Modify CSS custom properties in `style.css` under `:root` (dark) and `[data-theme="light"]`:
```css
:root {
  --accent: #3b82f6;          /* Primary accent color */
  --accent-secondary: #8b5cf6; /* Secondary accent */
  --gradient: linear-gradient(135deg, #3b82f6, #8b5cf6);
}
```

### Resume Download
1. Place your resume as `resume.pdf` in the project root
2. Update the download link in `index.html`:
   ```html
   <a href="resume.pdf" class="btn btn-outline" download>
   ```
3. Remove the alert handler in `script.js` (lines 182–185)

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `≤ 1024px` | Tablets — stacks grids, adjusts spacing |
| `≤ 768px` | Mobile — hamburger menu, single-column layouts |
| `≤ 480px` | Small mobile — compact typography and padding |

---

## 🌐 Deployment

This is a static site — deploy anywhere:

| Platform | Command / Steps |
|----------|----------------|
| **GitHub Pages** | Push to `main` branch → Settings → Pages → Deploy from branch |
| **Netlify** | Drag & drop the folder, or connect your Git repo |
| **Vercel** | Import the repo → auto-deploy |
| **Firebase Hosting** | `firebase init` → `firebase deploy` |

---

## 📄 License

This project is open-source and available for personal use and modification.

---

<p align="center">
  Designed & Built by <strong>Muhammad Hammad Asher</strong>
</p>
