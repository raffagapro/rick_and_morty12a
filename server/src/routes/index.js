const login = require('../controllers/login');
const postFav= require('../controllers/postFav');
const deleteFav = require('../controllers/deleteFav');
const postUser = require('../controllers/postUser');
const getCharById = require('../controllers/getCharById');
// const { Router: router } = require('express');
const router = require ('express').Router()

router.get("/character/:id", getCharById);
router.get("/login", login);
router.post("/login", postUser);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;