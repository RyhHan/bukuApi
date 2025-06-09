import express, { Application, Response, Request } from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
import router from './route/route';

const PORT = process.env.PORT || 3000;

const app: Application = express();

// Sertifikat SSL
const options = {
    key: fs.readFileSync('/path/to/cert/privkey.pem'),  // Ganti dengan path ke kunci privat
    cert: fs.readFileSync('/path/to/cert/fullchain.pem')  // Ganti dengan path ke sertifikat
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(router);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Buku API');
});

// Menggunakan HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
