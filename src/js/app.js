$(() =>{

  let $main = $('main');
  let $popup = $('.popup');
  let $popupContent = $('.popupContent');
  let $mapDiv = $('#map');
  let allEvents;
  let map;

  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $popupContent.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteHistEvent);
  $main.on('click', 'button.edit', getHistEvent);
  $('.histEventsIndex').on('click', getHistEvents);
  $('.createHistEvent').on('click', showCreateForm);
  $('.logout').on('click', logout);
  $('.close').on('click', menuHandler);

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

  function showMap() {
    map = new google.maps.Map($mapDiv[0], {
      center: { lat: 51.5, lng: -0.1 },
      zoom: 14
    });
    navigator.geolocation.getCurrentPosition((position) => {
      let latLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.panTo(latLng);
      map.setZoom(12);

      let marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.DROP,
        draggable: true,
        map: map
      });
    });
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
          <input class="form-control" name="lat" value="${histEvent.latitude}">
          <input class="form-control" name="lng" value="${histEvent.longitude}">
          <input class="form-control" name="lng" value="${histEvent.period}">
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
    }).fail(showLoginForm);
  }

  function getHistEvents() {
    if(event) event.preventDefault();
    let period = "Rome";

    let token = localStorage.getItem('token');
    $.ajax({
      url: `/histEvents?period=${period}`,
      method: "GET",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done((data) => {
      showHistEvents(data);
      allEvents = data;
      createHistEventMarker(data[0]);
    })
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

  function createHistEventMarker(histEvent) {
    let latLng = new google.maps.LatLng(histEvent.lat, histEvent.lng);
    let marker = new google.maps.Marker({
    position: latLng,
    map: map,
    });
  }

  function loopThroughHistEvents(data) {
    $.each(data.histEvents, (index, histEvent) => {
      createHistEventMarker(histEvent);
    });
  }

});
