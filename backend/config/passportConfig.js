const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Student = require("../models/Student");

passport.use(
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
                return done(null, student);
            } catch (error) {
                console.error("Error in LocalStrategy:", error);
                return done(error);
            }
        }
    )
);

// Serialize user ID to store in session
passport.serializeUser((student, done) => done(null, student.id));

// Deserialize user from session by ID
passport.deserializeUser(async (id, done) => {
    try {
        const student = await Student.findById(id);
        if (!student) {
            console.log("Deserialization failed: Student not found.");
            return done(null, false);
        }
        done(null, student);
    } catch (error) {
        console.error("Error in deserialization:", error);
        done(error);
    }
});

// Export the configured passport for easy setup in server.js
module.exports = passport;
