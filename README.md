# AkuMart — Where Waste Becomes Resource
 
> Nigeria's B2B marketplace connecting waste-generating businesses with resource-seeking SMEs.
 
Built for the **OPay Innovative Challenge 2026** · Starting from Owerri, expanding across Nigeria.

## Overview
 
AkuMart solves a simple but costly problem: one company pays to dispose of waste that another company would happily pay to buy. The platform provides:
 
- A structured **B2B marketplace** for waste materials
- **AI-powered matching** connecting buyers with the right sellers
- **Integrated logistics** support for transportation
- **Escrow payments** protecting both parties in every transaction
- A **For You Page (FYP)** with personalized waste industry content
### User Roles
 
| Role | Description |
|------|-------------|
| **Seller** | SMEs, manufacturers, farms, or individuals who generate waste and want to sell or offload materials |
| **Buyer** | Businesses that need waste materials as inputs for their own production or operations |
| **Admin** | AkuMart internal team managing platform operations, users, listings, and disputes |


 
## Key Features
 
- **AI Seller Recommendations** — surfaces the most relevant listings based on buyer preferences, order history, and location
- **Sales Traction Scores** — transparent seller trust labels (Highly Active, Reliable Seller, New on Platform)
- **AI Chatbot Widget** — floating support assistant available on every page
- **Secure Escrow Payments** — funds held until buyer confirms receipt
- **Real-Time Notifications** — in-app and email alerts for orders, matches, and price changes
- **Integrated Logistics** — optional AkuMart-managed transportation with live tracking
- **Waste Categories** — Paper, Plastic, Metal, E-Waste, Rubber, Fabric, Organic, Chemical, Glass, Wood

## Tech Stack
 
### Frontend
| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| Zustand | Global state management (auth, UI) |
| TanStack Query | Server state, data fetching & caching |
| Axios | HTTP client for API calls |
| React Hook Form + Zod | Form handling and validation |
| Recharts | Dashboard charts and analytics |
| React Dropzone | Photo uploads (up to 5 per listing) |
| React Datepicker | Listing availability date range |
| Socket.io Client | Real-time notifications and order updates |
| React Hot Toast | Toast notification UI |
| Lucide React | Icon library |



### Installation
 
```bash
# 1. Clone the repository
git clone https://github.com/akumart-team/akumart-frontend.git
cd akumart-frontend
 
# 2. Install dependencies
npm install
 
# 3. Set up environment variables
cp .env.example .env
# Fill in your values in .env
 
# 4. Start the development server
npm run dev
```