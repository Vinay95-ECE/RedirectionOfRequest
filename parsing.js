
//stream Defination:continuous flow of small packet of data continuously.

// Socket: Actual communication ka gate way hai isi se data aata hai and isi se jata hai.

// Chunks: small  packet of data ko hi chunks bolte hai, isse chota part nhi ho sakta.

// Buffer: man lo 10 size ka quque hai jab ye full ho jay to same order me send kr do taki order maintain rahe, taki streamming se order idhar udhar na ho jay.


const fs = require('fs');

const userRequestHandler = (req, res) => {
  console.log(req.url);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Enter Your Details:</h1>');
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
    res.write('<label for="male">Male</label>')
    res.write('<input type="radio" id="male" name="gender" value="male" />')
    res.write('<label for="female">Female</label>')
    res.write('<input type="radio" id="female" name="gender" value="female" />')
    res.write('<br><input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();

  } else if (req.url.toLowerCase() === "/submit-details" &&
        req.method == "POST") {


       // CHUNK READING
      //  req.on('data',chunk=>{
      //   // Buffer me kuch random number show hoga terminal me.
      //   console.log(chunk);
      //  }); 
       
       //Jo chunk buffer me random no show kar rahe the unko ab ek array me add kr k meaning full data banayenge;
      
       //creation of array
       const body=[];
      req.on('data',chunk=>{ 
        //chunck ko lock karna
        console.log(chunk);
        //chunk ko array me push karna
        body.push(chunk);
       });
       
       //data aana band ho gya
      req.on('end',()=>{
        const fullBody=Buffer.concat(body).toString();
        console.log(fullBody);
        // Key value me tod lena

        const params= new URLSearchParams(fullBody);
        const bodyObject={};
        for(const[key,val] of params.entries()){
         bodyObject[key]=val;
        }
        console.log(bodyObject);
         fs.writeFileSync('user.txt', JSON.stringify(bodyObject));
      });

     module.export=userRequestHandler;





   
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Like / Share / Subscribe</h1></body>');
  res.write('</html>');
  res.end();
};



module.exports=userRequestHandler;