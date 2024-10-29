// const express = require('express');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// require('dotenv').config(); 
// const { MongoClient, ObjectId } = require('mongodb');

// const router = express.Router();

// const uri = process.env.MONGO_URL;
// const client = new MongoClient(uri);

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   }, async (email, password, done) => {
//     try {
//       await client.connect();
//       const database = client.db('TNP');
//       const coordinatorCollection = database.collection('coordinator');
  
//       const coordinator = await coordinatorCollection.findOne({ email });
  
//       if (!coordinator) {
//         return done(null, false, { message: 'Email not found' });
//       }
  
//       const isMatch = await bcrypt.compare(password, coordinator.password);
//       if (!isMatch) {
//         return done(null, false, { message: 'Invalid password' });
//       }
  
//       return done(null, coordinator);
//     } catch (error) {
//       return done(error);
//     } finally {
//       await client.close();
//     }
//   }));
  
//   // Serialize and deserialize user (for session)
//   passport.serializeUser((user, done) => {
//     done(null, user._id);
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     try {
//       await client.connect();
//       const database = client.db('TNP');
//       const coordinatorCollection = database.collection('coordinator');
  
//       const user = await coordinatorCollection.findOne({ _id: ObjectId(id) });
//       done(null, user);
//     } catch (error) {
//       done(error);
//     } finally {
//       await client.close();
//     }
//   });

// // Route 1: Check email in pre-existing coordinator collection
// router.post('/check-email', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ msg: 'Please provide an email' });
//     }

//     try {
//         await client.connect();
//         const database = client.db('TNP');
//         const coordinatorCollection = database.collection('coordinator');

//         // Check if the email exists in the collection
//         const coordinator = await coordinatorCollection.findOne({ email });

//         if (!coordinator) {
//             return res.status(400).json({ msg: 'Email not found in the coordinator list' });
//         }

//         // Check if the coordinator has already registered (password is set)
//         if (coordinator.password) {
//             return res.status(400).json({ msg: 'User already registered. Please login.' });
//         }

//         // If the email exists but the password is not set, allow moving to the password step
//         return res.status(200).json({ msg: 'Email is valid. Proceed to set password.', email });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Server error');
//     } finally {
//         await client.close();
//     }
// });


// // Route 2: Set password for the coordinator
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ msg: 'Please provide both email and password' });
//     }

//     try {
//         await client.connect();
//         const database = client.db('TNP');
//         const coordinatorCollection = database.collection('coordinator');

//         // Find the coordinator by email
//         const coordinator = await coordinatorCollection.findOne({ email });

//         // Check if the email exists but has already been registered
//         if (coordinator && coordinator.password) {
//             return res.status(400).json({ msg: 'User already exists. Please login.' });
//         }

//         // If the email exists but no password has been set, allow password creation
//         if (coordinator) {
//             // Hash the password
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);

//             // Update the coordinator's password in the collection
//             await coordinatorCollection.updateOne(
//                 { _id: coordinator._id },
//                 { $set: { password: hashedPassword } }
//             );

//             return res.json({ msg: 'Password set, proceed to login' });
//         }

//         // If the email is not found in the database
//         return res.status(400).json({ msg: 'Email not found. Please contact the admin.' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Server error');
//     } finally {
//         await client.close();
//     }
// });



// // Route 3: Login for coordinator
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         await client.connect();
//         const database = client.db('TNP');
//         const coordinatorCollection = database.collection('coordinator');

//         const coordinator = await coordinatorCollection.findOne({ email });

//         if (!coordinator || !coordinator.password) {
//             return res.status(400).json({ msg: 'Invalid email or password' }); // Correct handling for invalid credentials
//         }

//         const isMatch = await bcrypt.compare(password, coordinator.password);

//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid email or password' }); // Correct handling for invalid credentials
//         }

//         // Only generate a token if the email and password are correct
//         const payload = { userId: coordinator._id };
//         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });


//         return res.json({ msg: 'Login successful' });
//     } catch (error) {
//         res.status(500).send('Server error');
//     } finally {
//         await client.close();
//     }
// });

// router.post('/logout', (req, res) => {
//    // res.clearCookie('token');
//     res.json({ msg: 'Logged out successfully' });
// });




// module.exports = router;


// const express = require('express');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// require('dotenv').config();
// const { MongoClient, ObjectId } = require('mongodb');


// const router = express.Router();



// const uri = process.env.MONGO_URL;
// const client = new MongoClient(uri);

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         await client.connect();
//         const database = client.db('TNP');
//         const coordinatorCollection = database.collection('coordinators');

//         const coordinator = await coordinatorCollection.findOne({ email });

//         if (!coordinator) {
//             return done(null, false, { message: 'Email not found' });
//         }

//         if (!coordinator.password) {
//             return done(null, false, { message: 'coordinators has not set a password yet. Please register first.' });
//         }

//         const isMatch = await bcrypt.compare(password, coordinator.password);
//         if (!isMatch) {
//             return done(null, false, { message: 'Invalid password' });
//         }

//         return done(null, coordinator);
//     } catch (error) {
//         return done(error);
//     } finally {
//         await client.close();
//     }
// }));

// // Serialize and deserialize user (for session management)
// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         await client.connect();
//         const database = client.db('TNP');
//         const coordinatorCollection = database.collection('coordinators');
//         const coordinator = await coordinatorCollection.findOne({ _id: new ObjectId(id) });

//         if (!coordinator) {
//             return done(new Error('coordinators not found'), null);
//         }

