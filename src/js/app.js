let summary;
let title;

$(() => {

  let $main = $('main');
  let $popup = $('.popup');
  let $popupContent = $('.popupContent');
  let $popup2 = $('.popup2');
  let $popupContent2 = $('.popupContent2');
  let $mapDiv = $('#map');
  let $change = $('#change-map');
  let counter = 0;

  $popup2.hide();

  let periods;
  let allEvents = [];
  let map;
  let myLocation;
  let markers = [];
  let portals;
  let currentEvent;
  let homeLocation = null;
  let icons;
  let zoom;

  navigator.geolocation.getCurrentPosition((position) => {
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
  $popupContent.on('click', '#start', function() {
    $popup.hide();
    $('.blacktop').hide();
    showMap();
  });


  $('.help').on('click', ()=> {
    $popup.show();
    $popupContent.html(`<p>Uh oh, you have fallen through a time portal, how will you find your way back to the present day?</p>
      <p>Each time period you visit will have a portal but they are quite well hidden! Get clues to their location by exploring the places and events marked on each map.</p>`);
  });

  $('.dropdown-toggle0').on('click', ()=> {
    $('.dropdown-menu0').slideToggle();
  });

  $('.dropdown-toggle3').on('click', ()=> {
    $('.dropdown-menu3').slideToggle();
  });

  $('.dropdown-toggleclues').on('click', ()=> {
    $('.dropdown-menuclues').slideToggle();
  });

  $('.dropdown-toggleevents').on('click', ()=> {
    $('.dropdown-menuevents').slideToggle();
  });

  $('.dropdown-togglelocation').on('click', ()=> {
    $('.dropdown-menulocation').slideToggle();
  });

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if(isLoggedIn()) {
    imIn();
  } else {
    $mapDiv.hide();
    $('.loggedIn').hide();
    $('.loggedOut').show();
    showLoginForm();
  }

  function imIn() {
    $('.popup').hide();
      $('.loggedIn').show();
      $('.loggedOut').hide();
    $change.show();
    preGame();
  }

  function menuHandler() {
    $('.popup').hide();
  }

  function preGame () {
    $popup.show();
    $popupContent.show();
    $popupContent.html(`
      <h1>Welcome, Time Travlr</h1>
      <br>
      <p>Uh oh, you have fallen through a time portal, how will you find your way back to the present day?</p>
      <p>Each time period you visit will have a portal but they are quite well hidden!
      Get clues to their location by exploring the places and events marked on each map.</p>
      <button class="btn btn-primary" id="start">Ready?</button>
    `);
  }

  function markerClick(data) {
    let data2;
    $(markers).each(function(i) {
      markers[i].addListener('click', function() {
        if(this.infowindow) return this.infowindow.open(map, this);
        let markerNumber = markers.indexOf(this);
        displayWindow(data[markerNumber], this);
      });
    });
  }

  function displayWindow(data, marker) {
    currentEvent = data;
    let wikiSearch = data.histEvent;
    $.ajax({
      url: "/wikipedia",
      method: "GET",
      data: {
        prop: 'pageimages|extracts',
        titles: wikiSearch
      }
    }).done((data) => {
      updateData(data, marker);
    })
    .fail();
  }

  function updateData(data, marker) {
    let obj = data.query.pages;
    let key = Object.keys(obj);
    let image;
    let imgHtml = '';

    title = data.query.pages[key].title;
    summary = data.query.pages[key].extract;

    if (data.query.pages[key].thumbnail) {
      image = data.query.pages[key].thumbnail.source;
      imgHtml = `<img src="${image}">`;
    }

    let url = data.query.pages[key].pageid;
    let intro = summary.substring(0, 500);
    var contentString = `
      <div id="content">
        <div id="siteNotice"></div>
        <h1 id="firstHeading" class="firstHeading">${title}</h1>
        <div id="bodyContent">
          ${imgHtml}
          <p>${intro}<a href="https://en.wikipedia.org/wiki/?curid=${url}" target="_blank">...read more</a></p>
        </div>
      </div>
      `;

    marker.infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.infowindow.open(map, marker);
    google.maps.event.addListener(marker.infowindow,'closeclick',function(){

      if(this.hasBeenAppended) return;
      console.log(this.hasBeenAppended);
      $('.cluelist2').append(`
        <p>${currentEvent.clue}</p>
      `);
      $('.eventlist2').append(`
        <p><strong>${currentEvent.histEvent} ${currentEvent.year}</strong></p>
        <p>${currentEvent.description}</p>
      `);
      this.hasBeenAppended = true;
      console.log(this.hasBeenAppended);
    });
  }

  function showMap() {

    $(".cluelist2").html("");
    $(".eventlist2").html("");

    if (periods === 'WW2') {
      let home = new google.maps.Map($mapDiv[0], {
        center: homeLocation,
        zoom: 14
      });

      map.panTo(homeLocation);
      map.setZoom(16);

      let marker = new google.maps.Marker({
        position: homeLocation,
        map
      });

      $popup.show();
      $popupContent.html (`
        <h1>Congratulations!</h1>
        <br>
        <p>You have successfully travelled through time and found your way back to the present day.</p>
        <br>
        <p>Watch out for those pesky portals!</p>`);
      setTimeout(() => {
        reset();
      }, 5000);
    } else {

      $mapDiv.show();

      const locations = [
        {
          "name": "Rome",
          "center": { lat: 41.8922, lng: 12.4852 },
          "period": "Rome",
          "styles": [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#787878"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ff0000"},{"saturation":"-50"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}],
          "portal": { lat: 41.895, lng: 12.474 },
          "zoom": 18,
          "icon": { url: "https://cdn1.iconfinder.com/data/icons/arms-and-armor/100/01-512.png", scaledSize: new google.maps.Size(30, 30) }
        },{
          "name": "London",
          "center": { lat: 51.5076, lng: -0.1278 },
          "period": "Tudor",
          "styles": [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#eead2a"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}],
          "portal": { lat: 51.508076, lng: -0.097194 },
          "zoom": 12,
          "icon": { url: "https://sites.create-cdn.net/siteimages/24/5/0/245079/7896020.gif?1389956032", scaledSize: new google.maps.Size(30, 30) }
        },{
          "name": "Kingston",
          "center": { lat: 18.0179, lng: -76.8099 },
          "period": "Colonial",
          "styles": [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#ffebc5"},{"lightness":"-10"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#675a4b"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#b70046"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#675a4b"},{"weight":"0.50"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ff850a"}]},{"featureType":"administrative.neighborhood","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"-71"},{"lightness":"-2"},{"color":"#ffebc5"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#70bfaf"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#675a4c"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7ccff0"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#cfeae4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#109579"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}],
          "portal": { lat: 18.2287687, lng: -77.7615045 },
          "zoom": 14,
          "icon": { url: "http://cdn.shopify.com/s/files/1/0185/5092/products/objects-0226.png?v=1369543834", scaledSize: new google.maps.Size(30, 30) }
        },{
          "name": "Berlin",
          "center": { lat: 52.5076, lng: 13.3904 },
          "period": "WW2",
          "styles": [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0f252e"},{"lightness":17}]}],
          "portal": { lat: 52.5076, lng: 13.3904 },
          "zoom": 14,
          "icon": { url: "https://lh3.googleusercontent.com/erfTSG0iqvytXPzAD5zG5VpJtMSAc3L1I0kHqHL3N8rUNa4b6bhIHu_L3ySxIluPglQ=w300", scaledSize: new google.maps.Size(30, 30) }
        }
      ];

      myLocation = locations[counter].center;
      let styles = locations[counter].styles;
      let name = locations[counter].name;
      periods = locations[counter].period;
      portals = locations[counter].portal;
      icons = locations[counter].icon;
      zoom = locations[counter].zoom;

      map = new google.maps.Map($mapDiv[0], {
        center: myLocation,
        zoom: zoom,
        styles: styles,
        mapTypeId: 'terrain',
        disableDefaultUI: true
      });

      google.maps.event.addListener(map, 'click', function(event) {

        let lat = (event.latLng.lat());
        let lng = (event.latLng.lng());

        var portal = new google.maps.LatLng(portals);
        var userClick = new google.maps.LatLng(lat, lng);
          // console.log(userClick);

        function calcDistance(portal, userClick) {
          // console.log('google maps:', google.maps);
          // console.log('google maps geometry:', google.maps.geometry);
          return (google.maps.geometry.spherical.computeDistanceBetween(portal, userClick)).toFixed(0);
        }

        if ((calcDistance(portal, userClick)) < 200) {
            // console.log(calcDistance(portal, userClick));
          $(".locationtracker2").html("");
          $popup2.show();
          $popup2.css("color", "white");
          $popupContent2.html("WOOOOOOOAAAAAAAAAH");
          $popup2.css("background-image", "url('/images/warp.gif')");
          setTimeout(() => {
            $popup2.hide();
          }, 1500);
          showMap();

        } else if ((calcDistance(portal, userClick)) < 800) {
            $(".locationtracker2").html(`
              <p>Getting warmer, ${calcDistance(portal, userClick)} metres away`);
            // console.log('portal', portal.lat(), portal.lng());
            // console.log('click', userClick.lat(), userClick.lng());
        } else {
            $(".locationtracker2").html(`
              <p>Pretty cold, ${calcDistance(portal, userClick)} metres away`);
            // console.log('portal', portal.lat(), portal.lng());
            // console.log('click', userClick.lat(), userClick.lng());
        }

      });

      markers = [];
      currentEvent = undefined;
      getHistEvents();
      counter++;
    }
  }

  function showRegisterForm() {
    if(event) event.preventDefault();
    $popup.show();
    $popupContent.html(`
      <h2>Register</h2>
      <form method="post" action="/register">
        <div class="form-group">
          <input class="form-control" name="username" placeholder="Username">
        </div>
        <div class="form-group">
          <input class="form-control" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">
        </div>
        <button class="btn btn-primary">Register</button>
      </form>
    `);
  }

  function showLoginForm() {
    if(event) event.preventDefault();
    $popup.show();
    $popupContent.html(`
      <h1>Welcome back, Time Travlr</h1>
      <br>
      <p>Login in to carry on travelling through time.</p>
      <form method="post" action="/login">
        <div class="form-group">
          <input class="form-control" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <button class="btn btn-primary">Login</button>
      </form>
    `);
  }

  function showCreateForm() {
    if(event) event.preventDefault();
    $('.popup').show();
    $popupContent.html(`
      <h2>Create</h2>
      <form method="post" action="/histEvents">
        <div class="form-group">
          <input class="form-control" name="histEvent" placeholder="histEvent">
        </div>
        <div class="form-group">
          <input class="form-control" name="description" placeholder="description">
        </div>
        <div class="form-group">
          <input class="form-control" name="image" placeholder="image url">
        </div>
        <div class="form-group">
          <input class="form-control" name="year" placeholder="year">
        </div>
        <div class="form-group">
          <input class="form-control" name="location" placeholder="location">
        </div>
        <div class="form-group">
          <input class="form-control" name="lat" placeholder="latitude">
        </div>
        <div class="form-group">
          <input class="form-control" name="lng" placeholder="longitude">
        </div>
        <div class="form-group">
          <input class="form-control" name="period" placeholder="period">
        </div>
        <button class="btn btn-primary">Create</button>
      </form>
    `);
  }

  function showEditForm(histEvent) {
    if(event) event.preventDefault();
    $popup.show();
    $popupContent.html(`
      <h2>Edit HistEvent</h2>
      <form method="put" action="/histEvents/${histEvent._id}">
        <div class="form-group">
          <input class="form-control" name="histEvent" value="${histEvent.histEvent}">
          <input class="form-control" name="description" value="${histEvent.description}">
          <input class="form-control" name="image" value="${histEvent.image}">
          <input class="form-control" name="year" value="${histEvent.year}">
          <input class="form-control" name="location" value="${histEvent.location}">
          <input class="form-control" name="lat" value="${histEvent.lat}">
          <input class="form-control" name="lng" value="${histEvent.lng}">
          <input class="form-control" name="period" value="${histEvent.period}">
        </div>
        <button class="btn btn-primary">Update</button>
      </form>
    `);
  }

  function handleForm() {
    if(event) event.preventDefault();
    let token = localStorage.getItem('token');
    let $form = $(this);

    let url = $form.attr('action');
    let method = $form.attr('method');
    let data = $form.serialize();

    $.ajax({
      url,
      method,
      data,
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }).done((data) => {
      if(data.token) localStorage.setItem('token', data.token);
      if (url === '/login' || url === '/register') {
        imIn();
      } else {
        showHistEvents();
      }
    }).fail(showLoginForm);
  }

  function getHistEvents() {
    if(event) event.preventDefault();

    let token = localStorage.getItem('token');
    $.ajax({
      url: `/histEvents?period=${periods}`,
      method: "GET",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done((data) => {
      allEvents = data;
      $(data).each(function (i) {
        data[i].number = i;
        createHistEventMarker(data[i]);
      });
      markerClick(data);
    })
    .fail(showLoginForm);
  }

  function showHistEvents() {
    let Events = allEvents;
    let $row = $('<div class="row"></div>');
    Events.forEach((histEvent) => {
      $row.append(`
        <div class="col-md-4">
          <div class="card">
            <img class="card-img-top" src="${histEvent.image}" alt="Card image cap">
            <div class="card-block">
              <h4 class="card-title">${histEvent.histEvent}</h4>
              <h5 class="card-title">${histEvent.year}</h5>
              <h5 class="card-title">${histEvent.location}</h5>
              <p class="card-text">${histEvent.description}</p>
            </div>
          </div>
          <button class="btn btn-danger delete" data-id="${histEvent._id}">Delete</button>
          <button class="btn btn-primary edit" data-id="${histEvent._id}">Edit</button>
        </div>
      `);
    });
    $popup.show();
    $popupContent.html($row);
  }

  function deleteHistEvent() {
    let id = $(this).data('id');
    let token = localStorage.getItem('token');

    $.ajax({
      url: `/histEvents/${id}`,
      method: "DELETE",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done(getHistEvents)
    .fail(showLoginForm);
  }

  function getHistEvent() {
    let id = $(this).data('id');
    let token = localStorage.getItem('token');

    $.ajax({
      url: `/histEvents/${id}`,
      method: "GET",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done(showEditForm)
    .fail(showLoginForm);
  }

  function logout() {
    if(event) event.preventDefault();
    localStorage.removeItem('token');
    $mapDiv.hide();
    $('.loggedIn').hide();
    $('.loggedOut').show();
    counter = 0;
    $('.blacktop').show();
    showLoginForm();
  }

  function createHistEventMarker(histEvent) {
    let latLng = { lat:histEvent.lat, lng:histEvent.lng};
    markers.push(new google.maps.Marker({
      position: latLng,
      icon: icons,
      map
    }));
  }

  function reset() {
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
