import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        nom: { type: String, required: true },
        slug: { type: String, required: true },
        Image: { type: String, required: true },
        quantité: { type: Number, required: true },
        prix: { type: Number, required: true },
        produit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Produit',
          required: true,
        },
      },
    ],
    AdresseLivraison: {
      NomComplet: { type: String},
      adresse: { type: String, required: true },
      ville: { type: String, required: true },
      codePostale: { type: String, required: true },
      pays: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;