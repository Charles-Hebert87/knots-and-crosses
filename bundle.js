"use strict";

var numOfLayers = 3;
var winningRequirement = 3;
var quadrantSize = 100;
var horizontalNumSidesOfSquare = 2;
var marginRight = 5;
var knot = "knot";
var cross = "cross";

var player = knot;

var getgameMatrix = function getgameMatrix() {
  var gameArray = [];

  for (var i = 0; i < numOfLayers; i++) {
    gameArray.push(new Array(numOfLayers));
  }

  return gameArray;
};

var createGameBoard = function createGameBoard() {

  createContainer(gameMatrix[0].length); //Should be a minimum of a 1 row of Y quadrants

  for (var y = 0; y < gameMatrix.length; y++) {
    for (var x = 0; x < gameMatrix[y].length; x++) {
      createQuadrant(x == x + 1 ? true : false, "Y" + y + "X" + x); //checks if last X quadrant
    }
    createLineBreak();
  }
};

var createContainer = function createContainer(yCount) {
  var node = document.createElement("div");
  node.className = "container";
  node.style.width = numOfLayers * quadrantSize + numOfLayers * horizontalNumSidesOfSquare + yCount * marginRight + "px";
  node.id = "containerId";
  document.body.appendChild(node);
};

var createQuadrant = function createQuadrant(lastXQuadrant, id) {
  var node = document.createElement("div");
  node.className = "quadrant";
  var quadrantPadding = lastXQuadrant ? 0 : marginRight;
  //MIMICS br size capacity
  node.style.marginRight = quadrantPadding + "px";
  node.style.width = quadrantSize + "px";
  node.style.height = quadrantSize + "px";
  node.id = id;

  document.getElementById("containerId").appendChild(node);

  node.addEventListener("click", selectQuadrant);
};

var createLineBreak = function createLineBreak() {
  var node = document.createElement("br");
  document.getElementById("containerId").appendChild(node);
};

var selectQuadrant = function selectQuadrant(event) {

  var node = document.getElementById("textDisplay");
  if (node.innerText == "Player turn") {
    var id = event.target.id;
    var _node = document.getElementById(id);
    if (verifySelection(_node)) {
      _node.classList.add(player);
      setKnotOrCross(id, player);
      setDisplayText("Computer turn");
      aiTurn();
    }
  }
};

var verifySelection = function verifySelection(node) {

  for (var i = 0; i < node.classList.length; i++) {
    var nodeClass = node.classList[i];
    if (nodeClass === knot || nodeClass === cross) {
      return false;
    }
  }
  return true;
};

var setKnotOrCross = function setKnotOrCross(id, knotOrCross) {
  var yCoord = id.charAt(1);
  var xCoord = id.charAt(3);

  gameMatrix[yCoord][xCoord] = knotOrCross;

  endGame();
};

var aiTurn = function aiTurn() {
  setTimeout(function () {
    var selectedANode = false;
    var targetId = void 0;
    var node = void 0;
    while (!selectedANode) {
      var yRandom = Math.floor(Math.random() * numOfLayers);
      var xRandom = Math.floor(Math.random() * numOfLayers);
      targetId = "Y" + yRandom + "X" + xRandom;

      node = document.getElementById(targetId);
      selectedANode = verifySelection(node);
      if (!verifyNodesLeft()) {
        break;
      }
    }

    node.classList.add(player === knot ? cross : knot);
    setKnotOrCross(targetId, player === knot ? cross : knot);

    setDisplayText("Player turn");
  }, 2000);
};

var verifyNodesLeft = function verifyNodesLeft() {

  for (var y = 0; y < gameMatrix.length; y++) {

    for (var x = 0; x < gameMatrix[y].length; x++) {
      if (gameMatrix[y][x] === undefined) {
        return true;
      }
    }
  }
  return false;
};

var endGame = function endGame() {

  var winner = checkForWin();

  if (winner != undefined && true) {
    setDisplayText(""); //winner or tie
    setTimeout(function () {
      //player = player === knot ? cross : knot;
      //gameMatrix = getgameMatrix();
    }, 5000);
  }
};

var checkForWin = function checkForWin() {

  var yWinCounter = void 0,
      xWinCounter = void 0,
      diagnalWinCounter = 0;

  for (var y = 0; y < gameMatrix.length; y++) {

    for (var x = 0; x < gameMatrix[y].length; x++) {

      var quadrant = gameMatrix[y][x];
      //TODO Implement algorithm to find victor
      if (quadrant === 1) {}

      if (true) {
        return "";
      }
    }
  }

  return undefined;
};

var setDisplayText = function setDisplayText(text) {
  var node = document.getElementById("textDisplay");
  node.innerText = text;
};

var gameMatrix = getgameMatrix();

createGameBoard();
setDisplayText("Player turn");

//console.log(gameMatrix);
