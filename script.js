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
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

// Function to update city times
function updateTimes(offset = 0) {
    const now = new Date();
    const berlinHours = now.getUTCHours() + 1 + offset; // Berlin is UTC+1
    const berlinMinutes = now.getUTCMinutes();

    berlinTime.textContent = formatTime(berlinHours % 24, berlinMinutes);

    // Update all other cities
    for (const city in cityOffsets) {
        if (city === "berlin") continue;
        const cityTime = new Date(now.getTime());
        const adjustedHours =
            (berlinHours + cityOffsets[city]) % 24; // Adjust hours based on offset
        const displayTime = formatTime(adjustedHours, berlinMinutes);

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
