function usePoison()
{
    let chance = random(100)

    if(chance < 15)
    {
        if (currentPlayer === 1)
        {
            bluePoisoned = true;
            blueBonusHearts = 0;

            gunMessage = "POISON EFFECTIVE, blue is now poisoned!"
        }

        else
        {
            redPoisoned = true; 
            redBonusHearts = 0;

            gunMessage = "POISON EFFECTIVE, red is now poisoned!"
        }
    }

    else 
    {
        gunMessage = "POISON INEFFECTIVE, no effect occurred!"
    }

    console.log(gunMessage)

    switchPlayer();
}