const path = require('path')
const express = require('express')
const app = new express()

// app.get('/',(request, response)=>{
// response.json({
//     name: 'Fernando Ramos'
// });
// })

app.use(express.static('public'))

app.get('/',(request, response)=>{
    response.sendFile(path.resolve(__dirname, 'index.html'));
    })
    
app.get('/contact',(request, response)=>{
        response.sendFile(path.resolve(__dirname, 'contact.html'))
})

app.get('/about',(request, response)=>{
    response.sendFile(path.resolve(__dirname, 'about.html'))
})



app.listen(3000, ()=>{
    console.log('App listening in port 3000')
})



// const http = require('http')
// const fs = require('fs')

// const aboutPage = fs.readFileSync('about.html')
// const contactPage = fs.readFileSync('contact.html')
// const homePage = fs.readFileSync('index.html')

// const server = http.createServer((request, response)=> {
// console.log(request.url);

// if(request.url === '/about'){
//     response.end('The About page');
// }
// else if (request.url === '/contact')
// {
//     response.end('The Contact page');
// }
// else if (request.url === '/')
// {
// response.end(homePage);
// }
// else{
//     response.writeHead(404);
//     response.end('The page was not found');
// }
// })

// server.listen(3000);