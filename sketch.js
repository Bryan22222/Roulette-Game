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

}

//_____________________________________________________________________________
//DRAW
function draw()
{
  //background
  image(backdrop, 0, 0);

  //POVS
  if(currentPlayer === 1)
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
    
  else if (currentPlayer === 2)
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

  //DISPLAYS HEARTS LEFT
  drawHearts()

  //Revolver
  image(Revolver, 320, 280)

  //MedKit
  image(MedKit, 220, 270)

  //Blue name tag
  image(Blue, 670, 150)

  //Red name tag
  image(Red, 30, 140)
  
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
function healPlayer()
{
  let chance = random(100)

  if(currentPlayer === 1)
  {
    if(chance < 50)
    {
      blueBonusHearts++
      console.log("Bonus life awarded")
    }
    else
    {
      console.log("No bonus life awarded")
    }
  }

  else if (currentPlayer === 2)
  {
    if(chance < 50)
    {
      redBonusHearts++
      console.log("Bonus life awarded")
    }
    else
    {
      console.log("No bonus life awarded")
    }
  }

  //ENDS THE PLAYERS TURN EXTRA OR NO EXTRA LIFE
  if(currentPlayer === 1)
    {
      currentPlayer = 2
    }

    else
    {
      currentPlayer = 1
    }
}