const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/config.js")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    Admin.create({
        username,
        password
    })
        .then(() => {
            res.json({
                message: 'Admin created successfully'
            })
        })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic

    const user = await Admin.findOne({
        username: req.body.username,
        password: req.body.password
    })
    // console.log(user)
    if (user) {
        const token = jwt.sign({ username: req.body.username }, JWT_SECRET)
        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg: "Invalid Credentials"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, imageLink, price } = req.body;
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully',
        courseId: newCourse._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
    res.json({
        courses: response,
    })
});

module.exports = router;