// websocket.js

const socket = new WebSocket('ws://127.0.0.1:8000/ws')

socket.addEventListener('open', event => {
  console.log('WebSocket connection opened:', event)
})

export default socket
