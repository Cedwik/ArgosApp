
    $ cordova plugin add org.apache.cordova.geolocation
    $ cordova plugin ls
    [ 'org.apache.cordova.geolocation' ]
    $ cordova plugin rm org.apache.cordova.geolocation
 
 
 
 
 
 
 
 // Code pour afficher la carte 
 
 function GoogleMap(){
this.initialize = function(){
var map = showMap();
}

var showMap = function(){
var mapOptions = {
zoom: 4,
center: new google.maps.LatLng(poisiont.coords.latitude, position.coords.longitude),
mapTypeId: google.maps.MapTypeId.ROADMAP
}
 
var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
 
return map;
}
}