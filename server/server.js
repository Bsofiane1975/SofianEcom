import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import produitRouter from './Routes/produitRoute.js';
import seedRouter from './Routes/seedRoute.js';
import userRouter from './Routes/userRoute.js';
import orderRouter from './Routes/orderroutes.js';

dotenv.config();

mongoose
  .connect(process.env.mongoDb_url)
  .then(() => {
    console.log('CONNECTION BASE DE DONNEE REUSSI');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// app.use(cors())
app.use('/api/seed', seedRouter);
app.use('/api/produits', produitRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//creation de midelware pour la publication de l'application sur heroku
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`LE SERVEUR ECOUTE SUR LE PORT: ${port}`);
});
