const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret', resave: true, saveUninitialized: true }));

mongoose.connect('mongodb+srv://Ananmay125:VbtYx2JULMXShYQd@spark.y99vyfb.mongodb.net/?retryWrites=true&w=majority&appName=Spark', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/post', (req, res) => {
    res.sendFile(__dirname + '/post.html');
});

app.get('/message', (req, res) => {
    res.sendFile(__dirname + '/message.html');
});

app.get('/new', (req, res) => {
    res.sendFile(__dirname + '/new.html');
});

app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/search.html');
});

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/profile.html');
});

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        next();
    }
};

app.get('/login', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/register', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({ username, password });
        req.session.userId = user._id;
        res.sendFile(__dirname + '/login.html');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error('Validation error:', error.message);
            res.status(400).send('Validation error');
        } else if (error.code === 11000 && error.keyPattern.username === 1) {
            console.error('Duplicate key error:', error.message);
            res.status(400).send('Username already exists');
        } else {
            console.error('Error registering user:', error.message);
            res.status(500).send('Error registering user');
        }
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.password === password) {
        req.session.userId = user._id;
        res.cookie('username', username, { expires: false });
        res.redirect('/index');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        res.redirect('/?logoutError=true');
      } else {
        res.clearCookie('username');
        res.redirect('/login');
      }
    });
  });  

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 