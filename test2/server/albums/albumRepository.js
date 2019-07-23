const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true});
const Album = mongoose.model('Album', {
    name: String,
    parentPath: String,
    filePath: String,
    exif: String
});

module.exports = {
    async addNewDoc(doc) {
        const album = new Album(doc);
        await album.save();
        return album._id;
    },
    
    async deleteFolder(_id) {
        _id = new mongoose.Types.ObjectId(_id)
        let doc = await Album.findOne({_id: _id});
        if(!doc) {
            throw 'document not found'
        }
        await Album.deleteMany({$or: [{parentPath: new RegExp(`^${doc.parentPath + ', ' + doc._id}`)}, {_id:_id}]});
    },
    async getFolderContent(_id) {
        _id = new mongoose.Types.ObjectId(_id)
        let doc = await Album.findOne({_id: _id});
        if(!doc) {
            throw 'document not found'
        }
        let result = await Album.find({parentPath: new RegExp(`^${doc.parentPath + ', ' + doc._id}`)});
        return result;
    },
    async insertMany(records) {
        Album.insertMany(records);
    },
    async getRecordById(_id) {
        return await Album.findOne({_id: new mongoose.Types.ObjectId(_id)});
    },
    async updateById(_id, doc) {
        return await Album.updateOne({_id: new mongoose.Types.ObjectId(_id)}, doc);
    },
    async removeById(_id) {
        return await Album.deleteOne({_id: new mongoose.Types.ObjectId(_id)});
    }
}
