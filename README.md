# 餐廳清單
使用 Node.js 與 Express 所建立之餐廳清單，提供用戶搜尋、查閱相關餐廳資料

## 畫面呈現
### 首頁
![image](https://raw.githubusercontent.com/AZH0823/RestaurantList_V2_CRUD/master/Cover/Capture_home01_V02.JPG)
### 詳細頁面
![image](https://github.com/AZH0823/RestaurantList_V2_CRUD/blob/master/Cover/Capture_detail01_V02.JPG?raw=true)
### 創建餐廳
![image](https://github.com/AZH0823/RestaurantList_V2_CRUD/blob/master/Cover/Capture_create01_V02.JPG?raw=true)
### 修改餐廳
![image](https://github.com/AZH0823/RestaurantList_V2_CRUD/blob/master/Cover/Capture_edit01_V02.JPG?raw=true)
### 刪除餐廳
- 直接進首頁或詳細頁面，按下Delete 即可刪除該筆資料
### 
## 功能
- 使用者能查看所有餐廳訊息
- 使用者能針對關鍵字進行搜尋
- 使用者能查閱餐廳詳細資訊
- 使用 CURD 方式

## 使用說明
1. 請先確認是否安裝 Node.js
2. 打開終端機並複製到本機電腦
```
https://github.com/AZH0823/RestaurantList.git
```
3.進入專案資料夾
```
cd restaurantList_V2_CURD
```
4.安裝所需套件
```
npm install
```
5.創建種子資料
```
npm run seed
```
6.開始運行
```
npm run start
```
7.若想針對專案進行開發人員測試
```
npm run dev
```
## 更新說明
- 使用handlebars if/else 判斷 KEYWORD
- Search 為 null  ,重新載入頁面(※以後修改成部分重新載入)
- 使用CURD 修正 Router
