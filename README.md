# Jeevando - Blood Donation Application

A complete, production-ready blood donation application built with React, TypeScript, and modern web technologies.

## 🎯 Features

- **Role-Based Dashboards**: Separate interfaces for Donors, Patients, Hospitals, and Admins
- **Multi-Language Support**: English and Hindi (हिंदी)
- **Dark Mode**: Automatic OS detection with manual toggle
- **Real-Time Matching**: Blood donor matching system
- **Responsive Design**: Mobile-first approach
- **Mock API**: Fully functional without backend

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS (BloodWise UI Theme)
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Yup
- **i18n**: react-i18next
- **Maps**: @react-google-maps/api
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your Google Maps API key to .env
# VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 👥 Demo Credentials

The app uses a mock API, so you can use any password with these emails:

- **Donor**: `donor1@example.com`
- **Patient**: `patient1@example.com`
- **Hospital**: `aiims@example.com`
- **Admin**: `admin@jeevando.com`

## 📱 User Roles

### Donor
- Update availability status
- View donation history
- Respond to match requests
- View location on map

### Patient
- Create blood requests
- Track donation status
- Filter donors by location and blood type
- View matched donors

### Hospital
- Verify donors and patients
- Record completed donations
- Manage request urgency
- View donation records

### Admin
- View system analytics
- Manage users and requests
- View charts and statistics
- Monitor recent activity

## 🎨 Theme

The app uses the **BloodWise UI** theme with:
- Primary color: Red (#E53935)
- Secondary colors: White and Gray
- Dark mode support
- Roboto font family
- Smooth animations and transitions

## 🌍 Internationalization

Supported languages:
- English (en)
- Hindi (hi)

Language preference is stored in localStorage and can be toggled using the language switcher in the header.

## 📁 Project Structure

```
src/
├── api/              # API layer and mock data
├── components/       # Reusable UI components
│   └── ui/          # Base UI components
├── i18n/            # Translation files
├── layouts/         # Layout components
├── pages/           # Page components
│   ├── auth/        # Authentication pages
│   ├── donor/       # Donor dashboard
│   ├── patient/     # Patient dashboard
│   ├── hospital/    # Hospital dashboard
│   └── admin/       # Admin dashboard
├── store/           # Zustand stores
├── styles/          # Global styles
├── types/           # TypeScript types
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## 🔧 Configuration

### Google Maps API
To enable map features, add your Google Maps API key to `.env`:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Firebase (Optional)
For push notifications, add Firebase config to `.env`:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@jeevando.com or open an issue on GitHub.

---

Built with ❤️ for saving lives through blood donation
