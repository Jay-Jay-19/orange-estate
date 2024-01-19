import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
    
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  // Déstructuration du email et du password
  const { email, password } = req.body;
  try {

    // Vérification du email. S'il existe, le récupérer, sinon envoi message d'erreur
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found !'));

    // Si l'email existe, vérification du password en utilisant bcrypt. Si le password existe, on retourne true. Sinon, message d'erreur
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials !'));

    // Si email & password existent, on crée un token en utilisant le user id attribué par MongoDB et une variable d'environnement SECRET key
    const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    // Sauvegarde du token dans un cookie. On retourne en confirmation le "rest" qui est toutes les infos du validUser sauf le password
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error)
  }
}

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out !');
  } catch (error) {
    next(error);
  }
};