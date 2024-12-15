const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Job Management API',
            version: '1.0.0',
            description: 'API documentation for the job management system',
        },
        servers: [
            {
                url: 'https://cjinyeong.duckdns.org:13030',
                description: 'server',
            },
        ],
        components: {
            schemas: {
                schemas: {
                    Job: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                                description: 'Unique identifier for the job posting',
                                example: '675cc180a59ec8122a6ef03a',
                            },
                            company: {
                                type: 'string',
                                description: 'ID of the associated company',
                                example: '675cc180a59ec8122a6ef038',
                            },
                            title: {
                                type: 'string',
                                description: 'Title of the job posting',
                                example: '(주)디지키 Python 데이터 처리 및 분석 프로그램 개발자 모집',
                            },
                            location: {
                                type: 'string',
                                description: 'Location of the job',
                                example: '경기 안양시 만안구',
                            },
                            experience: {
                                type: 'string',
                                description: 'Required experience level',
                                example: '신입·경력',
                            },
                            education: {
                                type: 'string',
                                description: 'Required education level',
                                example: '학력무관',
                            },
                            employmentType: {
                                type: 'string',
                                description: 'Type of employment',
                                example: '계약직',
                            },
                            salary: {
                                type: 'string',
                                description: 'Salary or compensation information',
                                example: '급성장중',
                            },
                            sector: {
                                type: 'string',
                                description: 'Sector or industry of the job',
                                example: 'Python, 알고리즘, Pandas, 솔루션업체, 소프트웨어개발',
                            },
                            deadline: {
                                type: 'string',
                                description: 'Application deadline',
                                example: '2024-12-31',
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Timestamp when the job posting was created',
                                example: '2024-12-13T23:21:36.205Z',
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Timestamp when the job posting was last updated',
                                example: '2024-12-13T23:21:36.205Z',
                            },
                        },
                        required: ['title', 'company', 'location', 'experience', 'education'],
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
