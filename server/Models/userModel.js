import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nom: { type: 'string', required: true,autocomplete: true},
    email: { type: 'string', required: true, unique: true,autocomplete: false },
    password: { type: 'string', required: true},
    isAdmin: { type: 'boolean', default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model('User', userSchema);
export default User;
