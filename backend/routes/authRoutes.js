const express = require("express");
const router = express.Router();


// register route
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");


router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// protected test route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});


module.exports = router;
