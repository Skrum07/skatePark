import { models } from "../models/queries.js";
import { check, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import 'dotenv/config'

const home = async(req, res) => {
    res.render('home', {
        title: 'Home',
        users: await models.getUsers(),
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
    res.render('register', {
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
        users: await models.getUsers(),
    });
};

const register = async (req, res) => {
    const {name, email, experience, especialty, password, confirm_password } = req.body;

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
        });

        res.status(201).redirect('/login');
        } catch (error) {
            res.status(500).send(error.message);
        }
}; 
 
    const login = async (req, res) => {
        const { email, password } = req.body;
        try {
        await check("email")
            .notEmpty()
            .withMessage("El email es obligatorio")
            .run(req);
        await check("password")
            .isLength({ min: 6 })
            .withMessage("La contraseña debe ser de al menos 6 caracteres")
            .run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("login", {
            title: "Login Page",
            errors: errors.array(),
            old: req.body,
            });
        }

        const user = await models.findOneByEmail(email);
        if (!user) {
          return res.render("login", {
            title: "Login Page",
            errors: [{ msg: "El usuario no existe" }],
            old: req.body,
          });
        }

        const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.render("login", {
        title: "Login Page",
        errors: [{ msg: "La contraseña es incorrecta" }],
        old: req.body,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1m",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 40000,
      });
      res.status(200).render("update",{
        title: "Update Page",
        user
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

     

export const controller = {
    home, about, contactForm, notFound, loginForm, registerForm, updateForm, admin, register, login };