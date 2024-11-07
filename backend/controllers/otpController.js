const User = require("../models/userModel");
const nodemailer = require("nodemailer");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`,
        });
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP email');
    }
};

exports.requestOtp = async (req, res) => {
    const { email } = req.body;
    console.log("Received email:", email); // Log received email

    let user = await User.findOne({ email });
    console.log("User found:", user); // Log user object

    if (!user) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    const otp = generateOtp();
    user.otp = otp;
    await user.save();
    
    try {
        await sendEmail(email, otp);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ message: 'Failed to send OTP' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
        return res.status(401).json({ message: "Invalid OTP" });
    }

    user.otpVerified = true;
    await user.save();
    
    res.status(200).json({ message: "OTP verified successfully", sites: user.sites });
};