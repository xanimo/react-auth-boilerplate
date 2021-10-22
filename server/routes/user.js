const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const checkJwt = require('../utils/auth').checkJwt;
const admin = require('../utils/auth').admin;

router.route('/').get(admin, users.list).post(users.create);

router.post('/authenticate', users.authenticate);

router.use(checkJwt);
router.route('/:id').get(admin, users.show).patch(admin, users.update).delete(admin, users.delete);

module.exports = router;
