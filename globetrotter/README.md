# 🌍 GlobeTrotter - Travel Planning Application

A comprehensive travel planning platform that allows users to create, manage, and share multi-city travel itineraries.

## Features

- 🔐 User Authentication (Login/Signup)
- 📝 Create and manage trips
- 🏙️ Multi-city itinerary planning
- 💰 Budget tracking and cost breakdown
- 📅 Calendar/timeline visualization
- 🌐 Public trip sharing
- 🔍 City and activity search

## Tech Stack

### Backend
- Node.js + Express
- MySQL Database
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- Vanilla JavaScript
- HTML5 + CSS3
- Modern, responsive design

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Database Setup

1. Make sure MySQL is running on your system
2. Open MySQL command line or any MySQL client
3. Run the schema file to create the database and tables:

```bash
mysql -u root -p < backend/database/schema.sql
```

Or import the file using your MySQL client:
- The schema file is located at: `backend/database/schema.sql`

4. Update database credentials in `backend/config/db.js` if needed:
   - Default: host: localhost, user: root, password: root@, database: globetrotter

### Backend Setup

1. Navigate to the backend directory:
```bash
cd globetrotter/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory (or open the pages directly)
2. Open `frontend/pages/index.html` in a web browser
3. For development, you can use a local server:
   - VS Code Live Server extension
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`

4. Make sure the backend API is running before using the frontend

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Trips
- `POST /api/trips/create` - Create a new trip (protected)

## Project Structure

```
globetrotter/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── tripController.js  # Trip management logic
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   └── User.js            # User model
│   ├── routes/
│   │   ├── authRoutes.js      # Auth routes
│   │   └── tripRoutes.js      # Trip routes
│   ├── database/
│   │   └── schema.sql         # Database schema
│   └── server.js              # Express server
├── frontend/
│   ├── css/
│   │   ├── main.css           # Global styles
│   │   ├── auth.css           # Auth page styles
│   │   └── ...
│   ├── js/
│   │   ├── api.js             # API utilities
│   │   ├── auth.js            # Auth functions
│   │   └── ...
│   └── pages/
│       ├── index.html         # Login page
│       ├── signup.html        # Signup page
│       ├── dashboard.html     # Dashboard
│       └── ...
└── README.md
```

## Usage

1. Start the MySQL database
2. Run the schema.sql file to set up the database
3. Start the backend server: `cd backend && node server.js`
4. Open the frontend in a browser or local server
5. Register a new account or login
6. Start planning your trips!

## Default Database Credentials

Update these in `backend/config/db.js`:
- Host: localhost
- User: root
- Password: root@
- Database: globetrotter

## Notes

- Make sure to change the JWT_SECRET in production
- Update database credentials according to your MySQL setup
- The frontend API URL is set to `http://localhost:5000/api` - update if your backend runs on a different port

## License

ISC

