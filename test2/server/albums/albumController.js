const albumService = require('./albumService');

module.exports = {
    addFolder : async function (req, res, next) {
        try { 
            let _id = await albumService.addFolder(req.body.name, req.body.parentPath);
            res.status(200).json({
                _id: _id
            })
        } catch(err) {
            return next(err);
        }
    },
    getFolderContent : async function (req, res, next) {
        try {
            const result = await albumService.getFolderContent(req.params._id);
            res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    },
    updateFolder : async function (req, res, next) {
        try {
            await albumService.updateFolder(req.params._id, req.body.name);
            res.status(200).json({
                message: 'folder updated successFully'
            })
        } catch(err) {
            next(err);
        }
    },
    deleteFolder: async function(req, res, next) {
        try {
            await albumService.deleteFolder(req.params._id);
            res.status(200).json({
                message: 'folder deleted successFully'
            });
        } catch (err) {
            next(err);
        }
    },
    getFile: async function(req, res, next) {
        try {
            let filePath = await albumService.getFile(req.params._id);
            res.sendFile(filePath);
        } catch(err) {
            next(err);
        }
    },
    addFiles: async function(req, res, next) {
        try{
            let files = req.files.addedFiles;
            await albumService.addFile(files, req.body.parentPath);
        } catch(err) {
            next(err);
        }
    },
    updateFileName: async function(req, res, next) {
        try {
            await albumService.updateFileName(req.params._id, req.body.name);
        } catch (err) {
            next(err);
        }
    },
    deleteFile: async function (req, res, next) {
        try {
            await albumService.deleteFile(req.params._id);
        } catch(err) {
            next(err);
        }
    }
}