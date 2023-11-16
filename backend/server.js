// import express from 'express';
// import http from 'http';

// import dotenv from 'dotenv';
// import connectDB from './db/connectDB.js';
// import cookieParser from 'cookie-parser';
// import userRoutes from './routes/userRoutes.js';
// import postRoutes from './routes/postRoutes.js';
// import cors from 'cors';



// dotenv.config();
// //connectDB();

// const app = express();

// const port = process.env.PORT || 5000;

// const server = http.createServer(app);
// connectDB(server);

// // Middleware
// app.use(cors())
// app.use(express.json());  // Parse JSON bodies (as sent by API clients) into JS objects (req.body) 
// app.use(express.urlencoded({extended: true}));  // Parse URL-encoded bodies (as sent by HTML forms) into JS objects (req.body)
// app.use(cookieParser()); // Parse cookies (as sent by API clients) into JS objects (req.cookies) 

// // Routes
// app.use('/', (req, res) => {
//     res.send('API is running...');
// });
// app.use('/api/users', userRoutes); // http://localhost:5000/api/users
// app.use('/api/posts', postRoutes); // http://localhost:5000/api/posts


// app.listen(port, () => {
//     console.log(`Server started at http://localhost:${port}`);
//     }
// );

// // Path: backend/data.js
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

async function startServer() {
  try {
    await connectDB(server);

    // CORS setup allowing requests from 'http://localhost:5174'
    const corsOptions = {
      origin: 'http://localhost:5174',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions));

    // Middleware, routes, and server start remain unchanged
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    // app.use('/', (req, res) => {
    //   res.send('API is running...');
    // });
    app.use('/api/users', userRoutes);
    app.use('/api/posts', postRoutes);

    server.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
