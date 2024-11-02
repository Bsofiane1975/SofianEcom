import bcrypt from 'bcryptjs';

const data = {
  produits: [
    {
      // _id: '2',
      nom: 'Tshirt sofiane',
      slug: 'Nike-fit-shirt',
      Image: '/images/tshirt1.jpg',
      marque: 'Adidas',
      Quantité: 100,
      catégorie: 'Shirts',
      Description: 'high quality product',
      prix: 250,
      NombreVues: 10,
      cotation: 4.0,
    },
    {
      // _id: '2',
      nom: 'Adidas Fit Darine',
      slug: 'adidas-fit-shirt',
      Image: '/images/tshirt2.jpg',
      marque: 'Adidas',
      Quantité: 80,
      catégorie: 'Shirts',
      Description: 'high quality product',
      prix: 25,
      NombreVues: 10,
      cotation: 2.5,
    },
    {
      // _id: '2',
      nom: 'bermuda Fit Raed',
      slug: 'adidas-fit-Raed',
      Image: '/images/tshirt3.jpg',
      marque: 'Adidas',
      Quantité: 20,
      catégorie: 'Shirts',
      Description: 'high quality product',
      prix: 25,
      NombreVues: 10,
      cotation: 3.0,
    },
    {
      // _id: '2',
      nom: 'cosmos Fit Shirt sofia',
      slug: 'adidas-fit-sofia',
      Image: '/images/tshirt4.jpg',
      marque: 'Adidas',
      Quantité: 30,
      catégorie: 'Shirts',
      Description: 'high quality product',
      prix: 250,
      NombreVues: 10,
      cotation: 1.0,
    },
  ],

  users: [
    {
      nom: 'Sofiane',
      email: 'admin@example.com',
      password: bcrypt.hashSync('kari'),
      isAdmin: true,
    },
    {
      nom: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      nom: 'SOFIA',
      email: 'SOFIA@example.com',
      password: bcrypt.hashSync('kari'),
      isAdmin: true,
    },
  ],
};

export default data;
