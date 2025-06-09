//@ts-nocheck
import express from 'express';
import BukuController from '../controller/buku_controller';

const router = express.Router();

router.get('/buku', BukuController.index)
router.get('/buku/:id', BukuController.show);
router.post('/buku', BukuController.store);
router.put('/buku/:id', BukuController.update);
router.delete('/buku/:id', BukuController.destroy);

export default router;