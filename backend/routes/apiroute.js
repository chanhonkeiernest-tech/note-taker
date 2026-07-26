import express from 'express';
import control from '../controllers/control.js';

const router = express.Router();

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
router.delete('/remove',ensureAuthenticated, control.removenote);
//router.get('*',ensureAuthenticated, control.any);

export default router; 