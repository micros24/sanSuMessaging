// import WebSocket, { WebSocketServer } from "ws";

// const wss = new WebSocketServer({ port: 3000 });
// wss.on("connection", function connection(ws) {
//     ws.on("message", function message(data) {
//         const clientMessage = JSON.parse(data);

//         if(clientMessage.type === "message") {
//             wss.clients.forEach((client) => {
//                 if(client !== ws && client.readyState === WebSocket.OPEN) {
//                     client.send(JSON.stringify({ type: "message", data: clientMessage.data}));
//                 }
//             });
//         }
//     });
// });