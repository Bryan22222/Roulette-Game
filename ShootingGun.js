//GUN VARIABLES

//the shells in the gun, in order. true = live, false = blank
let chamber = [];

//how many of each got loaded this round (shown to players)
let liveLoaded = 0;
let blankLoaded = 0;

//true after the player clicks the revolver, waiting for them to pick a target
let gunPickedUp = false;

//text shown at the top of the screen
let gunMessage = "";

let gameOver = false;

//________________________________________________________________________________
//LOADS THE GUN WITH A RANDOM AMOUNT OF LIVE AND BLANK SHELLS
function loadGun()
{
  //at least 1 live and 1 blank, up to 4 of each
  liveLoaded = floor(random(1, 5));
  blankLoaded = floor(random(1, 5));

  chamber = [];

  for(let i = 0; i < liveLoaded; i++)
  {
    chamber.push(true);
  }

  for(let i = 0; i < blankLoaded; i++)
  {
    chamber.push(false);
  }

  //mix up the order so nobody knows which shell is next
  chamber = shuffle(chamber);

  gunMessage = "Gun loaded: " + liveLoaded + " live, " + blankLoaded + " blank";
  console.log(gunMessage);
}

//________________________________________________________________________________
//FIRES THE NEXT SHELL. target is 1 for red or 2 for blue
function shootGun(target)
{
  let shooterName = currentPlayer === 1 ? "Red" : "Blue";
  let targetName = target === 1 ? "Red" : "Blue";
  let shotSelf = target === currentPlayer;
  let isInjured = false;

  //CHECKS IF PLAYER HAS AN INJURED HAND SO THEY CAN'T SHOOT AND PREVENTS THE FUNCTION FROM RUNNING
  if(currentPlayer === 1 )
  {
    isInjured = redDisabledTurns > 0;
  }
  else
  {
    isInjured = blueDisabledTurns > 0;
  }

  if(isInjured)
  {
    gunMessage = shooterName + " is injured and cannot shoot this turn.";
    console.log(gunMessage);
    return;
  }

  //takes the first shell out of the chamber
  let isLive = chamber.shift();

  if(isLive)
  {
    takeDamage(target);
    gunMessage = "BANG! " + shooterName + " shot " + targetName + " with a live shell!";
    switchPlayer();
  }

  else
  {
    if(shotSelf)
    {
      //blank on yourself = you get to go again
      gunMessage = "*click* Blank! " + shooterName + " goes again.";
    }

    else
    {
      gunMessage = "*click* Blank! " + targetName + "'s turn.";
      switchPlayer();
    }
  }

  console.log(gunMessage);

  checkGameOver();

  //reload when the gun is empty
  if(!gameOver && chamber.length === 0)
  {
    loadGun();
  }
}

//________________________________________________________________________________
//REMOVES A HEART. bonus hearts get used up first
function takeDamage(player)
{
  if(player === 1)
  {
    if(redBonusHearts > 0)
    {
      redBonusHearts--;
    }
    else
    {
      redHearts = max(0, redHearts - 1);
    }
  }

  else if(player === 2)
  {
    if(blueBonusHearts > 0)
    {
      blueBonusHearts--;
    }
    else
    {
      blueHearts = max(0, blueHearts - 1);
    }
  }
}

//________________________________________________________________________________
function switchPlayer()
{
  if(currentPlayer === 1) 
  {
    if(redDisabledTurns > 0)
    {
      redDisabledTurns--;
      console.log("Red is is still healing for" + redDisabledTurns + "turns!")
    }

    currentPlayer = 2;
  }

  else
  {
    if(blueDisabledTurns > 0)
    {
      blueDisabledTurns--;
      console.log("Blue is is still healing for" + blueDisabledTurns + "turns!")
    }

    currentPlayer = 1;
  }
} 

//________________________________________________________________________________
function checkGameOver()
{
  if(redHearts <= 0)
  {
    gameOver = true;
    redAlive = false;
    gunMessage = "Red is dead. BLUE WINS!";
  }

  else if(blueHearts <= 0)
  {
    gameOver = true;
    blueAlive = false;
    gunMessage = "Blue is dead. RED WINS!";
  }
}

//________________________________________________________________________________
//CLICKING: revolver to pick up the gun, then a name tag to pick who to shoot
function mousePressed()
{
  //converts the click from window pixels to the 800x400 grid
  let gameMouseX = mouseX / gameScale;
  let gameMouseY = mouseY / gameScale;

  if(gameOver)
  {
    return;
  }

  //clicked the revolver (middle of the table)
  if(gameMouseX > 350 && gameMouseX < 460 && gameMouseY > 260 && gameMouseY < 340)
  {
    gunPickedUp = !gunPickedUp;
    return;
  }

  //clicked the med kit
  if(gameMouseX > 250 && gameMouseX < 330 && gameMouseY > 325 && gameMouseY < 395)
  {
    gunPickedUp = false;
    healPlayer();
    return;
  }

  if(gunPickedUp)
  {
    //clicked the red name tag
    if(gameMouseX > 30 && gameMouseX < 150 && gameMouseY > 140 && gameMouseY < 260)
    {
      gunPickedUp = false;
      shootGun(1);
    }

    //clicked the blue name tag
    else if(gameMouseX > 670 && gameMouseX < 790 && gameMouseY > 150 && gameMouseY < 270)
    {
      gunPickedUp = false;
      shootGun(2);
    }
  }

  //clicked the hammer
  if(gameMouseX > 335 && gameMouseX < 435 && gameMouseY > 280 && gameMouseY < 455)
  {
    gunPickedUp = false;
    UseHammer();
    return;
  }

  if(gameMouseX > 440 && gameMouseX < 620 && gameMouseY > 260 && gameMouseY < 440)
  {
    gunPickedUp = false; 
    usePoison();
    return;
  }
}

//________________________________________________________________________________
//DRAWS THE MESSAGE, SHELLS LEFT, AND TARGET BOXES WHEN AIMING
function drawGun()
{
  //message at the top
  fill(255);
  stroke(0);
  strokeWeight(3);
  textAlign(CENTER, TOP);
  textSize(20);
  text(gunMessage, GAME_WIDTH / 2, 10);

  //one ammo icon for each shell left (doesn't show which are live)
  for(let i = 0; i < chamber.length; i++)
  {
    image(Ammo, GAME_WIDTH / 2 - (chamber.length * 35) / 2 + i * 35, 35, 50, 50);
  }

  //when the gun is picked up, outline the name tags you can shoot
  if(gunPickedUp)
  {
    noFill();
    stroke(255, 255, 0);
    strokeWeight(4);
    rect(30, 140, 120, 120);
    rect(670, 150, 120, 120);

    noStroke();
    fill(255, 255, 0);
    textSize(16);
    text("Click a name tag to shoot", GAME_WIDTH / 2, 75);
  }

  noStroke();
}
