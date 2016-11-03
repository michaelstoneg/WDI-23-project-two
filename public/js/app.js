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
  var markers = [];
  var portals = void 0;
  var currentEvent = void 0;
  var homeLocation = null;
  var icons = void 0;

  navigator.geolocation.getCurrentPosition(function (position) {
    homeLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  });

  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $popupContent.on('submit', 'form', handleForm);
  $change.on('click', showMap);
  $popup.on('click', 'button.delete', deleteHistEvent);
  $popup.on('click', 'button.edit', getHistEvent);
  $('.histEventsIndex').on('click', showHistEvents);
  $('.createHistEvent').on('click', showCreateForm);
  $('.logout').on('click', logout);
  $('.close').on('click', menuHandler);
  $popupContent.on('click', '#start', function () {
    console.log("starting");
    $popup.hide();
    $('.blacktop').hide();
    showMap();
  });

  $('.dropdown-toggle0').on('click', function () {
    $('.dropdown-menu0').slideToggle();
  });
  $('.dropdown-toggle1').on('click', function () {
    $('.dropdown-menu1').slideToggle();
  });
  $('.dropdown-toggle2').on('click', function () {
    $('.dropdown-menu2').slideToggle();
  });
  $('.dropdown-toggle3').on('click', function () {
    $('.dropdown-menu3').slideToggle();
  });

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if (isLoggedIn()) {
    imIn();
  } else {
    $mapDiv.hide();
    // $('.dropdown-toggle1').hide();
    // $('.dropdown-toggle2').hide();
    // $('.dropdown-toggle3').hide();
    // $('.logout').hide();
    // $('.login').show();
    // $('.register').show();
    $('.loggedIn').hide();
    $('.loggedOut').show();
    showLoginForm();
  }

  function imIn() {
    console.log("logged in");
    $('.popup').hide();
    // $('.login').hide();
    // $('.register').hide();
    // $('.dropdown-toggle1').show();
    // $('.dropdown-toggle2').show();
    // $('.dropdown-toggle3').show();
    // $('.logout').show();
    $('.loggedIn').show();
    $('.loggedOut').hide();
    $change.show();
    preGame();
  }

  function menuHandler() {
    $('.popup').hide();
  }

  function preGame() {
    console.log("pre game");
    // $popup.style="display: 'block'";
    $popup.show();
    $popupContent.show();
    $popupContent.html('\n      <h1>Welcome, Time Travlr</h1>\n      <br>\n      <p>Uh oh, you have fallen through a time portal, how will you find your way back to the present day?</p>\n      <p>Each time period you visit will have a portal but they are quite well hidden!\n      Get clues to their location by exploring the places and events marked on each map.</p>\n      <button class="btn btn-primary" id="start">Ready?</button>\n    ');
  }

  function markerClick(data) {
    // console.log("all data", data, "all markers", markers);
    var data2 = void 0;
    $(markers).each(function (i) {
      markers[i].addListener('click', function () {
        var markerNumber = markers.indexOf(this);
        // console.log("this marker", this, "is number", markerNumber , "of marker array. It's corresponding event is", data[markerNumber]);
        displayWindow(data[markerNumber]);
      });
    });
  }

  function displayWindow(data) {
    currentEvent = data;
    var wikiSearch = data.histEvent; // put search item into here

    $.ajax({
      url: "/wikipedia",
      method: "GET",
      data: {
        prop: 'pageimages|extracts',
        titles: wikiSearch
      }
    }).done(updateData).fail();
  }

  function updateData(data) {
    console.log(data);
    var obj = data.query.pages;
    var key = Object.keys(obj);
    var image = void 0;
    var imgHtml = '';

    title = data.query.pages[key].title;
    summary = data.query.pages[key].extract;

    if (data.query.pages[key].thumbnail) {
      image = data.query.pages[key].thumbnail.source;
      imgHtml = '<img src="' + image + '">';
    }

    var url = data.query.pages[key].pageid;
    var intro = summary.substring(0, 500);
    // let intro = summary;
    var contentString = '\n                <div id="content">\n                  <div id="siteNotice"></div>\n                  <h1 id="firstHeading" class="firstHeading">' + title + '</h1>\n                  <div id="bodyContent">\n                    ' + imgHtml + '\n                    <p>' + intro + '<a href="https://en.wikipedia.org/wiki/?curid=' + url + '" target="_blank">...read more</a></p>\n                  </div>\n                </div>\n                ';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    infowindow.open(map, markers[currentEvent.number]);
    google.maps.event.addListener(infowindow, 'closeclick', function () {
      console.log("window closed");
      // clues go here
      $('.cluelist2').append('\n\n        <p>' + currentEvent.clue + '</p>\n        ');
      $('.eventlist2').append('\n\n        <p><strong>' + currentEvent.histEvent + ' ' + currentEvent.year + '</strong></p>\n        <p>' + currentEvent.description + '</p>\n\n\n\n        ');
    });
  }

  function showMap() {

    $(".cluelist2").html("");
    $(".eventlist2").html("");

    if (periods === 'WW2') {
      var home = new google.maps.Map($mapDiv[0], {
        center: homeLocation,
        zoom: 14
      });

      map.panTo(homeLocation);
      map.setZoom(16);

      var marker = new google.maps.Marker({
        position: homeLocation,
        map: map
      });

      $popup.show();
      $popupContent.html('\n    <h1>Congratulations!</h1>\n    <br>\n    <p>You have successfully travelled through time and found your way back to the present day.</p>\n    <br>\n    <p>Watch out for those pesky portals!</p>');
      // return;
      setTimeout(function () {
        reset();
      }, 3000);
    } else {

      // console.log("maps 4 u");
      $mapDiv.show();

      var locations = [{
        "name": "Rome",
        "center": { lat: 41.8922, lng: 12.4852 },
        "period": "Rome",
        "styles": [{ "featureType": "all", "elementType": "geometry", "stylers": [{ "color": "#787878" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "gamma": 0.01 }, { "lightness": 20 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "saturation": -31 }, { "lightness": -33 }, { "weight": 2 }, { "gamma": 0.8 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "lightness": 30 }, { "saturation": 30 }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ff0000" }, { "saturation": "-50" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "saturation": 20 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "lightness": 20 }, { "saturation": -20 }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 10 }, { "saturation": -30 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "saturation": 25 }, { "lightness": 25 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "lightness": -20 }] }],
        "portal": { lat: 41.895, lng: 12.474 },
        "icon": { url: "https://cdn1.iconfinder.com/data/icons/arms-and-armor/100/01-512.png", scaledSize: new google.maps.Size(30, 30) }
      }, {
        "name": "London",
        "center": { lat: 51.5076, lng: -0.1278 },
        "period": "Tudor",
        "styles": [{ "featureType": "all", "elementType": "geometry", "stylers": [{ "color": "#eead2a" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "gamma": 0.01 }, { "lightness": 20 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "saturation": -31 }, { "lightness": -33 }, { "weight": 2 }, { "gamma": 0.8 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "lightness": 30 }, { "saturation": 30 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "saturation": 20 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "lightness": 20 }, { "saturation": -20 }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 10 }, { "saturation": -30 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "saturation": 25 }, { "lightness": 25 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "lightness": -20 }] }],
        "portal": { lat: 51.508076, lng: -0.097194 },
        "icon": { url: "https://sites.create-cdn.net/siteimages/24/5/0/245079/7896020.gif?1389956032", scaledSize: new google.maps.Size(30, 30) }
      }, {
        "name": "Kingston",
        "center": { lat: 18.0179, lng: -76.8099 },
        "period": "Colonial",
        "styles": [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#ffebc5" }, { "lightness": "-10" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#b70046" }] }, { "featureType": "administrative.province", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#675a4b" }, { "weight": "0.50" }] }, { "featureType": "administrative.province", "elementType": "labels.text.fill", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#ff850a" }] }, { "featureType": "administrative.neighborhood", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "saturation": "-71" }, { "lightness": "-2" }, { "color": "#ffebc5" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#70bfaf" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#675a4c" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#675a4b" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7ccff0" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#cfeae4" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#109579" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }],
        "portal": { lat: 18.0194, lng: -76.7796 },
        "icon": { url: "http://cdn.shopify.com/s/files/1/0185/5092/products/objects-0226.png?v=1369543834", scaledSize: new google.maps.Size(30, 30) }
      }, {
        "name": "Berlin",
        "center": { lat: 52.5076, lng: 13.3904 },
        "period": "WW2",
        "styles": [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0f252e" }, { "lightness": 17 }] }],
        "portal": { lat: 52.5111, lng: 13.4429 },
        "icon": { url: "https://lh3.googleusercontent.com/erfTSG0iqvytXPzAD5zG5VpJtMSAc3L1I0kHqHL3N8rUNa4b6bhIHu_L3ySxIluPglQ=w300", scaledSize: new google.maps.Size(30, 30) }
      }];

      myLocation = locations[counter].center;
      var styles = locations[counter].styles;
      var name = locations[counter].name;
      periods = locations[counter].period;
      portals = locations[counter].portal;
      icons = locations[counter].icon;

      // console.log('all periods: ', locations);
      // console.log('current period: ', periods);
      // console.log('current portal: ', portals);

      map = new google.maps.Map($mapDiv[0], {
        center: myLocation,
        zoom: 18,
        styles: styles,
        mapTypeId: 'terrain'
      });

      google.maps.event.addListener(map, 'click', function (event) {

        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        var portal = new google.maps.LatLng(portals);
        var userClick = new google.maps.LatLng(lat, lng);
        // console.log(userClick);

        function calcDistance(portal, userClick) {
          // console.log('google maps:', google.maps);
          // console.log('google maps geometry:', google.maps.geometry);
          return google.maps.geometry.spherical.computeDistanceBetween(portal, userClick).toFixed(0);
        }

        if (calcDistance(portal, userClick) < 200) {
          // console.log(calcDistance(portal, userClick));
          // console.log('Well done, you found it!');
          showMap();
        } else if (calcDistance(portal, userClick) < 800) {
          // console.log('Getting warmer, ' + calcDistance(portal, userClick) + ' metres away');
          // console.log('portal', portal.lat(), portal.lng());
          // console.log('click', userClick.lat(), userClick.lng());
        } else {
            // console.log('Pretty cold, ' + calcDistance(portal, userClick) + ' metres away');
            // console.log('portal', portal.lat(), portal.lng());
            // console.log('click', userClick.lat(), userClick.lng());
          }
      });

      $('.hudlist').html('\n      <p>Period:</p>\n      <p>' + periods + '</p>\n      <p>Location:</p>\n      <p>' + name + '</p>\n      <p>lat:</p>\n      <p>' + myLocation.lat + '</p>\n      <p>lng:</p>\n      <p>' + myLocation.lng + '</p>\n      ');
      markers = [];
      currentEvent = undefined;
      getHistEvents();
      counter++;
    }
  }

  function showRegisterForm() {
    if (event) event.preventDefault();
    $popup.show();
    $popupContent.html('\n      <h2>Register</h2>\n      <form method="post" action="/register">\n        <div class="form-group">\n          <input class="form-control" name="username" placeholder="Username">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">\n        </div>\n        <button class="btn btn-primary">Register</button>\n      </form>\n    ');
  }

  function showLoginForm() {
    if (event) event.preventDefault();
    $popup.show();
    $popupContent.html('\n      <h1>Welcome back, Time Travlr</h1>\n      <br>\n      <p>Login in to carry on travelling through time.</p>\n      <form method="post" action="/login">\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <button class="btn btn-primary">Login</button>\n      </form>\n    ');
  }

  function showCreateForm() {
    if (event) event.preventDefault();
    $('.popup').show();
    $popupContent.html('\n      <h2>Create</h2>\n      <form method="post" action="/histEvents">\n        <div class="form-group">\n          <input class="form-control" name="histEvent" placeholder="histEvent">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="description" placeholder="description">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="image" placeholder="image url">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="year" placeholder="year">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="location" placeholder="location">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="lat" placeholder="latitude">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="lng" placeholder="longitude">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="period" placeholder="period">\n        </div>\n        <button class="btn btn-primary">Create</button>\n      </form>\n    ');
  }

  function showEditForm(histEvent) {
    if (event) event.preventDefault();
    $popup.show();
    $popupContent.html('\n      <h2>Edit HistEvent</h2>\n      <form method="put" action="/histEvents/' + histEvent._id + '">\n        <div class="form-group">\n          <input class="form-control" name="histEvent" value="' + histEvent.histEvent + '">\n          <input class="form-control" name="description" value="' + histEvent.description + '">\n          <input class="form-control" name="image" value="' + histEvent.image + '">\n          <input class="form-control" name="year" value="' + histEvent.year + '">\n          <input class="form-control" name="location" value="' + histEvent.location + '">\n          <input class="form-control" name="lat" value="' + histEvent.lat + '">\n          <input class="form-control" name="lng" value="' + histEvent.lng + '">\n          <input class="form-control" name="period" value="' + histEvent.period + '">\n        </div>\n        <button class="btn btn-primary">Update</button>\n      </form>\n    ');
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
      // console.log(data);
      if (url === '/login' || url === '/register') {
        imIn();
      } else {
        showHistEvents();
      }
      // $('.popup').hide();
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
      // showHistEvents(data);
      allEvents = data;
      $(data).each(function (i) {
        data[i].number = i;
        createHistEventMarker(data[i]);
      });
      markerClick(data);
    }).fail(showLoginForm);
  }

  function showHistEvents() {
    var Events = allEvents;
    console.log(Events);
    console.log($('.close'));
    var $row = $('<div class="row"></div>');
    Events.forEach(function (histEvent) {
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
    // $('.dropdown-toggle1').slideToggle();
    // $('.dropdown-toggle2').slideToggle();
    // $('.dropdown-toggle3').slideToggle();
    // $('.dropdown-toggle1').hide();
    // $('.dropdown-toggle2').hide();
    // $('.dropdown-toggle3').hide();
    // $('.logout').hide();
    // $('.register').show();
    // $('.login').show();
    $('.loggedIn').hide();
    $('.loggedOut').show();
    counter = 0;
    $('.blacktop').show();
    showLoginForm();
  }

  function createHistEventMarker(histEvent) {
    var latLng = { lat: histEvent.lat, lng: histEvent.lng };
    markers.push(new google.maps.Marker({
      position: latLng,
      icon: icons,
      map: map
    }));
  }

  function reset() {
    console.log('inside reset');
    counter = 0;
    allEvents = [];
    markers = [];
    currentEvent = undefined;
    periods = undefined;
    $('.blacktop').show();
    $mapDiv.hide();
    preGame();
  }
});