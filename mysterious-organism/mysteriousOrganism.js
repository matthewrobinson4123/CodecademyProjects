// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


//Codecademy code above
//My code below

/*
    Factory function that constructs P. Aequor objects with 
    a specimen number and an array representing a DNA strand.
*/
const pAequorFactory = (num, arr) =>{
  let obj = {//create object
    _specimenNum: num,
    _dna: arr,
    get dna(){
        return this._dna;
    },
    get specimenNum(){
        return this._specimenNum;
    },
    set dna(dnaStrand){
        this._dna = dnaStrand;
    },
    set specimenNum(newNum){
        this._specimenNum = newNum;
    },
    mutate: function(){//change a random base in the DNA strand to a different base
      const randIndex = Math.floor(Math.random()*15);//get a random index 
      let changed = false;
      do{
        let newBase = returnRandBase();//get a random new base
        if(this._dna[randIndex] !== newBase){//check to see if the new base is the same as in the DNA strand
          this._dna[randIndex] = newBase;//set the new base
          changed = true;
        }
      }while(!changed);//new base set, stop looping
    },

    compareDNA: function(pAequor){//compare DNA strands of two organisms
      let sameBaseCount = 0;
      for(let i=0; i<this._dna.length; i++){//loop through DNA strands
        if(this._dna[i] === pAequor.dna[i]){//if the two DNA strands have the same base in the same spot increment counter
          sameBaseCount++;
        }
      }
      console.log(`Specimen #${this._specimenNum} and specimen #${pAequor.specimenNum} have ${(sameBaseCount/this._dna.length) * 100}% DNA in common`);//print comparison
    },

    willLikelySurvive: function(){//Check if the organism will survive based on bases in DNA strand
      let baseCount=0;
      for(let i=0; i<this._dna.length; i++){//loop through DNA strand
        if(this._dna[i] === 'C' || this._dna[i] === 'G'){//Check for preferred bases
          baseCount++;
        }
      }
      if((baseCount/this._dna.length)*100 >= 60){//Check if DNA strand has at least 60% preferred bases
        return true;
      }else{
        return false;
      }
    }

  };
  return obj;
}




//Creates 30 organisms that will likely survive
let specimenArray = [];//create empty array
let specNum = 1;
while(specimenArray.length < 30){
  const organism = pAequorFactory(specNum, mockUpStrand());//create new P. Aequor object
  if(organism.willLikelySurvive()){//check if the organism will likely survive
    specimenArray.push(organism);//add to array
    specNum++;
  }
}



//tests
console.log(specimenArray.length);
console.log(specNum);
for(let i=0; i<specimenArray.length; i++){
  console.log(`Specimen #${specimenArray[i].specimenNum} has the DNA strand ${specimenArray[i].dna.join('')}`);
}


//test compareDNA
let organism = pAequorFactory(100,mockUpStrand());
let organism2 = pAequorFactory(101,mockUpStrand());
console.log(`organism has the DNA strand ${organism.dna.join('')}`);
console.log(`organism2 has the DNA strand ${organism2.dna.join('')}`);
organism.compareDNA(organism2);


//test mutate and willLikelySurvive
let stillSurvivable = [];
for(let i=0; i<specimenArray.length; i++){
    specimenArray[i].mutate();
    if(specimenArray[i].willLikelySurvive()){
        stillSurvivable.push(specimenArray[i]);
    }
}
console.log(stillSurvivable.length);
for(let i=0; i<stillSurvivable.length; i++){
    console.log(`Specimen #${stillSurvivable[i].specimenNum} has the DNA strand ${stillSurvivable[i].dna.join('')}`);
}