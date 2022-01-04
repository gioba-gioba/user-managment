const express = require("express");
const {
  loginUser,
  registerUser,
  updateUser,
  getUser,
  listUser,
} = require("../services/users");
const { basicAuth } = require("./basic_auth");

const router = new express.Router();

router.post("/register", async (req, res) => {
  const { nickname, firstname, lastname, password } = req.body;
  if (!nickname || !password) {
    return res.sendStatus(400);
  }

  const profile = await registerUser(nickname, firstname, lastname, password);

  if (profile) {
    res.send(profile);
  } else {
    res.sendStatus(400);
  }
});

router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;
  if (!nickname || !password) {
    return res.sendStatus(400);
  }

  const profile = await loginUser(nickname, password);
  if (profile) {
    res.send(profile);
  } else {
    res.sendStatus(400);
  }
});

router.post("/update", basicAuth, async (req, res) => {
  const { firstname, lastname, password } = req.body;

  const profile = await updateUser(
    req.profile.nickname,
    firstname,
    lastname,
    password
  );
  if (profile) {
    res.send(profile);
  } else {
    sendStatus(400);
  }
});

router.get("/list", async (req, res) => {
  const { page, size } = req.query;

  const list = await listUser(page || 1, size || 2);

  res.send(list);
});

router.get("/:nickname", async (req, res) => {
  const { nickname } = req.params;

  const profile = await getUser(nickname);
  if (profile) {
    res.send(profile);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
