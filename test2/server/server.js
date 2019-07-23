const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
var upload = multer({ dest: 'uploads/' });


const albumController = require('./albums/albumController');
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'client', 'node_modules')))
app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'client', 'src', 'index.html'))
})

// gets folder contents
app.get('/api/folder/:_id', albumController.getFolderContent);
app.post('/api/folder', albumController.addFolder);
app.put('/api/folder/:_id', albumController.updateFolder);
app.delete('/api/folder/:_id', albumController.deleteFolder);

// gets a file from server
app.get('/api/file/:_id', albumController.getFile);
app.post('/api/file', upload.fields([{name:'addedFiles', max:25}]), albumController.addFiles);
app.put('/api/file/:_id', albumController.updateFileName);
app.delete('/api/file/:_id', albumController.deleteFile);

app.listen(8080);






//error handler
app.use((err, req, res, next) => {
    if(err) {
        res.status(err.code || 500).json({
            message: err.message || 'Something went wrong'
        });
    }
});