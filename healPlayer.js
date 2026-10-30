if(mouseIsPressed && mouseX > 200 && mouseX < 250 && mouseY > 230 && mouseY < 280)
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