'use strict';

require('dotenv').config()
// const superTest = require('supertest');;
const {server} = require('../src/server');

const supergoose = require('@code-fellows/supergoose');


// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const request = superTest(server);
const request = supergoose(server);
let id;
let idClothes;

describe('Server', () => {
  it('handle invalid routes', async () => {
    const response = await request.get('/random');
    // console.log(response.body);
    expect(response.status).toEqual(404);
    expect(response.body.method).toEqual('GET');
  });
  it('handle server errors', async () => {
    const response = await request.get('/error');
    expect(response.status).toEqual(500);
  });
  // checking for routes status code and returned value for Food
  //Create a record
  it('Create a record', async () => {
    const response = await request.post('/api/v1/food/').send({
        type : 'JunkyFood',
    });
    expect(response.status).toEqual(201);
    expect(response.body.type).toEqual('JunkyFood');
    // expect(response.body.price).toEqual('5');
    id = response.body._id;
  });
  // // Update a record 
  it('Update a record', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
      type :'fast food',
      // price : '6',
    });
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('fast food');
    // expect(response.body.price).toEqual('6');
  });
  // // Read a record
  it('Read a record', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('fast food');
    // expect(response.body.price).toEqual('6');
  });
  // // Read all Records
  it('Read all record', async () => {
    const response = await request.get('/api/v1/food/');
    expect(response.status).toEqual(200);
    // console.log(response.body[0]);
    expect(response.body[0].type).toEqual('fast food');
    // expect(response.body[0].price).toEqual('5');
  });
  // // Delete a record
  it('Delete a record', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    // console.log(response.body);
    // expect(response.body).toEqual(null);
  });
  // //=======================================
  // // checking for routes status code and returned value for Food
  // //Create a record
  it('Create a record', async () => {
    const response = await request.post('/api/v1/clothes/').send({
        type : 'healthy',
        // price : '5',
    })
    expect(response.status).toEqual(201);
    expect(response.body.type).toEqual('healthy');
    // expect(response.body.price).toEqual('5');
    idClothes = response.body._id
  });
  // // Update a record 
  it('Update a record', async () => {
    const response = await request.put(`/api/v1/clothes/${idClothes}`).send({
      type :'fast food',
      // price : '6',
    });
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('fast food');
    // expect(response.body.price).toEqual('6');
  });
  // // Read a record
  it('Read a record', async () => {
    const response = await request.get(`/api/v1/clothes/${idClothes}`);
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('fast food');
    // expect(response.body.price).toEqual('6');
  });
  // // Read all Records
  it('Read all record', async () => {
    const response = await request.get('/api/v1/clothes/');
    expect(response.status).toEqual(200);
    // console.log(response.body[0]);
    expect(response.body[0].type).toEqual('fast food');
    // expect(response.body[0].price).toEqual('6');
  });
  // // Delete a record
  it('Delete a record', async () => {
    const response = await request.delete(`/api/v1/clothes/${idClothes}`);
    expect(response.status).toEqual(200);
    // console.log(response.body);
    // expect(response.body).toEqual(null);
  });
// 
  // afterAll( async () =>{
    // await mongoose.connection.close()
// })
});

