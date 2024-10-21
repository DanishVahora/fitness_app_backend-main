// UserModel.js

const db = require('../db/db');
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison
const mongoose = require('mongoose');


const { Schema } = mongoose; // Destructuring assignment

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    age: {
        type: Number,
        // required: [true, 'Age is required'],
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        // required: [true, 'Gender is required'],
    },
    height: {
        type: Number,
        // required: [true, 'Height is required'],
    },
    weight: {
        type: Number,
        // required: [true, 'Weight is required'],
    },
    goal: {
        type: String,
        // required: [true, 'Goal is required'],
    },
    activity: {
        type: String,
        // required: [true, 'Activity level is required'],
    },
}, { timestamps: true });  // timestamps: true adds createdAt and updatedAt fields to the schema


UserSchema.pre('save', async function () {// Hash the password before saving the user model
    var user = this;
    if (!user.isModified('password')) { 
        return 
    }
    try {
        const salt = await bcrypt.genSaltSync(10); // Generate a salt
        const hash = await bcrypt.hashSync(user.password, salt); // Hash the password with the salt

        user.password = hash; // Replace the plain text password with the hash
    }
    catch (err) {
        console.log(err);
    }
});


UserSchema.methods.comparePassword = async function (password) {
    try {
      console.log("password", this.password); // Log the stored hash (for debugging)
  
      // Use async bcrypt.compare to compare the entered password with the stored hash
      return await bcrypt.compare(password, this.password); // Proper async comparison
    } catch (err) {
      console.log(err);
      throw err; // Re-throw the error to handle it in the calling function
    }
  };
  

const UserModel = db.model('User', UserSchema);
module.exports = UserModel; // Export the model