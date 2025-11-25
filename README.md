# Job Portal Integration Service (NestJS + OAuth2 + Adapter Pattern + Prisma)

A production-grade backend service that integrates an internal **HRM recruitment system** with external **job portals** such as **LinkedIn** and **Indeed**, enabling job posting and token lifecycle management. Built using **NestJS**, **Prisma**, **OAuth2 Authorization Code Flow**, and a **scalable Adapter Pattern** that allows easy extension to additional job platforms.

---

## 🚀 Key Features

### 🔐 OAuth2 Token Management

- Initiate OAuth authorization flow: `GET /complex/oauth/:provider/initiate`
- Exchange authorization code for access token: `GET /complex/oauth/:provider/callback`
- Refresh access token before expiry (auto via Cron every 30 min)
- Revoke token on-demand
- Store & update access/refresh token in database (Prisma upsert)

### 💼 Job Posting Operations (LinkedIn / Indeed)

| Action     | API                                    | Notes                      |
| ---------- | -------------------------------------- | -------------------------- |
| Create job | `POST /complex/job/create/:provider`   | Uses `adapter.postJob()`   |
| Update job | `PUT /complex/job/update/:provider`    | Uses `adapter.updateJob()` |
| Close job  | `PUT /complex/job/close/:provider`     | Uses `adapter.closeJob()`  |
| Delete job | `DELETE /complex/job/delete/:provider` | Uses `adapter.deleteJob()` |

All operations use the **Adapter Pattern**, enabling provider flexibility.

### 🧩 Adapter Pattern Architecture

```ts
getadapter(provider: ProviderEnum): IJobPlatformAdapter
getAuthenticatedAdapter(provider: ProviderEnum, accesstoken: string): IJobPlatformAdapter
```
