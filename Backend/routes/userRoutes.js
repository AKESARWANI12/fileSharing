const express=require('express');
const {registerUser,authUser,SearchallUsers, sendOTP, getUserList}=require("../controllers/userControllers");
const router=express.Router();
const { protect } = require('../middleware/authMiddleware'); 

router.route('/').post(registerUser);
router.route('/').get(protect,SearchallUsers); 
router.post('/login',authUser);
router.post('/sendotp',sendOTP)
router.get('/', getUserList);
module.exports=router;