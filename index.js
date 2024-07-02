import http, { createServer } from 'node:http'

const server = http.createServer((req, res)=>{

})

server.listen(8085,() => {
    console.log("servidor levantado")
})