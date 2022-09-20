
///////////////////////////////////// script for geolocation and geocoding: start ////////////////////////////////////////




function initialize() {
    var input = document.getElementById('location-input');
    new google.maps.places.Autocomplete(input);
}


    ////////////////////////////////////////      Get location form               /////////////////////////////////////



    var locationForm= document.getElementById('location-input');






  /////////////////////////////////           geolocation for user that is shown in the last and second page :start                      /////////////////////////////////////
  
  


  var geocoder;
  var getLocation = document.getElementById('location-form1');
  getLocation.addEventListener('submit', getLocation1);
  async function getLocation1() {

    if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
function successFunction(position) {
var lat = position.coords.latitude;
var lng = position.coords.longitude;
codeLatLng(lat, lng)
}

function errorFunction(){
alert("Geocoder failed");
}
function codeLatLng(lat, lng) {


geocoder = new google.maps.Geocoder();
var latlng = new google.maps.LatLng(lat, lng);
geocoder.geocode({'latLng': latlng}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
console.log(results)
if (results[1]) {
//formatted address
/* alert(results[0].formatted_address) */
//find country name
for (var i=0; i<results[0].address_components.length; i++) {
for (var b=0;b<results[0].address_components[i].types.length;b++) {

//there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
  if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
      //this is the object you are looking for
      city= results[0].address_components[i];
      break;
  }
}
}
//city data
/* alert(city.short_name + " " + city.long_name) */
var formattedAddress = results[0].formatted_address;
      document.cookie = "latitude=" + lat;
      document.cookie = "longitude=" + lng;
      document.cookie = "address=" + formattedAddress;
                   document.cookie = "city=" + city;
      document.location.href = "panneaux-photovoltaique-map.html";
} else {
alert("No results found");
}
} else {
alert("Geocoder failed due to: " + status);
}
});
}          
}
 

 


 





    /////////////////////////////////          geolocation for user that is shown in the last and second page:end                      /////////////////////////////////////


  



 /////////////////////////////////           geocode address input:start                      /////////////////////////////////////
    // listen to submit
  /* locationForm.addEventListener('submit', geocode); */
    




    function geocode(e){
        //Prevent actual submit
        
        var location = document.getElementById('location-input').value;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address: location,
                key: 'AIzaSyCA8o_cimsHbLd9h-A-zhNfmrGppYGr8Hk'
            }
        })
        .then(function(response){
            // log full response
            console.log(response);



            // formatted Adress
            var formattedAddress = response.data.results[0].formatted_address;
            var formattedAddressOutput = `
            <ul class="list-group">
                <li class="list-group-item">${formattedAddress}</li>
                </ul>
            
            `;



                // getting lay and long and storing them
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var latlng;
latlng = new google.maps.LatLng(lat, lng);
new google.maps.Geocoder().geocode({'latLng' : latlng}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
  if (results[1]) {
      var country = null, countryCode = null, city = null, cityAlt = null;
      var c, lc, component;
      for (var r = 0, rl = results.length; r < rl; r += 1) {
          var result = results[r];

          if (!city && result.types[0] === 'locality') {
              for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                  component = result.address_components[c];

                  if (component.types[0] === 'locality') {
                      city = component.long_name;
                      break;
                  }
              }
          }
          else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
              for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                  component = result.address_components[c];

                  if (component.types[0] === 'administrative_area_level_1') {
                      cityAlt = component.long_name;
                      break;
                  }
              }
          } else if (!country && result.types[0] === 'country') {
              country = result.address_components[0].long_name;
              countryCode = result.address_components[0].short_name;
          }

          if (city && country) {
              break;
          }
      }

      console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
      var city = city;
      document.cookie = "latitude=" + lat;
      document.cookie = "longitude=" + lng;
      document.cookie = "address=" + location;
      document.cookie = "city=" + city;
      document.location.href = "panneaux-photovoltaique-map.html";
  }
}
});
            var geometryOutput = `
            <ul class="list-group">
                <li class="list-group-item"><strong>Latitude</strong>:${lat}</li>
                <li class="list-group-item"><strong>Longitude</strong>:${lng}</li>
                </ul>
            
            `;


        })
        .catch(function(error){
            console.log(error);
        })
       
    }
                                 /////////////////////////////////           geocode address input:end                      /////////////////////////////////////
