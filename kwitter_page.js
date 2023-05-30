// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEFExrcfjgMcIfUK8wexdneSY0EJg3H00",
  authDomain: "clase-94-red-social.firebaseapp.com",
  databaseURL: "https://clase-94-red-social-default-rtdb.firebaseio.com",
  projectId: "clase-94-red-social",
  storageBucket: "clase-94-red-social.appspot.com",
  messagingSenderId: "797886942215",
  appId: "1:797886942215:web:4fa99c3495bc3ecabaaea2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("nombre_usuario");
room_name = localStorage.getItem("nombre_sala");
document.getElementById("nombre_sala").innerHTML="#"+room_name+"#";
function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
       });
       document.getElementById("msg").value="";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Inicia código
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
nombre = "<h4> " +name+"<img class='user_tick' src='tick.png'></h4>";
message = "<h4 class='message_h4'>" +message+ "</h4>";
boton_me_gusta = "<button class='btn btn-warning' id="+firebase_message_id+ " value=" +like+ " onclick='updateLike(this.id)'>";
icono = "<span class='glyphicon glyphicon-thumbs-up'>Like:" +like+ "</span></button><hr>";
renglon = nombre +message +boton_me_gusta +icono;
document.getElementById("output").innerHTML +=renglon;
//Termina código
 } });  }); }
 getData();
 function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes  
	 });

}
function logout(){
  localStorage.removeItem("nombre_usuario");
  localStorage.removeItem("nombre_sala");
  window.location="index.html";
}