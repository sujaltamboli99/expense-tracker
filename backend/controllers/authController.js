const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },                // payload (data)
    process.env.JWT_SECRET, // secret key
    { expiresIn: "30d" }   // token validity
  );
};


// REGISTER USER
const registerUser = async (req, res) => {
    try {
        // 1. Get data from request body
        const { name, email, password } = req.body;

        // 2. Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 3. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 4. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // 6. Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {
  try {
    // 1. Get email & password
    const { email, password } = req.body;

    // 2. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 3. Find user FIRST
    const user = await User.findOne({ email });

    // 4. THEN check user
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 5. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

// 6. Generate token
const token = generateToken(user._id);

// 7. Send response with token
res.status(200).json({
  message: "Login successful",
  token: token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };

