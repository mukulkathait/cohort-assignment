const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
import { User, Course } from "../db";

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    await User.create({
        username,
        password,
    })

    res.json({
        message: "User created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router