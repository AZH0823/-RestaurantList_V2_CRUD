const mongoose = require('mongoose')
const resTodo = require('../restaurantList_Todo')

const myResList = require('../../restaurant.json').results
mongoose.connect('mongodb://localhost/resauant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  resTodo.create(myResList).then(() => console.log('restaurantSeeder update'))
    .catch(error => console.log(error))
  // console.log(myResList.results)
})