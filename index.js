const NUMS = [...new Array(10)].map((e, i) => i); // [0...9]

const numsChain = (array) => {
  const newArray = []
  if (array.length > 1) {
    array[0].forEach((v1) => {
     array[1].forEach((v2) => newArray.push(`${v1}${v2}`))
    });
  } else { return array }
  const restArray = array.slice(2);
  if (restArray.length > 0) {
   return numsChain([].concat([newArray], restArray))
  }
  return newArray;
}

const getSevenContainNum = (input) => { // ex. input = 2837
 const numShell = String(input).split('').map(n => parseInt(n, 10));
 // [2, 8, 3, 7]
 const numsArray = [];
 numShell.forEach((num, index) => {
  const digit = numShell.length - index; // 2 => d:4, 8 => d:3, 3 => d: 2
  const padding = digit - 1;
  if (padding > 0) {
   [...new Array(num)].forEach((e, cn) => {
    // num: 2, cn => 0, 1
    // num2: 8, cn => 0, 1, 2, 3, 4, 5, 6, 7
    // num3: 3, cn => 0, 1, 2
    [...new Array(padding)].forEach((e, i) => {
      // padding = 3 => [NUMS][NUMS][NUMS]
      // padding = 2 => [NUMS][NUMS]
      // padding = 1 => [NUMS]
     const fullNumsArray = [...new Array(padding)].map(() => NUMS);
     if (cn !== 7) fullNumsArray[(padding) - 1 - i] = [7];
     fullNumsArray.unshift(...numShell.slice(0, index).map(n => [n]), [cn]);
     numsArray.push(fullNumsArray);
    });
   });
  } else {
    if (num >= 7) {
      numsArray.push(numShell.map(n => [n]));
      numsArray[digit - 1] = [7];
    }
  }
})
 const result = [].concat(...numsArray.map(arr => numsChain(arr)));
 return new Set(result).size;
}


// html binding
const inputEl = document.querySelector('#input');
const resultIsEl = document.querySelector('#resultIs');
const resultEl = document.querySelector('#result');
document.querySelector('#form').onsubmit = (e) => {
  e.preventDefault();
  resultIsEl.hidden = false;
  resultEl.innerHTML = getSevenContainNum(inputEl.value);
}