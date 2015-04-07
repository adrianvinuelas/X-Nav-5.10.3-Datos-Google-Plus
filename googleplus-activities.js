// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey = 'AIzaSyBN2ArBXw7EhHYIn7bS10_oExXAnv_NDV4';

// Use a button to handle authentication the first time.
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  makeApiCall();
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client.load('plus', 'v1', function() {
    var request = gapi.client.plus.activities.list({
      'userId': '108086881826934773478',
      //'userId': '103846222472267112072',
      'collection': 'public'
      // For instance: 
      //'userId': '+GregorioRobles'
    });
    request.execute(function(resp) {
      var activities = "";
      //creo el titulo
      var heading = document.createElement('h1');
      heading.appendChild(document.createTextNode("Actividades de " + resp.items[0].actor.displayName));
      document.getElementById('content').appendChild(heading);
      //creo la imagen de la persona
      var image = document.createElement('img');
      image.src = resp.items[0].actor.image.url;
      image.width = 150;
      image.height = 150;
      document.getElementById('content').appendChild(image);
      //creo la lista de actividades mediante un bucle
      for(i=0;i < resp.items.length; i++){
        var activity = document.createElement('li');
        if(resp.items[i].location != undefined){
          lat = document.createElement('ul');
          longi = document.createElement('ul');
          activity.appendChild(document.createTextNode(i+1+ ". " + resp.items[i].title));
          lat.appendChild(document.createTextNode("LATITUD = " + resp.items[i].location.position.latitude));
          longi.appendChild(document.createTextNode("LONGITUD = " + resp.items[i].location.position.longitude));
          document.getElementById('content').appendChild(activity);
          document.getElementById('content').appendChild(lat);
          document.getElementById('content').appendChild(longi);
        }else{
          activity.appendChild(document.createTextNode(i+1+ ". " + resp.items[i].title));
          document.getElementById('content').appendChild(activity);
        }
        
      }
    });
  });
}