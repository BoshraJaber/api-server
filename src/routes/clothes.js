'use strict';
const express = require('express');
const validator = require('../middleware/validator');
const Clothes = require('../models/data-collection-class')
const clothesModel = require('../models/clothes');
const clothes = new Clothes(clothesModel);
const router = express.Router();


// Add a Record
router.post('/', addClothes);
// Get All Records
router.get('/', getAllClothes);
// Get One Record
router.get('/:id', validator, getClothesById);
// Update A Record
router.put('/:id', validator, updateClothes);
// Delete A Record
router.delete('/:id', validator, deleteClothes);

async function addClothes(req, res,next) {
  const clothesObject = req.body;
  try {
    const resObj = await clothes.create(clothesObject);
    res.status(201).json(resObj);
  }catch (error) {
    next(error);
  } 
}
async function getAllClothes(req, res, next) {
  try {
    const resObj = await clothes.read();
  res.json(resObj);  
  }catch (error) {
    next(error);
  }
}
async function getClothesById(req, res, next) {
  try{
    const resObj =await  clothes.read(req.params.id);
  res.json(resObj);
  }catch (error) {
    next(error);
  }
}
async function updateClothes(req, res, next) {
   const clothesObject = req.body;
  try {
    const resObj = await clothes.update(req.params.id, clothesObject);
  res.json(resObj);
  }catch (error) {
    next(error);
  }
}
async function deleteClothes(req, res, next) {
  try{
    const resObj = await clothes.delete(req.params.id);
  res.json(resObj);
  }
  catch (error) {
    next(error);
  }
}

module.exports = router;