let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterName = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");


const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. &#x2620;"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = 'none';

    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerHTML = location.text;
}


/*
    TELEPORT
*/

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}



/*
    STORE
*/

function buyHealth(){
    if(gold >= 10){
        goldText.innerText = (gold -= 10);
        healthText.innerText = (health += 10);
    }
    else{
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon(){
    if(currentWeaponIndex < weapons.length-1){
        if (gold >= 30) {
            goldText.innerText = (gold -= 30);
            currentWeaponIndex ++;
            let newWeapon = weapons[currentWeaponIndex].name;
            text.innerText = `You now have a ${newWeapon}.`;
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory.join(", ");
        }
        else{
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } 
    else{
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }
    else{
        text.innerText = "Don't sell your only weapon!";
    }
}



function fightSlime (){
    fighting = 0;
    goFight();
}


function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}

/**
    LOGIC FIGHT
*/

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;

}

function isMonsterHit(){
    return Math.random() > .2 || health < 20;
}

function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name +"."
    // health -= monsters[fighting].level;
    health -= getMonsterAttackValue(monsters[fighting].level);

    if(isMonsterHit()){
        bonusdame = Math.floor(Math.random() * xp) + 1;
        monsterHealth -= weapons[currentWeaponIndex].power + bonusdame;
    }else{
        text.innerText += " You miss.";
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if(health <= 0){
        lose();
    }
    else if(monsterHealth <= 0){
        if(fighting === 2){
            winGame();
        }
        else{
            defeatMonster();
        }
    }

    if(Math.random() <= .1 && inventory.length !== 1){
        text.innerText += " Your " + inventory.pop() + " breaks."
        currentWeaponIndex--;
    }
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

/**
 GAME RESULT
*/

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}


/**
 FIGHT RESULT
*/

function defeatMonster(){
    gold += Math.floor(6.7 * monsters[fighting].level);
    xp += (monsters[fighting].level);
    xpText.innerText = xp;
    goldText.innerText = gold;
    update(locations[4]);
}

function restart(){
    xp = 0;
    gold = 50;
    health = 100;
    currentWeaponIndex = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    goldText.innerText = gold;
    healthText.innerText = health;
    goTown();
}

// easterEgg 
function easterEgg(){
    update(locations[7]);
}

function pick(guess) {
    const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 11));
    let output = `You picked ${guess}. Here are the random numbers:\n`;
    for (let i = 0; i < 10; i++) {
        output += `${numbers[i]}\n`;
    }
    text.innerText = output;

    if (numbers.includes(guess)) {
        text.innerText += "Right! You win 20 gold!";
        goldText.innerText = gold += 20;
    } else {
        text.innerText += "Wrong! You lose 10 health!";
        healthText.innerText = health -= 10;
        if (health <= 0) {
            lose();
        }
    }
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}
