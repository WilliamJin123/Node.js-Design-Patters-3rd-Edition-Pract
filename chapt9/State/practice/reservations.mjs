class ReservationState {
    confirm(reservation) {
        console.error("Operation not allowed in current state.");
    }
    cancel(reservation) {
        console.error("Operation not allowed in current state.");
    }
    delete(reservation) {
        console.error("Operation not allowed in current state.");
    }
}

class InitialState extends ReservationState{
    confirm(reservation) {
        console.log("Reservation confirmed.");
        reservation.state = new ConfirmedState();
    }
    cancel(reservation) {
        console.log("Reservation canceled.");
        reservation.state = new CancelledState();
    }
}

class CancelledState extends ReservationState {}

class ConfirmedState extends ReservationState{
    cancel(reservation) {
        if (reservation.isDayBefore()) {
            console.error("Cannot cancel the reservation a day before the event.");
        }
        console.log("Reservation cancelled.");
        reservation.setState(new CancelledState());
    }
}

class Reservation {
    constructor(date){
        this.date = date
        this.state = new InitialState();
    }
    setState(state){
        this.state = state;
    }
    confirm() {
        this.state.confirm(this);
    }

    cancel() {
        this.state.cancel(this);
    }

    delete() {
        this.state.delete(this);
    }
    isDayBefore() {
        const now = new Date();
        const diff = (this.date - now) / (1000 * 60 * 60 * 24);
        return diff < 1;
    }
}


const reservationDate = new Date();
reservationDate.setDate(reservationDate.getDate() + 2);

const reservation = new Reservation(reservationDate);
reservation.confirm(); // Reservation confirmed.
reservation.cancel();  // Reservation cancelled.
reservation.delete();