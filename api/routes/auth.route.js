import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Création de la route /signup qui fera appel à la fonction signup crée dans la page auth.controller.js
router.post('/signup', signup);
// Création de la route /signin qui fera appel à la fonction signin crée dans la page auth.controller.js
router.post('/signin', signin);

export default router;