# job_serching_api

사람인 크롤링
CRUD 지원

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
