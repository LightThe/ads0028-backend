const swagger_ui = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');

const ejs = require('express');
const router = ejs.Router();

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDoc = yaml.parse(file);

router.use('/', swagger_ui.serve);
router.get('/', swagger_ui.setup(swaggerDoc));

module.exports = router;