export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('salutations', a => {
        var d = new Date();
        var time = d.getHours();
        var greetings;

        if (time < 12) {
            greetings = "Morning ";
        } else if (time == 12) {
            greetings = "Afternoon ";
        } else if (time > 13 && time < 18) {
            greetings = "Afternoon ";
        } else if (time == 18) {
            greetings = "Evening ";
        } else if (time > 18) {
            greetings = "Evening ";
        }
        alert(`Hello ${greetings} !`)
        return greetings;
    })
}