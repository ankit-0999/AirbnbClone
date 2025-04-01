# Wanderlust

## Overview
Wanderlust is a web application built using **Node.js, Express, MongoDB, and EJS**. It allows users to create, review, and manage travel listings. The project also integrates authentication and authorization using **Passport.js** and manages sessions with **express-session**.

## Features
- User authentication (Sign up, Login, Logout) using **Passport.js**
- Create, update, and delete travel listings
- Add reviews and ratings for listings
- Flash messages for notifications
- Secure session management
- Error handling and middleware support

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **EJS (Embedded JavaScript Templates)**
- **Passport.js (User authentication)**
- **Express-session & Connect-flash (Session & Flash messages)**
- **Method-override (Support for PUT & DELETE requests)**

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** & **npm**
- **MongoDB** (Running locally or on a cloud service like MongoDB Atlas)

### Clone the Repository
```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SKEY=your_cloudinary_secret_key
MAP_TOKEN=your_map_token
PORT=8080
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
SESSION_SECRET=mysupersicreate
```

### Start the Server
```bash
node app.js
```

The server will start at:
```
http://localhost:8080
```

## API Routes
### Authentication
| Method | Route        | Description             |
|--------|-------------|-------------------------|
| GET    | `/demouser` | Creates a demo user |
| GET    | `/`         | Redirects to listings |
| POST   | `/register` | Registers a new user |
| POST   | `/login`    | Logs in a user |
| GET    | `/logout`   | Logs out a user |

### Listings
| Method | Route              | Description                   |
|--------|-------------------|-------------------------------|
| GET    | `/listings`        | Displays all listings        |
| POST   | `/listings`        | Adds a new listing           |
| GET    | `/listings/:id`    | Shows details of a listing   |
| PUT    | `/listings/:id`    | Updates a listing           |
| DELETE | `/listings/:id`    | Deletes a listing           |

### Reviews
| Method | Route                               | Description |
|--------|------------------------------------|-------------|
| POST   | `/listings/:id/reviews`           | Adds a review |
| DELETE | `/listings/:id/reviews/:reviewId` | Deletes a review |

## Error Handling
This project has a global error handler to handle unexpected errors and 404 pages. If a requested route does not exist, the app will return a "Page Not Found" error.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a Pull Request

## License
This project is open-source and available under the MIT License.

---
**Made with ❤️ by [Your Name]**

