const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();
const { syncUsers } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/sync-user:
 *   post:
 *     summary: Sync users in bulk
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - username
 *                     - email
 *                     - password
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *     responses:
 *       201:
 *         description: Users synced successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 */
router.post('/sync-user', protect, syncUsers);

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

module.exports = router;
