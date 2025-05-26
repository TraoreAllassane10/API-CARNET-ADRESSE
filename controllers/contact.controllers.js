const Contact = require("../models/Contact");
const contactServices = require("../services/contact.services")

const create = async (req, res) => {
  const userId = req.user.id;
  const data = { ...req.body, user: userId };

  const {code, response} = await contactServices.create(data);

  res.status(code).json(response);
};

const getAll = async (req, res) => {

  const userId = req.user.id;
  const query = req.query;

  const {code, response} = await contactServices.all(query, userId);

  res.status(code).json(response);

};

const getById = async (req, res) => {
  const idContact = req.params.id;
  const userId = req.user.id;

  const {code, response} = await contactServices.find(idContact, userId);

  res.status(code).send(response);

};

const updateById = async (req, res) => {
  const idContact = req.params.id;
  const userId = req.user.id;
  const data = req.body;

  const {code, response} = await contactServices.update(idContact, userId, data);

  res.status(code).send(response);
 
};

const deleteById = async (req, res) => {
  const idContact = req.params.id;
  const userId = req.user.id;

  const {code, response} = await contactServices.remove(idContact, userId);

  res.status(code).send(response);

};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
