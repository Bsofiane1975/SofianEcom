import express from 'express';
import donnée from './data.js';

const app = express();

app.get('/api/produits', (req, res) => {
    res.send(donnée.produits);

});
const port=process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`LE SERVEUR ECOUTE SUR LE PORT: ${port}`);
    
})