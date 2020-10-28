const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = Router();


// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array(),
                    message: 'Смотри чё вводишь...'
                });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользак уже зареган' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: 'Пользак успешно вхерачен' });

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
});

// /api/auth/login
router.post(
    '/login', 
    [
        //check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {

        try {

            const errors = validationResult(req);
    
            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array(),
                    message: 'Смотри чё вводишь...'
                });
            }
    
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            //console.log('user ', user) 

            if (!user) {
                return res.status(400).json({ message: 'Такого нет пользака' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Вводи правильный пароль' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            res.json({
                token,
                userId: user.id
            });

    
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
});


module.exports = router;