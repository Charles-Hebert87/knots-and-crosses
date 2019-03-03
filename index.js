
const numOfLayers = 3;
const winningRequirement = 3;
const quadrantSize = 100;
const horizontalNumSidesOfSquare = 2;
const marginRight = 5;
const knot = "knot";
const cross = "cross";

let player = knot;


let getgameMatrix = () =>{
  let gameArray = [];
  
  for(let i = 0; i < numOfLayers; i++){
    gameArray.push(new Array(numOfLayers));
  }
  
  return gameArray;
}

let createGameBoard = () => {

  createContainer(gameMatrix[0].length);//Should be a minimum of a 1 row of Y quadrants

  for(let y = 0; y < gameMatrix.length; y++){
    for(let x = 0; x < gameMatrix[y].length; x++){
      createQuadrant(x == x + 1 ? true : false, `Y${y}X${x}`);//checks if last X quadrant
    }
    createLineBreak();
  }
}

let createContainer = (yCount) => {
  let node = document.createElement("div");
  node.className = "container";
  node.style.width = `${(numOfLayers * quadrantSize) + (numOfLayers * horizontalNumSidesOfSquare) + (yCount * marginRight)}px`;
  node.id = "containerId";
  document.body.appendChild(node); 
}

let createQuadrant = (lastXQuadrant, id) => {
  let node = document.createElement("div");
  node.className = "quadrant";
  let quadrantPadding = lastXQuadrant ? 0 : marginRight;
  //MIMICS br size capacity
  node.style.marginRight = `${quadrantPadding}px`;
  node.style.width = `${quadrantSize}px`;
  node.style.height = `${quadrantSize}px`;
  node.id = id;

  document.getElementById("containerId").appendChild(node); 

  node.addEventListener("click", selectQuadrant);
}

let createLineBreak = () => {
  let node = document.createElement("br");
  document.getElementById("containerId").appendChild(node); 
}

let selectQuadrant = (event) => {

  let node = document.getElementById("textDisplay"); 
  if (node.innerText == "Player turn"){
    let id = event.target.id;
    let node = document.getElementById(id);
    if (verifySelection(node)){   
      node.classList.add(player);
      setKnotOrCross(id, player);
      setDisplayText("Computer turn");
      aiTurn();
    }
  }
}

let verifySelection = (node) => {

  for(let i = 0; i < node.classList.length; i++){
    let nodeClass = node.classList[i];
    if (nodeClass === knot || nodeClass === cross){
      return false;
    }
  }
  return true;
}

let setKnotOrCross = (id, knotOrCross) => {
  let yCoord = id.charAt(1);
  let xCoord = id.charAt(3);
  
  gameMatrix[yCoord][xCoord] = knotOrCross;

  endGame();
}

let aiTurn = () => {
  setTimeout(() =>{
    let selectedANode = false;
    let targetId;
    let node;
    while(!selectedANode){
      let yRandom = Math.floor(Math.random() * numOfLayers);
      let xRandom = Math.floor(Math.random() * numOfLayers);
      targetId = `Y${yRandom}X${xRandom}`;
    
      node = document.getElementById(targetId);
      selectedANode = verifySelection(node);
      if(!verifyNodesLeft()){
        break;
      }
    }
  
    node.classList.add(player === knot ? cross : knot);
    setKnotOrCross(targetId, player === knot ? cross : knot);
  
    setDisplayText("Player turn");
  }, 2000);
}

let verifyNodesLeft = () => {

  for(let y = 0; y < gameMatrix.length; y++){

    for(let x = 0; x < gameMatrix[y].length; x++){
      if(gameMatrix[y][x] === undefined){
        return true;
      }   
    }
  }
  return false;
}

let endGame = () => {

let winner = checkForWin();

  if (winner != undefined && true){
    setDisplayText("");//winner or tie
    setTimeout(() => {
      //player = player === knot ? cross : knot;
      //gameMatrix = getgameMatrix();
    },
    5000);
  }
}

let checkForWin = () => {

  let yWinCounter, xWinCounter, diagnalWinCounter= 0;

  for(let y = 0; y < gameMatrix.length; y++){

    for(let x = 0; x < gameMatrix[y].length; x++){

      let quadrant = gameMatrix[y][x];
//TODO Implement algorithm to find victor
      if(quadrant === 1){

      }
      
      if (true){
        return "";
      }
    } 
  }

  return undefined;
}


let setDisplayText = (text) => {
  let node = document.getElementById("textDisplay"); 
  node.innerText = text;
}

let gameMatrix = getgameMatrix();

createGameBoard();
setDisplayText("Player turn");

//console.log(gameMatrix);
