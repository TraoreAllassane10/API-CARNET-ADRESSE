const userServices = require("../services/user.services")

const register = async (req, res) => {

  const data = req.body;

  const response = await userServices.create(data);

  res.json(response);

};

const login = async (req, res) => {
  const data = req.body;

  const {code, response} = await userServices.login(data);

  res.status(code).json(response);

};

module.exports = { register, login };
