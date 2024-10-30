const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser"); // Import cookie-parser
require('dotenv').config(); 
const mongoose = require('mongoose'); // Import mongoose
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/eventRoutes');
const helmet = require('helmet');
const student_Registration_Routes = require("./routes/student_registration_Routes");
const student_Login_Routes = require("./routes/student_login_Routes");
const company_description_routes = require("./routes/company_description_route");
const companyRoutes = require('./routes/searchCompanies');
const sr = require("./routes/s");
const fr = require("./routes/f");
const cr = require("./routes/c");
const studentPassport = require("./config/passportConfig");
const MongoStore = require('connect-mongo');

const app = express();
const db = require("./config/dbConfig");

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(cookieParser()); // Add this line to parse cookies
app.use(express.json()); 
app.use(helmet());
app.use('/sc', sr);
app.use('/fc', fr);
app.use('/cc', cr);

// Initialize express-session
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

// Initialize passport
app.use(passport.initialize());
app.use(passport.session()); 
app.use(studentPassport.initialize());
app.use(studentPassport.session());


// Apply CSRF protection to specific routes
app.use("/api/students", student_Registration_Routes);
app.use("/api/students", student_Login_Routes);

// Other Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/company-description", company_description_routes);
app.use('/api/companies', companyRoutes);

// Define the port using environment variables or a default value
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
