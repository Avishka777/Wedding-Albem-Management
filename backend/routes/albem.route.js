import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletealbem, getalbems, updatealbem } from '../controllers/albem.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getalbems', getalbems)
router.delete('/deletealbem/:albemId/:userId', verifyToken, deletealbem)
router.put('/updatealbem/:albemId/:userId', verifyToken, updatealbem)

export default router;