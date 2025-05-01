//Legacy node js method of creating server using http module
// To run this method/file use 'node index.js'
// Here both can run simultaneously as each uses a different PORT

import http from "http";

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    console.log("Hello from server");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is up!!");
});
