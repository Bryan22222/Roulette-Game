//VARIABLES

let currentPlayer = 1; 

//PLAYER STATUS
let redAlive = true;
let blueAlive = true;

// PLAYER HEALTH
let redHearts = 2;
let blueHearts = 2;

//PLAYER BONUS
let redBonusHearts = 0; 
let blueBonusHearts = 0; 

//Poison Statues
let redPoisoned = false;
let bluePoisoned = false;

//SETUP
//___________________________________________________________________________
async function setup() 
{
  createCanvas(800, 400);

  //background
  backdrop = await loadImage('/Images/backdrop.png');

  //loading image for red guy alive
  RedGuyAlive = await loadImage('Images/RedGuyAlive.png')
  RedGuyAlive.resize(200,150);

  //loading red guy dead
  RedGuyDead = await loadImage('Images/RedGuyDead.png')
  RedGuyDead.resize(200,150);
  
  //loading blue guy alive
  BlueGuyAlive = await loadImage('Images/BlueGuyAlive.png')
  BlueGuyAlive.resize(200,150);

  //loading blue guy dead
  BlueGuyDead = await loadImage('Images/BlueGuyDead.png')
  BlueGuyDead.resize(200,150);

  //First two lives
  Heart = await loadImage('Images/Heart.png')
  Heart.resize(100, 100);

  //Extra lives
  ExtraHeart = await loadImage('Images/ExtraHeart.png')
  ExtraHeart.resize(100,100);

  //Revolver
  Revolver = await loadImage('Images/Revolver.png')
  Revolver.resize(160,160)

  //Medkit
  MedKit = await loadImage('Images/MedKit.png')
  MedKit.resize(140,140)

  //Blue name tag
  Blue = await loadImage('Images/Blue.png')
  Blue.resize(120,120)

  //Red name tag
  Red = await loadImage('Images/Red.png')
  Red.resize(120,120)

  //Ammo shells
  Ammo = await loadImage('Images/Amo.png')
  Ammo.resize(30,30)

  //Hammer
  Hammer = await loadImage('Images/Hammer.png')
  Hammer.resize(175,175)

  //Poison
  Poison = await loadImage('Images/Poison.png')
  Poison.resize(180,180)

  //puts a random amount of live and blank shells in the gun
  loadGun()

}

//_____________________________________________________________________________
//DRAW
function draw()
{
  //background
  image(backdrop, 0, 0);
  rect(275, 57, 270, 15)

  //POVS - you see the other player across the table
  //red's turn = blue across the table
  if(currentPlayer === 1)
  {
    if(blueHearts > 0)
    {
      image(BlueGuyAlive, 300, 75)
    }
    else
    {
      image(BlueGuyDead, 300, 75)
    }
  }

  //blue's turn = red across the table
  else if (currentPlayer === 2)
  {
    if(redHearts > 0)
    {
      image(RedGuyAlive, 300, 75);
    }
    else
    {
      image(RedGuyDead, 300, 75)
    }
  }

  //DISPLAYS HEARTS LEFT
  drawHearts()

  //Revolver
  image(Revolver, 320, 220)

  //MedKit
  image(MedKit, 220, 270)

  //Blue name tag
  image(Blue, 670, 150)

  //Red name tag
  image(Red, 30, 140)

  //Hammer
  image(Hammer, 335, 280)

  //SHOWS WHOSE TURN IT IS above their name tag
  drawTurn()

  //Gun messages and shells left
  drawGun()

  //Poison
  image(Poison, 400, 260)
  
}


//________________________________________________________________________________
//Functions

//temportary way of switching players before making the real 
//trigger instead of just hitting space bar. Also test to see if character and //hearts switch model after losing lives. Also test to see if bonus life gets awarded

function keyPressed()
{
  if( key === ' ')
  {
    if(currentPlayer === 1)
    {
      currentPlayer = 2
    }

    else
    {
      currentPlayer = 1
    }
  }

  if(key === 'r')
  {
    redHearts = max(0, redHearts - 1)
  }

  if(key === 'b')
  {
    blueHearts = max(0, blueHearts - 1)
  }

  if(key === 'h')
  {
    healPlayer()
  }

  if(key === 'm')
  {
    UseHammer()
  }
}



//SHOWS WHOSE TURN IT IS ABOVE THEIR NAME TAG
function drawTurn()
{
  stroke(0)
  strokeWeight(3)
  textAlign(CENTER, BOTTOM)
  textSize(22)

  if(currentPlayer === 1)
  {
    fill(255, 60, 60)
    text("RED'S TURN", 90, 140)
  }

  else if (currentPlayer === 2)
  {
    fill(80, 140, 255)
    text("BLUE'S TURN", 730, 150)
  }

  noStroke()
}

//KEEPS TRACK OF HEARTS PER PLAYER AND DRAWS THEM
function drawHearts()
{
  for(let i = 0; i < redHearts; i++)
  {
    image(Heart, i * 60, 300)
  }

  for(let i = 0; i < blueHearts; i++)
  {
    image (Heart, 700 - (i * 60), 300)
  }

  for(let i = 0; i < redBonusHearts; i++)
  {
    image(ExtraHeart, 30 + (i * 60), 245)
  }

  for(let i = 0; i < blueBonusHearts; i++)
  {
    image(ExtraHeart, 670 - (i * 60), 245)
  }
}


//FUNCTION THAT RUNS IF PLAYER CHOOSES THE MED KIT
//gives the current player one extra heart
function healPlayer()
{
  //CHECKS TO SEE IF PLAYER IS POISONED 
  if(currentPlayer === 1 && redPoisoned)
  {
    gunMessage = "Red is poisoned and cannot gain bonus hearts!"
  }

  else if(currentPlayer === 2 && bluePoisoned)
  {
    gunMessage = "Blue is poisoned and cannot gain bonus hearts!"
  }

  //CHECK IF PLAYER ALREADY HAS A BONUS HEART
  else if(currentPlayer === 1 && redBonusHearts >= 1)
  {
    gunMessage = "Red already has a bonus heart!";
  }

  else if(currentPlayer === 2 && blueBonusHearts >= 1)
  {
    gunMessage = "Blue already has a bonus heart!";
  }

  else
  {
    //50% CHANCE OF RECEIVING A BONUS HEART
    let chance = random(100);

    if(chance < 50)
    {
      if(currentPlayer === 1)
      {
        redBonusHearts++;
        gunMessage = "Red used the med kit: +1 heart!";
      }

      else
      {
        blueBonusHearts++;
        gunMessage = "Blue used the med kit: +1 heart!";
      }
    }

    else
    {
      gunMessage = currentPlayer === 1
        ? "Red used the med kit: No luck!"
        : "Blue used the med kit: No luck!";
    }
  }

  console.log(gunMessage);

  //ENDS THE PLAYER'S TURN
  switchPlayer();
}