const express = require('express')
const app = express()

const port = 3000
// 載入 mongoose cmd:  npm install mongoose@5.9.7
const mongoose = require('mongoose')


const exhbs = require('express-handlebars')
app.engine('handlebars', exhbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))

// import jason data 
// const myResList = require('./restaurant.json')
const resList = require('./models/restaurantList_Todo')



// 取得資料庫連線狀態
mongoose.connect('mongodb://localhost/resauant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


//index 主畫面的取得
app.get('/', (req, res) => {
  resList.find()
    .lean()
    .then(restaurants => res.render('index', { resList: restaurants }))
    .catch(error => console.error(error))
})

//查詢資料
app.get('/search', (req, res) => {
  // 與 index.handlebars name="keyword"
  let keyWord = req.query.keyword.trim().toLowerCase() // 存所查詢的關鍵字
  if (!keyWord) {
    res.redirect('/')
    return
  }

  resList.find()
    .lean()
    .then((restaurants) => {
      const filiterResList = restaurants.filter((restaurant) => {
        // 存放符合關鍵字的餐廳清單。清單並不會只有1間; 所以使用filter
        return restaurant.name.trim().toLowerCase().includes(keyWord) || restaurant.category.trim().toLowerCase().includes(keyWord)
      })
      res.render('index', { searchKeyWord: keyWord, resList: filiterResList })
    })
    .catch(error => console.error(error))


})

//遊覽一筆資料
app.get('/restaurants/:id', (req, res) => {
  const resId = req.params.id
  resList.findById(resId)
    .lean()
    .then(restaurants => res.render('showDetails', { showID: restaurants }))
  // console.log('遊覽詳細資料')

})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})