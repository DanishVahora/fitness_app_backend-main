//userRoutes.js
const router = require('express').Router();
const UserController = require('../controllers/userController');


router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post('/update-gender', UserController.updateGender);

router.post('/update-user', UserController.updateUserDetails);


module.exports = router;