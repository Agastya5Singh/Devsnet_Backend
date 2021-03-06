const User = require('../models/mongo');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const alreadyExist = await User.findOne({ where: { email } });
        if (alreadyExist) {
            res.status(401).send("email already exist");
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({ email: email.toLowerCase(), password: hash, fullName: "abc" });
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("something went wrong");
    }
}

module.exports = register;