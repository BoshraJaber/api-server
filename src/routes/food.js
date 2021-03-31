'use strict';
const express = require('express');
const validator = require('../middleware/validator');
const Food = require('../models/data-collection-class')
const foodModel = require('../models/food');
const food = new Food(foodModel);
const router = express.Router();

// Add a Record
router.post('/', addFood);
// Get All Records
router.get('/', getAllFood);
// Get One Record
router.get('/:id', validator, getFoodById);
// Update A Record
router.put('/:id', validator, updateFood);
// Delete A Record
router.delete('/:id', validator, deleteFood);

async function addFood(req, res, next) {
  const foodObject = req.body;
  try{
    const resObj = await food.create(foodObject);
    res.status(201).json(resObj);
  } catch (error){
    next(error)
    // throw new Error(error.message);
  }
}
async function getAllFood(req, res, next) {
  try {
    const resObj = await food.read();
    res.json(resObj);
  }  catch (error) {
    next(error);
  }
}
async function getFoodById(req, res, next) {
  try{
    const resObj = await food.read(req.params.id);
  res.json(resObj);
  } catch (error) {
    next(error);
  }
}
async function updateFood(req, res, next) {
  const foodObject = req.body;
  try {
  const resObj = await food.update(req.params.id, foodObject);
  res.json(resObj);
  }
  catch (error) {
    next(error);
  }
}
async function deleteFood(req, res, next) {
  try {
    const resObj = await food.delete(req.params.id);
  res.json(resObj);
  }
  catch (error) {
    next(error);
  }
}

module.exports = router;