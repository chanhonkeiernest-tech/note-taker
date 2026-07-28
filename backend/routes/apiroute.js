import express from 'express';
import control from '../controllers/control.js';

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) {
    
    return next();
  }
  
  res.status(409).json({ message: "Unauthorized" });
}


/**
 * @swagger
 * /note:
 *   get:
 *     summary: get all note belongs to the current user of the session
 *     tags:
 *       - Note
 *     security:
 *       -Passport:[]
 *     parameters:
 *       - in: path
 *         sortype: sort based on    
 *         schema:
 *           type: String
 *         order: sort order
 *         schema:
 *           type: String
 *         name: search query
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/note', ensureAuthenticated,control.allnotes);
/**
 * @swagger
 * /note:
 *   get:
 *     summary: get all note belongs to the current user of the session
 *     tags:
 *       - Note
 *     security:
 *       -Passport:[]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/note/:name',ensureAuthenticated,control.getnote);
/**
 * @swagger
 * /note:
 *   post:
 *     summary: Get user by ID
 *     tags:
 *       - User
 *     security:
 *       -Passport:[]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/newNote'    
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/note',ensureAuthenticated, control.newnote);
/**
 * @swagger
 * /note:
 *   put:
 *     summary: Get user by ID
 *     tags:
 *       - User
 *     security:
 *       -Passport:[]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/note'    
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/note',ensureAuthenticated, control.updatenote);
/**
 * @swagger
 * /name:
 *   post:
 *     summary: Get user by ID
 *     tags:
 *       - User
 *     security:
 *       -Passport:[]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/rename'    
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/name',ensureAuthenticated, control.renamenote);
/**
 * @swagger
 * /name:
 *   post:
 *     summary: Get user by ID
 *     tags:
 *       - User
 *     security:
 *       -Passport:[]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/delete'    
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/note',ensureAuthenticated, control.removenote);
//router.get('*',ensureAuthenticated, control.any);

export default router; 