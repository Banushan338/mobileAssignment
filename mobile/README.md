
# WMT Individual Project - Hostel Management Mobile App

This implementation satisfies the assignment stack and mandatory requirements:
- React Native mobile app (`mobile-app`)
- Node.js + Express backend (`backend`)
- MongoDB database
- JWT authentication + protected routes
- Room entity full CRUD + image upload support

## 1) Problem Statement
Students need a mobile system to view hostel rooms and admins need to manage room data with secure authentication.

## 2) Tech Architecture
- Mobile: Expo React Native
- API: Express REST APIs
- DB: MongoDB Atlas (Mongoose)
- Auth: JWT + bcrypt password hashing
- File upload: Multer (`uploads` folder)

## 3) Setup

### Backend
1. Open terminal in `backend`
2. Install packages:
   - `npm install`
3. Copy `.env.example` to `.env` and update values.
4. Run:
   - `npm run dev`

### Mobile App
1. Open terminal in `mobile-app`
2. Install packages:
   - `npm install`
3. In `App.js`, replace `API_BASE` with your hosted backend URL, for example:
   - `https://your-backend.onrender.com/api`
4. Run:
   - `npm start`

## 4) API Endpoint Table

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/rooms` | Yes | Get all rooms |
| GET | `/api/rooms/:id` | Yes | Get one room |
| POST | `/api/rooms` | Admin | Create room (supports image) |
| PUT | `/api/rooms/:id` | Admin | Update room |
| DELETE | `/api/rooms/:id` | Admin | Delete room |

## 5) MongoDB Schema (Main)

### User
- name, email, password(hashed), role(student/admin)

### Room
- roomNumber, roomType, pricePerMonth, capacity, currentOccupancy, description, image, availabilityStatus

## 6) Viva Talking Points
- Passwords are hashed with `bcryptjs`.
- JWT is generated on login/register and required for protected routes.
- `protect` middleware validates token.
- `adminOnly` middleware blocks non-admin users from CRUD changes.
- Room availability auto-calculates from occupancy/capacity.
- Multer validates image type and max size (2MB).

## 7) Deployment Notes
- Deploy backend on Render/Railway/AWS.
- Add environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
- Use MongoDB Atlas for cloud DB.
- Set `API_BASE` in React Native app to deployed API URL.


