import express from "express";
import data from '../data.js';
import User from "../Models/userModel.js";
import { MongoClient } from "mongodb";
import Produit from "../Models/ProduitModel.js";


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Produit.deleteMany({});
    const createdProducts = await Produit.insertMany(data.produits);
    res.send({ createdProducts });
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdProducts, createdUsers });
});

export default seedRouter;

// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://sofiane:290575@cluster0.sxbce.mongodb.net/EcomDataBase?retryWrites=true&w=majorityconnection string uri";

// const client = new MongoClient(uri);

// async function run() {
//   try {

//     // Get the database and collection on which to run the operation
//     const database = client.db("EcomDataBase");
//     const users = database.collection("users");

//     // Create an array of documents to insert
//     const user = [
//         {
//             name: 'Sofiane',
//             email: 'admin@example.com',
//             password: bcrypt.hashSync('123456'),
//             isAdmin: true,
//           },
//           {
//             name: 'John',
//             email: 'user@example.com',
//             password: bcrypt.hashSync('123456'),
//             isAdmin: false,
//           },
//     ];

//     // Prevent additional documents from being inserted if one fails
//     const options = { ordered: true };

//     // Execute insert operation
//     const result = await users.insertMany(user);
   
//     // Print result
//     console.log(`${result.insertedCount} documents were inserted`);
//   } finally {
//     await client.close();
//   }
// }
//  run().catch(console.dir);

