<div align="center">
  <img height="500" src="https://i.ibb.co.com/jKJNr70/Add-a-heading-1.jpg"  />
</div>

#  🐾 **Paw Hope**  - A Pet Adoption and Donation Platform

## 📝 **Project Overview**  

- **Purpose:** Connect pet lovers with pets needing adoption and facilitate donation campaigns for pet welfare.
- **Target Users:** Individuals looking to adopt pets, pet owners wanting to find homes for their animals, and donors wishing to support pet welfare.
- **Problem Solved:** Streamlines the adoption process and empowers users to contribute to animal welfare through managed donation campaigns.
- **Key Objectives:**  
  1. Offer a secure platform for pet adoption and donation management.  
  2. Enable users to create and manage donation campaigns efficiently.  
  3. Provide admins with robust management controls over users, pets, and campaigns.  
- **Impact:** Bridging the gap between compassionate individuals and animals in need, fostering a culture of giving and responsible adoption.

---

## 🌐 Live URL
[PawHope Live Link](https://paw-hope.netlify.app/)

---

## 🛠️ Core Features

### User Features
1. **Adopt Pets**
   - Create adoption listings.
   - Manage listed pets (edit, delete, or mark as adopted).
   - View adoption requests received for their pets.

2. **Donation Campaigns**
   - Create and manage donation campaigns.
   - Pause, unpause, and edit campaigns.
   - View donations and donor details for each campaign.

3. **User Dashboard**
   - View and manage personal pets and campaigns.
   - Track donations made to other campaigns.
   - Claim refunds for donations if applicable.

### ⚒️ Admin Features
1. **User Management**
   - View all registered users.
   - Grant admin privileges to users.

2. **Pet Management**
   - View, edit, or delete all listed pets.
   - Mark pets as adopted/not adopted.

3. **Donation Campaign Management**
   - View, edit, pause, unpause, or delete all campaigns.

### ⚙️ Common Features
- **Home Page**: Introduction to the platform.
- **Pet Listings**: Display all available pets for adoption with search and category filters.
- **Donation Campaigns**: Showcase all active campaigns with the ability to donate directly.
- **Light/Dark Theme**: Toggle between light and dark mode for better accessibility.

---

## 🚀 **Technologies Used**

| **Frontend**                     | **Backend**                  |
|-----------------------------------|------------------------------|
| React                             | Node.js                      |
| Tailwind CSS                      | Express.js                   |
| Shadcn                            | MongoDB                      |
| Radix UI                          | Stripe                       |
| Firebase Authentication           | JSON Web Token (JWT)         |
| React Query                       | Cookie-Parser                |
| React Router DOM                  | dotenv                       |
| Stripe (Payment Integration)      | CORS                         |

---

## 📦 **Dependencies**  

### **Client-Side Dependencies:**  
```json
{
  "@radix-ui/react-dialog": "^1.1.4",
  "@radix-ui/react-tooltip": "^1.1.6",
  "@stripe/react-stripe-js": "^3.1.1",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "react": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "react-select": "^5.9.0"
}
```
### **Server-Side Dependencies:**
```json
{
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.12.0",
  "stripe": "^17.5.0"
}
```

---

🌱 **Environment Variables**

### 🧑‍💻 **Frontend Environment Variables:**

Make sure to add the following variables in your `.env` file for the frontend:

- `VITE_apiKey`: Your Firebase API key.
- `VITE_authDomain`: The Firebase authentication domain.
- `VITE_projectId`: Your Firebase project ID.
- `VITE_storageBucket`: Firebase storage bucket URL.
- `VITE_messagingSenderId`: The Firebase messaging sender ID.
- `VITE_appId`: Firebase app ID.
- `VITE_IMAGEBB_API_KEY`: API key for image uploading service (ImageBB or similar).
- `VITE_STRIPE_PUBLIC_KEY`: Stripe public key for payment integration.
- `VITE_API_URL`: URL of the backend server.

### 💻 **Backend Environment Variables:**

Add the following variables in your `.env` file for the backend:

- `DB_USER`: Username for the database.
- `DB_PASS`: Password for the database.
- `ACCESS_TOKEN_SECRET`: Secret key for JWT token signing.
- `PAYMENT_SECRET_KEY`: Secret key for payment gateway integration (e.g., Stripe).

---

## 📦 NPM Packages

### Frontend
- **UI Components**: 
  - `@radix-ui/react-*`: Tooltip, Dialog, Popover, etc.
  - `shadcn`: Prebuilt UI components with Tailwind CSS.
  - `lucide-react`: Icon library.
  - `tailwindcss-animate`: Animations for Tailwind CSS.

- **Carousel**: 
  - `embla-carousel-react`
  - `embla-carousel-autoplay`

- **Forms & Validation**: 
  - `react-hook-form`
  - `react-select`
  - `date-fns`

- **Editor**: 
  - `@tiptap/react`
  - `@tiptap/starter-kit`

- **Data Fetching & State Management**: 
  - `react-query`
  - `axios`
  - `react-intersection-observer`

- **Other Utilities**: 
  - `clsx`
  - `tailwind-merge`
  - `html-react-parser`
  - `react-loading-skeleton`
  - `sweetalert2`

### Backend
- **Core Server Framework**: 
  - `express`
- **Database**: 
  - `mongodb`
- **Environment Configuration**: 
  - `dotenv`
- **Security**: 
  - `jsonwebtoken`
  - `cookie-parser`
- **Payment Gateway**: 
  - `stripe`
- **Cross-Origin Requests**: 
  - `cors`
 
---

## How to run this project locally

### ✅ Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **Git** (latest version recommended) - [Download here](https://git-scm.com/)

### Verify Installation
To check if you have the required tools installed, run these commands in your terminal:

```bash
node -v

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
