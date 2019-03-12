const express = require('express');
const router = express.Router();
router.get('/las', (req,res) => {
    res.render("summoner/las", {
        helpers: {
            imgURL1: function() {return "hola1xd";},
            imgURL2: function() {return "hola2xd";}
        }
    });
});

module.exports = router;