const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

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
    const response = await Course.find({})
    res.json({
        message: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const username = req.headers.username

    await User.updateOne({
        username
    },
        {
            "$push": {
                purchasedCourses: courseId
            }
        }
    )

    res.json({
        message: 'Course purchased successfully'
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    })
    console.log(user)
    const response = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    console.log(user.purchasedCourses)
    res.json({
        purchasedCourses: response
    })
});

module.exports = router