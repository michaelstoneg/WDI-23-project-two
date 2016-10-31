$(() =>{


  let $main = $('main');
  let $popup = $('.popup');
  let $popupContent = $('.popupContent');
  let $mapDiv = $('#map');




  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $popupContent.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteHistEvent);
  $main.on('click', 'button.edit', getHistEvent);
  $('.histEventsIndex').on('click', getHistEvents);
  $('.createHistEvent').on('click', showCreateForm);
  $('.logout').on('click', logout);
  $('.close').on('click', menuHandler);


  let $change = $('#change-map');
  let counter = 0;

  $change.on('click', showMap);

  const locations = [
    {
      "name": "Rome",
      "center": { lat: 41.8903, lng: 12.4924 },
      "styles": [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#787878"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ff0000"},{"saturation":"-50"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}]
    },
    {
      "name": "London",
      "center": { lat: 51.5076, lng: -0.1278 },
      "styles": [{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#808080"},{"lightness":-100}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#b72025"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#b72025"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"saturation":-100},{"lightness":-14}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b72025"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"saturation":-100},{"lightness":-100},{"weight":0.2}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#808080"},{"lightness":33}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#808080"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"saturation":-100},{"lightness":-100}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":-9}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"on"},{"saturation":-100}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"color":"#b72025"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"saturation":-100},{"lightness":-100},{"weight":0.3}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"saturation":-100},{"lightness":-100}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"saturation":-100}]},{"featureType":"road.local","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":13}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"lightness":-4},{"saturation":-90},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"weight":0.1}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"color":"#b72025"}]}]
    },
    {
      "name": "Kingston",
      "center": { lat: 18.0179, lng: -76.8099 },
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#ffebc5"},{"lightness":"-10"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#675a4b"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#b70046"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#675a4b"},{"weight":"0.50"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ff850a"}]},{"featureType":"administrative.neighborhood","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"-71"},{"lightness":"-2"},{"color":"#ffebc5"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#70bfaf"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#675a4c"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7ccff0"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#cfeae4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#109579"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}]
    },
    {
      "name": "Berlin",
      "center": { lat: 52.5200, lng: 13.4049 },
      styles: [{"featureType":"all","elementType":"all","stylers":[{"hue":"#ffaa00"},{"saturation":"-33"},{"lightness":"10"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#9c5e18"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.line","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"saturation":"-23"},{"gamma":"2.01"},{"color":"#f2f6f6"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"saturation":"-14"}]}]
    }
  ];

  function showMap() {
    console.log("hello");
    let center = locations[counter].center;
    let styles = locations[counter].styles;

    let map = new google.maps.Map($mapDiv[0], {
      center: center,
      zoom: 14,
      styles: styles
    });

    let marker = new google.maps.Marker({
      position: center,
      animation: google.maps.Animation.DROP,
      draggable: true,
      map
    });

    counter++;
  }


  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if(isLoggedIn()) {
    showMap();
    getHistEvents();
  } else {
    showLoginForm();
  }


  function menuHandler() {
    $('.popup').hide();
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
      <h2>Login</h2>
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
    console.log("new histEvent!!");
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
        <button class="btn btn-primary">Create</button>
      </form>
    `);
  }

  function showEditForm(histEvent) {
    if(event) event.preventDefault();
    $popupContent.html(`
      <h2>Edit HistEvent</h2>
      <form method="put" action="/histEvents/${histEvent._id}">
        <div class="form-group">
          <input class="form-control" name="histEvent" placeholder="${histEvent.histEvent}">
          <input class="form-control" name="description" placeholder="${histEvent.description}">
          <input class="form-control" name="image" placeholder="${histEvent.image}">
          <input class="form-control" name="year" placeholder="${histEvent.year}">
          <input class="form-control" name="location" placeholder="${histEvent.location}">
          <input class="form-control" name="lat" placeholder="${histEvent.latitude}">
          <input class="form-control" name="lng" placeholder="${histEvent.longitude}">
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
      $('.popup').hide();
      showMap();
      getHistEvents();
      console.log(data);
    }).fail(showLoginForm);
  }

  function getHistEvents() {
    if(event) event.preventDefault();

    let token = localStorage.getItem('token');
    $.ajax({
      url: '/histEvents',
      method: "GET",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done(showHistEvents)
    .fail(showLoginForm);
  }

  function showHistEvents(histEvents) {
    let $row = $('<div class="row"></div>');
    histEvents.forEach((histEvent) => {
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

    $main.html($row);

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
    showLoginForm();
  }
});
