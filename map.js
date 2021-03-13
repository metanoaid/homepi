var myMap;
ymaps.ready(init);

function init () {
    myMap = new ymaps.Map('map', {
        center: [59.852011, 30.310520], 
        zoom: 13,
        controls: []
    });	

var actualProvider = new ymaps.traffic.provider.Actual({}, { infoLayerShown: true });
actualProvider.setMap(myMap);
}
