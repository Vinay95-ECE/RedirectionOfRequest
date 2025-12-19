const http=require('http');

const server=http.createServer((req,res)=>{
  if(req.url==='/home'){
    res.write('<h1>Welcome to home</h1>');
    return res.end();
  }
res.writeHead(200,{"Content-Type":"text/html"});

res.write(`
<html lang="en">
<head>
  <title>Myntra</title>
</head>
<body>
<head>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/men">Men</a></li>
      <li><a href="/women">Women</a></li>
      <li><a href="/child">Child</a></li>
      <li><a href="/cart">Cart</a></li>
    </ul>
  </nav>
</head>  
</body>
</html>

`);
res.end();
});

server.listen(3001,()=>{
  console.log("Server running on address http://localhost:3001");
});