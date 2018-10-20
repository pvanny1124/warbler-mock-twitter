const express = require('express');
const router = express.Router({mergeParams: true}); //get access to the id inside the router

const { createMessage } = require("../handlers/messages");

//prefix /api/users/:id/messages
router.route("/").post(createMessage);

module.exports = router;