
import server from './api/index.js'


// 
server.get("/",(req, res)=>{
    return res.status(200).json("Hello")
})

const port = 4000
server.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})