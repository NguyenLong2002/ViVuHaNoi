const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendEmail");
require('dotenv').config(); // Load biến môi trường từ tệp .env

// let refreshTokens = [];
const authController = {
    // REGISTER
    registerUser: async (req, res) => {
        try {
            const existingEmail = await User.findOne({ email: req.body.email });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const existingUsername = await User.findOne({ username: req.body.username });
            if (existingUsername) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashPass,
                photo:req.body.photo,
                emailVerified: false
            });

            await newUser.save();

            const token = jwt.sign(
                { id: newUser._id },
                process.env.EMAIL_VERIFICATION_SECRET,
                { expiresIn: '1d' }
            );

            const verificationLink = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;
            const emailContent = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;

            await sendMail(newUser.email, 'Email Verification', emailContent);

            res.status(200).json({ message: 'Registration successful, please check your email to verify your account' });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Verify Email
    verifyEmail: async (req, res) => {
        try {
            const token = req.query.token;
    
            if (!token) {
                return res.status(400).json({ message: 'Missing token' });
            }
    
            const decodedToken = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
            const userId = decodedToken.id;
    
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            user.emailVerified = true;
            await user.save();
    
            // Chuyển hướng người dùng đến trang chủ sau khi xác thực thành công
            res.redirect(`${process.env.FRONTEND_URL}`);

        } catch (error) {
            console.error('Email verification error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    

    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10d" }
        );
    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ success: false, message: 'Invalid username!' });
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json({ success: false, message: 'Invalid password!' });
            }
            if (!user.emailVerified) {
                return res.status(403).json({ success: false, message: 'Email has not been verified!' });
            }
            const token = authController.generateAccessToken(user);
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                path: "/",
                sameSite: "strict",
            });
            const { password, role, ...others } = user._doc;
            res.status(200).json({ success: true, user: { ...others, token, role } });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // LOG OUT
    logoutUser: async (req, res) => {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json("You're not authenticated");
        }
    
        // Clear the access token cookie
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false, 
            path: "/",
            sameSite: "strict",
        });
    
        res.status(200).json("Logged out successfully!");
    },

    //yêu cầu đặt lại mật khẩu
    requestPasswordReset: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({ message: 'Email not found' });
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const hash = await bcrypt.hash(resetToken, 10);

            user.resetPasswordToken = hash;
            user.resetPasswordExpire = Date.now() + 3600000; // Token valid for 1 hour
            await user.save();

            // Send email
            const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
            const message = 
            `<h1>Bạn đã yêu cầu đặt lại mật khẩu</h1>
            <p>Vui lòng truy cập liên kết này để đặt lại mật khẩu của bạn</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <p>Liên kết này chỉ có hiệu lực trong 1 giờ.</p>`;

            await sendMail(user.email, 'Yêu cầu đặt lại mật khẩu', message);
            res.status(200).json({ message: 'Email sent' });
        } catch (err) {
            console.error('Password reset request error:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Đặt lại mật khẩu
    resetPassword: async (req, res) => {
        try {
            const resetToken = req.params.token;

            const user = await User.findOne({
                resetPasswordExpire: { $gt: Date.now() },
            });

            if (!user) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            const validToken = await bcrypt.compare(resetToken, user.resetPasswordToken);
            if (!validToken) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            user.password = await bcrypt.hash(req.body.password, 10);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.status(200).json({ message: 'Password reset successful' });
            
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = authController;
