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
const myResList = require('./restaurant.json')



// 取得資料庫連線狀態
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {



  // 使用Json 資料來拿餐廳資料
  res.render('index', { resList: myResList.results, searchKeyWord: "" })


})
//index 主畫面的取得
app.get('/', (req, res) => {



  // 使用Json 資料來拿餐廳資料
  res.render('index', { resList: myResList.results, searchKeyWord: "" })


})

//Show 餐廳的詳細資料
app.get('/restaurants/:id', (req, res) => {
  // console.log("this id : ", req.params.id)
  const getID = req.params.id //取得餐廳 Req 來的 ID 編號

  //一筆資料 只會有相對應一筆 ID
  const resInfo = myResList.results.find(resInfo => resInfo.id === Number(getID))
  // 顯示showDetails 頁面資訊
  res.render('showDetails', { showID: resInfo })

  // 檢查點進餐廳後是否有切換相對應Router 及 內容
  // res.send(`hello from Show restaurant info : ${getID}`)
})

//Show 您所輸入的關鍵字 
app.get('/search', (req, res) => {
  // 與 index.handlebars name="keyword"
  // console.log(req.query)
  let keyWord = req.query.keyword.trim() // 存所查詢的關鍵字
  if (!keyWord) {
    console.log('沒有輸入值')
    // keyWord = `沒有輸入值`
    res.render('index', { resList: myResList.results, searchKeyWord: "" }) //清空關鍵字，跳出 get 指令
    return
  }

  // 存放符合關鍵字的餐廳清單。清單並不會只有1間; 所以使用filter
  const searchResLInfo = myResList.results.filter(resInfo =>
    resInfo.name.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
  )

  // console.log(searchResLInfo)

  res.render('index', { resList: searchResLInfo, searchKeyWord: keyWord })


  // 按下Search 進餐廳後是否有切換相對應Router 及 內容
  // res.send(`hello from Show restaurant Search keyword : ${keyWord}`)
})
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})