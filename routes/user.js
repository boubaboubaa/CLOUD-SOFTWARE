const express = require('express');
const router = express.Router();
// Corrigez les chemins relatifs ici
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.authenticate, userController.getUser);
router.post('/routine', authMiddleware.authenticate, userController.addRoutine);
router.put('/routine/:routineId', authMiddleware.authenticate, userController.updateRoutine);
router.delete('/routine/:routineId', authMiddleware.authenticate, userController.deleteRoutine);

module.exports = router;
