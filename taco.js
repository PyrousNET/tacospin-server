let socket = new WebSocket("ws://" + window.location.host + "/ws")

socket.onopen = () => {
    console.log("Successfully Connected")
    socket.send("") //Check status
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket error: ", error)
}

socket.onmessage = event => {
    data = JSON.parse(event.data);
    if(data.end === 0) {
        document.getElementById('tacoImage').classList.add('spin');
        document.getElementById('messages').innerHTML = "The mighty taco spins have been observed at " + data.total_count + " rotations"
    } else {
        document.getElementById('tacoImage').classList.remove('spin');
        document.getElementById('messages').innerHTML = "The mighty taco has completed its rotations at " + data.total_count + " rotations"
    }
    
    setTimeout(function() { socket.send("Ack"); }, 5000);
}

function StartSpin()
{
    socket.send("/start")
}

function EndSpin()
{
    socket.send("/end")
}