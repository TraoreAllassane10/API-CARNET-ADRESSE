const Contact = require("../models/Contact");

const all = async (query, userId) => {
   let response;
   let code;

  //Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 2;
  const skip = (page - 1) * limit;

  try {
    const contacts = await Contact.find({ user: userId })
      .populate("user")
      .skip(skip)
      .limit(limit);

    const totalContact = await Contact.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalContact / limit);

    response = { totalContact, totalPages, page, contacts };
    code = 200;

    return {code, response};

  } catch (error) {}
};

const find = async (id, userId) => {
   let response;
   let code;

   const contact = await Contact.findById(id);

   if (contact) {
    if (contact.user?.toString() !== userId) {
        response = { message: "Vous n'etes pas authorisé à acceder à ce contact" };
        code = 403;
        return {code, response};
    }

    code = 200;
    response = {contact}
    return {code, response};

    } else {
        
        response = { message: "Contact introuvable" };
        code = 404;
        return {code, response};
    }
}

const create = async (data) => {
    let response;
    let code;

    try {
        const contact = await Contact.create(data);
        response = {message : "Contact enregistré", Contact: contact};
        code = 201;

        return { code, response };
    } catch (error) {
        response = {message : "Erreur survenue du coté du serveur"};
        code = 500;
        return { code, response };
    }
}

const update = async (id, userId, data) => {
    let response;
    let code;

    const contact = await Contact.findByIdAndUpdate(id, data, {
        new: true,
      });
    
      if (contact) {
        if (contact.user?.toString() !== userId) {
            response = { message: "Vous n'etes pas authorisé à acceder à ce contact" };
            code = 403;
          return {code, response};
        }
    
        response = { message: "Contact modifié", contact: contact};
        code = 200;
        return {code, response};

      } else {
        response = { message: "Contact introuvable"};
        code = 404;
        return {code, response};
      }
}

const remove = async (id, userId) => {
    const contact = await Contact.findByIdAndDelete(id);
    let response;
    let code;

    if (contact) {
        if (contact.user?.toString() !== userId) {
            response = { message: "Vous n'etes pas authorisé à acceder à ce contact" };
            code = 403;
           
            return {code, response};
        }

        response = { message: "Contact supprimé", contact: contact };
        code = 200;

       return {code, response};
    } else {
        response = { message: "Contact introuvable" , contact: contact };
        code = 404;

       return {code, response};
    }
}

module.exports = {
    all,
    create,
    find,
    update,
    remove
};