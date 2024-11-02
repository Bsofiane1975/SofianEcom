import express from 'express';
import Produit from '../Models/ProduitModel.js';

const produitRouter = express.Router();

produitRouter.get('/', async (req, res) => {
  const Produits = await Produit.find();
  res.send(Produits);
});

// app.get('/api/produits', (req, res) => {
//   res.send(donnée.produits);
// });

produitRouter.get('/slug/:slug', async (req, res) => {
  const produit = await Produit.findOne({ slug: req.params.slug });
  if (produit) {
    res.send(produit);
  } else {
    res.status(404).send({ message: 'PRODUIT NEXISSTE PAS' });
  }
});
produitRouter.get('/:id', async (req, res) => {
  const produit = await Produit.findById(req.params.id);
  if (produit) {
    res.send(produit);
  } else {
    res.status(404).send({ message: 'PRODUIT NON TROUVER' });
  }
});

export default produitRouter;
