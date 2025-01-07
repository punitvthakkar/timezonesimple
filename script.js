// Time offsets for cities relative to Berlin in hours
const cityOffsets = {
    berlin: 0,
    manchester: -1,
    mumbai: 4.5,
    sanfrancisco: -9,
};

// Get DOM elements
const berlinTime = document.getElementById("time-berlin");
const manchesterTime = document.getElementById("time-manchester");
const mumbaiTime = document.getElementById("time-mumbai");
const sanFranciscoTime = document.getElementById("time-sanfrancisco");
const timeSlider = document.getElementById("time-slider");

// Function to format time
function formatTime(hours, minutes) {
    const formattedHours = String(Math.floor(hours) % 24).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
}

// Function to update city times
function updateTimes(offset = 0) {
    const now = new Date();
    const berlinHours = now.getUTCHours() + 1 + offset; // Berlin is UTC+1
    const berlinMinutes = now.getUTCMinutes();

    berlinTime.textContent = formatTime(berlinHours, berlinMinutes);

    // Update all other cities
    for (const city in cityOffsets) {
        if (city === "berlin") continue;
        const cityTime = new Date(now.getTime());
        const adjustedHours =
            berlinHours + cityOffsets[city]; // Adjust hours based on offset
        const adjustedMinutes =
            berlinMinutes + (adjustedHours % 1) * 60; // Handle fractional hours
        const normalizedMinutes = adjustedMinutes % 60;
        const normalizedHours =
            adjustedHours + Math.floor(adjustedMinutes / 60);

        const displayTime = formatTime(normalizedHours, normalizedMinutes);

        if (city === "manchester") manchesterTime.textContent = displayTime;
        if (city === "mumbai") mumbaiTime.textContent = displayTime;
        if (city === "sanfrancisco") sanFranciscoTime.textContent = displayTime;
    }
}

// Initial load
updateTimes();

// Event listener for slider
timeSlider.addEventListener("input", (e) => {
    const sliderValue = parseInt(e.target.value);
    updateTimes(sliderValue);
});
