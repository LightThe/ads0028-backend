const ejs = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = ejs.Router();

router.get('/', authMiddleware.verificarToken, (req,res)=>{
    res.json({});
});

module.exports = router;