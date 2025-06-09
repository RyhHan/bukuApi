//@ts-nocheck
import express from 'express';
import BukuController from '../controller/buku_controller';
import upload from '../middleware/upload';

const router = express.Router();

router.get('/buku', BukuController.index)
router.get('/buku/:id', BukuController.show);
router.post('/buku',upload.single("coverUrl"), BukuController.store);
router.put('/buku/:id',upload.single("coverUrl"), BukuController.update);
router.delete('/buku/:id', BukuController.destroy);

export default router;