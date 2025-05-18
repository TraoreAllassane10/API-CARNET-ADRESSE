const { default: mongoose } = require("mongoose");
const Contact = require("../models/Contact");

const create = async (req, res) => {
  const userId = req.user.id;

  const data = { ...req.body, user: userId };

  const contact = await Contact.create(data);

  res.send(contact);
};

const getAll = async (req, res) => {
  const userId = req.user.id;

  const contacts = await Contact.find({ user: userId });

  res.status(200).send(contacts);
};

const getById = async (req, res) => {
  const idContact = req.params.id;
  const contact = await Contact.findById(idContact);

  if (contact) {
    if (contact.user?.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Vous n'etes pas authorisé à acceder à ce contact" });
    }

    res.status(200).send(contact);
  } else {
    res.status(404).send("Contact introuvable");
  }
};

const updateById = async (req, res) => {
  const idContact = req.params.id;
  const contact = await Contact.findByIdAndUpdate(idContact, req.body, {
    new: true,
  });

  if (contact) {
    if (contact.user?.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Vous n'etes pas authorisé à acceder à ce contact" });
    }

    res.status(200).send(contact);
  } else {
    res.status(404).send("Contact introuvable");
  }
};

const deleteById = async (req, res) => {
  const idContact = req.params.id;

  const contact = await Contact.findByIdAndDelete(idContact);

  if (contact) {

    if (contact.user?.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Vous n'etes pas authorisé à acceder à ce contact" });
    }

    res.status(200).send(contact);

  } else {
    res.status(404).json({message: "Contact introuvable"});
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
