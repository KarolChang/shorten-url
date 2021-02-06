const Url = require('./url')

// 產生 5 碼英數組合
function generateRandom(amount) {
  const randomItems = '1234567'
  let random = ''
  for (let i = 0; i < amount; i++) {
    random += randomItems[Math.floor(Math.random() * randomItems.length)]
  }
  return random
}


module.exports = generateRandom


// ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopurstuvwxyz