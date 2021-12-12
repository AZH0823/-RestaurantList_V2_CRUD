const express = require('express')
const app = express()

const port = 3000
// 載入 mongoose cmd:  npm install mongoose@5.9.7
const mongoose = require('mongoose')
const bodyParser = require('body-parser')// 引用 body-parser

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

app.use(bodyParser.urlencoded({ extended: true }))

//index 主畫面的取得
app.get('/', (req, res) => {
  resList.find()
    .lean()
    .then(restaurants => res.render('index', { resList: restaurants }))
    .catch(error => console.error(error))
})


//切到Create Page
app.get('/restaurant/new', (req, res) => {
  resList.find()
    .lean()
    .then(restaurants => {
      const temp = [] //暫時存放餐廳種類
      const filiterCategory = restaurants.filter((item) => {
        if (!(temp.includes(item.category))) {
          temp.push(item.category)
          return temp
        }
      })
      res.render('toNew', { category: filiterCategory })
    })
    .catch(error => console.error(error))
})

//新增一筆資料
app.post("/restaurant", (req, res) => {
  resList.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
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

// //修改餐廳資料
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  resList.findById(id)
    .lean()
    .then(findOneRes => {
      res.render('edit', { findOneRes })
      // console.log(findOneRes)
    })
    .catch(error => console.error(error))
  // console.log('enter edit mode')
})

//顯示特定店家 Click Detail
app.get('/restaurants/:id', (req, res) => {
  const resId = req.params.id
  resList.findById(resId)
    .lean()
    .then(restaurants => res.render('showDetails', { showID: restaurants }))
  // console.log('顯示特定店家 Click Detail')

})

//刪除特定一筆資料
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  resList.findById(id)
    .then(removeRes => removeRes.remove())
    .then(res.redirect('/'))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})