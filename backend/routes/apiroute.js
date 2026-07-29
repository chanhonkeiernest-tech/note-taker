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
 *     summary: Gets all note belonging to the current user of the session. By adding query parameter, one can change the format of the resulting list with sortType being sorting by title or time, order being sorting by ase or ascending or dec decending and title being the search query for the title of the note
 *     tags: [Note]
 *     security:
 *       - Passport: []
 *     parameters:
 *       - in: query
 *         name: sortType
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/note', ensureAuthenticated,control.allnotes);
/**
 * @swagger
 * /note/{name}:
 *   get:
 *     summary: Gets a specific note belonging to the current user of the session
 *     tags: [Note]
 *     security:
 *       - Passport: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/note/:name',ensureAuthenticated,control.getnote);
/**
 * @swagger
 * /note:
 *   post:
 *     summary: Creates new note for the current user of the session
 *     tags: [Note]
 *     security:
 *       - Passport: []
 *     requestBody:
 *       required: true
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
 *     summary: Updates an existing note for the current user of the session
 *     tags: [Note]
 *     security:
 *       - Passport: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updatenote'
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/note',ensureAuthenticated, control.updatenote);
/**
 * @swagger
 * /name:
 *   put:
 *     summary: Renames the note chosen by the current user of the session
 *     tags: [Note]
 *     security:
 *       - Passport: []
 *     requestBody:
 *       required: true
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
 * /note:
 *   delete:
 *     summary: Removes a note chosen by the current user of the session
 *     tags: [Note]
 *     security:
 *       - Passport: []
 *     requestBody:
 *       required: true
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