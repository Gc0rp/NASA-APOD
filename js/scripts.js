const dateSelected = document.querySelector('.date-picker');
const image = document.querySelector('.nasa-apod');
const explanation = document.querySelector('.explanation');

function getImage(date) {

    const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod?api_key=EBWHXc4NLOWbVtNGlvak9dLgEaw0B6y3fWbibRmP&hd=true&date=" + date;

    const promise = fetch(NASA_APOD_URL);

    promise
        .then(function extractJson(response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function addImageToDiv(processedJson){
            image.src = processedJson.url;
            image.alt = processedJson.title;

            explanation.innerText = processedJson.explanation;
            console.log(processedJson);
        });
}


document.addEventListener('change', function dateChanged() {
    console.log(dateSelected.value);

    getImage(dateSelected.value);
});
