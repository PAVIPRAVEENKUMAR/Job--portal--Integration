Job Portal Integration API (LinkedIn & Indeed OAuth Integration)

A scalable backend service designed to integrate external job posting platforms such as LinkedIn and Indeed, supporting OAuth authentication, token lifecycle management, and unified job posting operations. This project demonstrates advanced backend architecture built using NestJS, Adapter Design Pattern, DTO validation, and Mock deployment for professional portfolio presentation.

🚀 Live Deployment

Service URL
Base URL https://job-portal-integration.onrender.com

Swagger UI https://job-portal-integration.onrender.com/api

🧾 Features

🔐 OAuth 2.0 Authorization Code Flow (Mocked)

🔄 Token Refresh & Revocation Flow

🏢 Multi-provider Adapters (LinkedIn / Indeed)

📦 Create / Update / Close / Delete Job Postings

🔥 Adapter Pattern for platform abstraction

🧵 DTO Validation using class-validator

📊 Mock Prisma-style persistence service

🧭 Swagger API Documentation

🛠 Tech Stack

Category Technology
Backend Framework NestJS
Language TypeScript
Design Patterns Adapter, Factory Pattern
API Docs Swagger (OpenAPI)
Mock Storage In-memory mock Prisma service
Deployment Render
HTTP Client Axios / Nest HttpService

📚 API Endpoints Overview

OAuth Endpoints

Method Endpoint Description
GET /complex/oauth/:provider/initiate Start OAuth flow
GET /complex/oauth/:provider/callback Handle provider callback
GET /complex/oauth/:provider/token Retrieve latest access token
GET /complex/oauth/:provider/refreshtoken Refresh access token
POST /complex/oauth/:provider/revoke Revoke token

Job Posting Endpoints

Method Endpoint Description
POST /complex/job/create/:provider Create job posting
PUT /complex/job/update/:provider Update posting
PUT /complex/job/close/:provider Close posting
DELETE /complex/job/delete/:provider Remove posting

📦 Mock Response Example
{
"status": "SUCCESS",
"externalJobId": "mock-job-id-3940"
}

📁 Folder Structure
src
├── Auth
├── common
├── job
├── platforms
│ ├── linkedIn
│ └── indeed
├── prisma (mock service)
└── main.ts

🧑‍💻 Project Setup

git clone https://github.com/PAVIPRAVEENKUMAR/Job--portal--Integration
cd Job--portal--Integration
npm install
npm run start:dev

🧠 Design Decisions

Adapter Factory decouples job platform behavior

Mock prisma allows deployment without DB

Swagger UI provides easy API testing

Clean DTO & validation ensures stable request structure

👤 Author

Praveen Kumar M
Backend Developer — NestJS • Node.js • REST APIs
📍 India
🔗 LinkedIn: https://linkedin.com/in/praveenkumar-m-yoga-dev

📧 Email: praveenselfless@gmail.com
