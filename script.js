let visitedPlaces = [];
let stageHistory = []; // Track the history of visited stages
// Define the stages of the game
const stages = {
    start: {
        text: "You are an astronaut approaching a newly discovered planet. Where will you land?",
        choices: [
            { text: "Safe Zone", consequence: "safeZone" },
            { text: "Unknown Territory", consequence: "unknownTerritory" },
            { text: "Spacewalk", consequence: "spacewalk" },
            { text: "Return to Earth", consequence: "returnToEarth" }
        ],
        image: "images/start.png" // Replace with actual image URL
    },
    safeZone: {
        text: "You've landed in the Safe Zone. What will you explore first?",
        choices: [
            { text: "Explore Crater", consequence: "exploreCrater" },
            { text: "Study Flora", consequence: "studyFlora" }
        ],
        image: "images/safe_zone.png"
    },
    unknownTerritory: {
        text: "You're in the Unknown Territory. What happens next?",
        choices: [
            { text: "Encounter Alien Life", consequence: "encounterAlien" },
            { text: "Get Lost", consequence: "getLost" }
        ],
        image: "images/unknown_territory.png"
    },
    spacewalk: {
        text: "You're on a spacewalk. What do you encounter?",
        choices: [
            { text: "Repair Ship", consequence: "repairShip" },
            { text: "Encounter Space Anomaly", consequence: "spaceAnomaly" }
        ],
        image: "images/spacewalk.png"
    },
    returnToEarth: {
        text: "It's time to return to Earth. How do you return?",
        choices: [
            { text: "Hero's Welcome", consequence: "herosWelcome" },
            { text: "Report Findings", consequence: "reportFindings" }
        ],
        image: "images/return_earth.png"
    },
    // Ending stages
    exploreCrater: {
        text: "You discovered a rare mineral in the crater!",
        choices: [],
        image: "images/explore_crater.png"
    },
    studyFlora: {
        text: "You found unknown plant life!",
        choices: [],
        image: "images/study_flora.png"
    },
    encounterAlien: {
        text: "You made peaceful contact with alien life!",
        choices: [],
        image: "images/encounter_alien.png"
    },
    getLost: {
        text: "You got lost, but a rescue mission is underway.",
        choices: [],
        image: "images/get_lost.png"
    },
    repairShip: {
        text: "You successfully repaired your ship!",
        choices: [],
        image: "images/repair_ship.png"
    },
    spaceAnomaly: {
        text: "You got transported to a distant galaxy!",
        choices: [],
        image: "images/space_anomaly.png"
    },
    herosWelcome: {
        text: "You received a hero's welcome upon returning to Earth!",
        choices: [],
        image: "images/heros_welcome.png"
    },
    reportFindings: {
        text: "Your findings have advanced scientific understanding!",
        choices: [],
        image: "images/report_findings.png"
    }
};

function startGame() {
    visitedPlaces = [];
    stageHistory = [];
    updatePage('start');
}

function updatePage(stageKey) {
    currentStage = stageKey;
    const stage = stages[stageKey];

    // Update visited places
    if (!visitedPlaces.includes(stageKey) && stageKey !== 'start') {
        visitedPlaces.push(stageKey);
    }

    // Update stage history
    stageHistory.push(stageKey);

    document.getElementById('story').innerText = stage.text + (stageKey === 'reportFindings' ? visitedPlaces.join(', ') + '.' : '');
    updateChoices(stage.choices);
    updateImage(stage.image);
}

function updateChoices(choices) {
    const choicesSection = document.getElementById('choices');
    choicesSection.innerHTML = ''; // Clear existing choices

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = function() { updatePage(choice.consequence); };
        choicesSection.appendChild(button);
    });

    // Add 'Start New Game' button at ending stages
    if (choices.length === 0) { // Indicates an ending stage
        const newGameButton = document.createElement('button');
        newGameButton.innerText = 'Start New Game';
        newGameButton.onclick = startGame;
        choicesSection.appendChild(newGameButton);
    }
}

function updateImage(imageUrl) {
    const imageSection = document.getElementById('image-section');
    imageSection.innerHTML = ''; // Clear existing image
    const image = new Image();
    image.src = imageUrl;
    imageSection.appendChild(image);
}

document.addEventListener('DOMContentLoaded', startGame);