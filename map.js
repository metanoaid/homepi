//var myMap;
//ymaps.ready(init);

//function init () {
//    myMap = new ymaps.Map('map', {
//        center: [59.85, 30.31], 
//        zoom: 13,
//        controls: []
//    });
//control = myMap.controls.get('trafficControl');
//control.showTraffic();
//var trafficControl = new ymaps.control.TrafficControl({state: {trafficShown: true}});
//map.controls.add(trafficControl, {top: 10, left: 10});
//var actualProvider = new ymaps.traffic.provider.Actual({}, { infoLayerShown: true });
//actualProvider.setMap(myMap);
//}

ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
            center: [59.85, 30.31],
            zoom: 13,
            controls: []
        });

    // Создадим элемент управления "Пробки".
    var trafficControl = new ymaps.control.TrafficControl({ state: {
            // Отображаются пробки "Сейчас".
            providerKey: 'traffic#actual',
            // Начинаем сразу показывать пробки на карте.
            trafficShown: true
        }});
    // Добавим контрол на карту.
    myMap.controls.add(trafficControl);
    // Получим ссылку на провайдер пробок "Сейчас" и включим показ инфоточек.
    trafficControl.getProvider('traffic#actual').state.set('infoLayerShown', true);
}k
