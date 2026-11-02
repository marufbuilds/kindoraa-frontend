 # 🌱 Kindora – Together We Grow

**Kindora** is a community event and volunteering platform designed to connect people with meaningful opportunities to make a positive impact. Users can discover community events, explore volunteering opportunities, and organize events that bring people together.

The goal of Kindora is simple: make it easier for people to contribute to their communities and create positive change.

## 🌐 Live Demo

- **Frontend:** https://kindoraa-frontend.vercel.app
- **Backend:** https://kindoraa-backend.vercel.app

## ✨ Features

- **User Authentication:** Register and log in using email and password or Google authentication.
- **Explore Events:** Browse upcoming community events and volunteering opportunities.
- **Search Events:** Search for events by title, location, category, or description.
- **Category Filtering:** Filter events based on different interests and causes.
- **Pagination:** Browse events across multiple pages.
- **Event Details:** View complete information about an event, including its description, date, location, and available volunteer spots.
- **Create Events:** Authenticated users can organize and publish community events.
- **Manage Events:** View, edit, and delete events.
- **Responsive Design:** Access the platform on desktop, tablet, and mobile devices.
- **Dark Mode:** Enjoy a comfortable browsing experience with a dark theme.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth

### Authentication
- Better Auth
- Google OAuth
- JSON Web Token (JWT)

### Deployment
- Vercel

## 📸 Project Overview

Kindora provides a simple experience for discovering and managing community events.

The platform includes:
- An event exploration page.
- Event details pages.
- Authentication pages.
- Event creation and management functionality.
- Responsive user interfaces.

## 🧩 Challenges We Faced During Development

Building Kindora was a valuable learning experience. We encountered several problems during development, especially while connecting the frontend, backend, authentication system, and deployment environment.

### 1. Frontend and Backend Communication

One of our early challenges was connecting the Next.js frontend with the Express backend.

We encountered CORS errors when making API requests from the frontend. Requests that worked locally sometimes failed because the backend did not allow the frontend origin.

**What we learned:**
- How CORS works.
- How to configure allowed origins.
- How to handle credentials in cross-origin requests.
- How frontend and backend communicate through APIs.

### 2. Google OAuth Authentication

Implementing Google authentication was another challenging part of the project.

We encountered errors such as:
- `redirect_uri_mismatch`
- `401 invalid_client`
- Incorrect OAuth client configuration.

These problems taught us the importance of correctly configuring OAuth redirect URLs and environment variables.

### 3. Authentication Cookies and Sessions

After deploying the application, we faced difficulties maintaining authenticated sessions between the frontend and backend.

We investigated cookie settings such as:
- `SameSite`
- `Secure`
- `HttpOnly`
- Cross-origin credentials.

This helped us understand how browsers handle authentication cookies and why authentication can behave differently in local and production environments.

### 4. Deployment and Environment Variables

The application worked locally, but some API requests and authentication features required additional configuration after deployment.

We had to configure environment variables separately for the frontend and backend and make sure both deployed applications communicated with the correct URLs.

### 5. Next.js Routing and Dynamic Pages

We also faced challenges while working with Next.js dynamic routes and server components.

For example, handling event IDs, fetching event information, and managing asynchronous route parameters required us to understand the Next.js App Router more deeply.

### 6. Event Management and Data Handling

Implementing event creation, editing, and deletion required us to connect frontend forms with backend API endpoints.

We learned how to:
- Send POST requests to create events.
- Send PATCH requests to update events.
- Send DELETE requests to remove events.
- Handle API responses and update the interface.

**These challenges were not just bugs to fix. They helped us understand how real-world full-stack applications work.**

## 📚 What We Learned

Throughout this project, we improved our understanding of:

- Building full-stack applications with Next.js and Express.
- Designing and integrating REST APIs.
- Working with MongoDB.
- Implementing authentication with Better Auth.
- Integrating Google OAuth.
- Managing authentication sessions and cookies.
- Handling CORS and API errors.
- Working with dynamic routes and server components.
- Deploying frontend and backend applications.
- Managing environment variables in production.

## 🚀 Future Improvements

Some features we would like to introduce in the future:

- Volunteer registration for individual events.
- User profiles and volunteer history.
- Event approval and moderation.
- Email notifications.
- Event attendance tracking.
- Improved event discovery and filtering.

## 👨‍💻 Developed By

**Al Maruf Hasan**

Kindora was built as a full-stack learning project to explore modern web development and understand how frontend applications, backend APIs, databases, and authentication systems work together.

---

**Kindora – Together We Grow 🌱**

*Small actions can create meaningful changes in our communities.*s