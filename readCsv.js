const filePath = 'test.tsv'
const csv = require('csvtojson')
const pathJoin = require('path').join

var main = async () => {
  const jsonArray = await csv({ delimiter: '\t' }).fromFile(
    pathJoin(__dirname, 'AUDUSD_M1.csv')
  )
  const formatted = jsonArray.map(item => {
    const calc = Number(item['<CLOSE>']) - Number(item['<OPEN>'])
    const none = Number(item['<OPEN>']) === Number(item['<CLOSE>'])
    if (none) return -1
    // return {
    //   candle: -1,
    //   open: Number(item['<OPEN>']),
    //   close: Number(item['<CLOSE>']),
    // }
    return calc < 0 ? 0 : 1
    // return {
    //   candle: calc < 0 ? 0 : 1,
    //   open: Number(item['<OPEN>']),
    //   close: Number(item['<CLOSE>']),
    // }
  })

  //save json
  const json = JSON.stringify(formatted)
  const fs = require('fs')
  fs.writeFileSync(pathJoin(__dirname, 'AUDUSD_M1.json'), json)

  console.log('jsonArray:', formatted)
}

main()
