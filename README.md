# Job Searching API

A Node.js-based RESTful API for managing job postings, user authentication, applications, and bookmarks, with web scraping functionality.

## 💡 Features

- **User Authentication**
  - User registration and login
  - JWT-based token management
  - Secure password encryption

- **Job Management**
  - CRUD operations for job postings
  - Pagination, filtering, and sorting

- **Applications Management**
  - Submit and manage job applications
  - View and cancel applications

- **Bookmark Management**
  - Add/remove job bookmarks
  - Retrieve saved bookmarks

- **Web Scraping**
  - Scrape job data from external websites
  - Store scraped data in MongoDB

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/JOB_SEARCHING_API.git
   cd JOB_SEARCHING_API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following configurations:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/job_searching_api
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   ```

4. Run the server:
   ```bash
   node server.js
   ```

## 📋 API Endpoints

### Authentication
- `POST /auth/register`: Register a new user
- `POST /auth/login`: User login
- `POST /auth/refresh`: Refresh access token
- `PUT /auth/profile`: Update user profile (authentication required)
- `GET /auth/profile`: Retrieve user profile (authentication required)
- `DELETE /auth/profile`: Delete user account (authentication required)

### Job Postings
- `GET /jobs`: List job postings with pagination
- `GET /jobs/:id`: Retrieve specific job details

### Applications
- `POST /applications`: Submit a job application (authentication required)
- `GET /applications`: View application history (authentication required)
- `DELETE /applications/:id`: Cancel a specific job application (authentication required)

### Bookmarks
- `POST /bookmarks`: Add or remove a job bookmark (authentication required)
- `GET /bookmarks`: View saved bookmarks (authentication required)

## 📁 Project Structure
```
JOB_SEARCHING_API/
├── node_modules/             
├── src/                      
│   ├── controllers/          
│   │   ├── applicationController.js  # Handles job applications
│   │   ├── authController.js         # Handles authentication
│   │   ├── bookmarkController.js     # Handles bookmarks
│   │   └── jobController.js          # Manages job postings
│   ├── middleware/           
│   │   ├── authMiddleware.js        # Authentication and authorization
│   │   ├── errorMiddleware.js       # Global error handling
│   │   └── securityMiddleware.js    # Security-related features
│   ├── models/               
│   │   ├── Application.js          # Job application schema
│   │   ├── Bookmark.js             # Bookmark schema
│   │   ├── Jobs.js                 # Job postings schema
│   │   ├── TokenBlacklist.js       # Token blacklist schema
│   │   └── User.js                 # User account schema
│   ├── routes/              
│   │   ├── applicationRoutes.js    # Routes for job applications
│   │   ├── authRoutes.js           # Routes for authentication
│   │   ├── bookmarkRoutes.js       # Routes for bookmarks
│   │   └── jobRoutes.js            # Routes for job postings
│   └── scraper/              # Web scraping logic
│       ├── index.js               
│       └── scraper.js             
├── .env                      # Environment variables
├── .gitignore                
├── app.js                    # Express app configuration
├── database.js               
├── server.js                 # Server entry point
├── swagger.js                
├── package.json              
├── package-lock.json         
└── README.md                 
```

## 🚀 Technologies
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Web Scraping: Axios, Cheerio
- API Documentation: Swagger

## 📋 Usage
1. Access Swagger documentation: `https://cjinyeong.duckdns.org:13030/api-docs/`
2. Use Postman to test endpoints
3. Check console logs for server activity

