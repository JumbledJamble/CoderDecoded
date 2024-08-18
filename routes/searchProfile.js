const express = require('express');
const router = express.Router();

router.get("/profile/:id", (req, res) => {
    // find id
    // send in user profile
    res.render('/searchProfile', {})
})


module.exports = router;