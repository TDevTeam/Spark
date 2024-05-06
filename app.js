const express = require('express'); 
  
const app = express(); 
const PORT = 3000;

app.use(express.static("public"));
  
app.get('/', (req, res)=>{ 
  res.status(200); 
  res.sendFile(__dirname + "/index.html");
});

app.get('/home', (req, res)=>{ 
  res.status(200); 
  res.sendFile(__dirname + "/index.html");
});

app.get('/login', (req, res)=>{ 
  res.status(200); 
  res.sendFile(__dirname + "/login.html");
});

app.get('/register', (req, res)=>{ 
  res.status(200); 
  res.sendFile(__dirname + "/register.html");
});

app.get('/post', (req, res)=>{ 
  res.status(200); 
  res.sendFile(__dirname + "/post.html");
});
  
app.listen(PORT, (error) =>{ 
  if(!error) 
    console.log("Server is Successfully Running,and App is listening on port "+ PORT);
  else
    console.log("Error occurred, server can't start", error); 
  } 
);