const Url = require('./url')

// 產生 5 碼英數組合
function generateRandom(amount) {
  const randomItems = '1234'
  let random = ''
  for (let i = 0; i < amount; i++) {
    random += randomItems[Math.floor(Math.random() * randomItems.length)]
  }
  return random
  // Url.findOne({ random })
  //   .then(url => {
  //     if (!url) {
  //       return random
  //     }
  //     generateRandom(amount)
  //   })
}

module.exports = generateRandom


// ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopurstuvwxyz