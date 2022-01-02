const catalogation = [
  //
  1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1,
]

const verdeMaioria =
  catalogation
    .slice(catalogation.length - 11, catalogation.length)
    .filter(x => x === 1).length > 5

console.log(verdeMaioria ? 'verde' : 'vermelho')
