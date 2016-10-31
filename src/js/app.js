$(() =>{


  let $main = $('main');



  // $('.register').on('click', showRegisterForm);
  // $('.login').on('click', showLoginForm);
  // $main.on('submit', 'form', handleForm);
  // $main.on('click', 'button.delete', deleteDog);
  // $main.on('click', 'button.edit', getDog);
  // $('.dogsIndex').on('click', getDogs);
  // $('.createDog').on('click', showCreateForm);
  // $('.logout').on('click', logout)function initMap() {

  
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Uluru (Ayers Rock)'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

});
//   function isLoggedIn() {
//     return !!localStorage.getItem('token');
//   }
//
//   if(isLoggedIn()) {
//     getDogs();
//   } else {
//     showLoginForm();
//   }
//
//   function showRegisterForm() {
//     if(event) event.preventDefault();
//     $main.html(`
//       <h2>Register</h2>
//       <form method="post" action="/register">
//         <div class="form-group">
//           <input class="form-control" name="username" placeholder="Username">
//         </div>
//         <div class="form-group">
//           <input class="form-control" name="email" placeholder="Email">
//         </div>
//         <div class="form-group">
//           <input class="form-control" type="password" name="password" placeholder="Password">
//         </div>
//         <div class="form-group">
//           <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">
//         </div>
//         <button class="btn btn-primary">Register</button>
//       </form>
//     `);
//   }
//
//   function showLoginForm() {
//     if(event) event.preventDefault();
//     $main.html(`
//       <h2>Login</h2>
//       <form method="post" action="/login">
//         <div class="form-group">
//           <input class="form-control" name="email" placeholder="Email">
//         </div>
//         <div class="form-group">
//           <input class="form-control" type="password" name="password" placeholder="Password">
//         </div>
//         <button class="btn btn-primary">Login</button>
//       </form>
//     `);
//   }
//
//
//   function showCreateForm() {
//     if(event) event.preventDefault();
//     console.log("new dog!!");
//     $main.html(`
//       <h2>Create</h2>
//       <form method="post" action="/dogs">
//         <div class="form-group">
//           <input class="form-control" name="name" placeholder="name">
//         </div>
//         <div class="form-group">
//           <input class="form-control" name="breed" placeholder="breed">
//         </div>
//         </div>
//         <div class="form-group">
//           <input class="form-control" name="age" placeholder="age">
//         </div>
//         <button class="btn btn-primary">Create</button>
//       </form>
//     `);
//   }
//
//
//   function showEditForm(dog) {
//     if(event) event.preventDefault();
//     $main.html(`
//       <h2>Edit Dog</h2>
//       <form method="put" action="/dogs/${dog._id}">
//         <div class="form-group">
//           <input class="form-control" name="name" placeholder="${dog.name}">
//           <input class="form-control" name="breed" placeholder="${dog.breed}">
//           <input class="form-control" name="age" placeholder="${dog.age}">
//         </div>
//         <button class="btn btn-primary">Update</button>
//       </form>
//     `);
//   }
//
//   function handleForm() {
//     if(event) event.preventDefault();
//     let token = localStorage.getItem('token');
//     let $form = $(this);
//
//     let url = $form.attr('action');
//     let method = $form.attr('method');
//     let data = $form.serialize();
//
//     $.ajax({
//       url,
//       method,
//       data,
//       beforeSend: function(jqXHR) {
//         if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
//       }
//     }).done((data) => {
//       if(data.token) localStorage.setItem('token', data.token);
//       getDogs();
//       console.log(data);
//     }).fail(showLoginForm);
//   }
//
//   function getDogs() {
//     if(event) event.preventDefault();
//
//     let token = localStorage.getItem('token');
//     $.ajax({
//       url: '/dogs',
//       method: "GET",
//       beforeSend: function(jqXHR) {
//         if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
//       }
//     })
//     .done(showDogs)
//     .fail(showLoginForm);
//   }
//
//   function showDogs(dogs) {
//     let $row = $('<div class="row"></div>');
//     dogs.forEach((dog) => {
//       $row.append(`
//         <div class="col-md-4">
//           <div class="card">
//             <img class="card-img-top" src="https://s-media-cache-ak0.pinimg.com/originals/cf/63/54/cf6354ef04148220314dc3610d8f8cdd.jpg" alt="Card image cap">
//             <div class="card-block">
//               <h4 class="card-title">${dog.name}</h4>
//               <p class="card-text">${dog.breed}, ${dog.age}</p>
//             </div>
//           </div>
//           <button class="btn btn-danger delete" data-id="${dog._id}">Delete</button>
//           <button class="btn btn-primary edit" data-id="${dog._id}">Edit</button>
//         </div>
//       `);
//     });
//
//     $main.html($row);
//
//   }
//
//   function deleteDog() {
//     let id = $(this).data('id');
//     let token = localStorage.getItem('token');
//
//     $.ajax({
//       url: `/dogs/${id}`,
//       method: "DELETE",
//       beforeSend: function(jqXHR) {
//         if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
//       }
//     })
//     .done(getDogs)
//     .fail(showLoginForm);
//   }
//
//   function getDog() {
//     let id = $(this).data('id');
//     let token = localStorage.getItem('token');
//
//     $.ajax({
//       url: `/dogs/${id}`,
//       method: "GET",
//       beforeSend: function(jqXHR) {
//         if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
//       }
//     })
//     .done(showEditForm)
//     .fail(showLoginForm);
//   }
//
//   function logout() {
//     if(event) event.preventDefault();
//     localStorage.removeItem('token');
//     showLoginForm();
//   }
// });
