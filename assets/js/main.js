let ip = document.getElementById('ip').innerText;

console.log(ip)
const ws = new WebSocket(`ws://${ip}:8822`)
window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation (event) {
    ws.send(`{
        "alpha": ${event.alpha},
        "beta": ${event.beta},
        "gamma": ${event.gamma}
    }`);
    var info = document.querySelector('.info');
    var obj = event;
    if (obj.beta < -20) {
        info.innerText = 'Moving Up';
    }
    if (obj.beta > 20) {
        info.innerText = 'Moving Down';
    }
    if (obj.gamma > 25) {
        info.innerText = 'Moving Right';
    }
    if (obj.gamma < -25) {
        info.innerText = 'Moving Left';
    }
    if (obj.alpha > 125) {
        info.innerText = 'Zoom Out';
    }
    if (obj.alpha < 65) {
        info.innerText = 'Zoom In';
    } 
    if ((obj.beta > -20 && obj.beta < 20) && (obj.gamma < 25 && obj.gamma > -25) && (obj.alpha < 125 && obj.alpha > 65)) {
        info.innerText = '';
    }
}