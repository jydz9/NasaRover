var addCamera = document.getElementById("selectForm");


var array = [];
var imageArray = [];
var oldNum = '';
var newNum = '';
document.getElementById("dateMax").max = new Date().toISOString().split("T")[0];
// var maxDate = new Date();
// var day = maxDate.getDate();
// var month = maxDate.getMonth() + 1;
// var year = maxDate.getFullYear();

// maxDate = year + '-' + month + '-' + day;
// console.log(maxDate);
//document.getElementById('dateMax').max = `${year}-${month}-${day}`.toISOString().split('T')[0];;
// document.getElementById('dateMax').setAttribute("max",maxDate);

var max = document.getElementById("martianSol").value;

var maxSol = 0;
var array = {};
var imageArray = {};
var imageGallery = [];

//Not all camera will be used
var nasaCamera = {
    "FHAZ": "Front Hazard Avoidance Camera",
    "RHAZ": "Rear Hazard Avoidance Camera",
    "MAST": "Mast Camera",
    "CHEMCAM": "Chemistry and Camera Complex",
    "MAHLI": "Mars Hand Lens Imager",
    "MARDI": "Mars Descent Imager",
    "NAVCAM": "Navigation Camera",
    "PANCAM": "Panoramic Camera",
    "MINITES": "Miniature Thermal Emission Spectrometer (Mini-TES)"
}

//Gets the data based on martian sol number
function onload(){

    var api_key = 'WCOoA7Aj96059Hz1ccN81vkP1HDPviBBSt95wO9x';
    $.getJSON("https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=" + api_key, function(result){
        
        array = result.photo_manifest;
        
        if(result){
            maxSol = array.max_sol;
            
            var photosForManifest = array.photos;
            //console.log(array.photos[0].sol);
            console.log(array);
            photosForManifest.forEach(function(photo){
               imageArray[photo.sol] = photo; 
            });
            
        }
        else{
            window.alert("Could not pull over photos");
        }
        document.getElementById("loading").style.visibility = "visible";
    });
    //From https://www.w3schools.com/jsref/met_win_settimeout.asp
    setTimeout(function(){
        document.getElementById("loading").style.visibility = 'hidden';
    },4000);
    
}

//Get the cameras based on the martian sol number and set the cameras to select list
function getMartian(){
    var solNum = document.getElementById("martianSol").value;
        
    if(!imageArray[solNum]){
        window.alert("No photos available for this Sol");
    }
    else{
        var cameras = document.getElementById("selectedForm");
        
        var manifestCamera = imageArray[solNum].cameras;
        imageGallery = imageArray[solNum].cameras;
        
        addCamera.innerHTML = "<option value = ''>Please select after Sol input</option>";
        
        manifestCamera.forEach(function(camera){
            var getCamera = nasaCamera[camera];
            if(!getCamera){
                getCamera = "Unavailable";
            }
           addCamera.innerHTML += "<option value='" + camera + "'>"+nasaCamera[camera]+"</option>";
        });
        
    }
}

//Gets the first picture based on sol and camera. 
function getPictures(){
    var getSol = document.getElementById("martianSol").value;
        
    var cameras = document.getElementById("selectForm").value;
        
    var api_key = 'WCOoA7Aj96059Hz1ccN81vkP1HDPviBBSt95wO9x';
    var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=" + getSol + "&camera=" + cameras + "&api_key=" + api_key;
    
    
     $(document).ready(function(){
            loading.style.visibility = "visible"; 
    });

    
    if(imageArray[getSol]){
        $.getJSON(url, function(result){
            if(result){
                 $(document).ready(function(){
                    loading.style.visibility = "hidden"; 
                });
                
                console.log(result);
                var photos = result.photos
                
                for(var i = 0; i < imageGallery.length; i++){
                    imageGallery[i] = photos[0].img_src;
                }
                
                document.getElementById("picture").style.visibility = "visible";
                document.getElementById("picture").src = photos[0].img_src;
                
            }
        })
    }
}

function photoOfDay(){
    document.getElementById("titleMid").innerHTML = "Photo of the Day";
    var date = document.getElementById("dateMax").value;
    $(document).ready(function(){
        loading.style.visibility = "visible"; 
    });

    console.log(date);
    if(date == ""){
        window.alert("Select a date Before submitting");
    }
    else{
        let url = 'https://api.nasa.gov/planetary/apod?api_key=';
        let api_key = 'WCOoA7Aj96059Hz1ccN81vkP1HDPviBBSt95wO9x';
        let loading = document.getElementById("loading");

        fetch(url + api_key + '&date=' + date)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            let description = data.explanation;
            let title = data.title;
            let media = data.media_type;
            let getUrl = data.url;

            document.getElementById("launchDate").innerHTML = "Launch Date: " + date;
            document.getElementById("title").innerHTML = "Title: " + title;
            document.getElementById("description").innerHTML = description;
            document.getElementById("picture").style.visibility = "visible";

            if(media.localeCompare("video") == 0){
                document.getElementById("video").style.visibility = "visible";
                document.getElementById("video").src = getUrl;
                document.getElementById("picture").style.visibility = "hidden";
            }
            else if(media.localeCompare("image") == 0){
                document.getElementById("picture").style.visibility = "visible";
                document.getElementById("picture").src = getUrl;
                document.getElementById("video").style.visibility = "hidden";
            }

            $(document).ready(function(){
                loading.style.visibility = "hidden"; 
            });
            
        })
        .catch((error) => {
            console.log(error);
        });
    }
}


var slideIndex = 1;
function plusSlides(n){
    //document.getElementById("image").style.visibility = 'hidden';
    showSlides(slideIndex += n);
}


