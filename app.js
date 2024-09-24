const apiKey = "zOLvO11cDa60dhUWQwkj4rvPanFh2eKY0tW7EjSY";  // Your actual API key
const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

// Function to fetch today's Astronomy Picture of the Day
async function fetchAPOD() {
    try {
        showLoadingSpinner();
        const response = await fetch(baseUrl);
        const data = await response.json();
        displayImage(data);
    } catch (error) {
        console.log("Error fetching the image:", error);
    } finally {
        hideLoadingSpinner();
    }
}

// Function to fetch APOD image by selected date
async function fetchImageByDate() {
    const selectedDate = document.getElementById('search-date').value;
    const url = `${baseUrl}&date=${selectedDate}`;

    try {
        showLoadingSpinner();
        const response = await fetch(url);
        const data = await response.json();
        displayImage(data);
    } catch (error) {
        console.log("Error fetching the image:", error);
    } finally {
        hideLoadingSpinner();
    }
}

// Function to display the image and details
function displayImage(data) {
    const imageElement = document.getElementById("nasa-image");
    const titleElement = document.getElementById("image-title");
    const dateElement = document.getElementById("image-date");
    const descriptionElement = document.getElementById("image-description");

    imageElement.src = data.url;
    titleElement.innerText = data.title;
    dateElement.innerText = `Date: ${data.date}`;
    descriptionElement.innerText = data.explanation;
}

// Fetch today's APOD on page load
fetchAPOD();

// Show and hide loading spinner
function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Download image function
function downloadImage() {
    const imageElement = document.getElementById('nasa-image');
    const imageUrl = imageElement.src;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'nasa_apod_image.jpg';  // Set a default file name
    link.click();
}

// Space facts array and function
const spaceFacts = [
    "The Sun contains 99.86% of the mass in the solar system.",
    "Venus is the hottest planet in our solar system.",
    "A day on Venus is longer than a year on Venus.",
    "Neutron stars are incredibly dense; a sugar-cube-sized amount of neutron-star material weighs about a billion tons.",
    "There are more stars in the universe than grains of sand on Earth.",
    "Jupiter has over 75 moons."
];

function getSpaceFact() {
    const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
    document.getElementById('space-fact').innerText = randomFact;
}

$(document).ready(function() {
    // Initialize datepicker
    $('#datepicker').datepicker({
        format: 'yyyy-mm-dd', // Set the desired date format
        autoclose: true, // Close the datepicker automatically after selection
        todayHighlight: true, // Highlight today's date
        endDate: new Date() // Disable future dates
    });

    // Set the max attribute for the input date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('search-date').setAttribute('max', today);
});
