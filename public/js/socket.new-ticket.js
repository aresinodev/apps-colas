// Comando para establecer la conexión.
var socket = io();
var label = $("#lblNuevoTicket");

socket.on("connect", function(client) {
    console.log("Client connect");
});

socket.on("disconnect", function(client) {
    console.log("Client disconnected");
});

socket.on("currentStatus", function(resp) {
    var currentStatus = resp.currentStatus;
    label.text(currentStatus);
});

$("button").on("click", function() {
    socket.emit("nextTicket", null, function(nextTicket) {
        label.text(nextTicket);
    });
});