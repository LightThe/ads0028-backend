const ejs = require('express');
const yaml = require('yaml');
const fs = require('fs');
const suellen = require("swagger-ui-express");

const file = fs.readFileSync("./swagger.yaml", "utf8");

const swaggerDoc = yaml.parse(file);

const router = ejs.Router();


router.use('/', suellen.serve);
router.get("/", suellen.setup(swaggerDoc));

module.exports = router;