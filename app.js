
// Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

// Create Dino Object
let dinos = [];

// Access data from the Dino JSON file
function createDinosaurs() {
    // Using arrow function and chaining to make it more compact
    fetch('dino.json')
        .then(res => res.json())
        .then(data => {
            // Invoke Constructor function Dino
            dinos = data.Dinos.map(d => new Dino(
                d.species,
                d.weight,
                d.height,
                d.diet,
                d.where,
                d.when,
                d.fact
            ));

            // Call generateTiles function
            generateTiles();
        });
}

// Create Human Object
function createHuman(myArray) {
    // Destructuring the array
    const [name, feet, inches, weight, diet] = myArray;

    // Return data
    return {
        species: "Human",
        name,
        weight: Number(weight),
        height: Number(feet) * 12 + Number(inches),  //Convert to inches for consistancy
        diet
    };
}

// Assign element to variable  
const button = document.getElementById('btn');

// Add Listener to button and Use IIFE to get human data from form 
button.addEventListener('click', (function () {
    return function () {
        // Define and assign variables        
        const name = document.getElementById('name').value;
        const feet = document.getElementById('feet').value;
        const inches = document.getElementById('inches').value;
        const weight = document.getElementById('weight').value;
        const diet = document.getElementById('diet').value;

        // Define and assign values to array
        const myArray = [name, feet, inches, weight, diet];

        // Validate data from form and alert if any fields are blank
        if (myArray.some(i => i === "")) {
            alert("All fields have to be filled out!");
            return;
        }
        
        // Remove the form from the DOM
        removeForm();
        // Call createHuman function and assign to global variable-passing array in the function call
        window.human = createHuman(myArray);
        // Call createDinosaurs function
        createDinosaurs();
    };
})());

// These methods define variables to the prototype of Dino object
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function(human) {
    if (this.weight > human.weight) {
        return `${this.species} weighs more than you.`;
    }
    return `You weigh more than the ${this.species}.`;
};
    
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function(human) {
    if (this.height > human.height) {
        return `${this.species} is taller than you.`;
    }
    return `You are taller than the ${this.species}.`;
};
    
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function(human) {
    if (this.diet.toLowerCase() === human.diet.toLowerCase()) {
        return `You and the ${this.species} have the same diet.`;
    }
    return `You eat differently than the ${this.species}.`;
};

// Generate Tiles for each Dino in Array  
// Add tiles to DOM
function generateTiles() {
    const grid = document.getElementById('grid');
    grid.innerHTML = "";

    // Insert human into the middle of the dino array
    const tiles = [...dinos];
    tiles.splice(4, 0, human);  // human goes at index 4

    // Loop through Dino tiles
    tiles.forEach(item => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        // Check for Human-has to be handled separately
        if (item.species === "Human") {
            div.innerHTML = `
                <h3>${item.name}</h3>
                <img src="images/human.png">
            `;
        // Check for Pigeon-has to be handled separately
        } else if (item.species === "Pigeon") {
            div.innerHTML = `
                <h3>${item.species}</h3>
                <img src="images/pigeon.png">
                <p>All birds are dinosaurs.</p>
            `;
        // Handle the rest of the Dino tiles
        } else {
            const fact = chooseRandomFact(item);
            div.innerHTML = `
                <h3>${item.species}</h3>
                <img src="images/${item.species.toLowerCase()}.png">
                <p>${fact}</p>
            `;
        }
        // Append to the DOM
        grid.appendChild(div);
    });
}

// Remove form from screen
function removeForm () {
    document.getElementById('dino-compare').remove();
}

// On button click, prepare and display infographic- (Handled by IIFE above — function not needed here)

// Function to randomize the compare data
function chooseRandomFact(dino) {
    const facts = [
        dino.fact,
        dino.compareWeight(human),
        dino.compareHeight(human),
        dino.compareDiet(human)
    ];
    // Randomizing
    return facts[Math.floor(Math.random() * facts.length)];
}

// Reference: Udaciti Intermediate JavaScript course and suggestions from Copilot
