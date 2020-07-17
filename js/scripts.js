const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod?api_key=EBWHXc4NLOWbVtNGlvak9dLgEaw0B6y3fWbibRmP&hd=true&date=2020-06-02";

const addImage = document.querySelector('.nasa-apod');


const promise = fetch(NASA_APOD_URL);


promise
    .then(function extractJson(response) {
        const processingPromise = response.json();
        return processingPromise;
    })
    .then(function addImageToDiv(processedJson){
        addImage.src = processedJson.hdurl;
        addImage.alt = processedJson.title;
        console.log(processedJson);
    });

