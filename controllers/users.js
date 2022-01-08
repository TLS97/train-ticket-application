const User = require('../models/user');

module.exports.renderLoginForm = (req, res) => {
    res.render('login');
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        const id = user.id;
        if (user.email === email && user.password === password) {
            console.log("Successfully logged in!");
            return res.redirect(`/${id}/tickets`);
        }
    } catch {
        console.log("Email or Password is incorrect. Try again or register a new user.");
        res.redirect("/login")
    }
};

module.exports.renderRegisterForm = (req, res) => {
    res.render('register');
};

module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const registeredUser = await User.findOne({ email: email });
    console.log(registeredUser)

    if (registeredUser) {
        console.log("A user with this email already exists! Use a different email or login instead.")
        return res.redirect('/register')
    }

    const user = await new User({ name: name, email: email, password: password })
    await user.save();

    res.redirect(`/${user.id}/tickets`)
}