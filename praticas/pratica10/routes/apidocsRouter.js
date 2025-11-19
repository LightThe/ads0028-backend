const ejs = require('express');
const yaml = require('yaml');
const fs = require('fs');
const swagger = require("swagger-ui-express");

const file = fs.readFileSync("./swagger.yaml", "utf8");

const swaggerDoc = yaml.parse(file);

const router = ejs.Router();


router.use('/', swagger.serve);
router.get('/', swagger.setup(swaggerDoc));

module.exports = router;