import express from 'express';
import { controller } from '../controller/controller.js'

const router = express.Router();

router.get('/', controller.home);

router.get('/about', controller.about)

router.get('/contact', controller.contactForm)

router.get('/login', controller.loginForm)

router.get('/register', controller.registerForm)

router.get('/update', controller.updateForm)

router.get('/admin', controller.admin)

router.get('/*', controller.notFound)

router.post('/register', controller.register)

export default router