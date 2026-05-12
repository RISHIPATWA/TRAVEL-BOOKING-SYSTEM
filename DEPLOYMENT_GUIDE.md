# Deployment Guide - Travel Package Booking Management System

## 🚀 Quick Deployment Steps

### 1. GitHub Repository Setup
```bash
# Create a new repository on GitHub
# Add remote and push
git remote add origin https://github.com/yourusername/travel-booking-system.git
git branch -M main
git push -u origin main
```

### 2. Render Deployment Setup

#### Backend Deployment (API Server)
1. **Create Render Account**: https://render.com/
2. **Connect GitHub Repository**
3. **Configure Web Service**:
   - **Name**: travel-booking-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `.` (root)

#### Environment Variables (Required)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/travel-booking-system?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_key_here
```

### 3. Frontend Deployment (Optional)
For frontend deployment, you can use:
- **Vercel**: Deploy the `client` folder
- **Netlify**: Deploy the `client/build` folder
- **Render**: Create another web service for frontend

## 🔧 Configuration Points to Change

### ⚠️ IMPORTANT: Update These Before Production

#### 1. MongoDB Connection (.env file)
```env
# CHANGE THIS LINE:
MONGODB_URI=mongodb+srv://traveluser:travelpass123@travel-booking.mongodb.net/travel-booking-system?retryWrites=true&w=majority

# TO YOUR OWN MONGODB ATLAS CONNECTION STRING:
MONGODB_URI=mongodb+srv://yourusername:yourpassword@your-cluster.mongodb.net/travel-booking-system?retryWrites=true&w=majority
```

#### 2. JWT Secret (.env file)
```env
# CHANGE THIS LINE:
JWT_SECRET=travel_booking_jwt_secret_key_2024

# TO YOUR OWN SECURE SECRET:
JWT_SECRET=your_very_secure_random_jwt_secret_key_here
```

#### 3. Frontend API URL (client/src/components/*.js)
```javascript
// CHANGE THESE LINES in all component files:
axios.post('http://localhost:5000/api/auth/login', formData);
axios.get('http://localhost:5000/api/bookings', {
  headers: { Authorization: `Bearer ${token}` }
});

// TO YOUR DEPLOYED API URL:
axios.post('https://your-app-name.onrender.com/api/auth/login', formData);
axios.get('https://your-app-name.onrender.com/api/bookings', {
  headers: { Authorization: `Bearer ${token}` }
});
```

## 📋 API Testing Guide

### Postman/Thunder Client Collection

#### Authentication Endpoints
1. **Register User**
   - Method: POST
   - URL: `https://your-app-name.onrender.com/api/auth/register`
   - Body (JSON):
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com", 
     "password": "123456",
     "mobileNumber": "1234567890"
   }
   ```

2. **Login User**
   - Method: POST
   - URL: `https://your-app-name.onrender.com/api/auth/login`
   - Body (JSON):
   ```json
   {
     "email": "john@example.com",
     "password": "123456"
   }
   ```

#### Booking Endpoints (Require Authorization Header)
3. **Create Booking**
   - Method: POST
   - URL: `https://your-app-name.onrender.com/api/bookings`
   - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
   - Body (JSON):
   ```json
   {
     "destinationName": "Paris",
     "travelDate": "2024-06-15",
     "numberOfTravelers": 2,
     "packageType": "Gold",
     "price": 2999.99,
     "contactAddress": "123 Main St, City"
   }
   ```

4. **Get All Bookings**
   - Method: GET
   - URL: `https://your-app-name.onrender.com/api/bookings`
   - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`

5. **Update Booking**
   - Method: PUT
   - URL: `https://your-app-name.onrender.com/api/bookings/BOOKING_ID`
   - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
   - Body (JSON):
   ```json
   {
     "bookingStatus": "Confirmed"
   }
   ```

6. **Delete Booking**
   - Method: DELETE
   - URL: `https://your-app-name.onrender.com/api/bookings/BOOKING_ID`
   - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`

## 🗄️ MongoDB Setup

### MongoDB Atlas Setup
1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster**: Free tier (M0)
3. **Create Database User**: 
   - Username: `yourusername`
   - Password: `yourpassword`
4. **Whitelist IP**: Add `0.0.0.0/0` (for Render access)
5. **Get Connection String**: Copy from Atlas dashboard

## 📸 Documentation Screenshots Required

### For Complete Documentation:
1. **Code Structure**: Project folder structure
2. **API Testing**: Postman/Thunder client requests and responses
3. **MongoDB**: Atlas dashboard with data
4. **Render**: Deployment success screen
5. **Live Testing**: Browser testing of deployed application

### Key Screenshots:
- ✅ Registration API request/response
- ✅ Login API request/response  
- ✅ Create booking API request/response
- ✅ Get bookings API response
- ✅ MongoDB Atlas data view
- ✅ Render deployment success
- ✅ Live application testing

## 🔍 Troubleshooting

### Common Issues:
1. **MongoDB Connection Error**: Check connection string and IP whitelist
2. **JWT Token Error**: Verify JWT_SECRET is set correctly
3. **CORS Error**: Ensure frontend URL is allowed in production
4. **Build Failed**: Check all dependencies are installed

### Environment Variables Checklist:
- [ ] `MONGODB_URI` is correct and accessible
- [ ] `JWT_SECRET` is set and secure
- [ ] `PORT` is set to 5000
- [ ] `NODE_ENV` is set to production

## 📞 Support

For deployment issues:
1. Check Render logs
2. Verify environment variables
3. Test API endpoints individually
4. Check MongoDB Atlas connection

---

**🎯 Next Steps After Deployment:**
1. Update frontend API URLs to point to deployed backend
2. Test all functionality end-to-end
3. Create comprehensive documentation with screenshots
4. Share deployment links in documentation
