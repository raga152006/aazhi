# 🌊 Aazhi (ஆழி) - Citizen Services & Government Welfare Portal

> **Aazhi (ஆழி)** is a modern, AI-powered digital platform designed to bridge the gap between citizens and government welfare schemes. With intuitive scheme discovery, an AI voice assistant, digital document vault, real-time application tracking, and an accessible kiosk mode, Aazhi makes public services seamless, inclusive, and accessible for everyone.

---

## ✨ Key Features

- 🎯 **Smart Scheme Discovery & Eligibility Matching**  
  Filter and discover government schemes across categories (Agriculture, Education, Healthcare, Women Empowerment, Senior Citizens, etc.) tailored to user demographics, income, and occupation.

- 🤖 **AI-Powered Voice & Conversational Assistant**  
  Multilingual interactive voice assistant supporting hands-free navigation, eligibility verification, and guidance through complex application processes.

- 🖥️ **Kiosk & Universal Accessibility Mode**  
  High-contrast UI, screen-reader optimizations, adjustable font scaling, and simplified touch-based navigation optimized for public digital service kiosks.

- 📁 **Secure Digital Document Vault**  
  Centralized store for citizen documents (Aadhaar, PAN, Income Certificate, Community Certificate, Ration Card) with instant verification and automated form autofill.

- 📍 **Seva Kendra / Public Service Centre Locator**  
  Interactive search and map locator for nearest Citizen Service Centres with operational hours, live queue status, and appointment booking.

- 📊 **Real-Time Application Tracking**  
  Unified dashboard tracking active scheme applications, milestone timelines, approval stages, and officer notifications.

- 💡 **Personalized Recommendation Engine**  
  Smart feed highlighting newly launched schemes and high-value benefits matching citizen eligibility criteria.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Build System**: Vite 8
- **State & Accessibility**: React Context API (`AuthContext`, `AccessibilityContext`)
- **Linting & Tooling**: Oxlint

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/raga152006/aazhi.git
   cd aazhi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
aazhi/
├── public/              # Static public assets
├── src/
│   ├── assets/          # Project images and icons
│   ├── components/      # UI Components
│   │   ├── common/      # Reusable UI widgets (Voice Assistant, Modals)
│   │   ├── kiosk/       # Kiosk layout & touch components
│   │   ├── layout/      # Navbar, Sidebar, Footer, Mobile Navigation
│   │   └── views/       # Application views (Dashboard, Schemes, Services, Vault, etc.)
│   ├── context/         # Auth and Accessibility React Contexts
│   ├── data/            # Mock dataset for schemes, centres, and services
│   ├── services/        # API service modules
│   ├── types/           # TypeScript interfaces & type definitions
│   ├── App.tsx          # Main App routing & view switcher
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.ts       # Vite build configuration
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
