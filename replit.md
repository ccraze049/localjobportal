# Overview

This is a Local Job Finder web application built with Node.js and Express that helps connect job seekers with local companies. The application allows companies to register their job openings and provides a searchable interface for users to find employment opportunities in their area. The system includes company management features and user feedback collection to improve the service quality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Backend Architecture
- **Framework**: Express.js server with middleware for body parsing and static file serving
- **Database**: MongoDB with Mongoose ODM for data modeling and schema validation
- **Data Models**: Two main collections - Companies (job listings) and Feedback (user ratings)
- **Routing**: Simple file-based routing serving static HTML pages from the public directory

## Frontend Architecture
- **Technology**: Vanilla HTML, CSS, and JavaScript (no framework)
- **Styling**: Custom CSS with CSS variables for theming and responsive design
- **Layout**: Multi-page application with separate HTML files for different features
- **Navigation**: Fixed header navigation across all pages

## Data Storage Design
- **Company Schema**: Stores district, role, company details, contact info, job openings, and education requirements
- **Feedback Schema**: Tracks user ratings (good/bad) for company deletions and search results
- **Validation**: Phone and WhatsApp number validation (10 digits), required fields enforcement

## Application Features
- **Company Registration**: Form-based company and job posting submission
- **Company Management**: View, search, and delete company listings
- **User Feedback**: Rating system for user experience tracking
- **Responsive Design**: Mobile-friendly interface with consistent styling

# External Dependencies

## Database Services
- **MongoDB Atlas**: Cloud-hosted MongoDB database for data persistence
- **Connection**: Direct mongoose connection with hardcoded credentials (needs environment variable migration)

## Node.js Packages
- **express**: Web server framework for routing and middleware
- **mongoose**: MongoDB object modeling and schema validation
- **body-parser**: HTTP request body parsing middleware
- **pg**: PostgreSQL client (currently unused but available)
- **dotenv**: Environment variable management (installed but not implemented)

## Development Tools
- **@types/node**: TypeScript definitions for Node.js development
- **path**: Built-in Node.js module for file path operations

## Current Issues
- **Database Connectivity**: MongoDB Atlas connection failing due to IP restrictions or network issues
- **Security**: Database credentials hardcoded in source code instead of environment variables
- **Error Handling**: Limited error handling and user feedback for database operations