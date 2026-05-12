# Travel Package Booking Management System

A full-stack web application for managing travel package bookings with user authentication and booking CRUD operations.

## Features

- **User Authentication**: Register and login functionality with JWT
- **Booking Management**: Create, read, update, and delete travel bookings
- **Package Types**: Silver, Gold, and Platinum packages
- **Booking Status**: Pending, Confirmed, and Cancelled status tracking
- **Responsive Design**: Mobile-friendly interface

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with responsive design

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all user bookings
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

## Installation

### Backend Setup
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  mobileNumber: String (required)
}
```

### Booking Schema
```javascript
{
  destinationName: String (required),
  travelDate: Date (required),
  numberOfTravelers: Number (required),
  packageType: String (required, enum: ['Silver', 'Gold', 'Platinum']),
  price: Number (required),
  bookingStatus: String (required, enum: ['Pending', 'Confirmed', 'Cancelled']),
  contactAddress: String (required),
  user: ObjectId (ref: 'User', required)
}
```

## Deployment

### GitHub Repository
The application is deployed and available at:
- **Backend**: [GitHub Repository Link]
- **Live Demo**: [Render Deployment Link]

### Render Deployment
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on push to main branch

## Usage

1. **Register** a new account or **login** with existing credentials
2. **Add Booking**: Fill out the booking form with travel details
3. **Manage Bookings**: View, edit, or delete existing bookings
4. **Track Status**: Monitor booking status (Pending, Confirmed, Cancelled)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
