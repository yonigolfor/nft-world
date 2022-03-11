
class Player {
    constructor(name) {
      this.name = name;
      this.points = 0;
      this.wins = 0;
      this.active = false;
    }
  }


let isBusy = false; //check if card already busy
let cardToKeep; // card to compare with another

let winnersArr = []; // arr to retain winner names and amount of wins
let playersArr = [];

let sumNumberOfCards;

let boardSize;



const gameDetailsContainer = 
`<div>First player name:</div>
<input type="text" id="first_player_name"><br><br>
<div>Second player name:</div>
<input type="text" id="second_player_name"><br><br>

<label for="cars">Select game size:</label>
<select id="game_size">
    <option value="4x4">4X4</option>
    <option value="5x5">5X5</option>
</select>
<br><br>

<button onclick="submitGameDetails()">Submit!</button>`;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  


let cardsArr = [`<img src="/assets/bnb.png" class="imgClass" alt="bnb">`,
`<img src="/assets/caradano.png" class="imgClass" alt="caradano">`,
`<img src="/assets/cro.png" class="imgClass" alt="cro">`,
`<img src="/assets/dogecoin.png" class="imgClass" alt="dogecoin">`,
`<img src="/assets/eth.png" class="imgClass" alt="eth">`,
`<img src="/assets/gala.png" class="imgClass" alt="gala">`,
`<img src="/assets/litecoin.png" class="imgClass" alt="litecoin">`,
`<img src="/assets/polygon.png" class="imgClass" alt="polygon">`,
`<img src="/assets/ripple-xrp-.png" class="imgClass" alt="ripple">`,
`<img src="/assets/Shiba_Inu_coin_logo.png" class="imgClass" alt="Shiba_Inu_coin_logo">`,
`<img src="/assets/solana.png" class="imgClass" alt="solana">`,
`<img src="/assets/Tether-logo.png" class="imgClass" alt="Tether">`];


function shuffleCards(boardSize, newCardsArr){
    newCardsArr = [...cardsArr];

    //בודק מה הגודל כדי לדעת כמה לעשות
   
    if(boardSize == '4x4'){
        sumNumberOfCards = 16;
        newCardsArr = newCardsArr.slice(0, 8);
      

        //multiply to get match card
        newCardsArr = [...newCardsArr, ...newCardsArr];
    }
        
    else {
        sumNumberOfCards = 25;
        //multiply to get match card
        newCardsArr = [...newCardsArr, ...newCardsArr];

        //add special - bitcoin
        newCardsArr.push(`<img src="/assets/bitcoin.png" alt="bitcoin">`);
    } 
   
    //shuffle
    newCardsArr = shuffle(newCardsArr);

    return newCardsArr;
    
  


}




function displayCards(boardSize){
    let newCardsArr = [];

    if(boardSize == '4x4'){ 
        newCardsArr = shuffleCards('4x4', newCardsArr);

        document.getElementById("cards_container5").innerHTML = '';
        document.getElementById("cards_container4").innerHTML = '';
        document.getElementById("cards_container4").innerHTML = 
        `<div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
               ${newCardsArr[0]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
               ${newCardsArr[1]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
               ${newCardsArr[2]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[3]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[4]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[5]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[6]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[7]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[8]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[9]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[10]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[11]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[12]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[13]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[14]}
            </div>       
        </div>
        <div class="card">
            <div class="card-back">
                <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
            </div>
            <div class="card-front">
                ${newCardsArr[15]}
            </div>       
        </div>`;
    } 
    else {
        
        newCardsArr = shuffleCards('5x5', newCardsArr);
       
        document.getElementById("cards_container4").innerHTML = '';
        document.getElementById("cards_container5").innerHTML = '';
        document.getElementById("cards_container5").innerHTML =
        `<div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
           ${newCardsArr[0]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
           ${newCardsArr[1]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
           ${newCardsArr[2]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[3]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[4]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[5]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[6]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[7]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[8]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[9]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[10]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[11]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[12]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[13]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[14]}
        </div>       
    </div>
    <div class="card">
        <div class="card-back">
            <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
        </div>
        <div class="card-front">
            ${newCardsArr[15]}
        </div>       
    </div>
    <div class="card">
    <div class="card-back">
        <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
    </div>
    <div class="card-front">
        ${newCardsArr[16]}
    </div>       
</div>
<div class="card">
<div class="card-back">
    <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
</div>
<div class="card-front">
    ${newCardsArr[17]}
</div>       
</div>
<div class="card">
<div class="card-back">
    <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
</div>
<div class="card-front">
    ${newCardsArr[18]}
</div>       
</div>
<div class="card">
<div class="card-back">
    <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
</div>
<div class="card-front">
    ${newCardsArr[19]}
</div>       
</div>
<div class="card">
<div class="card-back">
    <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
</div>
<div class="card-front">
    ${newCardsArr[20]}
</div>       
</div>
<div class="card">
<div class="card-back">
    <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
</div>
<div class="card-front">
    ${newCardsArr[21]}
</div>       
</div>
<div class="card">
<div class="card-back">
    <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
</div>
<div class="card-front">
    ${newCardsArr[22]}
</div>       
</div>
<div class="card">
<div class="card-back">
    <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
</div>
<div class="card-front">
    ${newCardsArr[23]}
</div>       
</div>
<div class="card">
<div class="card-back">
    <img class="bitcoin" src="https://imagizer.imageshack.com/img922/501/f4o2ga.png">        
</div>
<div class="card-front">
    ${newCardsArr[24]}
</div>       
</div>`;

       
    }
   
}


