# React-Crud (Deprecated)

**Note:** This project is deprecated and was built as my first React project a few years ago.

![Project](https://i.imgur.com/7OX4xmb.png)

User registration project made in React.
This project was developed during the React - Cod3r course, but the entire backend was changed, not using the process seen in the course.


## Objectives:
Create a React-based web application that performs the 4 basic operations of user registration (Create, Read, Update, and Delete).

## Execution:
This project was divided into two parts:

~~JSON Server:
A simple server that handles requests made by the front-end application.
This server also manages a .json file that stores all user data~~

### Express Server
After creating the JSON server (seen within the course), I decided to create my own server using Express and MySQL (located in my other repository) and integrate it with this React project. For more information about the backend, visit: https://github.com/joaoaugustogrobe/Express-CRUD-Backend

#### Front-end / React
The part responsible for providing a graphical interface for the user and making requests to the server.

## What I learned:
During this project, I better consolidated the concepts:

- [x] HTML requests through Axios;
- [x] React components;
- [x] Basic notions about Bootstrap;
- [x] Font-awesome library;
- [x] Navigation using React-router;

## Next steps / Going beyond the course
After finishing the course, I plan to change the server back-end, using an SQL database and a NoSQL database, to test the differences in performance between the 3 methods and the ease of creating the environment in each of the ways.
- [x] Back-end
- [x] SQL Database (MySQL)
- [ ] NoSQL Database
- [x] Invalidate empty input
- [ ] Email field validation (required syntax <>@<>.<> or similar)

## Running the service:
* To run this project, you need to download the backend server (link already posted above).

Enter the frontend directory and run the React application - http://localhost:3000 * Enter this link to view the application
```
cd frontend && npm start
```

~~Enter the backend directory and run the JSON server - http://localhost:3001
cd backend && npm start~~
