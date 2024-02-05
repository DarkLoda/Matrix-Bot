import express from 'express';

const startServer = () => {
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        res.send('Matrix Is Running!');
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

export default startServer;
