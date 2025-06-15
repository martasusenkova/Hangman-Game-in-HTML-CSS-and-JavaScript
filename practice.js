//1. переменные используем внешние;

//2. переменные используем локальные;

//3. x, y, z берем из аргументов;

//4. функция результат не выводит в консоль, а возвращает.

let x = 10;
let y = 2;
let z = 5;

function getSum() {
  console.log(x + y + z);
}

getSum();

function getSum2() {
  let x = 10;
  let y = 2;
  let z = 5;
  console.log(x + y + z);
}

getSum2();

function getSum3(a, b, c) {
  console.log(a + b + c);
}

getSum3(2, 4, 5);

function getSum3(a, b, c) {
  return a + b + c;
}

getSum3(2, 4, 5);
