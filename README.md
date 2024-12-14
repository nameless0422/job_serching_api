# Job Searching API

A Node.js-based RESTful API for managing job postings, user authentication, applications, and bookmarks, with web scraping, validation, and advanced features.

## Features

### Core Features
- **User Authentication**
  - Secure registration, login, and profile management
  - JWT-based token authentication with refresh token support
  - Password encryption using `bcrypt`

- **Job Management**
  - CRUD operations for job postings
  - Advanced features: pagination, filtering, sorting, and aggregation

- **Applications Management**
  - Submit, view, and cancel job applications
  - Status tracking and history retrieval

- **Bookmark Management**
  - Add/remove job bookmarks
  - Retrieve saved bookmarks

### Supporting Features
- **Web Scraping**
  - Scrapes job data from external websites using `axios`, `cheerio`, and ScraperAPI
  - Stores scraped data in MongoDB
  - Supports proxy integration for enhanced scraping capabilities

- **Validation & Security**
  - Comprehensive request validation using Joi
  - Authentication and authorization middleware for secure access
  - Input sanitization and validation for all API endpoints

- **Performance Optimizations**
  - Response caching using Redis
  - Rate limiting for APIs to prevent abuse

- **API Documentation**
  - Fully documented API using Swagger
  - Interactive testing via Swagger UI

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/JOB_SEARCHING_API.git
   cd JOB_SEARCHING_API
   ```

2. **Ubuntu Server Setup & Install dependencies:**
  1. Install Node.js and npm:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     npm install
     ```
  2. Install MongoDB:
     ```bash
     sudo apt install mongodb
     ```
  3. Install Redis:
     ```bash
     sudo apt install redis
     ```
  4. Install Certbot (for SSL):
     ```bash
     sudo apt install certbot python3-certbot-nginx
     ```

3. **Set up environment variables:**
   Create a `.env` file with the following configurations:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/job_searching_api
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   SCRAPER_API_KEY=your_scraper_api_key
   ```

4. **Run the server:**
   ```bash
   node server.js
   ```

## 📋 API Endpoints

### Authentication (`/auth`)
- `POST /auth/register`: Register a new user
- `POST /auth/login`: User login
- `POST /auth/refresh`: Refresh access token
- `GET /auth/profile`: Retrieve user profile (authentication required)
- `PUT /auth/profile`: Update user profile (authentication required)
- `DELETE /auth/profile`: Delete user account (authentication required)

### Job Postings (`/jobs`)
- `GET /jobs`: List jobs with pagination, filtering, and sorting
- `GET /jobs/stats`: Retrieve aggregated job statistics
- `GET /jobs/:id`: Retrieve specific job details
- `POST /jobs`: Create a new job posting (authentication required)
- `PUT /jobs/:id`: Update a job posting (authentication required)
- `DELETE /jobs/:id`: Delete a job posting (authentication required)

### Applications (`/applications`)
- `POST /applications`: Submit a job application (authentication required)
- `GET /applications`: Retrieve application history (authentication required)
- `DELETE /applications/:id`: Cancel a job application (authentication required)

### Bookmarks (`/bookmarks`)
- `POST /bookmarks`: Add or remove job bookmarks (authentication required)
- `GET /bookmarks`: Retrieve saved bookmarks (authentication required)

## 🕌 Project Structure

```
JOB_SEARCHING_API/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── applicationController.js  # Handles job applications
│   │   ├── authController.js         # Handles user authentication
│   │   ├── bookmarkController.js     # Handles bookmarks
│   │   └── jobController.js          # Manages job postings
│   ├── middleware/
│   │   ├── authMiddleware.js         # Authentication and authorization
│   │   ├── cacheMiddleware.js        # Caching with Redis
│   │   ├── errorMiddleware.js        # Global error handling
│   │   ├── rateLimitMiddleware.js    # Rate limiting
│   │   └── validationMiddleware.js   # Request validation with Joi
│   ├── models/
│   │   ├── Application.js            # Job application schema
│   │   ├── Bookmark.js               # Bookmark schema
│   │   ├── Company.js                # Company schema
│   │   ├── Jobs.js                   # Job postings schema
│   │   ├── TokenBlacklist.js         # Blacklisted JWT tokens
│   │   └── User.js                   # User schema
│   ├── routes/
│   │   ├── applicationRoutes.js      # Routes for applications
│   │   ├── authRoutes.js             # Routes for authentication
│   │   ├── bookmarkRoutes.js         # Routes for bookmarks
│   │   └── jobRoutes.js              # Routes for job postings
│   ├── schemas/                      # Joi validation schemas
│   │   ├── applicationSchemas.js
│   │   ├── authSchemas.js
│   │   ├── bookmarkSchemas.js
│   │   └── jobSchemas.js
│   ├── scraper/                      # Web scraping logic
│   │   ├── index.js
│   │   └── scraper.js
├── .env                              # Environment variables
├── .gitignore
├── app.js                            # Express app configuration
├── database.js                       # MongoDB connection
├── server.js                         # Main server entry point
├── swagger.js                        # Swagger API documentation setup
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Technologies

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Redis
- **Authentication:** JWT with refresh token support
- **Validation:** Joi
- **Web Scraping:** Axios, Cheerio, ScraperAPI
- **API Documentation:** Swagger

## 📋 Usage

1. **Access Swagger Documentation:**
   - Visit: [https://cjinyeong.duckdns.org:13030/api-docs/](https://cjinyeong.duckdns.org:13030/api-docs/)
            `https://<your-domain>/api-docs/`
   - Interactive testing and API documentation.

2. **Test Endpoints with Postman:**
   - Import the provided Postman collection.

3. **Monitor Logs:**
   - Logs can be found in the console during development.

- **Project Dependencies:**
  ```bash
  npm install express mongoose joi redis jsonwebtoken bcrypt swagger-jsdoc swagger-ui-express
  ```



