const express = require('express');
const router = express.Router();
const shareLink=require("../controllers/shareLink") 

router.post('/share',shareLink);

module.exports = router;