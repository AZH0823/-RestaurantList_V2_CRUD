const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantListSchema = new Schema({
  // id: {
  //   type: Number, // 資料型別是字串
  //   required: true // 這是個必填欄位
  // },
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  image: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  rating: {
    type: Number, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  description: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  phone: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  location: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  }

})
module.exports = mongoose.model('restaurantLists', restaurantListSchema)