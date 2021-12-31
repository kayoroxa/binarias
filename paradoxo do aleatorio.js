const _ = require('lodash')

function generateHistoric(num = 1000) {
  // const json = require('./EURUSD_M5.json')
  const json = require('./AUDUSD_M1.json')
  console.log(json.length)

  const historic = []
  for (let i = 0; i < num; i++) {
    const startCut = _.random(0, 1000)
    historic.push(...json.slice(startCut, startCut + 50))
  }

  const startCut = _.random(0, 1000)
  return historic.slice(startCut, startCut + num)
  // const historic = []
  // for (let i = 0; i < num; i++) {
  //   historic.push(_.sample(['green', 'red']))
  // }
  // return historic
}

function catalogar() {
  // when red bet next to be red
  // when green bet next to be green
  const historic = generateHistoric(600)
  console.log(historic.length)

  let verdeCount = 0
  let redCount = 0

  let lossSeguido = 0
  let winSeguido = 0

  const score = historic.reduce(
    (acc, curr, index) => {
      if (index === 0) {
        return { win: 0, loss: 0 }
      }

      return maioria(acc, curr, index, historic)
      // if (curr === -1 || historic[index - 1] === -1) return acc
      // if (historic[index - 1] === -1) return acc
      // if (historic[index - 1] !== curr) {
      //   return { win: acc.win + 1, loss: acc.loss }
      // } else if (historic[index - 1] === curr) {
      //   return { win: acc.win, loss: acc.loss + 1 }
      // }
    },
    { win: 0, loss: 0 }
  )

  return {
    ...score,
    scorePercent: Math.round((score.win / (score.win + score.loss)) * 100),
  }
}

console.log(catalogar())

function maioria(acc, curr, index, historic) {
  if (index - 11 < 0) return acc
  const portion = historic.slice(index - 10, index)

  const moreVerde = portion.filter(x => x === 1).length > 5
  if (portion.includes(-1)) return acc

  if (curr === -1 || historic[index - 1] === -1) return acc
  if (historic[index - 1] === -1) return acc

  if ((moreVerde && curr === 1) || (!moreVerde && curr === 0)) {
    // console.log(
    //   portion,
    //   moreVerde,
    //   curr,
    //   `WIN: ${acc.win + 1} LOSS: ${acc.loss}`
    // )
    return { win: acc.win + 1, loss: acc.loss }
  } else if (historic[index - 1] === curr) {
    // console.log(
    //   portion,
    //   moreVerde,
    //   curr,
    //   `LOSS: ${acc.loss + 1} WIN: ${acc.win}`
    // )
    return { win: acc.win, loss: acc.loss + 1 }
  }
  return acc
}
