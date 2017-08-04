var map;
var corvallis = {lat: 44.57, lng: -123.28};

/**
 * The CenterControl adds a control to the map that recenters the map on
 * Chicago.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '12px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Select an option';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('select');
  controlText.setAttribute("id", "LocationAccessDropDown");
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText); 
  
  // create option1 drop down element
  var z = document.createElement("option");
  z.setAttribute("value", "1");
  var t = document.createTextNode("Enter Billing Info");
  z.appendChild(t);
  controlText.appendChild(z);
  
  // create option2 drop down element
  z = document.createElement("option");
  z.setAttribute("value", "2");
  t = document.createTextNode("Enter Model and Make");
  z.appendChild(t);
  controlText.appendChild(z);

  z = document.createElement("option");
  z.setAttribute("value", "3");
  t = document.createTextNode("Enter Gas Station Preferences");
  z.appendChild(t);
  controlText.appendChild(z);

  infoWindow = new google.maps.InfoWindow;

  
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('change', function() {
    //commenting this out for now. we'll need the general structure for week 2
/*    var selected = document.getElementById("LocationAccessDropDown");
    
    if(selected.value == "1")
    {
      // debug pop-up box. remove in final
      //alert("You selected enabled");
       if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

      
      // todo: add code for location access enabled
    } else if (selected.value == "2") {
      // debug pop-up box. remove in final
      //alert("You selected disabled");
    infoWindow.close();
      
      // todo: add code for location access disabled
    // Are we supposed to hiding marker?
    }*/
  });

}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: corvallis
  });
  
  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
}