//         done(null, coordinator);
//     } catch (error) {
//         done(error, null);
//     } finally {
//         await client.close();
//     }
// });

// // Check authentication status route
// router.get('/auth-status', (req, res) => {
//     if (req.isAuthenticated()) {
//         return res.status(200).json({ isAuthenticated: true, user: req.user });
//     } else {
//         return res.status(200).json({ isAuthenticated: false });
//     }
// });


// // Middleware to protect routes
// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         res.status(401).json({ msg: 'You are not authenticated' });
//     }
// }

// // Protect a specific route
// router.get('/cdashboard', ensureAuthenticated, (req, res) => {
//     res.json({ msg: 'Welcome to the dashboard', user: req.user });
// });


// // Route 1: Check email in pre-existing coordinator collection
// router.post('/check-email', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ msg: 'Please provide an email' });
//     }

//     try {
//         await client.connect();
//         const database = client.db('TNP');
//         const coordinatorCollection = database.collection('coordinators');
//         // console.log(coordinatorCollection)
//         const coordinator = await coordinatorCollection.findOne({ email });
//         console.log(coordinator); 
//         if (!coordinator) {
//             return res.status(400).json({ msg: 'Email not found in the coordinator list' });
//         }

//         if (coordinator.password) {
//             return res.status(400).json({ msg: 'User already registered. Please login.' });
//         }

//         return res.status(200).json({ msg: 'Email is valid. Proceed to set password.', email });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Server error');
//     } finally {
//         await client.close();
//     }
// });

// // Route 2: Set password for the coordinator
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ msg: 'Please provide both email and password' });
//     }

//     try {
//         await client.connect();
//         const database = client.db('TNP');
//         const coordinatorCollection = database.collection('coordinators');

//         const coordinator = await coordinatorCollection.findOne({ email });

//         if (coordinator && coordinator.password) {
//             return res.status(400).json({ msg: 'User already exists. Please login.' });
//         }

//         if (coordinator) {
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);

//             await coordinatorCollection.updateOne(
//                 { _id: coordinator._id },
//                 { $set: { password: hashedPassword } }
//             );

//             return res.json({ msg: 'Password set, proceed to login' });
//         }

//         return res.status(400).json({ msg: 'Email not found. Please contact the admin.' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Server error');
//     } finally {
//         await client.close();
//     }
// });

// // Route 3: Login using passport.js
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.status(400).json({ msg: info.message });
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 return next(err);
//             }
//             return res.json({ msg: 'Login successful' });
//         });
//     })(req, res, next);
// });

// // Route 4: Logout
// router.post('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).json({ msg: 'Error logging out' });
//         }
//         res.json({ msg: 'Logged out successfully' });
//     });
// });

// module.exports = router;
// Initialize MongoDB client and connect once at startup
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();

// Initialize MongoDB client and connect globally
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function connectDB() {
    if (!client.isConnected) {
        await client.connect();
    }
    return client.db('TNP');
}

connectDB().catch(console.error);

// Configure LocalStrategy with passport.js
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const database = await connectDB();
        const coordinatorCollection = database.collection('coordinators');

        const coordinator = await coordinatorCollection.findOne({ email });

        if (!coordinator) {
            return done(null, false, { message: 'Email not found' });
        }

        if (!coordinator.password) {
            return done(null, false, { message: 'Coordinator has not set a password yet. Please register first.' });
        }

        const isMatch = await bcrypt.compare(password, coordinator.password);
        if (!isMatch) {
            return done(null, false, { message: 'Invalid password' });
        }

        return done(null, coordinator);
    } catch (error) {
        return done(error);
    }
}));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const database = await connectDB();
        const coordinatorCollection = database.collection('coordinators');
        const coordinator = await coordinatorCollection.findOne({ _id: new ObjectId(id) });

        if (!coordinator) {
            return done(new Error('Coordinator not found'), null);
        }

        done(null, coordinator);
    } catch (error) {
        done(error, null);
    }
});

// Route 1: Check email in pre-existing coordinator collection
router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Please provide an email' });
    }

    try {
        const database = await connectDB();
        const coordinatorCollection = database.collection('coordinators');
        const coordinator = await coordinatorCollection.findOne({ email });

        if (!coordinator) {
            return res.status(400).json({ msg: 'Email not found in the coordinator list' });
        }

        if (coordinator.password) {
            return res.status(400).json({ msg: 'User already registered. Please login.' });
        }

        return res.status(200).json({ msg: 'Email is valid. Proceed to set password.', email });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

// Route 2: Set password for the coordinator
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both email and password' });
    }

    try {
        const database = await connectDB();
        const coordinatorCollection = database.collection('coordinators');

        const coordinator = await coordinatorCollection.findOne({ email });

        if (coordinator && coordinator.password) {
            return res.status(400).json({ msg: 'User already exists. Please login.' });
        }

        if (coordinator) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await coordinatorCollection.updateOne(
                { _id: coordinator._id },
                { $set: { password: hashedPassword } }
            );

            return res.json({ msg: 'Password set, proceed to login' });
        }

        return res.status(400).json({ msg: 'Email not found. Please contact the admin.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

// Route 3: Login using passport.js
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ msg: info.message , user : user});
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ msg: 'Login successful' ,user : user});
        });
    })(req, res, next);
});

// Route 4: Logout
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ msg: 'Error logging out' });
        }
        res.json({ msg: 'Logged out successfully' });
    });
});

module.exports = router;
