$(() =>{

  let $main = $('main');

  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $main.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteDog);
  $main.on('click', 'button.edit', getDog);
  $('.usersIndex').on('click', getDogs);
  $('.logout').on('click', logout);

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if(isLoggedIn()) {
    getDogs();
  } else {
    showLoginForm();
  }

  function showRegisterForm() {
    if(event) event.preventDefault();
    $main.html(`
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
    $main.html(`
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

  function showEditForm(dog) {
    if(event) event.preventDefault();
    $main.html(`
      <h2>Edit Dog</h2>
      <form method="put" action="/dogs/${dog._id}">
        <div class="form-group">
          <input class="form-control" name="name" placeholder="Name" value="${dog.name}">
          <input class="form-control" name="breed" placeholder="Breed" value="${dog.breed}">
          <input class="form-control" name="age" placeholder="Age" value="${dog.age}">
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
      getDogs();
      console.log(data);
    }).fail(showLoginForm);
  }

  function getDogs() {
    if(event) event.preventDefault();

    let token = localStorage.getItem('token');
    $.ajax({
      url: '/dogs',
      method: "GET",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done(showDogs)
    .fail(showLoginForm);
  }

  function showDogs(dogs) {
    let $row = $('<div class="row"></div>');
    dogs.forEach((dog) => {
      $row.append(`
        <div class="col-md-4">
          <div class="card">
            <img class="card-img-top" src="https://s-media-cache-ak0.pinimg.com/originals/cf/63/54/cf6354ef04148220314dc3610d8f8cdd.jpg" alt="Card image cap">
            <div class="card-block">
              <h4 class="card-title">${dog.name}</h4>
              <p class="card-text">${dog.breed}, ${dog.age}</p>
            </div>
          </div>
          <button class="btn btn-danger delete" data-id="${dog._id}">Delete</button>
          <button class="btn btn-primary edit" data-id="${dog._id}">Edit</button>
        </div>
      `);
    });

    $main.html($row);
  }

  function deleteDog() {
    let id = $(this).data('id');
    let token = localStorage.getItem('token');

    $.ajax({
      url: `/dogs/${id}`,
      method: "DELETE",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done(getDogs)
    .fail(showLoginForm);
  }

  function getDog() {
    let id = $(this).data('id');
    let token = localStorage.getItem('token');

    $.ajax({
      url: `/dogs/${id}`,
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
    showLoginForm();
  }
});
