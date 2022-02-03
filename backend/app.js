if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const passportLocal = require('passport-local');
const passport = require('passport');
const auth = require("./middleware/auth")();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin')
const user = require('./models/user')
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use(auth.initialize());
passport.use(new passportLocal(user.authenticate()));
app.use(passport.initialize());
// app.use(passport.session());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//TODO:need to consider indexing stress and the time it adds.
mongoose.connect(
    `${process.env.MONGO_URL}`
).then(() => {
    console.log("database connected");
});

app.use('/api', authRoutes);
app.use('/admin', adminRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});