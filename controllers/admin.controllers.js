const Contact = require("../models/Contact");

const getAllContacts = async (req, res) => {
  //Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({})
    .populate("user")
    .skip(skip)
    .limit(limit);

  const totalContact = await Contact.countDocuments({});
  const totalPages = Math.ceil(totalContact / limit);

  res.status(200).json({ totalContact, totalPages, page, contacts });
};

module.exports = {getAllContacts};
