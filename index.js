import express from 'express';
import routes from './routes/router.js';
import { engine } from 'express-handlebars';
import expressFileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

//carpeta publica
app.use(express.static('public'));

//motor de plantilla

app.engine(
    'hbs',
    engine({
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressFileUpload({
    limmits: { fileSize: 1000000 },
    abortOnLimit: true,
    responseOnLimit: 'File is too large!',
}));


//routes  
app.use('/', routes)

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`));