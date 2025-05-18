const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PrivateKey = require("../auth");

const register = async (req, res) => {
  let { name, email, password } = req.body;

  const verifiedEmail = await User.find({ email });

  if (verifiedEmail) {
    res.json({ message: "Cet utilisateur existe déjà" });
    return;
  }

  password = bcrypt.hashSync(password, 10);

  try {
    const user = await User.create({ name, email, password });

    if (user) {
      res.json({ message: "Utilisateur crée", data: user });
    } else {
      res.json({ message: "Erreur lors de la creation de l'utilisateur" });
    }
  } catch (error) {
    res.json({ message: "Erreur survenue du coté du serveur" });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "Vous n'avez de compte" });
    return;
  }

  const validated = bcrypt.compareSync(password, user.password);

  if (validated) {
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      PrivateKey,
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .json({ message: "Utilisateur connecté", data: user, token });
  } else {
    res.status(401).json({ message: "Mot de passe incorrect" });
  }
};

module.exports = { register, login };
