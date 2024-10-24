import Idle from "./Idle.js"; 

var idle = new Idle();

var test = document.getElementById('test');
test.addEventListener('click', function(e) {
    idle.setTimeProgressBar(idle.getTimeProgressBar()-1);
})