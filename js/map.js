// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {

    var mapState = $('#map').data('map-state');

    var myMap = new ymaps.Map('map', mapState);

    var urlTemplate = $('#map').data('urlTemplate');

    var loadingObjectManager = new ymaps.LoadingObjectManager(urlTemplate, {
        // Включаем кластеризацию.
        clusterize: true,
        // Зададим опции кластерам.
        // Опции кластеров задаются с префиксом cluster.
        clusterHasBalloon: false,
        // Опции объектов задаются с префиксом geoObject.
        geoObjectOpenBalloonOnClick: true
    });
    myMap.geoObjects.add(loadingObjectManager);

    myMap.events.add('boundschange', function (e) {

        let newBounds = e.get('newBounds');


        let back = false;
        if(newBounds && newBounds[0][0] < -85){
            back = true;
        }
        if(newBounds && newBounds[1][0] > 85){
            back = true;
        }
        if(back){
            setTimeout(function (){
                myMap.setBounds(e.get('oldBounds'));
                myMap.setZoom(e.get('oldZoom'));
            }, 1);
            return false;
        }
        return true;
    });
}
