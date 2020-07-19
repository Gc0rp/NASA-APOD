const dateSelected = document.querySelector('.date-picker');
const image = document.querySelector('.nasa-apod');
const explanation = document.querySelector('.explanation');
const imageCaption = document.querySelector('.author');

function getImage(date) {

    const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod?api_key=EBWHXc4NLOWbVtNGlvak9dLgEaw0B6y3fWbibRmP&hd=true&date=" + date;

    const promise = fetch(NASA_APOD_URL);

    promise
        .then(function extractJson(response) {
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(function addImageToDiv(processedJson){

            if(processedJson.code === 400){
                image.alt = "Image not found.";
                imageCaption.innerHTML = "Author not found.";
                processedJson.explanation = ""; 

            } else {

                if(processedJson.media_type === "video"){
                   
                } else if (processedJson.media_type === "image"){
                    const img = document.createElement("img");
                    img.alt = processedJson.title;
                    img.src = processedJson.url;
                    img.className = "nasa-apod";

                    imageCaption.innerHTML = "Taken by: " + processedJson.copyright;

                    console.log(img);
                }
                explanation.innerText = processedJson.explanation;
            }

            console.log(processedJson);
        });
}


document.addEventListener('change', function dateChanged() {
    console.log(dateSelected.value);

    getImage(dateSelected.value);
});