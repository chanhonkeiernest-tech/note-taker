const express = require('express');
const router = express.Router();
const control = require('../controllers/controller');

router.get('/list',control.allnotes);
router.get('/list/:name',control.getnote);
router.post('/list', control.newnote);
router.put('/list', control.updatenote);
router.put('/rename', control.renamenote);