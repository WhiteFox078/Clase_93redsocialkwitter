function agregar_usuario() {
    nombre_usuario=document.getElementById("nombre_usuario").value;
    localStorage.setItem("nombre_usuario", nombre_usuario);
    window.location="kwitter_room.html";
}