var socket = io();
var label = $("small");
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desktop")) {
    window.location = "index.html";
    throw new Error("The desktop is required.");
}

var desktop = searchParams.get("desktop");

$("h1").text("Escritorio " + desktop);

$("button").on("click", function() {
    socket.emit("attendTicket", {
        desktop: desktop
    }, function (resp) {
        if (resp === "No tickets") {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text("Ticket " + resp.ticketNumber);
    });
});