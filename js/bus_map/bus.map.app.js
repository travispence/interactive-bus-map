(function(){
  'use strict';
  var app = angular.module('alternaturBusApp', []);

  app.factory('jQuery', [
        '$window',
        function ($window) {
            return $window.jQuery;
        }
    ])
  .factory('globalData', [
    '$window', function($window) {
      return window.globalData;
    }])
    .factory('google', [
    '$window', function($window) {
      return window.google;
    }])
    .factory('config',  [ 'google',
      function(google) {
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
              center: new google.maps.LatLng(-2.899602, -78.988683),
              zoom: 13,
              disableDefaultUI: true,
              panControl: false,
              zoomControl: true,
              zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.TOP_RIGHT
              },
              mapTypeControl: false,
              scaleControl: true,
              streetViewControl: false,
              overviewMapControl: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            routeWeight:7,
            routeOpacity:0.75,
            lineSymbol: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
          };
      }]);

    app.directive('pullDown', [function() {
      return {
        restrict: 'A',
        link: function ($scope, iElement, iAttrs) {
          var $parent = iElement.parent();
          var $parentHeight = $parent.height();
          var height = iElement.height();

          iElement.css('margin-top', ( $parentHeight / 2) - height);
        }
      };
    }]);
  app.controller('mapController', [ 'jQuery' ,'globalData', 'google', 'config', function($, data, google, config) {
      var ctrl = this;

      var _stopMarkers  = [];
      var _financialMarkers = [];
      var _activeRoutes = [];
      var _routes = [];
      var _tranvia = [];


      function setFinancialMarkers(ms, visible, map) {
        var infoWindow = new google.maps.InfoWindow({
          maxWidth: 200
        });
        ms.forEach(function(m){

          var mLatLong = new google.maps.LatLng(m.coordinates.lat, m.coordinates.lon);
          var marker = new google.maps.Marker({
              icon: config.financialMarker,
              position: mLatLong,
              map: map,
              title: m.description,
              visible: visible
          });
          google.maps.event.addListener(marker, 'click', function (m, i) {
              infoWindow.setContent(
                '<div id="iw-container">' +
                  '<div class="iw-title">' +
                    'Financial Institution' +
                  '</div>' +
                  '<div class="iw-content>' +
                    '<div class="iw-subTitle>' +
                      '<p>' +
                        marker.title +
                      '</p>' +
                    '</div>' +
                  '</div>' +
                '</div>'
              );
              infoWindow.open(map, marker);
          });
          _financialMarkers.push(marker);
        });
      }



      function setBusStopMarkers(stops, visible, map) {
          var infoWindow = new google.maps.InfoWindow({
              maxWidth: 200
            });

          stops.forEach(function(stop) {
              var myLatLng = new google.maps.LatLng(stop.coordinates.lat, stop.coordinates.lon);
              var marker = new google.maps.Marker({
                  icon: config.stopMarker,
                  position: myLatLng,
                  map: map,
                  title: stop.stop,
                  visible: visible
              });

              google.maps.event.addListener(marker, 'click', function (m, i) {
                  infoWindow.setContent(
                    '<div id="iw-container">' +
                    '<div class="iw-title">' +
                      marker.title +
                    '</div>' +
                    '<div class="iw-content>' +
                    '<div class="iw-subTitle>' +
                    '<p>' +
                    'Routes served ' + stop.routesServiced.toString() +
                    '</p>' +
                    '</div>' +

                    '</div>' +
                    '</div>'
                  );
                  infoWindow.open(map, marker);
              });
              _stopMarkers.push(
                  {
                    title: stop.stop,
                    direction: stop.direction,
                    routesServiced: stop.routesServiced,
                    marker: marker
                  });
        });
      }

      function setRoutes(routesObj, visible, map) {
        _activeRoutes = routesObj;
        Object.keys(_activeRoutes).map(function(key) {
          var direction1 = 'east';
          var direction2 = 'west';

          var coords1 = data.routes[key][direction1].map(function(p){
            return new google.maps.LatLng(p[0], p[1]);
          });
          var coords2 = data.routes[key][direction2].map(function(p){
            return new google.maps.LatLng(p[0], p[1]);
          });


          var route1 = new google.maps.Polyline({
            path: coords1,
            geodesic: true,
            strokeColor: config.colors[key],
            strokeWeight: config.routeWeight,
            strokeOpacity: config.routeOpacity,
            visible: visible,
            map: map,
            icons: [{
              icon: config.lineSymbol
            }]
          });


          var route2 = new google.maps.Polyline({
            path: coords2,
            geodesic: true,
            strokeColor: config.colors[key],
            strokeWeight: config.routeWeight,
            strokeOpacity: config.routeOpacity,
            visible: visible,
            map: map,
            icons: [{
              icon: config.lineSymbol
            }]
          });

          _activeRoutes[key][direction1] = route1;
          _activeRoutes[key][direction2] = route2;
        });
      }

      function setTranviaSegments(segments, visible, map) {
        segments.forEach(function(segment) {

          var coordinates = segment.coordinates;
          var latLonCoordinates = coordinates.map(function(coords) {
            return new  google.maps.LatLng(coords[1], coords[0], 0);
          });

          var segmentRoute = new google.maps.Polyline({
                      path: latLonCoordinates,
                      geodesic: true,
                      strokeColor: config.colors['tranvia'],
                      strokeWeight: config.routeWeight,
                      strokeOpacity: config.routeOpacity,
                      visible: visible,
                      map: map
                    });

          _tranvia.push(segmentRoute);
        });
      }

      function initialize() {
          ctrl.map = new google.maps.Map(document.getElementById('map_canvas'), config.mapOptions);
          ctrl.showBusStops = false;

          setBusStopMarkers(data.stops, false, ctrl.map);
          setRoutes(data.routes, false, ctrl.map);
          setFinancialMarkers(data.financial, false, ctrl.map);
          setTranviaSegments(data.tranvia, false, ctrl.map);
      }


      initialize();


      function reloadStops() {
        //  Hide All Markers
        _stopMarkers.forEach(function(stop) {
          stop.marker.setVisible(false);
        });

        if (ctrl.showBusStops) {
          //  Iterate over each ative route.
          _routes.forEach(function(r) {
            //  Find stops based on the active routes
            _stopMarkers.filter(function(stop) {
                return (stop.routesServiced.indexOf(r.route) > -1 && stop.direction === r.direction);
            })
            .forEach(function(stop) {
              stop.marker.setVisible(true);
            });
          });
        }
      }

      function toggleStops(bool) {
        ctrl.showBusStops = bool;
        reloadStops();
      }

      function toggleFinancial() {
        _financialMarkers.map(function(marker) {
          marker.setVisible(!marker.getVisible());
        });
      }

      function toggleTranvia() {
        _tranvia.map(function(marker) {
          marker.setVisible(!marker.getVisible());
        });
      }


      function toggleRoute(line, direction, bool) {
        _activeRoutes[line][direction].setVisible(bool);

          if (bool) {
            _routes.push({ route: line, direction: direction});
          } else {

          _routes = _routes.filter(function(r) {
            return  !angular.equals(r, {route: line, direction: direction});
          });
          }
          reloadStops();
      }



      function clickHeaderWrapper($event, key) {
        var $this = angular.element($event.currentTarget);

        var $parent =$this.parent();
        $this.siblings('div').slideToggle(300);


        if ($this.children('img').attr('src') === 'images/bus_map/contract.png') {
          $this.children('img').attr('src', 'images/bus_map/expand.png');
        } else {
          $this.children('img').attr('src', 'images/bus_map/contract.png');
        }
      }

      var leftColumn =[
       { title: 'Line 2', key: 2, direction1: 'east', direction2: 'west'},
       { title: 'Line 3', key: 3, direction1: 'east', direction2: 'west'},
       { title: 'Line 5', key: 5, direction1: 'east', direction2: 'west'},
       { title: 'Line 7', key: 7, direction1: 'east', direction2: 'west'},
       { title: 'Line 8', key: 8, direction1: 'east', direction2: 'west'},
       { title: 'Line 12',key: 12, direction1: 'east', direction2: 'west'},
       { title: 'Line 13', key: 13, direction1: 'east', direction2: 'west'},
       { title: 'Line 14', key: 14, direction1: 'east', direction2: 'west'}
      ];

      var rightColumn = [
       { title: 'Line 15', key: 15, direction1: 'east', direction2: 'west'},
       { title: 'Line 16', key: 16, direction1: 'east', direction2: 'west'},
       { title: 'Line 19', key: 19, direction1: 'east', direction2: 'west'},
       { title: 'Line 20', key: 20, direction1: 'east', direction2: 'west'},
       { title: 'Line 22', key: 22, direction1: 'east', direction2: 'west'},
       { title: 'Line 28', key: 28,  direction1: 'east', direction2: 'west'},
       { title: 'Line 50', key: 50, direction1: 'east', direction2: 'west'},
       { title: 'Line 100', key:100, direction1: 'east', direction2: 'west'}

      ];

      ctrl.toggleRoute = toggleRoute;
      ctrl.toggleStops = toggleStops;
      ctrl.toggleTranvia = toggleTranvia;
      ctrl.toggleFinancial = toggleFinancial;
      ctrl.clickHeaderWrapper = clickHeaderWrapper;

      this.routeClass = function(route) {
        if (route.model1 || route.model2) {
          return 'active-route-' + route.key;
        }
        return 'inactive-route';
      };

      // Data
      this.leftColumn = leftColumn;
      this.rightColumn = rightColumn;

  }]);

})();
