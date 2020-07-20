const dateSelected = document.querySelector('.date-picker');
const image = document.querySelector('.nasa-apod');
const media = document.querySelector('.media');
const explanation = document.querySelector('.explanation');
const authorOfSource = document.querySelector('.author');

function getImage(date) {

    // Replace XXXX with APIkey
    const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod?api_key=XXXXXX&hd=true&date=" + date;

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

                    media.innerHTML = '<iframe width="500" height="315" ' + 
                    'src="' + processedJson.url + '"' +  'frameborder="0" allow="autoplay; encrypted-media"' +
                    'allowfullscreen></iframe>';

                    (processedJson.copyright === undefined) ? authorOfSource.innerHTML = "" : authorOfSource.innerHTML = "Copyright: " + processedJson.copyright;

                } else if (processedJson.media_type === "image"){
                    const img = document.createElement("img");
                    img.alt = processedJson.title;
                    img.src = processedJson.url;
                    img.className = "apod-image";
                    authorOfSource.innerHTML = "Taken by: " + processedJson.copyright;

                    media.innerHTML = '<img src="' + processedJson.url + '"' + 'alt = ' + processedJson.title + ' class="apod-image" />' ;
                }
                explanation.innerText = processedJson.explanation;
            }
        });
}


document.addEventListener('change', function dateChanged() {
    getImage(dateSelected.value);
});