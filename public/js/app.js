'use strict';

var summary = void 0;
var title = void 0;
$(function () {

  var $main = $('main');
  var $popup = $('.popup');
  var $popupContent = $('.popupContent');
  var $mapDiv = $('#map');
  var $change = $('#change-map');
  var counter = 0;

  var periods = void 0;
  var allEvents = [];
  var map = void 0;
  var myLocation = void 0;
  var markers = void 0;

  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $popupContent.on('submit', 'form', handleForm);
  $change.on('click', showMap);
  $popup.on('click', 'button.delete', deleteHistEvent);
  $popup.on('click', 'button.edit', getHistEvent);
  $('.histEventsIndex').on('click', getHistEvents);
  $('.createHistEvent').on('click', showCreateForm);
  $('.logout').on('click', logout);
  $('.close').on('click', menuHandler);

  function displayWindow(data) {
    console.log(data, "displaywindow");

    var wikiSearch = data.histEvent; // put search item into here

    $.ajax({
      url: "/wikipedia",
      method: "GET",
      data: {
        prop: 'pageimages|title|extracts',
        titles: wikiSearch
      }
    }).done(updateData).fail();
  }

  function updateData(data) {
    console.log('markers: ', markers);
    var obj = data.query.pages;
    for (var key in obj) {
      console.log('key: ' + key + '\n' + 'value: ' + obj[key]);
    }
    // console.log("wiki stuff", data.query.pages{});
    console.log('WikipediA: ', data);
    title = data.query.pages[key].title;
    summary = data.query.pages[key].extract;
    var image = data.query.pages[key].thumbnail.source;
    var intro = summary.substring(0, 500);
    console.log(intro, "this is intro log");
    console.log(summary);
    var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">' + title + '</h1>' + // Input title on this line
    '<div id="bodyContent">' + '<p>' + intro + '</p>' + '<img src=' + image + '>' + // Input summary on this line
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' + 'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' + '(last visited June 22, 2009).</p>' + '</div>' + '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    // var marker = new google.maps.Marker({
    //   // position: london,
    //   map: map,
    //   // title: 'Uluru (Ayers Rock)'
    // });
    markers.addListener('click', function () {
      infowindow.open(map, markers);
      console.log("marker clicked");
    });
  }

  // var london = {lat: 51.509865, lng: -0.118092};


  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if (isLoggedIn()) {
    imIn();
  } else {
    $mapDiv.hide();
    $change.hide();
    $('.createHistEvent').hide();
    $('.histEventsIndex').hide();
  }

  function imIn() {
    console.log("logged in");
    $('.popup').hide();
    $('.register').hide();
    $('.login').hide();
    $change.show();
    $('.createHistEvent').show();
    $('.histEventsIndex').show();
    showMap();
  }

  function menuHandler() {
    $('.popup').hide();
  }

  function showMap() {

    console.log("maps 4 u");
    $mapDiv.show();

    var locations = [{
      "name": "Rome",
      "center": { lat: 41.8903, lng: 12.4924 },
      "period": "Rome",
      "styles": [{ "featureType": "all", "elementType": "geometry", "stylers": [{ "color": "#787878" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "gamma": 0.01 }, { "lightness": 20 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "saturation": -31 }, { "lightness": -33 }, { "weight": 2 }, { "gamma": 0.8 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "lightness": 30 }, { "saturation": 30 }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ff0000" }, { "saturation": "-50" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "saturation": 20 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "lightness": 20 }, { "saturation": -20 }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 10 }, { "saturation": -30 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "saturation": 25 }, { "lightness": 25 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "lightness": -20 }] }]
    }, {
      "name": "London",
      "center": { lat: 51.5076, lng: -0.1278 },
      "period": "Tudor",
      "styles": [{ "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#808080" }, { "lightness": -100 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#b72025" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#b72025" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "saturation": -100 }, { "lightness": -14 }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b72025" }] }, { "featureType": "water", "elementType": "geometry.stroke", "stylers": [{ "saturation": -100 }, { "lightness": -100 }, { "weight": 0.2 }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#808080" }, { "lightness": 33 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#808080" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.sports_complex", "elementType": "geometry", "stylers": [{ "saturation": -100 }, { "lightness": -100 }] }, { "featureType": "poi", "stylers": [{ "saturation": -100 }, { "lightness": -9 }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "on" }, { "saturation": -100 }] }, { "featureType": "administrative", "elementType": "labels.text", "stylers": [{ "color": "#b72025" }] }, { "featureType": "administrative", "elementType": "labels.text.stroke", "stylers": [{ "saturation": -100 }, { "lightness": -100 }, { "weight": 0.3 }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "saturation": -100 }, { "lightness": -100 }] }, { "featureType": "transit", "elementType": "labels.icon", "stylers": [{ "saturation": -100 }] }, { "featureType": "road.local", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "lightness": 13 }] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "invert_lightness": true }, { "lightness": -4 }, { "saturation": -90 }, { "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "weight": 0.1 }] }, { "featureType": "landscape.natural", "elementType": "labels.text.fill", "stylers": [{ "color": "#b72025" }] }]
    }, {
      "name": "Kingston",
      "center": { lat: 18.0179, lng: -76.8099 },
      "period": "Colonial",
      "styles": [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#ffebc5" }, { "lightness": "-10" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#b70046" }] }, { "featureType": "administrative.province", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#675a4b" }, { "weight": "0.50" }] }, { "featureType": "administrative.province", "elementType": "labels.text.fill", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#ff850a" }] }, { "featureType": "administrative.neighborhood", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "saturation": "-71" }, { "lightness": "-2" }, { "color": "#ffebc5" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#70bfaf" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#675a4c" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7ccff0" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#cfeae4" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#109579" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }]
    }, {
      "name": "Berlin",
      "center": { lat: 52.5200, lng: 13.4049 },
      "period": "WW2",
      "styles": [{ "featureType": "all", "elementType": "all", "stylers": [{ "hue": "#ffaa00" }, { "saturation": "-33" }, { "lightness": "10" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#9c5e18" }] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit.line", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "saturation": "-23" }, { "gamma": "2.01" }, { "color": "#f2f6f6" }] }, { "featureType": "water", "elementType": "geometry.stroke", "stylers": [{ "saturation": "-14" }] }]
    }];

    myLocation = locations[counter].center;
    var styles = locations[counter].styles;
    var name = locations[counter].name;
    periods = locations[counter].period;

    map = new google.maps.Map($mapDiv[0], {
      center: myLocation,
      zoom: 14,
      styles: styles
    });

    var marker = new google.maps.Marker({
      position: myLocation,
      animation: google.maps.Animation.DROP,
      draggable: true,
      map: map
    });

    google.maps.event.addListener(map, 'click', function (event) {
      console.log(map);
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      var portal = new google.maps.LatLng(41.8903, 12.4924);
      var userClick = new google.maps.LatLng(lat, lng);
      console.log(userClick);

      function calcDistance(portal, userClick) {
        console.log('google maps:', google.maps);
        console.log('google maps geometry:', google.maps.geometry);
        return google.maps.geometry.spherical.computeDistanceBetween(portal, userClick).toFixed(0);
      }

      if (calcDistance(portal, userClick) < 200) {
        console.log(calcDistance(portal, userClick));
        console.log('Well done, you found it!');
        showMap();
      } else if (calcDistance(portal, userClick) < 800) {
        console.log('Getting warmer, ' + calcDistance(portal, userClick) + ' metres away');
        console.log('portal', portal.lat(), portal.lng());
        console.log('click', userClick.lat(), userClick.lng());
      } else {
        console.log('Pretty cold, ' + calcDistance(portal, userClick) + ' metres away');
        console.log('portal', portal.lat(), portal.lng());
        console.log('click', userClick.lat(), userClick.lng());
      }
    });

    $('.hud').html('<p>Period:' + periods + ',  Location:' + name + ', lat:' + myLocation.lat + 'lng:' + myLocation.lng + '</p>');
    // getHistEvents();
    counter++;
  }

  console.log(map);

  function showRegisterForm() {
    if (event) event.preventDefault();
    $popup.show();
    $popupContent.html('\n      <h2>Register</h2>\n      <form method="post" action="/register">\n        <div class="form-group">\n          <input class="form-control" name="username" placeholder="Username">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">\n        </div>\n        <button class="btn btn-primary">Register</button>\n      </form>\n    ');
  }

  function showLoginForm() {
    if (event) event.preventDefault();
    $popup.show();
    $popupContent.html('\n      <h2>Login</h2>\n      <form method="post" action="/login">\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <button class="btn btn-primary">Login</button>\n      </form>\n    ');
  }

  function showCreateForm() {
    if (event) event.preventDefault();
    $('.popup').show();
    $popupContent.html('\n      <h2>Create</h2>\n      <form method="post" action="/histEvents">\n        <div class="form-group">\n          <input class="form-control" name="histEvent" placeholder="histEvent">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="description" placeholder="description">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="image" placeholder="image url">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="year" placeholder="year">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="location" placeholder="location">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="lat" placeholder="latitude">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="lng" placeholder="longitude">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="period" placeholder="period">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="clue" placeholder="clue">\n        </div>\n        <button class="btn btn-primary">Create</button>\n      </form>\n    ');
  }

  function showEditForm(histEvent) {
    if (event) event.preventDefault();
    $popup.show();
    $popupContent.html('\n      <h2>Edit HistEvent</h2>\n      <form method="put" action="/histEvents/' + histEvent._id + '">\n        <div class="form-group">\n          <input class="form-control" name="histEvent" value="' + histEvent.histEvent + '">\n          <input class="form-control" name="description" value="' + histEvent.description + '">\n          <input class="form-control" name="image" value="' + histEvent.image + '">\n          <input class="form-control" name="year" value="' + histEvent.year + '">\n          <input class="form-control" name="location" value="' + histEvent.location + '">\n          <input class="form-control" name="lat" value="' + histEvent.lat + '">\n          <input class="form-control" name="lng" value="' + histEvent.lng + '">\n          <input class="form-control" name="lng" value="' + histEvent.period + '">\n          <input class="form-control" name="clue" value="' + histEvent.clue + '">\n        </div>\n        <button class="btn btn-primary">Update</button>\n      </form>\n    ');
  }

  function handleForm() {
    if (event) event.preventDefault();
    var token = localStorage.getItem('token');
    var $form = $(this);

    var url = $form.attr('action');
    var method = $form.attr('method');
    var data = $form.serialize();

    $.ajax({
      url: url,
      method: method,
      data: data,
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      if (data.token) localStorage.setItem('token', data.token);
      console.log(data);
      if (url === '/login' || url === '/register') {
        imIn();
      }
      $('.popup').hide();
      getHistEvents();
    }).fail(showLoginForm);
  }

  function getHistEvents() {
    if (event) event.preventDefault();

    var token = localStorage.getItem('token');
    $.ajax({
      url: '/histEvents?period=' + periods,
      method: "GET",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      showHistEvents(data);
      $(data).each(function (i) {
        createHistEventMarker(data[i]);
        console.log(data, "event object");
        displayWindow(data[i]);
      });
    }).fail(showLoginForm);
  }

  function showHistEvents(histEvents) {
    var $row = $('<div class="row"></div>');
    histEvents.forEach(function (histEvent) {
      $row.append('\n        <div class="col-md-4">\n          <div class="card">\n            <img class="card-img-top" src="' + histEvent.image + '" alt="Card image cap">\n            <div class="card-block">\n              <h4 class="card-title">' + histEvent.histEvent + '</h4>\n              <h5 class="card-title">' + histEvent.year + '</h5>\n              <h5 class="card-title">' + histEvent.location + '</h5>\n              <p class="card-text">' + histEvent.description + '</p>\n            </div>\n          </div>\n          <button class="btn btn-danger delete" data-id="' + histEvent._id + '">Delete</button>\n          <button class="btn btn-primary edit" data-id="' + histEvent._id + '">Edit</button>\n        </div>\n      ');
    });
    $popup.show();
    $popupContent.html($row);
  }

  function deleteHistEvent() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: '/histEvents/' + id,
      method: "DELETE",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(getHistEvents).fail(showLoginForm);
  }

  function getHistEvent() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: '/histEvents/' + id,
      method: "GET",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(showEditForm).fail(showLoginForm);
  }

  function logout() {
    if (event) event.preventDefault();
    localStorage.removeItem('token');
    $mapDiv.hide();
    $change.hide();
    $('.createHistEvent').hide();
    $('.histEventsIndex').hide();
    $('.register').show();
    $('.login').show();
    counter = 0;
    // showLoginForm();
  }

  function createHistEventMarker(histEvent) {
    var latLng = { lat: histEvent.lat, lng: histEvent.lng };
    markers = new google.maps.Marker({
      position: latLng,
      map: map
    });
    console.log("new coords", latLng);
    console.log("new marker", markers);
  }
});