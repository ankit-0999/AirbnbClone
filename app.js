require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const listingsRouter = require('./routes/listing.js');
const reviewsrouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const session = require("express-session");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local'); // ✅ Fixed naming
const User = require("./models/user.js");
const app = express();

const sessionOptions = {
    secret: "mysupersicreate",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
};

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// 🛠️ Database Connection
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Error connecting to DB:", err);
    }
}
main();

mongoose.connection.on("error", (err) => {
    console.error("❌ Database connection error:", err);
});

// 🛠️ Middleware
app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionOptions));
app.use(flash());

// 🛠️ Passport Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // ✅ Fixed strategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 🛠️ Flash Messages & Current User
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user; // ✅ Added current user
    res.locals.currUser = req.user;
    next();
});

app.get("/demouser",async (req,res)=>{
    let fakeUser = new User({
        email:"ankit@gmail.com",
        username: "ankit-@123"
    });

   let registerUser = await User.register(fakeUser,"helloworld");
   res.send(registerUser);

})

// 🌍 Routes
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsrouter);
app.use('/',userRouter)

// 🛑 Handle 404 Errors
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// 🛑 Global Error Handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
