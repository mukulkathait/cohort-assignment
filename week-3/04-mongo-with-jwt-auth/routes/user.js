const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/config.js")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    User.create({
        username,
        password
    })
        .then(() => {
            res.json({
                message: 'User created successfully'
            })
        })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({
        username,
        password
    })

    if (user) {
        const token = jwt.sign({ username }, JWT_SECRET)
        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg: "Invalid Credentials"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    res.json({
        courses: response,
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.body.username
    const courseId = req.params.courseId

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
        username: req.body.username
    })
    // console.log("User : " + user)
    const response = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    // console.log("User.purchasedCourses " + user.purchasedCourses)
    // console.log("Response : " + response)
    res.json({
        purchasedCourses: response
    })
});

module.exports = router