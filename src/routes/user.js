const express = require('express');

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("App started to develop")
})

module.exports = router;