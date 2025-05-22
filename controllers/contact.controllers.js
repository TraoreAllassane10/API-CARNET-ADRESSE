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

  //Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  try {
    const contacts = await Contact.find({ user: userId })
      .populate('user')
      .skip(skip)
      .limit(limit);

    const totalContact = await Contact.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalContact/limit);

    res.status(200).json({ totalContact, totalPages, page, contacts });

  } catch (error) {}
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
    res.status(404).json({ message: "Contact introuvable" });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
