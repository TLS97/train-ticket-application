const User = require('../models/user');

module.exports.renderLoginForm = (req, res) => {
    res.render('login');
};

module.exports.login = async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({ email: username });

    res.redirect(`/${user.id}/tickets`);
    // const { email, password } = req.body;
    // try {
    //     const user = await User.findOne({ email: email });

    //     const id = user.id;
    //     if (user.email === email && user.password === password) {
    //         console.log("Successfully logged in!");
    //         return res.redirect(`/${id}/tickets`);
    //     }
    // } catch {
    //     console.log("Email or Password is incorrect. Try again or register a new user.");
    //     res.redirect("/login")
    // }
};

module.exports.renderRegisterForm = (req, res) => {
    res.render('register');
};

module.exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await new User({ username, email })
        const newUser = await User.register(user, password);
        res.redirect(`/${user.id}/tickets`)
    } catch (e) {
        // Use flash to tell the user that a user with that username already exists
        // req.flash('error', e.message);
        res.redirect('/register');
    }
}