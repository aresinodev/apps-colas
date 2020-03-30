const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on("nextTicket", (data, callback) => {
        let nextTicket = ticketControl.nextTicket();
        callback(nextTicket);
    });

    client.emit("currentStatus", {
        currentStatus: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFourTicket()
    });

    client.on("attendTicket", (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: "The desktop is required"
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desktop);

        callback(attendTicket);

        client.broadcast.emit("lastFour", {
            lastFour: ticketControl.getLastFourTicket()
        });
    });

    client.on("lastFour", (data, callback) => {
        
    });
});