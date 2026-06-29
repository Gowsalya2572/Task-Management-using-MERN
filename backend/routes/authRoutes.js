import express from 'express';
import { login, register } from '../controllers/authController.js';
import {authenticate as protect} from '../middleware/authMiddleware.js';
import { isAdmin,isProjectManager,isUser } from '../middleware/roleMiddleware.js';
const router=express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile',protect,(req,res)=>{
    res.json({
        message: "User Profile",
    });
});

router.get('/admin',protect,isAdmin,(req,res)=>{
    res.json({
        message: "Admin Dashboard",
    });
});

router.get('/manager',protect,isProjectManager,(req,res)=>{
    res.json({
        message: "Project Manager Dashboard",
    });
});

export default router;
