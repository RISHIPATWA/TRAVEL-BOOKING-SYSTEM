# 🧪 Complete API Testing Guide

## 📋 Testing Checklist

### 🔧 Prerequisites
- [ ] Backend deployed to Render and showing "Live" status
- [ ] MongoDB Atlas configured and accessible
- [ ] Postman or Thunder Client installed
- [ ] JWT token from successful login

---

## 🎯 Step-by-Step API Testing

### Test 1: Base URL Check
```bash
# Method: GET
# URL: https://travel-booking-api.onrender.com/
# Expected Response: {"message": "Travel Booking System API is running!"}
```

### Test 2: User Registration
```http
POST https://travel-booking-api.onrender.com/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "mobileNumber": "1234567890"
}
```

**Expected Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "mobileNumber": "1234567890"
  }
}
```

**Screenshot Points:**
- [ ] Request headers and body
- [ ] Response status code (201)
- [ ] Response body with token and user data

### Test 3: User Login
```http
POST https://travel-booking-api.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "mobileNumber": "1234567890"
  }
}
```

**Screenshot Points:**
- [ ] Request headers and body
- [ ] Response status code (200)
- [ ] Response body with JWT token
- [ ] Copy the JWT token for next tests

### Test 4: Create Booking
```http
POST https://travel-booking-api.onrender.com/api/bookings
Content-Type: application/json
Authorization: Bearer PASTE_YOUR_JWT_TOKEN_HERE

