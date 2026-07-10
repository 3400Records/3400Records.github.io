// function fetchUrlBeats(){
//     const urlParams = new URLSearchParams(window.location.search);
//     const allParamsList = Object.fromEntries(urlParams.entries());

    
// }

const loadedBeats = {};

async function fetchBeatsJSON(){
    const response = await fetch("./beats/beats.json");

    try {
        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
        }
        const beatJSON = await response.json();
        return beatJSON;
    } catch(error) {
        console.log(`Error Fetching Beats: ${error.message}`);
        return {};
    }
}

async function loadBeats() {
    const beatsJSON = await fetchBeatsJSON();
    for(const [key, value] of Object.entries(beatsJSON)){
        loadedBeats[key] = value;
    }
}

function renderBeats() {
    const beatsBox = document.getElementById("beats-box");
    if(!beatsBox){return;}
    beatsBox.innerHTML = `
        <span class="beats-span">Beats For Sale</span>
        <div class="beats-button" onclick="updateBeats();">Reveal Beats</div>
    `;
    for(const [key, value] of Object.entries(loadedBeats)){
        if("bsid" in value){ // BeatStars Embedding Method
            const embedFrame = document.createElement("iframe");
            embedFrame.setAttribute("class", "beats-card");
            embedFrame.src = `//www.beatstars.com/embed/track/?id=${value["bsid"]}`;
            beatsBox.appendChild(embedFrame);
        }
    }
}

async function updateBeats(){
    await loadBeats();
    renderBeats();
}

