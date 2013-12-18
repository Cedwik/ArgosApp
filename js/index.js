/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
	
	
	function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

	
	// Mon code
	// function findMyLocation() {
            // Check the network connection
            // var networkConnection = navigator.network.connection.type;
            // if (networkConnection != null) {
                // Find your location
                // navigator.geolocation.getCurrentPosition(success, error);
            // }
            // else{
                // alert('Please check your network connection and try again.');
            // }
        // }
 
        // function success(position) {
            // var latitude = position.coords.latitude;
            // var longitude = position.coords.longitude;
        // }
 
        // function error(error) {
            // alert('Some error occured please try again.');
        // }
         
        // function getDetails(latitude, longitude) {
            // var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=false";
            // $.getJSON(url, function(data) {
                // var formatted_address = data['results'][0]['formatted_address'];
                // htmlData =  'Latitude : ' + latitude + '<br/>';
                // htmlData += 'Longitude : ' + longitude + '<br/>';
                // htmlData += 'Location : ' + formatted_address;
                // $("#location").html('<a href="#" class="btn" onclick="drawMap('+latitude+', '+longitude+');">'+htmlData+'</a>');
            // });
        // }
 
        // function drawMap(latitude, longitude) {
            // var centerLocation = new google.maps.LatLng(latitude, longitude);
 
            // var myOptions = {
                // center: centerLocation,
                // zoom: 16,
                // mapTypeId: google.maps.MapTypeId.ROADMAP
            // };
 
            // map_element = document.getElementById("map_canvas");
            // map = new google.maps.Map(map_element, myOptions);
 
            // var marker = new google.maps.Marker({
                // position: centerLocation,
                // title: "My Current Location!"
            // });
            // marker.setMap(map);
 
            // var mapwidth = $(window).width();
            // var mapheight = $(window).height();
            // $("#map_canvas").height(mapheight);
            // $("#map_canvas").width(mapwidth);
            // google.maps.event.trigger(map, 'resize');
        // }
 

	
	};
