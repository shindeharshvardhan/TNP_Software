const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const Student = require("../models/Student");
const Coordinator = require("../models/studentc"); // Assuming the coordinator model exists

// Coordinator login strategy
passport.use(
    'coordinator-login',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                // Check if coordinator exists in DB
                const coordinator = await Coordinator.findOne({ email });
                if (!coordinator) {
                    console.log("Authentication failed: Email not found.");
                    return done(null, false, { message: "Email not found" });
                }

                // Verify password
                const isMatch = await bcrypt.compare(password, coordinator.password);
                if (!isMatch) {
                    console.log("Authentication failed: Incorrect password.");
                    return done(null, false, { message: "Invalid password" });
                }

                // Successfully authenticated
                return done(null, { id: coordinator.id, type: 'coordinator' });
            } catch (error) {
                console.error("Error in coordinator LocalStrategy:", error);
                return done(error);
            }
        }
    )
);

// Student login strategy
passport.use(
    'student-login',
    new LocalStrategy(
        { usernameField: 'prn' },
        async (prn, password, done) => {
            try {
                // Check if student exists in DB
                const student = await Student.findOne({ prn });
                if (!student) {
                    console.log("Authentication failed: PRN not found.");
                    return done(null, false, { message: "Invalid PRN or password" });
                }

                // Verify password
                const isMatch = await bcrypt.compare(password, student.password);
                if (!isMatch) {
                    console.log("Authentication failed: Incorrect password.");
                    return done(null, false, { message: "Invalid PRN or password" });
                }

                // Successfully authenticated
                return done(null, { id: student.id, type: 'student' });
            } catch (error) {
                console.error("Error in student LocalStrategy:", error);
                return done(error);
            }
        }
    )
);

// Serialize user ID and user type (student or coordinator) into session
passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user.type });
});

// Deserialize user from session by ID and type
passport.deserializeUser(async (data, done) => {
    try {
        let user;
        if (data.type === 'student') {
            user = await Student.findById(data.id);
        } else if (data.type === 'coordinator') {
            user = await Coordinator.findById(data.id);
        }

        if (!user) {
            console.log("Deserialization failed: User not found.");
            return done(null, false);
        }

        done(null, user);
    } catch (error) {
        console.error("Error in deserialization:", error);
        done(error);
    }
});

// Export the configured passport for easy setup in server.js
module.exports = passport;
