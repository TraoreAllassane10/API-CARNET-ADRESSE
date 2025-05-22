const request = require("supertest");
const app = require("../app");
const mangoose = require("mongoose");
const User = require("../models/User");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/index");

let token;
let userId;

beforeAll(async () => {
  await mangoose.connect("mongodb://localhost/carnet-adresses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Nettoyer les collections
  await User.deleteMany({});
  await Contact.deleteMany({});

  //Crée un utilisateur test
  const user = new User({
    name: "test",
    email: "test@gmail.com",
    password: "1234",
  });

  await user.save();
  userId = user._id;

  token = jwt.sign({ id: user._id }, privateKey, { expiresIn: "1h" });
});

afterAll(async () => {
  const db = mangoose.connection.db;
  if (db) {
    await db.dropDatabase();
  }
  await mangoose.connection.close();
});

describe("Contacts Api", () => {
  it("Devrait rejeter l'appel sans token", async () => {
    const res = await  request(app).get("/contacts");
    expect(res.statusCode).toBe(403);
  });

  it("Devrait creer un contact avec un token valide", async () => {
    const res = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstname: "jean",
        lastname: "Roland",
        email: " roland@gmail.com",
        phone: "072298292",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstname).toBe("jean");
  });

  it("Devrait retourner les contacts des utilisateurs connecté", async () => {
    const res = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.contacts)).toBe(true);
  });
});
