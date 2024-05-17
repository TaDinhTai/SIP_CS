class SocketServices {
  //connection socket
  connection(socket) {
    socket.on('disconnect', () => {
      console.log(`User disconnect id is ${socket.id}`);
    });

    // event on here

    socket.on('getData', (data) => {
      console.log(data);
      _io.emit("getData", data);
    });

    // on room...
  }
}


export const socketServices = new SocketServices();
