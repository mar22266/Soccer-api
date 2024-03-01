# Soccer-api

This Blog API provides a platform for managing blog posts, including creating, reading, updating, and deleting posts. It is built with Node.js and Express, and it supports CORS to allow cross-origin requests.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Validation**: Ensures all required fields are provided before saving posts.
- **Error Handling**: Provides meaningful error messages for various error states.
- **Logging**: Logs API requests, responses, and errors for debugging and monitoring.
- **CORS Support**: Configured to accept cross-origin requests, making it suitable for web applications hosted on different domains.

## Endpoints

- `GET /posts` - Retrieve all posts
- `POST /posts` - Create a new post
- `GET /posts/:postId` - Retrieve a post by ID
- `PUT /posts/:postId` - Update a post by ID
- `DELETE /posts/:postId` - Delete a post by ID

## Getting Started

### Prerequisites

- Node.js
- A MySQL database setup with the required `blog_posts` table.
