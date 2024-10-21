//userControlle.js
const UserServices = require('../services/userServices');
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison
const jwt = require('jsonwebtoken'); // Import jwt for token generation
const UserModel = require('../models/UserModel'); // Ensure the path is correct
const mongoose = require('mongoose');


exports.register = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { email, password, age, gender, weight, height, goal, activity } = req.body;

    const duplicateUser = await UserServices.getUserByEmail(email);
    if (duplicateUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Register the user with extended details
    const user = await UserServices.registerUser(email, password, age, gender, weight, height, goal, activity);

    // Send 201 status code for successful user creation along with user ID
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      id: user._id // Include the user ID in the response
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};




exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Retrieve the user by email
    const user = await UserServices.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);  // Ensure async bcrypt.compare is used here
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If successful, send the success response (you can send a token here if needed)
    res.status(200).json({ status: "success", message: "Login successful" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};


exports.updateGender = async (req, res) => {
  const { id, gender } = req.body; // Destructure id and gender from request body

  if (!id || !gender) {
    return res.status(400).json({ message: 'ID and gender are required' });
  }

  try {
    const user = await User.findById(id); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.gender = gender; // Update gender
    await user.save(); // Save updated user

    res.status(200).json({ message: 'Gender updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// userController.js
// userController.js

exports.updateUserDetails = async (req, res) => {
    const { id, email, age, gender, weight, height, goal, activity } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid User ID format' });
    }

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        if (email) user.email = email;
        if (age) user.age = age;
        if (gender) user.gender = gender;
        if (weight) user.weight = weight;
        if (height) user.height = height;
        if (goal) user.goal = goal;
        if (activity) user.activity = activity;

        await user.save(); // Save changes

        res.status(200).json({ message: 'User details updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

