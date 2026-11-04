//VARIABLES
// HAMMER USED OR NOT USED
let redHammerUsed = false
let blueHammerUsed = false

// HAND INJURY STATUS OF PLAYER
let redDisabledTurns = 0
let blueDisabledTurns = 0

// HAMMER FUNCTION
function UseHammer()
{
  // CHECK IF RED IS USING THE HAMMER
  if(currentPlayer === 1)
  {
    if(redHammerUsed)
    {
      gunMessage = "Red has already used the Hammer!";
      return;
    }

    redHammerUsed = true

    let chance = random(100)

    if(chance < 40)
    {
      gunMessage = "Blue dodged the Hammer!"
    }
    else
    {
      blueDisabledTurns = 1
      gunMessage = "HAMMER HIT! Blue's hand is injured!"
    }
  }

  // CHECK IF BLUE IS USING THE HAMMER
  else if(currentPlayer === 2)
  {
    if(blueHammerUsed)
    {
      gunMessage = "Blue has already used the Hammer!"
      return
    }

    blueHammerUsed = true

    let chance = random(100)

    if(chance < 40)
    {
      gunMessage = "Red dodged the Hammer!"
    }
    else
    {
      redDisabledTurns = 1;
      gunMessage = "HAMMER HIT! Red's hand is injured!"
    }
  }

  console.log(gunMessage);

  // END TURN
  switchPlayer();
}