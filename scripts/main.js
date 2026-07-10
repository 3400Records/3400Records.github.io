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
    `;
    for(const [key, beatJSON] of Object.entries(loadedBeats)){
        // if("bsid" in value){ // BeatStars Embedding Method
        //     const embedFrame = document.createElement("iframe");
        //     embedFrame.setAttribute("class", "beats-card");
        //     embedFrame.src = `//www.beatstars.com/embed/track/?id=${value["bsid"]}`;
        //     beatsBox.appendChild(embedFrame);
        // }

        const beatsCard = document.createElement("div");
        beatsCard.setAttribute("class", "beats-card");

        if("title" in beatJSON){
            const beatsCardTitle = document.createElement("span");
            beatsCardTitle.setAttribute("class", "beats-card-title");
            beatsCardTitle.textContent = beatJSON["title"];

            beatsCard.appendChild(beatsCardTitle);
        }

        if("mediasrc" in beatJSON){
            if("tagged_mp3" in beatJSON["mediasrc"]){
                const beatsCardAudio = document.createElement("audio");
                beatsCardAudio.setAttribute("class", "beats-card-audio");
                beatsCardAudio.textContent = beatJSON["title"];

                const beatsCardAudioSrc = document.createElement("source");
                beatsCardAudioSrc.setAttribute("type", "audio/mpeg");
                beatsCardAudioSrc.setAttribute("src", beatJSON["mediasrc"]["tagged_mp3"]);
                
                beatsCardAudio.appendChild(beatsCardAudioSrc);
                beatsCard.appendChild(beatsCardAudio);
            }

            if("thumbnail" in beatJSON["mediasrc"]){
                const beatsCardThumbnail = document.createElement("img");
                beatsCardThumbnail.setAttribute("class", "beats-card-thumbnail");
                beatsCardThumbnail.setAttribute("src", beatJSON["mediasrc"]["thumbnail"]);

                beatsCard.appendChild(beatsCardThumbnail);
            }

        }

        beatsBox.appendChild(beatsCard);
    }
}

async function updateBeats(){
    await loadBeats();
    renderBeats();
}

// Update the beats on page load
// updateBeats();
