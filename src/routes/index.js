const express = require("express");

const { health } = require("../controllers/healthController");
const { generateEmail, generateEmailFromApollo } = require("../controllers/emailController");
const { asyncHandler } = require("../middlewares/asyncHandler");

const router = express.Router();

router.get("/health", health);
router.get("/generate-email", asyncHandler(generateEmail));
router.post("/generate-email", asyncHandler(generateEmail));
router.get("/generate-email-from-apollo", asyncHandler(generateEmailFromApollo));
router.post("/generate-email-from-apollo", asyncHandler(generateEmailFromApollo));

module.exports = { router };

