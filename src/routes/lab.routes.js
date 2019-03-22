const express = require('express');
const router = express.Router(); 

//const Lab = require('../models/labdb');

router.get('/' , async (req, res)=> {
    const labs = await Lab.find();
    console.log(labs);
    res.json(labs);
});

router.get ('/:id', async(req, res)=> {
    const lab = await Lab.findById(req.params.id);
    res.json(lab);
})

router.post('/', async (req, res)=>{
    const {title, description } = req.body; 
    const lab = new Lab({title, description});
    await lab.save();
    console.log(lab);
    res.json({status: 'Reactivo Guardado'});
})

router.put('/:id', async (req, res)=> {
    const { title, description } = req.body;
    const newLab = { title, description };
    await Lab.findByIdAndUpdate(req.params.id, newLab)
    res.json({status:'Reactivo Actualizado'})
})

router.delete('/:id', async (req,res)=>{
    await Lab.findByIdAndRemove(req.params.id);
    res.json({status:'Reactivo Eliminado'});
})
module.exports = router;

