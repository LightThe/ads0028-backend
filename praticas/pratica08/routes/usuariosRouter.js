const ejs = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = ejs.Router();

router.post('/login', (req,res)=>{
    const {usuario} = req.body;
    const payload = { email: usuario };
    return res.json({token: authMiddleware.gerarToken(payload)});
});

router.post('/renovar', authMiddleware.verificarToken, (req,res)=>{
    const {email} = req;
    const payload = { email };
    return res.json({token: authMiddleware.gerarToken(payload)});
}); 

module.exports = router;