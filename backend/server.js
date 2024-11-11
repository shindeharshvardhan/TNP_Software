const express = require("express");
const cors = require("cors");
const session = require("express-session"); // Import express-session
const passport = require("passport"); // Import passport
require('dotenv').config(); 
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/eventRoutes');
const helmet = require('helmet');
const sr = require('./routes/s');
const fr = require('./routes/f');
const cr = require('./routes/c');
const searchCompanies=require('./routes/searchCompanies')
const db = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const student_Registration_Routes = require("./routes/student_registration_Routes");
const student_Login_Routes = require("./routes/student_login_Routes");
const company_description_routes = require("./routes/company_description_route");
const studentPassport = require("./config/passportConfig");
const MongoStore = require('connect-mongo');

const app = express();

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(cookieParser());
app.use(express.json()); 
app.use(helmet());
app.use('/sc', sr);
app.use('/fc', fr);
app.use('/cc', cr);
app.use('/api/companies',searchCompanies)

// Initialize express-session
console.log("Session Secret:", process.env.SESSION_SECRET);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax',
    secure: false // Set true in production if using HTTPS
  }
}));


// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session()); // Session-based authentication
app.use(studentPassport.initialize());
app.use(studentPassport.session());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/events', eventRoutes);
app.use("/api/company-description", company_description_routes);

app.use("/api/students", student_Registration_Routes);
app.use("/api/students/", student_Login_Routes);

// Define the port using environment variables or a default value
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
