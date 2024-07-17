import { models } from "../models/queries.js";
import { check, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const home = (req, res) => {
    res.render('home', {
        title: 'Home',
    });
};

const about = (req, res) => {
    res.render('about', {
        title: 'About',
})
};

const contactForm = (req, res) => {
    res.render('contact', {
        title: 'Contact Form',
});
};

const notFound = (req, res) => {
    res.render('404', {
        title: 'Not Found',
    });
};

const loginForm = (req, res) => {
    res.render('login', {
        title: "Login",
    });
};

const registerForm = (req, res) => {
    res.redere("register", {
        title: "Register Page",
    });
};

const updateForm = async(req, res) => {
    res.render('update', {
        title: "Update Form",
        user: await models.findOneByEmail(req.user.email),
    });
};

const admin = async(req, res) => {
    res.render("admin", {
        title: "Admin Page",
        // users: await models.getUsers(),
    });
};

const register = async (req, res) => {
    const {name, email, eperience, especialty, password, confirm_password } = req.body;

    try {
        await check('name')
            .notEmpty()
            .withMessage('Casilla de nombre obligatoria')
            .run(req);

        await check('email')
            .notEmpty()
            .withMessage('Casilla de email es obligatoria')
            .run(req);

        await check('experience')
            .notEmpty()
            .withMessage('Casilla de experiencia es obligatoria')
            .run(req);

        await check('especialty')
            .notEmpty()
            .withMessage('Casilla de especialidad es obligatoria')
            .run(req);

        await check('password')
            .isLength({ min: 6 })
            .withMessage('Casilla de password debe tener al menos 6 caracteres')
            .run(req);

        await check('confirm_password')
            .equals(password)
            .withMessage('Las contraseñas no coinciden')
            .run(req);  
    } catch (error) {
        res.status(500).send(error.message);
    }

       //Guardar errores

       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.render('register', {
               title: "Register Page",
               errors: errors.array(),
               old: req.body,
           });

       }

       //Crear ruta para la imagen

       const { image }  = req.files;

       const imageName = uuidv4().slice(0, 8);
       const imageUrl = `/uploads/${imageName}.png`;

       image.mv(`./public/uploads/${imageName}.png`);


       //verificar que no existe el usiaroi 
       const user = await models.findOneByEmail(email);
       if(user) {
        return res.render('register', {
            title: "Register Page",
            errors: [{ msg: 'El usuario ya existe' }],
            old: req.body,
        });
       }
//encriptacion de contraseña

const hashedPassword = await bcrypt.hash(password, 10);


//guardar el usuario

const response = await models.register({
    name, email, experience, especialty, password: hashedPassword, image: imageUrl,
})



};    

     

export const controller = {
    home, about, contactForm, notFound, loginForm, registerForm, updateForm, admin, register };