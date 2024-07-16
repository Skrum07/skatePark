const home = (req, res) => {
    res.send('Hola Mundo cruel');
};

const notFound = (req, res) => {
    res.status(404).send('Not Found');
};

export const controller = {
    home, notFound 
}