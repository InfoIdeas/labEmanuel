const express = require('express');
const router = express.Router(); 

const Lab = require('../models/labdb');

router.get('/' , async (req, res)=> {
    const labs = await Lab.find();
    console.log(labs);
    res.json(labs);
});

router.post('/', async (req, res)=>{
    const {title, description } = req.body; 
    const lab = new Lab({title, description});
    await lab.save();
    console.log(lab);
    res.json({status: 'Reactivo Guardado'});
})
module.exports = router;

