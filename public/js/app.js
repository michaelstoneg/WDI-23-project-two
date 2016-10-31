'use strict';

var myVariable = void 0;
$(function () {

  var $main = $('main');

  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $main.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteDog);
  $main.on('click', 'button.edit', getDog);
  $('.dogsIndex').on('click', getDogs);
  $('.createDog').on('click', showCreateForm);

  var wikiSearch = "general assembly";
  var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + wikiSearch + "&format=json&callback=?";

  $.ajax({
    url: url,
    type: "GET",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    global: false
  }).done(updateData).fail();

  function updateData(data) {
    console.log(data);
    myVariable = data.query.pages[633042].extract;
    console.log(myVariable);
    var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' + '<div id="bodyContent">' + '<p>' + myVariable + '</p>' + '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' + 'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' + '(last visited June 22, 2009).</p>' + '</div>' + '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  }

  var uluru = { lat: -25.363, lng: 131.044 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if (isLoggedIn()) {
    getDogs();
  } else {
    showLoginForm();
  }

  function showRegisterForm() {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Register</h2>\n      <form method="post" action="/register">\n        <div class="form-group">\n          <input class="form-control" name="username" placeholder="Username">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">\n        </div>\n        <button class="btn btn-primary">Register</button>\n      </form>\n    ');
  }

  function showLoginForm() {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Login</h2>\n      <form method="post" action="/login">\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <button class="btn btn-primary">Login</button>\n      </form>\n    ');
  }

  function showCreateForm() {
    if (event) event.preventDefault();
    console.log("new dog!!");
    $main.html('\n      <h2>Create</h2>\n      <form method="post" action="/dogs">\n        <div class="form-group">\n          <input class="form-control" name="name" placeholder="name">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="breed" placeholder="breed">\n        </div>\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="age" placeholder="age">\n        </div>\n        <button class="btn btn-primary">Create</button>\n      </form>\n    ');
  }

  function showEditForm(dog) {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Edit Dog</h2>\n      <form method="put" action="/dogs/' + dog._id + '">\n        <div class="form-group">\n          <input class="form-control" name="name" placeholder="' + dog.name + '">\n          <input class="form-control" name="breed" placeholder="' + dog.breed + '">\n          <input class="form-control" name="age" placeholder="' + dog.age + '">\n        </div>\n        <button class="btn btn-primary">Update</button>\n      </form>\n    ');
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
      getDogs();
      console.log(data);
    }).fail(showLoginForm);
  }

  function getDogs() {
    if (event) event.preventDefault();

    var token = localStorage.getItem('token');
    $.ajax({
      url: '/dogs',
      method: "GET",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(showDogs).fail(showLoginForm);
  }

  function showDogs(dogs) {
    var $row = $('<div class="row"></div>');
    dogs.forEach(function (dog) {
      $row.append('\n        <div class="col-md-4">\n          <div class="card">\n            <img class="card-img-top" src="https://s-media-cache-ak0.pinimg.com/originals/cf/63/54/cf6354ef04148220314dc3610d8f8cdd.jpg" alt="Card image cap">\n            <div class="card-block">\n              <h4 class="card-title">' + dog.name + '</h4>\n              <p class="card-text">' + dog.breed + ', ' + dog.age + '</p>\n            </div>\n          </div>\n          <button class="btn btn-danger delete" data-id="' + dog._id + '">Delete</button>\n          <button class="btn btn-primary edit" data-id="' + dog._id + '">Edit</button>\n        </div>\n      ');
    });

    $main.html($row);
  }

  function deleteDog() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: '/dogs/' + id,
      method: "DELETE",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(getDogs).fail(showLoginForm);
  }

  function getDog() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: '/dogs/' + id,
      method: "GET",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(showEditForm).fail(showLoginForm);
  }

  function logout() {
    if (event) event.preventDefault();
    localStorage.removeItem('token');
    showLoginForm();
  }
});