function removeDetails(){
    document.getElementById("game_details_container").innerHTML = '';
}

function checkIfBusy(card){
   
    if(card.classList.contains("visible"))
        return true;
    return false;
}


function flipCard(card){
    // add class visible
    card.classList.add('visible');

}

function addPointsToWinner(winnerIndex){
    playersArr[winnerIndex].wins++;
    if(winnersArr.length > 0){
        for (let i = 0; i < winnersArr.length; i++) { // if already in winnersArr
            if(winnersArr[i].name == playersArr[winnerIndex].name){
               
                winnersArr[i].wins++;
                return;
            }
        }
    }
    winnersArr.push({name: playersArr[winnerIndex].name, wins: 1});


}


function postGameScreen(postGameTitle){
    let winnerHtml;
    winnerHtml = `<div id="winner_announce" class="winner_announce">${postGameTitle}</div>`
    document.getElementById("winner_announce_container").innerHTML = winnerHtml;

}


function isGameEnd(){
    let winnerIndex = -1;
    let postGameTitle = `It's a DRAW!`;
    if(sumNumberOfCards == 0){ // case ended

        // add point to winner and add to winnersArr
        if(playersArr[0].points - playersArr[1].points != 0){ // case someone won

            if(playersArr[0].points > playersArr[1].points)
                winnerIndex = 0;
            
            else if (playersArr[1].points > playersArr[0].points)
                winnerIndex = 1;

            addPointsToWinner(winnerIndex);

        
            postGameTitle = `${playersArr[winnerIndex].name} WIN!`;
        }        

        // clean board
        document.getElementById("cards_container4").innerHTML = '';
        document.getElementById("cards_container5").innerHTML = '';

        document.getElementById('player1').classList.remove('active');
        document.getElementById('player2').classList.remove('active');
        
        postGameScreen(postGameTitle);

        // ask if play again + add winner name
        let buttonsAfterGame = `<div class="post_game_options">
        <button class="play_again_btn" onclick="playAgain()">Play again</button>
        <button class="cancel_game_btn" onclick="backHompage()">Back to home page</button>
    </div>`;
        document.getElementById("post_game_options_container").innerHTML = buttonsAfterGame;

        // print to console json of winnersArr
        console.log(JSON.stringify(winnersArr));

        //clean points
        playersArr[0].points = 0;
        playersArr[1].points = 0;
    } 
    else; // keep playing
}

function getActivePlayer(){
    if(playersArr[0].active)
        return 0;
    return 1;
}

function addPoint(){
    if(playersArr[0].active)
        playersArr[0].points++;
    else 
        playersArr[1].points++;
}


function switchTurn(){
    if(playersArr[0].active){
        playersArr[0].active = false;
        playersArr[1].active = true;

        document.getElementById('player1').classList.remove('active');
        document.getElementById('player2').classList.add('active');
        
    }
    else{
        playersArr[0].active = true;
        playersArr[1].active = false;

        document.getElementById('player1').classList.add('active');
        document.getElementById('player2').classList.remove('active');
    }
        

        
}

function updateUIpoints(){
    document.getElementById(`player${(getActivePlayer() + 1)}_points`).innerHTML = playersArr[getActivePlayer()].points;

}


function delayPromise() {
      return new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve();
          
        }, 900)
      });
    
  }
  

