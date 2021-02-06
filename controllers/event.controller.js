'use strict';

/**
 * Module dependencies.
 */
var Event = require('../models/Event.model'),
    mongoose = require('mongoose'),
    async = require('async'),
    User = require('../models/User.model'),
    path = require("path"),
    multer = require("multer");

// Method to Create Event
exports.createEvent = function(req, res) {
    var data = req.body;
    console.log(req.body)
    var errorResult = {
        error: true,
        message: "",
    }
    async.waterfall([
        function(done){
            if (!data.title) {
                errorResult.message += " Title is missing ";                
            }
            if (!data.link) {
                errorResult.message += " Event Link is missing";                
            }
            if (!data.start_date) {
                errorResult.message += " Event Start Date is missing";                
            }
            if (!data.end_date) {
                errorResult.message += " Event End Date is missing";                
            }
            if (!data.description) {
                errorResult.message += " Event description is missing";                
            }
            if (!data.user) {
                errorResult.message += " Event Speakers Details are missing";                
            }
            if(errorResult.message) done(errorResult);
            else done(null,data)
        },
        function (data) {
            var event = new Event(data);
            event.save(function(err) {
                if (err) {
                    console.log("error----------",err);
                    return res.status(400).send({
                        "message": err
                    });
                } else {
                    res.json({
                        "message": "Event Added Successfully"
                    });
                }
            });
        }

    ], function(err) {
        console.log("error----------",err);
        return res.status(400).send({
            message: err.message
        });
    });
}

// Method to Get all Events
exports.getAllEvents = function (req, res){
    Event.find({}).exec(function(err,events){
        if(err){
            return res.status(400).send({
                status:0,
                message: "Something went wrong"
            })
        }
        if (events.length) res.status(200).json(events);
        res.json("No Event Hosted");
    })
}

// Method to Get a particlular Event By ID
exports.getEvent = function (req, res){
    var eventID = req.query.id;
    Event.findOne({_id:eventID}).exec(function(err,events){
        if(err){
            return res.status(400).send({
                status:0,
                message: 'No Event Hosted with this ID'
            })
        }
        return res.json(events);
    })
}


// Method to Update Event By ID
exports.updateEvent = function (req, res){
    var eventID = req.query.id;
    Event.updateOne({_id:eventID}).exec(function(err,events){
        if(err){
            return res.status(400).send({
                status:0,
                message: 'No Event Hosted with this ID'
            })
        }
        return res.json(events);
    })
}

// Method to delete a particlular Event 
exports.deleteEvent = function (req, res){
    var eventID = req.body.id;
    Event.findOneAndDelete({_id:eventID}).exec(function(err,event){
        if(err){
            return res.status(400).send({
                status:0,
                message: 'No Event Hosted with this ID'
            })
        }
        if(event==[]){
            res.send({
                status:1,
                message:"Successfully Deleted",
                "Event Detail":event
            })  
        }
        res.json("No Event Hosted");
    })
}

// Method to Delete all Events
exports.deleteAllEvents = function (req, res){
    Event.remove({}).exec(function(err,events){
        if(err){
            return res.status(400).send({
                status:0,
                message: 'No Event found'
            })
        }
        res.send({
            status:1,
            message:"All Events Successfully Deleted ",
        })
    })
}


// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 
var storage = multer.diskStorage({ 
	destination: function (req, file, cb) { 
		// Uploads is the Upload_folder_name 
		cb(null, "uploads") 
	}, 
	filename: function (req, file, cb) { 
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
	} 
}) 
	
// Define the maximum size for uploading the documents 1 Mb
const maxSize = 1 * 1000 * 1000; 
	
var upload = multer({ 
	storage: storage, 
	limits: { fileSize: maxSize }, 
	// fileFilter: function (req, file, cb){ 
	
	// 	// Set the filetypes, it is optional 
	// 	var filetypes = /jpeg|jpg|png/; 
	// 	var mimetype = filetypes.test(file.mimetype); 

	// 	var extname = filetypes.test(path.extname( 
	// 				file.originalname).toLowerCase()); 
    //     if (mimetype && extname) { 
    //         return cb(null, file); 
	// 	} 
	
	// 	cb("Error: File upload only supports the "
	// 			+ "following filetypes - " + filetypes); 
	// } 

// upload is the name of file attribute 
}).single("upload");	 

// method to upload documents
exports.uploadData = function (req, res) { 
	upload(req,res,function(err) { 
        var file =req.file
    	if(err) { 
    		res.send(err) 
		} 
		else {
            res.status(200).send({
                message: `Successfully, Data uploaded! path: ${file.path}` 
            });            
		} 
	}) 
}; 
	

exports.getArticles = async (req, res, next) => {
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === '0' ? '' : '-';
    const articles = await Article.find().select('-text -comments').sort(`${order}${sortBy}`).populate('author', '_id name avatar');
    res.status(200).json(articles);
}

exports.postArticle = async (req, res, next) => {
    const article = await new Article({...req.body, author: req.user._id}).save();
    await Article.populate(article, {
        path: 'author',
        select: '_id name avatar'
    })
    await User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {articles: article._id}}
    )
    res.status(201).json(article);
}

exports.getArticle = async (req, res, next) => {
    const {articleId} = req.params;
    const article = await Article.findById(articleId)
        .populate('author', '_id name avatar')
        .populate('comments.author', '_id name avatar')
        .populate('likes', '_id name avatar');
    res.status(200).json(article)
}

exports.updateArticle = async (req, res, next) => {
    const {articleId} = req.params;
    const article = await Article.findOneAndUpdate(
        {_id: articleId},
        {$set: req.body},
        {new: true, runValidators: true},
    )
        .populate('author', '_id name avatar')
        .populate('comments.author', '_id name avatar')
        .populate('likes', '_id name avatar');
    res.status(200).json(article);
}

exports.deleteArticle = async (req, res, next) => {
    const {articleId} = req.params;
    const deletedArticle = await Article.findOneAndDelete({_id: articleId});
    await User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {articles: deletedArticle._id}}
    )
    res.status(200).json(deletedArticle);
}

exports.likesArticle = async (req, res, next) => {
    const {articleId} = req.body;
    const updatedArticle = await Article.findOneAndUpdate(
        {_id: articleId},
        {
            $addToSet: {likes: req.user._id},
            $inc: {likesLength: 1}
        },
        {new: true, runValidators: true},
    )
    await User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {likes: articleId}}
    )
    res.status(200).json(updatedArticle);
}

exports.addComment = async (req, res, next) => {
    const {articleId, text} = req.body;
    const article = await Article.findOneAndUpdate(
        {_id: articleId},
        {$push: {comments: {author: req.user._id, text}}},
        {new: true, runValidators: true},
    )
        .populate('comments.author', '_id name avatar')
    res.status(200).json(article.comments);
}

exports.removeComment = async (req, res, next) => {
    const {commentId} = req.params;
    const {articleId} = req.body;
    const article = await Article.findOneAndUpdate(
        {_id: articleId},
        {$pull: {comments: {_id: commentId}}},
        {new: true, runValidators: true},
    )
    res.status(200).json(commentId);
}