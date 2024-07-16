import { models } from "../models/queries.js";

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

}

export const controller = {
    home, about, contactForm, notFound, loginForm, registerForm, updateForm, admin, register };