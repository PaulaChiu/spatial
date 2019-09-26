// set the map center and zoom level
var map = L.map('map').setView([37.771663,-122.425178], 12);

// add legend control layers - global variable with (null, null) allows indiv basemaps and overlays to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: 'topright',
  collapsed: false // false = open by default
}).addTo(map);

/* BASELAYERS */

var lightStreets = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);
controlLayers.addBaseLayer(lightStreets, 'Streets | Light (Carto)');

var darkStreets = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
controlLayers.addBaseLayer(darkStreets, 'Streets | Dark (Carto)');

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
controlLayers.addBaseLayer(Esri_WorldImagery, 'Satellite (Esri)');

/* OVERLAYS */

$.getJSON("sf_bay_hexagons.geojson",function(data){
  var geoJsonLayer = L.geoJson( data, {
    onEachFeature: function( feature, layer ){
      layer.bindPopup( "<strong>" + feature.properties.GRID_ID + "</strong>")
    }
  })
  controlLayers.addOverlay(geoJsonLayer, 'bay');
});

$.getJSON("sf_ti_hexagons.geojson",function(data){
  var geoJsonLayer = L.geoJson( data, {
    onEachFeature: function( feature, layer ){
      layer.bindPopup( "<strong>" + feature.properties.GRID_ID + "</strong>")
    }
  }).addTo(map);
  controlLayers.addOverlay(geoJsonLayer, 'SF');
});

