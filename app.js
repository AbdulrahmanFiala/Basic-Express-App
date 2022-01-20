const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogroutes = require('./routes/blogroutes');

// express app
const app = express();

//Connect to MongoDB
const dbURI = 'mongodb+srv://Fiala:ABF291998@cluster0.wxabk.mongodb.net/Node-crash-course?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    
    //res.send('<p>about page</p>');
    res.render('about', {title: 'About'}); 
})

//blog routes
app.use('/blogs', blogroutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Blog not found'});
});

