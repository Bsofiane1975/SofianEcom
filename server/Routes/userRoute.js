import express from 'express';
import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-Async-Handler';

const userRouter = express.Router();

userRouter.post(
  '/connect',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          nom: user.nom,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'mot de passe ou email invalid' });
  })
);

userRouter.post(
  '/Sinscrire',
  expressAsyncHandler(async (req,res) => {
      const newUser = new User({
        nom: req.body.nom,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      })
  
      const user = await newUser.save();
    res.send({
      _id: user._id,
      nom: user.nom,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.nom = req.body.nom || user.nom;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        nom: updatedUser.nom,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);
export default userRouter;
