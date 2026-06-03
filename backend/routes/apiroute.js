const express = require('express');
const router = express.Router();
const control = require('../controllers/control');

function ensureAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) {
    
    return next();
  }
  
  res.status(401).json({ message: "Unauthorized" });
}


router.get('/list', ensureAuthenticated,control.allnotes);
router.get('/list/:name',ensureAuthenticated,control.getnote);
router.post('/list',ensureAuthenticated, control.newnote);
router.put('/list',ensureAuthenticated, control.updatenote);
router.put('/rename',ensureAuthenticated, control.renamenote);
//router.get('*',ensureAuthenticated, control.any);

module.exports = router;