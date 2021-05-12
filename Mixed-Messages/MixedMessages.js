/*
Random message generator.
Creates custom message from array of strings.
Combines 3 strings to create message.
*/

const message = {

    //array storing sentences for the message
    _messageArray: ["You got this!", "You're amazing!","You can do anything you set your mind to.","Nothing is impossible.","You are loved.", 
                    "What you're looking for is not out there, it's in you.","Don't let anyone dull your sparkle.","The world is yours!",
                    "Believe you can and you're halfway there.","You're perfect the way you are.","You're a strong person","I'm proud of you",
                    ],

    /*
    function that return random index valueof the array
    */
    getRandomIndex: function(){
        return Math.floor(Math.random()*this._messageArray.length);
    },


    /*
    selects the string to use, combines them and logs them
    */
    generateMessage:  function(){
        let index1=0;//individual indexes to have different sentences
        let index2=0;
        let index3=0;
        
        //Makes sure no duplicates sentences are used
        while(index1 === index2 && index1 === index3 && index2 === index3){
            index1 = this.getRandomIndex();
            index2 = this.getRandomIndex();
            index3 = this.getRandomIndex();
        }
        //logs the message
        console.log(this._messageArray[index1] + " " + this._messageArray[index2] + " " + this._messageArray[index3]);

    },

    /*
    add functionality for user to add sentences to the array
    */
    addToMessage: function(str){
       this._messageArray.push(str);
    }
};

//print message
message.generateMessage();