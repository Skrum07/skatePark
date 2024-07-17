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

router.post('/register', controller.register)

router.post('/login', controller.login);

router.post('/update', controller.update);





router.get('/*', controller.notFound)

export default router