{
  "destinationName": "Paris",
  "travelDate": "2024-06-15",
  "numberOfTravelers": 2,
  "packageType": "Gold",
  "price": 2999.99,
  "contactAddress": "123 Main St, City"
}
```

**Expected Response (201 Created):**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "destinationName": "Paris",
    "travelDate": "2024-06-15T00:00:00.000Z",
    "numberOfTravelers": 2,
    "packageType": "Gold",
    "price": 2999.99,
    "bookingStatus": "Pending",
    "contactAddress": "123 Main St, City",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Screenshot Points:**
- [ ] Request with Authorization header
- [ ] Response status code (201)
- [ ] Response body with booking ID
- [ ] Copy booking ID for update/delete tests

### Test 5: Get All Bookings
```http
GET https://travel-booking-api.onrender.com/api/bookings
Authorization: Bearer PASTE_YOUR_JWT_TOKEN_HERE
```

**Expected Response (200 OK):**
```json
{
  "message": "Bookings retrieved successfully",
  "bookings": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "destinationName": "Paris",
      "travelDate": "2024-06-15T00:00:00.000Z",
      "numberOfTravelers": 2,
      "packageType": "Gold",
      "price": 2999.99,
      "bookingStatus": "Pending",
      "contactAddress": "123 Main St, City",
      "user": "64f1a2b3c4d5e6f7g8h9i0j1",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Screenshot Points:**
- [ ] Request with Authorization header only
- [ ] Response status code (200)
- [ ] Response body with bookings array

### Test 6: Get Specific Booking
```http
GET https://travel-booking-api.onrender.com/api/bookings/BOOKING_ID_HERE
Authorization: Bearer PASTE_YOUR_JWT_TOKEN_HERE
```

**Expected Response (200 OK):**
```json
{
  "message": "Booking retrieved successfully",
  "booking": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "destinationName": "Paris",
    "travelDate": "2024-06-15T00:00:00.000Z",
    "numberOfTravelers": 2,
    "packageType": "Gold",
    "price": 2999.99,
    "bookingStatus": "Pending",
    "contactAddress": "123 Main St, City",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Screenshot Points:**
- [ ] Request with booking ID in URL
- [ ] Response status code (200)
- [ ] Response body with specific booking

### Test 7: Update Booking
```http
PUT https://travel-booking-api.onrender.com/api/bookings/BOOKING_ID_HERE
Content-Type: application/json
Authorization: Bearer PASTE_YOUR_JWT_TOKEN_HERE

{
  "destinationName": "Paris",
  "travelDate": "2024-06-15",
  "numberOfTravelers": 3,
  "packageType": "Platinum",
  "price": 4999.99,
  "contactAddress": "456 Updated St, City",
  "bookingStatus": "Confirmed"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Booking updated successfully",
  "booking": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "destinationName": "Paris",
    "travelDate": "2024-06-15T00:00:00.000Z",
    "numberOfTravelers": 3,
    "packageType": "Platinum",
    "price": 4999.99,
    "bookingStatus": "Confirmed",
    "contactAddress": "456 Updated St, City",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Screenshot Points:**
- [ ] Request with updated booking data
- [ ] Response status code (200)
- [ ] Response body showing updated fields

### Test 8: Delete Booking
```http
DELETE https://travel-booking-api.onrender.com/api/bookings/BOOKING_ID_HERE
Authorization: Bearer PASTE_YOUR_JWT_TOKEN_HERE
```

**Expected Response (200 OK):**
```json
{
  "message": "Booking deleted successfully",
  "booking": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "destinationName": "Paris",
    "travelDate": "2024-06-15T00:00:00.000Z",
    "numberOfTravelers": 3,
    "packageType": "Platinum",
    "price": 4999.99,
    "bookingStatus": "Confirmed",
    "contactAddress": "456 Updated St, City",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Screenshot Points:**
- [ ] Request with DELETE method
- [ ] Response status code (200)
- [ ] Response body confirming deletion

---

## 🚨 Error Testing (Optional)

### Test 9: Invalid Login
```http
POST https://travel-booking-api.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```

**Expected Response (400 Bad Request):**
```json
{
  "message": "Invalid credentials"
}
```

### Test 10: Unauthorized Access
```http
GET https://travel-booking-api.onrender.com/api/bookings
```

**Expected Response (401 Unauthorized):**
```json
{
  "message": "No token, authorization denied"
}
```

---

## 📸 Screenshot Documentation Template

### For Each Test, Include:
1. **Request Tab**: Show URL, method, headers, and body
2. **Response Tab**: Show status code and response body
3. **Headers Tab**: Show Authorization header (for protected routes)
4. **Postman Collection**: Show entire collection structure

### File Naming Convention:
- `01_register_api.png`
- `02_login_api.png`
- `03_create_booking_api.png`
- `04_get_bookings_api.png`
- `05_get_booking_by_id_api.png`
- `06_update_booking_api.png`
- `07_delete_booking_api.png`
- `08_mongodb_users_collection.png`
- `09_mongodb_bookings_collection.png`
- `10_render_dashboard.png`

---

## 🗄️ MongoDB Atlas Verification

### Check Users Collection:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to your cluster
3. Click **"Collections"** tab
4. Select **"users"** collection
5. Verify user data is stored correctly

### Check Bookings Collection:
1. In the same database
2. Select **"bookings"** collection
3. Verify booking data with user reference

**Screenshot Points:**
- [ ] Database overview showing both collections
- [ ] Users collection with hashed password
- [ ] Bookings collection with user references
- [ ] Data relationships visible

---

## 🎯 Success Criteria

### ✅ All Tests Pass When:
- [ ] Base URL returns success message
- [ ] User registration creates new user
- [ ] User login returns JWT token
- [ ] Booking CRUD operations work with authentication
- [ ] MongoDB stores data correctly
- [ ] Error handling works as expected

### 📊 Test Results Summary:
- **Total Tests**: 8 core tests + 2 error tests
- **Expected Success Rate**: 100%
- **Authentication Required**: 5 tests
- **Database Operations**: 4 tests

---

## 🔧 Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Check JWT token format and validity
2. **400 Bad Request**: Verify request body format and required fields
3. **500 Server Error**: Check Render logs and MongoDB connection
4. **CORS Error**: Ensure frontend URL is allowed in production

### Debug Steps:
1. Check Render deployment logs
2. Verify MongoDB Atlas connection
3. Test with curl commands
4. Check network connectivity

---

**🚀 Complete API Testing Guide Ready!**
