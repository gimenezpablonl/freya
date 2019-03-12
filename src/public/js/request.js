const key = "RGAPI-f7db5d10-5f89-4ecf-87cd-b330d3572adb";
var url = "https://la2.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" + key;
var body = document.getElementById("freeChamps");
var tabla = document.createElement("table");
var tblBody = document.createElement("tbody");
var actual_JSON;
var champs;
var responseText;
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../champions.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

var request = createCORSRequest('GET',url);
if (!request){
    throw new Error('CORS not supported');
}

request.onload = function(){
    champs = request.response.freeChampionIds;
    console.log(actual_JSON);
    var hilera = document.createElement("tr");
    for (var j = 0; j < 14; j++) {
      var celda = document.createElement("td");
      var image = document.createElement("img");
      var auxiliar = actual_JSON.find(function(element){
          return element.key == champs[j]; 
      });
      image.src = auxiliar.icon;
      celda.appendChild(image);
      hilera.appendChild(celda);
    }
    tblBody.appendChild(hilera);
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "2");
    console.log(champs);
}



   request.onerror = function() {
     console.log('There was an error!');
   };
request.responseType = 'json';
request.send();

function init (){
    loadJSON(function(response){
        actual_JSON = JSON.parse(response);
        
    });
}

init();