class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notify(data) {
        console.log("Notifying observers with data:", data); // Debugging log
        this.observers.forEach((observer) => observer.update(data));
    }
}

module.exports = Observable;
