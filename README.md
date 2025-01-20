# Pet Haven - A Pet Adoption and Donation Platform

## Purpose
Pet Haven is a comprehensive platform that connects pet lovers with pets in need of adoption and provides a platform for creating and supporting donation campaigns for pet welfare. The site facilitates a smooth user experience for both pet adopters and donors while providing admin controls to manage users, pets, and campaigns effectively.

## Live URL
[PawHope Live Link](https://paw-hope.netlify.app/)

---

## Key Features

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

### Admin Features
1. **User Management**
   - View all registered users.
   - Grant admin privileges to users.

2. **Pet Management**
   - View, edit, or delete all listed pets.
   - Mark pets as adopted/not adopted.

3. **Donation Campaign Management**
   - View, edit, pause, unpause, or delete all campaigns.

### Common Features
- **Home Page**: Introduction to the platform.
- **Pet Listings**: Display all available pets for adoption with search and category filters.
- **Donation Campaigns**: Showcase all active campaigns with the ability to donate directly.
- **Light/Dark Theme**: Toggle between light and dark mode for better accessibility.

---

## Tech Stack
- **Frontend**: React, Tailwind CSS, Shadcn, Radix UI
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase Authentication
- **Payment Integration**: Stripe
- **State Management**: React Query
- **Routing**: React Router DOM

---

## NPM Packages

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