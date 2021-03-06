const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const morgan = require('morgan');
const User = require('./models/user');

require('dotenv').config();

const MongoStore = require('connect-mongo');
mongoose.connect("mongodb://localhost:27017/testdb1");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

const secret = process.env.SECRET || "some-secret"

const store = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/testdb1',
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("Session Store Error!", e);
});

const sessionConfig = {
    store,
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate(), { usernameField: 'email' }));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const seedRoutes = require('./routes/seedRoutes');

app.use((req, res, next) => {
    res.locals.currentUser = req.user;

    next();
});

app.use('/', ticketRoutes);
app.use('/', userRoutes);
app.use('/', seedRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
})
app.use((req, res) => {
    res.status(404).render('notfound')
});

app.listen(3000, () => {
    console.log("Serving on port 3000...");
});

