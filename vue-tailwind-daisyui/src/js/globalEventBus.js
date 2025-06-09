// eventBus.js
/**
 * EventBus serves as a mechanism to subscribe to, unsubscribe from,
 * and emit events. It allows for decoupled communication between different
 * parts of an application through an event-driven pattern.
 */
export class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * Registers an event listener for the specified event.
     *
     * @param {string} event - The name of the event to listen for.
     * @param {Function} listener - The callback function to invoke when the event is triggered.
     * @return {void}
     */
    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    /**
     * Removes a specific listener for the given event type.
     *
     * @param {string} event - The name of the event for which the listener should be removed.
     * @param {Function} listener - The callback function to be removed from the event's listener list.
     * @return {void} This method does not return a value.
     */
    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    /**
     * Emits an event, triggering all listeners associated with the given event name.
     *
     * @param {string} event - The name of the event to emit.
     * @param {*} payload - The data to be passed to each listener for the event.
     * @return {void} Does not return any value.
     */
    emit(event, payload) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(payload));
    }

    /**
     * Registers a one-time event listener for the specified event.
     * The listener will be invoked at most once after being triggered,
     * and then it is automatically removed.
     *
     * @param {string} event - The name of the event to listen for.
     * @param {Function} listener - The callback function to execute when the event is triggered.
     * @return {void}
     */
    once(event, listener) {
        const wrapper = (payload) => {
            this.off(event, wrapper);
            listener(payload);
        };
        this.on(event, wrapper);
    }
}

/**
 * An instance of EventBus responsible for facilitating the publish-subscribe
 * pattern for event-driven communication within an application.
 *
 * The `eventBus` variable allows components or modules to subscribe to specific
 * events and trigger those events when necessary. It helps in decoupling
 * different parts of the application, promoting modularity and maintainability.
 *
 * This EventBus instance enables:
 * - Registering event listeners for specific events.
 * - Emitting events to notify all subscribed listeners.
 * - Removing event listeners when they are no longer needed.
 */
const globalEventBus = new EventBus();

export default globalEventBus;


