let blackjackGame = {
'you' : {'scorespan' : '#your-blackjack-result','div':'#your-box','score':0 },
'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
'card' :['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A' :[1,11] } ,
'Wins' :0,
'Losses' :0,
'Draws' :0 , 
'isStand' : false ,
'turnsOver': false ,
};

console.log(blackjackGame['cardsMap']);

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer']
console.log (DEALER);
const hitsound = new Audio ('sounds/swish.m4a');
const winSound = new Audio (' sounds/cash.mp3' ) ;
const lossSound = new Audio (' sounds/aww.mp3' ) ;

document.querySelector('#blackjack-deal-button').addEventListener( 'click' ,  blackjackdeal );
document.querySelector('#blackjack-stand-button').addEventListener( 'click' ,  dealerLogic );
document.querySelector('#blackjack-hit-button').addEventListener('click' , blackjackHit) ;

function blackjackHit(){

    if (blackjackGame['isStand'] === false ){

    
    let card = randomCard();
    console.log(card);
    showCarD(YOU,card) ;
    updateCard(card,YOU);
    showScore(YOU);
    console.log(YOU['score']); 
}} ;
function randomCard () { 
    let randomIndex = (Math.floor( Math.random()*13)); 
    
        return blackjackGame.card[randomIndex];
    };


function showCarD(activeplayer,card){ 
    if (activeplayer['score']<=21) { 
    let cardImage = document.createElement('img');
    cardImage.src=`images/${card}.png` ;
    cardImage.setAttribute('width', '100%');
    cardImage.setAttribute('id', 'imigi');
    document.querySelector(activeplayer['div']).appendChild(cardImage);
    
    hitsound.play();
} 
};

function blackjackdeal (){ 
    if (blackjackGame['turnsOver'] === true ) { 

        blackjackGame['isStand'] = false ;
   
    //showResult(computeWinner());
let yourImage = document.querySelector('#your-box').querySelectorAll('img');
let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');

for (i=0; i<yourImage.length ; i++) {
    yourImage[i].remove();
}

for ( i=0; i<dealerImage.length ; i++){

    dealerImage[i].remove();
}; 
YOU['score'] = 0 ;
DEALER['score'] = 0;
console.log(yourImage);
document.querySelector('#your-blackjack-result').textContent = 0;
document.querySelector('#dealer-blackjack-result').textContent = 0 ;
document.querySelector('#your-blackjack-result').style.color ='white';
document.querySelector('#dealer-blackjack-result').style.color ='white';
document.querySelector('#blackjack-result').textContent= 'Rejoue contre Khalil l\'imbattable';
document.querySelector('#blackjack-result').style.color = ' red';

blackjackGame['turnsOver'] = true ;
}
 } ;

function updateCard(card,activeplayer){
    if ( card==='A'){
        if(activeplayer['score']+blackjackGame['cardsMap'][card][1] <=21 ){
            activeplayer['score']+=blackjackGame['cardsMap'][card][1];
        } else { 
            activeplayer['score']=+blackjackGame['cardsMap'][card][0];
        }
    } else { 
    activeplayer['score']+=blackjackGame['cardsMap'][card]
    }
};

function showScore(activeplayer){
    if(activeplayer['score'] > 21 ){

 document.querySelector(activeplayer['scorespan']).textContent = 'BUST' ; 
 document.querySelector(activeplayer['scorespan']).style.color = 'red';
  } else {

  
    document.querySelector(activeplayer['scorespan']).textContent=  activeplayer['score'] ;
  }  
};

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve , ms));

}

async function dealerLogic(){
    blackjackGame['isStand'] = true ;

    while ( DEALER['score']<16 && blackjackGame['isStand'] === true){

    
let card = randomCard () ;
showCarD(DEALER,card);
updateCard(card,DEALER);
showScore(DEALER);
await sleep (1000); 
    }
    blackjackGame['turnsOver'] = true ;
    let winner = computeWinner();
    showResult(winner);
    console.log(blackjackGame['turnsOver']);
}  ;

//compute winner and return who won
function computeWinner(){ 
let winner ;
if(YOU['score'] <= 21) {

if ( YOU['score'] > DEALER['score'] || ( DEALER['score'] >21 )){
    console.log('you won ! ') ; 
    blackjackGame['Wins']++;
    winner = YOU ; 
} else if (YOU['score'] <DEALER['score']) {
    blackjackGame['Losses']++;
    console.log('you lost !') ; 
    winner = DEALER ;
} else if (YOU['score']=== DEALER['score']){
    blackjackGame['Draws']++;
    console.log('you drew !');
}
} else if (YOU['score'] > 21 && DEALER['score'] <= 21 ){
    blackjackGame['Losses']++;
    winner = DEALER ;
} else if (YOU['score']> 21 && DEALER['score']> 21){
    blackjackGame['Draws']++;
    console.log('you drew !');
} 
console.log( 'the winner is' , winner ) ;
console.log(blackjackGame);
return winner ; 
} ;

function showResult (winner) {
let message , messageColor ;

if (blackjackGame['turnsOver'] ===true ) {


if ( winner === YOU) { 
    document.querySelector('#wins').textContent = blackjackGame['Wins'];
    message ='you won !'
    messageColor = 'green';
    winSound.play();
} else if(winner === DEALER) { 
    document.querySelector('#losses').textContent = blackjackGame['Losses'];
      message = 'you lost !';
      messageColor = 'red' ;
      lossSound.play() ;
} else { 
    document.querySelector('#draws').textContent = blackjackGame['Wins'];

    message = 'you drew !';
    messageColor = 'black' ; 
}

document.querySelector('#blackjack-reult').textContent = message ;
document.querySelector('#blackjack-result').style.color = messageColor;

} } ;


/*let card = randomCard();
    console.log(card);
    showCarD(YOU ,card) ;
    updateCard(card,YOU);
    showScore(YOU);
    console.log(YOU['score']); */
