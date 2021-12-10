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
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoidGhlZ3JpbmdvbG9jbyIsImEiOiJja3dtb3ZmdTUyZGZ4MnBtdTBpM3d2dnY4In0.RZqv39gktisOEy2LLfjOXA'
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


  var mymap = L.map('map').setView([-2.9001, -79.0059], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    tileSize: 512,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: '<?php echo the_field('mapbox_key', 'options'); ?>'
    }).addTo(mymap);

  setTimeout(function () {
    document.querySelectorAll('.map-marker').forEach(function (el) {
      var coord = [parseFloat(el.dataset.lat), parseFloat(el.dataset.lon)];
      L.marker(coord).addTo(mymap)
    });

  }, 100);



  app.controller('mapController', ['globalData', 'leaflet', 'config', function (data, leaflet, config) {
    var ctrl = this;
    var map = leaflet.map('map_canvas').setView([-2.9001, -79.0059], 13);
    leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', config.mapOptions).addTo(map);

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

var mymap = L.map('map').setView([-2.9001, -79.0059], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  tileSize: 512,
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: '<?php echo the_field('mapbox_key', 'options'); ?>'
           }).addTo(mymap);

setTimeout(function () {
  document.querySelectorAll('.map-marker').forEach(function (el) {
    var coord = [parseFloat(el.dataset.lat), parseFloat(el.dataset.lon)];
    L.marker(coord).addTo(mymap)
  });

}, 100);

