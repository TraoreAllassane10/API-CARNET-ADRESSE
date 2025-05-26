const userServices = require("../services/user.services")

const register = async (req, res) => {

  let { name, email, password } = req.body;

  const response = await userServices.create({name, email, password});

  res.json(response)

};

const login = async (req, res) => {
  let { email, password } = req.body;

  const {code, response} = await userServices.login({email, password});

  res.status(code).json(response);

};

module.exports = { register, login };
