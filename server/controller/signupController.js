const bcrypt = require('bcrypt');
const User = require('../models/user')
const generateToken = require('../utils/generateVerificationToken')
const sendEmail = require('../service/emailService');
const verifyTemplate = require('../emailTemplates/verifyEmailTemplate')

const hashingPassword = async (pasword) => {
    const saltRounds = 12;
    return await bcrypt.hash(pasword, saltRounds);

}

const ValidateUser = async (email, username) => {
    return await User.findOne({ $or: [{ email }, { username }] })
}


exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    const updatedUser = username.toLowerCase();

    try {
        // validating the user here before hashing the password.
        const userExists = await ValidateUser(email, updatedUser);
        if (userExists) {
            return res.status(409).json({ error: 'Email or username already exists.' });
        }

        const hashedPassword = await hashingPassword(password);
        const verificationToken = generateToken();

        const newUser = new User({
            "email": email,
            "username": updatedUser,
            "password": hashedPassword,
            "verificationToken": verificationToken
        })

        await newUser.save();


        const verificationLink = `https://payrem.onrender.com/verify-email?token=${verificationToken}`

        const htmlcontent = await verifyTemplate.verifyEmailTemplate(updatedUser,verificationLink);
        
        await sendEmail(email, 'Email Verifcation', htmlcontent)

        res.status(201).json({message:'Registration Done Please verify your Email'});

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }

}

