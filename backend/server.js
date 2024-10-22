const express = require("express");
const cors = require("cors");
const session = require("express-session"); // Import express-session
const passport = require("passport"); // Import passport
require('dotenv').config(); 
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/eventRoutes');
const helmet = require('helmet');
const student_Registration_Routes = require("./routes/student_registration_Routes");
const student_Login_Routes = require("./routes/student_login_Routes");


const app = express();
const db = require("./config/dbConfig");

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json()); 
app.use(helmet());

// Initialize express-session
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax',
    secure: false // Set true in production if using HTTPS
  }
}));


// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session()); // Session-based authentication

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/events', eventRoutes);

app.use("/api/students", student_Registration_Routes);
app.use("/api/students/", student_Login_Routes);

// Define the port using environment variables or a default value
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
