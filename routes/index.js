const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
var express = require("express");
let userEmail = "";

router.get("/", function (req, res, next) {
  res.send("app listening your request !!");
});

router.post("/register", async (req, res, next) => {
  const rounds = 10;
  const password = req.body.password;

  bcrypt.hash(password, rounds, async (err, hash) => {
    if (err) {
      console.log(err);
      return;
    }

    const userData = new User({
      email: req.body.email,
      password: hash,
    });
    await userData
      .save()
      .then((doc) => {
        console.log("successfully saved ", doc);
        res.status(200).send({ data: doc });
      })
      .catch((err) => {
        res.status(403);
        console.log("error received", err);
      });
  });
});

router.post("/login", async (req, res, next) => {
  userEmail = req.body.email;
  await User.find({ email: req.body.email }).then(async (doc) => {
    if (doc.length != 0) {
      await bcrypt.compare(
        req.body.password,
        doc[0].password,
        (err, result) => {
          if (err) {
            res.send(403);
            console.error(err);
            return;
          }
          res.status(200).send({ data: doc[0] });
          console.log("logged in successfully");
        }
      );
    }
  });
});


router.post("/logout", async (req, res, next) => {
  userEmail = "";
});


router.post("/dashboard/favourite", async (req, res, next) => {
  console.log(req.body);
  console.log(userEmail);
  const filter = { email: userEmail };
  let oldFavourite = [];
  User.findOne({ email: userEmail }).then((doc) => {
    oldFavourite = [...doc.favourites];
    let { id } = req.body;
    oldFavourite.push(id);
    User.findOneAndUpdate(
      filter,
      { favourites: oldFavourite },
      { new: true }
    ).then((doc) => console.log(doc));
  });
});

router.get("/dashboard/all-favourite", (req, res) => {
  User.findOne({ email: userEmail }).then((doc) =>
    res.send(doc.favourites)
  );
});

router.delete("/dashboard/delete-favourite/:id", (req, res) => {
  User.findOne({ email: userEmail }).then((doc) => {
    let id = req.params.id;
    let newFavourite = doc.favourites.filter((element) => element !== id);
    User.findOneAndUpdate(
      { email: userEmail },
      { favourites: newFavourite },
      { new: true }
    ).then((doc) => console.log(doc));
  });
});

router.get('/check-auth' ,(req, res) => {
  if(userEmail === "") res.send(false); else res.send(true);
})

module.exports = router;
