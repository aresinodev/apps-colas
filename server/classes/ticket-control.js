const fs = require("fs");

class Ticket {
    constructor(ticketNumber, desktop) {
        this.ticketNumber = ticketNumber;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require("../data/data.json");

        // Cada vez que empieza un nuevo día, reiniciamos todos los campos.
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCount();
        }
    }

    nextTicket() {
        this.last += 1;

        // Generamos un nuevo ticket.
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveIntoFile();

        return `Ticket ${ this.last }`;
    }

    getLastTicket() {
        return `Ticket ${ this.last }`;
    }

    getLastFourTicket() {
        return this.lastFour;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No tickets';
        }

        let ticketNumber = this.tickets[0].ticketNumber;
        this.tickets.shift(); // Eliminamos el primer elemento del array de tickets.

        let attendTicket = new Ticket(ticketNumber, desktop);

        this.lastFour.unshift(attendTicket); // Añadimos el ticket al inicio del array.

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // Borramos el último elemento.
        }

        this.saveIntoFile();

        return attendTicket;
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        console.log("Init system");
        this.saveIntoFile();
    }

    saveIntoFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync("./server/data/data.json", jsonDataString);
    }
}

module.exports = {
    TicketControl
};