(function () {
  'use strict';
  var app = angular.module('alternaturBusApp', []);
  app.factory('globalData', [
    '$window', function ($window) {
      return $window.globalData;
    }])
    .factory('leaflet', ['$window', function ($window) {
      return $window.L;
    }])
    .factory('config', ['leaflet',
      function (leaflet) {
        return {
          stopMarker: 'images/bus_map/bus_stop.png',
          financialMarker: 'images/bus_map/marker_financial.png',
          colors: {
            2: '#FFEB3B',
            3: '#F44336',
            5: '#E91E63',
            7: '#9c27B0',
            8: '#673ab7',
            12: '#3F51B5',
            13: '#795548',
            14: '#9E9E9E',
            15: '#00BCD4',
            16: '#FFC107',
            19: '#00695C',
            20: '#4CAF50',
            22: '#8BC34A',
            28: '#BF360C',
            50: '#CDDC39',
            100: '#FF9800',
            tranvia: '#F44336'
          },
          mapOptions: {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoidGhlZ3JpbmdvbG9jbyIsImEiOiJja3dtcTRkNW4wMnB6MnJvNmdmc3VvN2l0In0.aKpOFRoWut6aARGKwoBKMA'
          },
          routeWeight: 7,
          routeOpacity: 0.75,
          generateModalHtml: function (title, description) {
            return '<div id="iw-container">' +
              '<div class="iw-title">' +
              title +
              '</div>' +
              '<div class="iw-content>' +
              '<div class="iw-subTitle>' +
              '<p>' +
              description +
              '</p>' +
              '</div>' +
              '</div>' +
              '</div>';
          },
          busIcon: leaflet.icon({
            iconUrl: 'images/bus_map/BusMarker.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -25]
          }),
          parkIcon: leaflet.icon({
            iconUrl: 'images/bus_map/ParkMarker2.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -25]
          }),
          bankIcon: leaflet.icon({
            iconUrl: 'images/bus_map/BankMaker.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -25]
          })
        };
      }]);
  app.directive('pullDown', [function () {
    return {
      restrict: 'A',
      link: function ($scope, iElement, iAttrs) {
        var $parent = iElement.parent();
        var $parentHeight = $parent.height();
        var height = iElement.height();

        iElement.css('margin-top', ($parentHeight / 2) - height);
      }
    };
  }]);



  setTimeout(function () {
    document.querySelectorAll('.map-marker').forEach(function (el) {
      var coord = [parseFloat(el.dataset.lat), parseFloat(el.dataset.lon)];
      L.marker(coord).addTo(mymap)
    });

  }, 100);



  app.controller('mapController', ['globalData', 'leaflet', 'config', function (data, leaflet, config) {
    var ctrl = this;
    var map = leaflet.map('map_canvas').setView([-2.9001, -79.0059], 13);
    leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', config.mapOptions).addTo(map);
    omnivore.wkt.parse('LINESTRING (717164.8149657398 9677924.07145306, 717353.9615570065 9677946.769044014, 717510.3227391196 9677958.117839491, 717726.0353972847 9677936.966260783, 717725.3739376282 9678015.018500224, 717933.0722696921 9678018.98725816, 717930.4264310673 9678171.1229791, 717944.0599965239 9678326.7337887, 718072.604979313 9678355.341698235, 718434.5557032134 9678232.574786035, 718585.6758630872 9678513.794579487, 718603.6675657379 9678557.186332937, 718707.3844398381 9678733.928353088, 718751.8345287386 9678798.486815538, 718877.7764472887 9678926.545404987, 719007.9517076388 9679037.67062724, 719109.55191084 9679112.81244419, 719219.6187976394 9679220.76266009, 719359.319077041 9679399.62135114, 719401.6524950415 9679474.76316809, 719515.2489385987 9679373.422080249, 719667.1182295335 9679165.649982832, 719793.8451544251 9679011.935436865, 719813.424360252 9679032.572978139, 719985.4038708778 9679163.806573942, 720006.0414121523 9679192.38163109, 720095.9999254039 9679449.027977714, 720101.2916026525 9679461.728003116, 720129.8666598033 9679490.303060267, 720122.9874793785 9679535.811484614, 720185.9584386526 9679791.928663516, 720463.7714942787 9679770.23278679, 720501.3424027544 9679759.64943229, 720530.8165896358 9679743.31231645, 720608.1488052653 9679674.365521792, 720751.6326752296 9679570.94532981, 720777.7206515856 9679542.993926566, 720798.2183472952 9679499.203394823, 720848.5308731273 9679473.115418466, 720922.1362349913 9679466.593424378, 720978.0390414698 9679430.256600166, 721160.6548759686 9679368.76351304, 721363.7684061769 9679217.825935546, 721401.0369438287 9679174.035403803, 721497.9351417283 9679086.454340324, 721614.8037696006 9679032.470477883, 721476.0962693384 9678531.862499665, 721454.6596556613 9678511.686863262, 721449.6157465624 9678478.901454113, 721467.2694284115 9678454.942885883, 721489.9670193633 9678458.725817708, 721529.0573148923 9678478.901454113, 721584.5403149966 9678467.552658636, 721602.1939968476 9678437.289204037, 721627.4135423508 9678417.113567632, 721667.7648151545 9678409.547703983, 721690.4624061072 9678417.113567632, 721719.4648834337 9678441.072135858, 721748.467360762 9678501.599045068, 721745.9454062115 9678574.73572702, 721737.1185652846 9678622.652863473, 721754.7722471366 9678645.350454427, 722017.0555203604 9678678.135863582, 722102.8019750668 9678723.531045482, 722136.848361494 9678731.096909136, 722168.3727933737 9678718.48713638, 722230.1606798545 9678593.650386145, 722247.8143617036 9678569.69181792, 722368.7753042867 9678502.87608541, 722412.1670577368 9678469.009351013, 722492.4439530764 9678350.281772053, 722680.3295670673 9678151.047362583, 722730.1968604634 9678112.879472084, 722758.5101581234 9678096.825339753, 722815.3928641872 9678092.241930809, 722910.6430546883 9678107.05862711, 722999.3568176683 9678108.17413523, 723001.8787722196 9678138.437589832, 722974.137272168 9678137.176612562, 722902.2615674855 9678118.26195343, 722803.0500270026 9678117.227466894, 722746.4952263935 9678386.150504738, 722687.7576089185 9678803.663839767, 722674.2638319302 9679014.008010454, 722671.3534094412 9679127.346917687, 722704.6909761177 9679748.325242974, 722726.9857262466 9679756.271433793, 722878.3029992571 9679705.83234279, 722933.7859993642 9679691.961592764, 722976.6592267184 9679689.439638214, 723291.9035454942 9679758.793388344, 723443.9382879464 9679761.07818515, 723443.4091202198 9679651.540466074, 723586.8135736957 9679628.786253901, 723625.4428176228 9679628.786253901, 723763.291009984 9679717.104347201, 723806.1535957092 9679659.9542329, 724120.7438082239 9679836.749169827, 724086.8770738225 9679909.245148148, 724077.352054772 9679943.11188255, 724251.9774040235 9680014.549525425, 724217.5815018984 9680107.1538773, 724358.3401167504 9680164.303991599, 724616.3093826873 9680299.929679515, 724706.0033120755 9680353.111035882, 724840.9410819504 9680404.704889067, 724942.4797342867 9680177.490780108, 724970.4311375273 9680106.680558566, 725004.9045348549 9679979.035817107, 725025.0914502516 9679941.947713554, 725209.2418185519 9680016.560362777, 725312.4295249283 9680085.616750892, 725437.0485241665 9680154.673139004, 725546.586243242 9680203.885737427, 725627.5489051668 9680251.51083268, 725644.2176885046 9680253.098335851, 725692.509054549 9680166.310218813)').addTo(map)


    // Marker Containers.
    // No need to recreate markers but there is still a need
    // to maintain a reference to them so they can be added 
    // to new layers
    var _stopMarkers = [];
    var _financialMarkers = [];
    var _parkMarkers = [];

    var _showFinancialMarkers = false;
    var _showparkMarkers = false;
    var _showTranviaLayer = false;
    var _showBusStops = false;

    var _tranvia = [];

    /** 
     * Container for the route polylines and relevant polyline decorators
     * 
     * {
     *  layer: <----reference to leaflet Map Layer
     *  line: <---- polyline
     *  decorator: <---- polyline decorator 
     * } 
     * */

    var _routesAndDecorators = [];

    // Container that maintains a list of routes
    // indicated by the route key and the route direction
    // it is used in the reloadStops() function to determine
    // which stop markers should be shown
    var _selectedRoutes = [];

    var busStopMarkersLayer = new leaflet.featureGroup().addTo(map);
    var financialMarkers = new leaflet.featureGroup().addTo(map);
    var tranviaLayer = new leaflet.featureGroup().addTo(map);
    var parksLayer = new leaflet.featureGroup().addTo(map);


    function createFinancialMakers(ms) {
      ms.forEach(function (m) {
        var coord = [m.coordinates.lat, m.coordinates.lon]
        var modalHtml = config.generateModalHtml('Financial Institution', m.description);
        var markerOpts = { icon: config.bankIcon }
        var marker = leaflet.marker(coord, markerOpts).bindPopup(modalHtml)
        _financialMarkers.push(marker);
      });
    }
    function createParkMakers(ms) {
      ms.forEach(function (m) {
        var coord = [m.coordinates.lat, m.coordinates.lon]
        var modalHtml = config.generateModalHtml('Park', m.description);
        var markerOpts = { icon: config.parkIcon }
        var marker = leaflet.marker(coord, markerOpts).bindPopup(modalHtml)
        _parkMarkers.push(marker);
      });
    }



    function createBusStopMarkers(stops) {
      stops.forEach(function (stop) {
        var modalHtml = config.generateModalHtml(stop.stop, 'Routes served ' + stop.routesServiced);
        var markerOpts = { icon: config.busIcon };
        var marker = leaflet.marker([stop.coordinates.lat, stop.coordinates.lon], markerOpts).bindPopup(modalHtml)
        _stopMarkers.push(
          {
            title: stop.stop,
            direction: stop.direction,
            routesServiced: stop.routesServiced,
            marker: marker
          });
      });
    }

    function createBusRoutes(data) {
      Object.keys(data).map(function (key) {
        var direction1 = 'East';
        var direction2 = 'West';

        var coords1 = data[key][direction1].map(function (p) {
          return [p[0], p[1]];
        });
        var coords2 = data[key][direction2].map(function (p) {
          return [p[0], p[1]];
        });

        var route1 = leaflet.polyline(coords1, {
          color: config.colors[key],
          opacity: 1.0,
          strokeWeight: 5
        });
        var decorator1 = leaflet.polylineDecorator(route1, {
          patterns: [
            {
              offset: 75,
              repeat: 75,
              symbol: leaflet.Symbol.arrowHead({
                pixelSize: 15, polygon: true, pathOptions: {
                  color: config.colors[key],
                  fill: true,
                  fillOpacity: 1,
                  stroke: true
                }
              })
            }
          ]
        });

        var route2 = leaflet.polyline(coords2, {
          color: config.colors[key],
          opacity: 1.0,
          strokeWeight: 5
        });
        var decorator2 = leaflet.polylineDecorator(route2, {
          patterns: [
            {
              offset: 75,
              repeat: 75,
              symbol: leaflet.Symbol.arrowHead({
                pixelSize: 15, polygon: true, pathOptions: {
                  color: config.colors[key],
                  stroke: true,
                  fill: true,
                  fillOpacity: 1
                }
              })
            }
          ]
        });


        _routesAndDecorators[key] = {};
        _routesAndDecorators[key][direction1] = {
          layer: new leaflet.featureGroup().addTo(map),
          line: route1,
          decorator: decorator1
        }
        _routesAndDecorators[key][direction2] = {
          layer: new leaflet.featureGroup().addTo(map),
          line: route2,
          decorator: decorator2
        }
      });
    }

    function createTranviaSegements(segments) {
      segments.forEach(function (segment) {
        var cs = segment.coordinates.map(function (c) { return [c[1], c[0]] });
        var polyline = leaflet.polyline(cs, { color: config.colors['tranvia'] });
        var decorator = leaflet.polylineDecorator(polyline, {
          patterns: [
            {
              offset: '100%',
              repeat: 0,
              symbol: leaflet.Symbol.arrowHead({ pixelSize: 15, polygon: false, pathOptions: { color: config.colors['tranvia'], stroke: true } })
            }
          ]
        });
        _tranvia.push(polyline);
        _tranvia.push(decorator);
      });
    }

    function initialize() {
      ctrl.showBusStops = false;
      createBusStopMarkers(data.stops);
      createBusRoutes(data.routes);
      createParkMakers(data.park);
      createFinancialMakers(data.financial);
      createTranviaSegements(data.tranvia);
    }
    initialize();


    function reloadStops() {
      map.removeLayer(busStopMarkersLayer);
      busStopMarkersLayer = new leaflet.featureGroup().addTo(map);
      _stopMarkers.forEach(function (sm) {
        map.removeLayer(sm.marker);
      })
      if (_showBusStops) {
        //  Iterate over each ative route.
        _selectedRoutes.forEach(function (r) {
          //  Find stops based on the active routes
          _stopMarkers.filter(function (stop) {
            return (stop.routesServiced.indexOf(r.route) > -1 && stop.direction === r.direction);
          })
            .forEach(function (stop) {
              busStopMarkersLayer = new leaflet.featureGroup().addTo(map);
              stop.marker.addTo(busStopMarkersLayer)
            });
        });
      }
    }

    function toggleStops() {
      _showBusStops = !_showBusStops;
      reloadStops();
    }

    function toggleFinancial() {
      _showFinancialMarkers = !_showFinancialMarkers;
      if (!_showFinancialMarkers) {
        map.removeLayer(financialMarkers);
      } else {
        financialMarkers = new leaflet.featureGroup().addTo(map);
        _financialMarkers.forEach(function (marker) {
          marker.addTo(financialMarkers);
        })
      }
    }

    function toggleParks() {
      _showparkMarkers = !_showparkMarkers;
      if (!_showparkMarkers) {
        map.removeLayer(parksLayer);
      } else {
        parksLayer = new leaflet.featureGroup().addTo(map);
        _parkMarkers.forEach(function (marker) {
          marker.addTo(parksLayer);
        })
      }
    }

    function toggleTranvia() {
      _showTranviaLayer = !_showTranviaLayer;
      if (!_showTranviaLayer) {
        map.removeLayer(tranviaLayer);
      } else {
        tranviaLayer = new leaflet.featureGroup().addTo(map);
        _tranvia.forEach(function (line) {
          line.addTo(tranviaLayer);
        });

      }
    }


    function toggleRoute(lineKey, directionKey, shouldDisplayRoute) {
      if (shouldDisplayRoute) {
        var line = _routesAndDecorators[lineKey][directionKey].line;
        var decorator = _routesAndDecorators[lineKey][directionKey].decorator;
        var layer = _routesAndDecorators[lineKey][directionKey].layer;
        line.addTo(layer);
        decorator.addTo(layer);

        _selectedRoutes.push({ route: lineKey, direction: directionKey });
      } else {
        var layer = _routesAndDecorators[lineKey][directionKey].layer
        map.removeLayer(layer);
        _routesAndDecorators[lineKey][directionKey].layer = new leaflet.featureGroup().addTo(map);

        _selectedRoutes = _selectedRoutes.filter(function (r) {
          return !angular.equals(r, { route: lineKey, direction: directionKey });
        });
      }

      reloadStops();
    }



    function clickHeaderWrapper($event, key) {
      var $this = angular.element($event.currentTarget);

      var $parent = $this.parent();
      $this.siblings('div').slideToggle(300);


      if ($this.children('img').attr('src') === 'images/bus_map/contract.png') {
        $this.children('img').attr('src', 'images/bus_map/expand.png');
      } else {
        $this.children('img').attr('src', 'images/bus_map/contract.png');
      }
    }

    var leftColumn = [
      { title: 'Line 2', key: 2, direction1: 'East', direction2: 'West' },
      { title: 'Line 3', key: 3, direction1: 'East', direction2: 'West' },
      { title: 'Line 5', key: 5, direction1: 'East', direction2: 'West' },
      { title: 'Line 7', key: 7, direction1: 'East', direction2: 'West' },
      { title: 'Line 8', key: 8, direction1: 'East', direction2: 'West' },
      { title: 'Line 12', key: 12, direction1: 'East', direction2: 'West' },
      { title: 'Line 13', key: 13, direction1: 'East', direction2: 'West' },
      { title: 'Line 14', key: 14, direction1: 'East', direction2: 'West' }
    ];

    var rightColumn = [
      { title: 'Line 15', key: 15, direction1: 'East', direction2: 'West' },
      { title: 'Line 16', key: 16, direction1: 'East', direction2: 'West' },
      { title: 'Line 19', key: 19, direction1: 'East', direction2: 'West' },
      { title: 'Line 20', key: 20, direction1: 'East', direction2: 'West' },
      { title: 'Line 22', key: 22, direction1: 'East', direction2: 'West' },
      { title: 'Line 28', key: 28, direction1: 'East', direction2: 'West' },
      { title: 'Line 50', key: 50, direction1: 'East', direction2: 'West' },
      { title: 'Line 100', key: 100, direction1: 'East', direction2: 'West' }

    ];

    ctrl.toggleRoute = toggleRoute;
    ctrl.toggleStops = toggleStops;
    ctrl.toggleTranvia = toggleTranvia;
    ctrl.toggleFinancial = toggleFinancial;
    ctrl.toggleParks = toggleParks;
    ctrl.clickHeaderWrapper = clickHeaderWrapper;
    ctrl.routeClass = routeClass;

    function routeClass(route) {
      if (route.model1 || route.model2) {
        return 'active-route-' + route.key;
      }
      return 'inactive-route';
    };
    this.leftColumn = leftColumn;
    this.rightColumn = rightColumn;
  }]);
})();

setTimeout(function () {
  document.querySelectorAll('.map-marker').forEach(function (el) {
    var coord = [parseFloat(el.dataset.lat), parseFloat(el.dataset.lon)];
    L.marker(coord).addTo(mymap)
  });
}, 100);

