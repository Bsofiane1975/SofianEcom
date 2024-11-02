import mongoose from 'mongoose';

const produitSchema = new mongoose.Schema(
    {
        nom: { type:String, required:true },
        slug:{ type:String, required:true,unique:true},
        Image: { type:String, required:true},
        marque: { type:String, required:true},
        Quantité: { type:Number, required:true},
        catégorie: { type:String, required:true},
        Description: { type:String, required:true},
        prix: { type:Number, required:true},
        NombreVues: { type:Number, required:true},
        cotation: { type:Number, required:true}
    },
    {
        timestamps: true
    }

);

const Produit = mongoose.model('Produit', produitSchema);
export default Produit