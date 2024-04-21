const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
import { Admin, Course } from "../db";

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: "Admin created successfully"
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const { title, description, price, imageLink } = req.body

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink,
    })

    res.json({
        message: "Course created successfully",
        courseId: newCourse._id,
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({})

    res.json({
        message: response,
    })
});

module.exports = router;