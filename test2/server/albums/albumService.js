const albumRepository = require('./albumRepository');
const promise = require('bluebird');
const ExifImage = require('exif').ExifImage;
const fs = require('fs');
const fsAsync = promise.promisifyAll(fs);


module.exports = {
    addFolder: function (name, parentPath) {
        return albumRepository.addNewDoc({name, parentPath});
    },
    getFolderContent: function(_id) {
        return albumRepository.getFolderContent(_id);
    },
    updateFolder: function(_id, name) {
        return albumRepository.updateById(_id, {name});
    },
    deleteFolder: async function(_id) {
        let doc = albumRepository.getRecordById(_id);
        await fsAsync.unlinkAsync(doc.filePath);
        return albumRepository.deleteFolder(_id);
    },
    getFile : async function (_id) {
        let doc = await albumRepository.getRecordById(_id);
        return doc.filePath;
    },
    addFiles: async function(files, parentPath) {
        let records = Promise.all(files.map(async file => {
            return {
                name: file.filename,
                filePath: file.path,
                parentPath,
                exif: (await getExifInfo(file.path))
            }
        }));
        return albumRepository.insertMany(records);
    },
    updateFileName: async function (_id, name) {
        return albumRepository.updateById(_id, {name: name});
    },
    deleteFile: async function (_id) {
        return albumRepository.removeById(_id);
    }
}

async function getExifInfo(filepath) {
    return new Promise((resolve, reject) => {
        new ExifImage({ image : 'myImage.jpg' }, function (error, exifData) {
            if (error)
                reject(error);
            else
                resolve(exifData);
        });
    });
}