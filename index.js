const express = require('express'); 
const app = express();
const path = require('path')

// Serve static files from public directory
app.use(express.static('public')) 

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})