function checkMatch(card, cardToKeep){
    
    // check if both the same
    let card1type = card.getElementsByClassName("card-front")[0].innerHTML;
    let card2type = cardToKeep.getElementsByClassName("card-front")[0].innerHTML;
    
    let card1Arr, card2Arr;
    card1Arr = card1type.split("src");
    card2Arr = card2type.split("src");
    card1type = card1Arr[1];
    card2type = card2Arr[1];
 
    // == not work the best -> solution: includes
   if (card1type.includes(card2type) || card2type.includes(card1type)){
   
    // add points
    addPoint();
    updateUIpoints();

    //add to matchedCardsArr
    sumNumberOfCards -= 2;

    // check if game end => all cards are visible => newcardsArr length = matched cards length
    isGameEnd();

    return true;

   }

   else {

    // add delay
    delayPromise().then((val) => {
        // flip back
        card.classList.remove('visible');
        cardToKeep.classList.remove('visible');

        // turn to next player
        switchTurn();

        return false;

    
    })
    .catch(error => {
        console.error('onRejected function called: ' + error.message);
      })
   }
}





function addListenersToCards(cards){
    
    let isBusy, cardHtml;
    cards.forEach(card => {
        card.addEventListener('click', () => {
          
            // check if availble
            isBusy = checkIfBusy(card);

            if(isBusy);
            else {
    
            // flipCard
            flipCard(card);  
            cardHtml = card.getElementsByClassName("card-front")[0].innerHTML
            if(cardHtml.includes("bitcoin")){
                // keep visible
                card.classList.add("visible");
                addPoint();

                //add to html
                updateUIpoints();

                sumNumberOfCards -=1;
                isGameEnd();
            }

            else if(cardToKeep) // check if one already visible
            {
                // add set time out here
                checkMatch(card, cardToKeep);
             
                cardToKeep = null;
            }
                
            else cardToKeep = card;   

            }

            
            
        });
    });
}


function createPlayers(firstName, secondName){
    
    return [new Player(firstName), new Player(secondName)];

}

function displayPlayersUI(playersArr){
    let htmlP1, htmlP2;

    htmlP1 = `<div id="player1_name" class="player1_name">${playersArr[0].name}</div>
    <div id="player1_points" class="player1_points">${playersArr[0].points}</div>`;

    htmlP2 = `<div id="player2_name" class="player2_name">${playersArr[1].name}</div>
    <div id="player2_points" class="player2_points">${playersArr[1].points}</div>`;

    document.getElementById("player1").innerHTML = htmlP1;
    document.getElementById("player2").innerHTML = htmlP2;

    
}


function submitGameDetails(){
    let firstName, secondName;
    firstName = document.getElementById("first_player_name").value;
    secondName = document.getElementById("second_player_name").value;

    boardSize = document.getElementById("game_size").value;
    
    // delete game details 
    removeDetails();

    // display names and points
    playersArr = createPlayers(firstName, secondName);

    // display names UI
    displayPlayersUI(playersArr);

    // display cards
    displayCards(boardSize);
    
    let cards = Array.from(document.getElementsByClassName('card'));
    addListenersToCards(cards);

    //set turn to the first
    playersArr[0].active = true;

    document.getElementById('player1').classList.add('active');

   
}


function backHompage(){
    
    // להכניס לדוקיומנט של הדיטייליס את הדיטיילס
    document.getElementById("game_details_container").innerHTML = `<div>First player name:</div>
    <input type="text" id="first_player_name"><br><br>
    <div>Second player name:</div>
    <input type="text" id="second_player_name"><br><br>

    <label for="cars">Select game size:</label>
    <select id="game_size">
        <option value="4x4">4X4</option>
        <option value="5x5">5X5</option>
    </select>
    <br><br>

    <button onclick="submitGameDetails()">Submit!</button>`

    // clean playersArr 
    playersArr = [];

    //clean screen
    cleanPostGameScreen(false);
}

function playAgain(){
    // להעלות תמונות מחדש 
    displayCards(boardSize);

    let cards = Array.from(document.getElementsByClassName('card'));
    addListenersToCards(cards);

    //set turn to the first
    playersArr[0].active = true;

    cleanPostGameScreen(true);

    document.getElementById(`player1_points`).innerHTML = '0';
    document.getElementById(`player2_points`).innerHTML = '0';

    document.getElementById('player1').classList.add('active');


}

function cleanPostGameScreen(isPlayAgain){
    if(!isPlayAgain){
        document.getElementById("player1").innerHTML = '';
        document.getElementById("player2").innerHTML = '';
    }
   

    document.getElementById("winner_announce_container").innerHTML = '';
    document.getElementById("post_game_options_container").innerHTML = '';
}