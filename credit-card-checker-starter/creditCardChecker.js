// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:



/*
  Luhn algorithm to determine the sum of the credit card number and return it
*/
const sumIt = arr =>{
  let newArr = arr.slice();
  let checkDigit = newArr.pop();
  newArr = newArr.reverse();

  //loop through array, starting with the right-most number
  for(let i=0; i<newArr.length; i++){

    //checks index to double every other number
    if(i%2 === 0){
      newArr[i] *= 2;
      if(newArr[i]> 9){
        newArr[i] -= 9;//if doudbled digit is greater than 9, subtract 9
      }
    }
  }
  //sum all digits in array with the check digit
  let sum = newArr.reduce((acc,val) => {return acc+val}) + checkDigit;

  return sum;
}




/* 
  function to check if the credit number belongs to a valid credit card 
*/
const validateCred = arr =>{
//if the sum of the digits is a multiple of 10 the card number is valid
  return (sumIt(arr)%10 === 0)
};




/*
  searches through the batch array, collects and stores the invalid 
  credit card numbers and returns a nested array containing all invalid 
  credit card numbers
*/
const findInvalidCards = arr =>{
  const newArr = [];//creates new array for storing invalid credit arrays

  //loop through array of number arrays
  for(let i=0; i<arr.length; i++){
    if(!validateCred(arr[i])){//call function to find invalid number arrays
      newArr.push(arr[i]);//add invalid array to new array
    }
  }
  return newArr;
};





/*
 Reads the array of invalid card numbers and stores which 
 companies they belong to. If the digit is incorrect an error 
 is logged. Returns an array with one intance of every company 
 that issued invalid card numbers.
*/
const idInvalidCardCompanies = arr =>{
  const newArr = [];//create new array for company names

  for(let i=0; i<arr.length; i++){//loop though array of invalid cards

  //check the first digit to check corresponding company
    switch(arr[i][0]){
      case 3:
      //if company is not already in array, add company
        if(!newArr.includes('American Express')){
          newArr.push('American Express');
        }
        break;
      case 4:
        if(!newArr.includes('Visa')){
          newArr.push('Visa');
        }
        break;
      case 5:
        if(!newArr.includes('Mastercard')){
          newArr.push('Mastercard');
        }
        break;
      case 6:
        if(!newArr.includes('Discover')){
          newArr.push('Discover');
        }
        break;
      default://if the digit is not one of the four companies
        console.log(`Company not found for ${arr[i].join('')}`);
    }
  }
  return newArr;
};




/*
  Take in array of invalid cards and make them valid by 
  updating the check digituses same summation code from validateCred
*/
const revalidateCards = arr =>{
  let sum = sumIt(arr);//get sum of card number
  
  if(arr[arr.length-1] >= sum%10){//check if check digit is larger than the remainder
    arr[arr.length-1] -= sum%10;//if it is subtract the remainder from the check digit
  }else{
    arr[arr.length-1] += (10-(sum%10));//if not add the difference of the remainder and 10 to the check
  }
  return arr;//return valid card number
};





//Tests for findInvalidCards, idInvalidCardCompanies, and validateCred (used inside findInvalidCards)
let invalidCardArray = findInvalidCards(batch);
let companyArray = idInvalidCardCompanies(invalidCardArray);

//print results
console.log(invalidCardArray.length);//should log 8
for(let i=0; i<invalidCardArray.length; i++){
  console.log(invalidCardArray[i].join(''));
}
console.log(companyArray);




//test revalidate
for(let j=0; j<invalidCardArray.length; j++){
  invalidCardArray[j] = revalidateCards(invalidCardArray[j]);
}

let stillInvalidCardArray = findInvalidCards(invalidCardArray);//recheck the invalid cards, if still invalid add to new array
//print results
console.log(stillInvalidCardArray.length);//should return 0
for(let i=0; i<stillInvalidCardArray.length; i++){
  console.log(stillInvalidCardArray[i].join(''));//should return nothing
}