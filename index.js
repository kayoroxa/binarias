const _ = require('lodash')

const inicialSaldo = 100

function jogar() {
  const historic = []

  let saldo = inicialSaldo
  const payOut = 0.9
  let countWinSequencial = 0
  let countLostSequencial = 0

  let initialBet = inicialSaldo / 10
  let bet = initialBet
  let jogadas = 0

  while (saldo > 0 && saldo < inicialSaldo * 6) {
    // && jogadas < 300
    jogadas++
    // win 60% chance
    bet = Math.max(saldo / 10, initialBet)
    const win = _.random(0, 100) < 60
    if (win) {
      countWinSequencial += 1
      countLostSequencial = 0

      saldo += bet * payOut
      // bet += bet * payOut

      // if (countWinSequencial === 3) {
      //   bet = initialBet
      //   countWinSequencial = 0
      // }
    } else {
      saldo -= bet
      bet = initialBet
      countWinSequencial = 0
      countLostSequencial += 1
    }
    historic.push({
      win: win,
      saldo: saldo > 0 ? Math.round(saldo) : 0,
      bet,
    })
  }

  return {
    historic,
    saldo: saldo > 0 ? Math.round(saldo) : 0,
  }
}

function jogar1Dimensão(num = 1000) {
  const jogos = []

  for (let i = 0; i < num; i++) {
    const result = jogar()
    jogos.push(result.saldo)
  }
  const jogosSaldo = jogos.reduce(
    (acc, curr) => (curr === 0 ? acc - 100 : acc + curr),
    0
  )
  //round
  const investido = num * inicialSaldo
  console.log(jogosSaldo - investido)
  // console.log(
  //   `${num * 100} => ${Math.round(jogosSaldo)} == ${Math.round(
  //     jogosSaldo - num * 100
  //   )}`
  // )
  console.log(jogos)
  return jogosSaldo
}

// for (let i = 0; i < 100; i++) {
jogar1Dimensão(40)
// }

// const partida = jogar()

// console.log(partida.saldo)
// console.log(partida.historic.length, 'jogadas')
