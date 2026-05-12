# MERN Stack Restaurant Reservation System

A full-stack restaurant reservation system built with MongoDB, Express.js, React, and Node.js.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd MERN_STACK_RESTAURANT_RESERVATION-main/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB:
   - **Option A: Local MongoDB**
     - Install MongoDB locally
     - Update `config.env` file with: `MONGO_URI=mongodb://localhost:27017/restaurant_reservations`
   
   - **Option B: MongoDB Atlas (Recommended)**
     - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
     - Create a new cluster
     - Get your connection string
     - Update `config.env` file with your Atlas connection string

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will start on port 4000.

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd MERN_STACK_RESTAURANT_RESERVATION-main/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on port 5173.

## Environment Variables

The backend requires a `config.env` file with the following variables:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Project Structure

```
├── backend/
│   ├── config.env          # Environment variables
│   ├── app.js             # Express app configuration
│   ├── server.js          # Server entry point
│   ├── database/
│   │   └── dbConnection.js # MongoDB connection
│   ├── models/
│   │   └── reservation.js  # Reservation model
│   ├── routes/
│   │   └── reservationRoute.js # API routes
│   └── controller/
│       └── reservation.js  # Business logic
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   └── Pages/         # Page components
    └── public/            # Static assets
```

## API Endpoints

- `POST /api/v1/reservation` - Create a new reservation
- `GET /` - Health check endpoint

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB is running (if using local installation)
   - Check your connection string in `config.env`
   - Verify network access if using MongoDB Atlas

2. **Port Already in Use**
   - Change the PORT in `config.env` if 4000 is occupied
   - Update FRONTEND_URL accordingly

3. **CORS Issues**
   - Ensure FRONTEND_URL in `config.env` matches your frontend URL
   - Check that both servers are running

4. **Module Not Found Errors**
   - Run `npm install` in both backend and frontend directories
   - Ensure you're using Node.js v14 or higher

## Features

- Restaurant reservation system
- Responsive design
- Modern UI with React
- RESTful API with Express.js
- MongoDB database integration
- Form validation
- Error handling

## Technologies Used

- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Styling**: CSS3


**user name**:admin@gmail.com
**pass**:admin123