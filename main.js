// DOM elements
let countspan = document.querySelector(".COUNT span");
let bullets = document.querySelector(".bullets");
let area2 = document.querySelector(".area2")
let bulletcontainer = document.querySelector(".spans");
let quizarea = document.querySelector(".quiz-area");
let answersarea = document.querySelector(".answers-area");
let submitanswer = document.querySelector(".submit-answer");
let resultscontainer = document.querySelector(".results");
let countdown = document.querySelector(".countdown");

let currentindex = 0;
let TheRightAnswer = 0;
let timinterval;




function getquestions(){
    let myreq = new XMLHttpRequest();
    myreq.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
           
       let questionobject = JSON.parse(this.responseText) ;
       let questioncount =  questionobject.length;
    //    console.log(questioncount);
       createbullets(questioncount);
       addquestiondata(questionobject[currentindex] , questioncount); 
       //click on submit 
      //start interval
       countDown(7,questioncount)
       submitanswer.onclick = () => {
       
//get right answer
let rightasnswer = questionobject[currentindex].right_answer;
// console.log(rightasnswer);
//increase index
currentindex ++;

checkAnswer(rightasnswer,questioncount);
 //remove previous question
 answersarea.innerHTML=""; 
 quizarea.innerHTML="";

 addquestiondata(questionobject[currentindex] , questioncount);
 
    
    handleBullets();
    //start interval 
    clearInterval(timinterval)
    countDown(7,questioncount)
    showResult(questioncount);
    };
}
};

    myreq.open("Get","questions.json",true);
    myreq.send();
}
getquestions()
function createbullets(num){
countspan.innerHTML = num;

//create bullets

for (let i = 0 ; i < num; i++ ){
    let bulletspan = document.createElement("span");
if (i === 0){
    bulletspan.className = "on";

}
    
    bulletcontainer.appendChild(bulletspan);
}
}
//append h2 in quiz area 
function  addquestiondata (obj,count)
{
   if (currentindex < count){
     let questionTitle = document.createElement("h2");
    // console.log(obj);
    // console.log(count)
    let questionText = document.createTextNode(obj["title"]);
    questionTitle.appendChild(questionText);
    quizarea.appendChild(questionTitle);

//append answer in answer area
for(let i = 1 ; i<=4 ; i++ ){
    let answerdiv = document.createElement("div");
    answerdiv.className ="answer";
    //CREATE RADIO INPUT
    let raidoinput = document.createElement("input");
   
    raidoinput.name ='Questions';
    raidoinput.id = `answer_${i}`;
    raidoinput.type = 'radio';
    raidoinput .dataset.answer = obj[`answer_${i}`];
  
    // make first answer checked
    if( i === 1){
        raidoinput.checked = true;
    }
//appen d label
let labell = document.createElement("label");
// add for attribute
labell.htmlFor = `answer_${i}`;
// create label text
let labeltxt = document.createTextNode(obj[`answer_${i}`]);
//add text to label
labell.appendChild(labeltxt);
// ad to main div
answerdiv.appendChild(raidoinput);
answerdiv.appendChild(labell);
answersarea.appendChild(answerdiv);



}
   }
}
function checkAnswer(Ranswer, ccount) {
    let answerss = document.getElementsByName("Questions");
    let TheChoosenAnswer;
    
    for (let i = 0; i < answerss.length; i++) {
      if (answerss[i].checked) {
        TheChoosenAnswer = answerss[i].dataset.answer;
      }
    }
    
    console.log(`Choosen Answer Is: ${TheChoosenAnswer}`);
    console.log(`Correct Answer Is: ${Ranswer}`);
    
    if (Ranswer === TheChoosenAnswer) {
      console.log("Good answer");
      TheRightAnswer++; // Increment the correct variable name
    }
  }
function  handleBullets(){
    let sppan = document.querySelectorAll(".bullets .spans span");
    let arayafspan = Array.from(sppan);
    arayafspan.forEach((item,index) => {
if(currentindex == index){
    item.className = "on"
}

    })
}
function showResult (countt) {
let theResults;
    if(currentindex === countt  ) {
        quizarea.remove();
        answersarea.remove();
        submitanswer.remove();
        bullets.remove();
        area2.remove();
        if (TheRightAnswer > (countt/2)&& TheRightAnswer < countt ){
            theResults= `
            <span class = "good"> Good</span>${TheRightAnswer} From 
            ${countt} Is Right
            `
        }
        else if (TheRightAnswer === countt ) {
            theResults=
            `
            <span class = "perfect">Perfect</span>All Answers are Right
            `
        }
        else {
            theResults=` <span class ="perfect">Bad</span>${TheRightAnswer} From ${countt} `
        }
        {

        }
        resultscontainer.innerHTML = theResults;
        resultscontainer.style.padding ="10px";
        resultscontainer.style.margin ='10px'
        
    }
}
function countDown (duration , count){
    if(currentindex < count) 
{    let minutes , seconds ;
    timinterval = setInterval(function () {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        minutes = minutes < 10 ?  `0${minutes}` : minutes;
        seconds = seconds < 10 ?  `0${seconds}` : seconds;
        countdown.innerHTML = `${minutes}:${seconds}`;
        if(--duration < 0)
        {
            clearInterval(timinterval)
            submitanswer.click()
        }

    
    },1000 );
}
}
