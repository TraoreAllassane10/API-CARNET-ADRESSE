const Contact = require('../models/Contact');

const create = async (req, res) => {
    const contact = await Contact.create(req.body);
    res.send(contact);
}

const getAll = async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
}

const getById = async (req, res) => {
    const idContact = req.params.id;
    const contact = await Contact.findById(idContact);

    if (contact) {
        res.status(200).send(contact);
    }
    else
    {
        res.status(404).send('Contact introuvable');
    }
}

const updateById = async (req, res) => {
    const idContact = req.params.id;
    const contact = await Contact.findByIdAndUpdate(idContact, req.body, { new: true });

    if (contact) {
        res.status(200).send(contact);
    }
    else
    {
        res.status(404).send('Contact introuvable');
    }
} 

const deleteById = async (req, res) => {
    const idContact = req.params.id;
    const contact = await Contact.findByIdAndDelete(idContact);

    if (contact) {
        res.status(200).send(contact);
    }
    else
    {
        res.status(404).send('Contact introuvable');
    }
}

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
}