'use strict';

/**
 * Module dependencies.
 */
var Event = require('../models/Event.model'),
    mongoose = require('mongoose'),
    async = require('async'),
    path = require("path"),    
    multer = require("multer");

// Method to Create Event
exports.createEvent = function(req, res) {
    var data = req.body;
    // console.log(req.body)
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
            for(let i= 0;i <data.user.length; i++){
                if (!data.user[i]) {
                    errorResult.message += " Event Speakers Details are missing";                
                }
                if (!data.user[i].info) {
                    errorResult.message += " Event Speaker Info is missing";                
                }                
            }
            if(errorResult.message) done(errorResult);
            else done(null,data)
        },
        function (data) {
            var event = new Event(data);
            event.save(function(err,result) {
                if (err) {
                    console.log("error----------",err);
                    return res.status(400).send({
                        "message": err
                    });
                } else {
                    var outputResult ={
                        id:result._id,
                        title:result.title,
                        link:result.link,
                        date:result.start_date,
                    }
                    res.json({
                        success:1,
                        "message": "Event Added Successfully",
                        outputResult
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
        if(events.length){
            return res.json(events);
        }
        return res.status(200).send({
            status:1,
            message: 'No Event Hosted '
        })
    })
}

// Method to Get a particlular Event By ID
exports.getEvent = function (req, res){
    var eventID = req.query.id;
    Event.findOne({_id:eventID}).exec(function(err,event){
        if(err){
            return res.status(400).send({
                status:0,
                message: 'Something went wrong'
            })  
        }
        if(event){
            return res.json(event);
        }
        return res.status(200).send({
            status:1,
            message: 'No Event Hosted with this ID'
        })
    })
}

// Method to Update Event By ID
exports.updateEvent = function (req, res){
    var data = req.body;
    Event.findOne({_id:data.id}).exec(function(err,event){
        if(err){
            return res.status(400).send({
                status:0,
                message: 'Event Id is not correct'
            })
        }
        if(event){
            if (data.title){
                event.title = data.title;
            }
            if (data.link){
                event.link = data.link;
            }
            if (data.description){
                event.description = data.description;
            }
            if (data.user){
                event.user = data.user;
            }
            event.save(function(err,result) {
                if (err) {
                    console.log("error----------",err);
                    return res.status(400).send({
                        "message": err
                    });
                } else {
                    var outputResult ={
                        id:result._id,
                        title:result.title,
                        link:result.link,
                        start_date:result.start_date,
                    }
                    res.json({
                        success:1,
                        "message": "Event Updated Successfully",
                        outputResult
                    });
                }
            });
        }
        else{
return res.json({
            status:0,
            message: 'No Event Hosted with this Id '
        })
        }
        
    })
}

// Method to delete a particlular Event 
exports.deleteEvent = function (req, res){
    var eventID = req.body.id;
    Event.findOneAndDelete({_id:eventID}).exec(function(err,event){
        if(err){
            return res.status(400).send({
                status:0,
                message: 'something went wrong'
            })
        }
        if(event){
            res.json({
                status:1,
                message:"Successfully Deleted",
                "Event Detail":event
            })            
        }
        else{
            return res.status(200).send("No Event Hosted with this ID")
        }        
    })
}

// Method to Delete all Events
exports.deleteAllEvents = function (req, res){
    Event.deleteMany({}).exec(function(err,events){
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
		// uploads is the Upload_folder_name 
		cb(null, "uploads") 
	}, 
	filename: function (req, file, cb) { 
        let extArray = file.originalname.split(".");
        let extension = extArray[extArray.length - 1];
        if(extension=="x-zip-compressed")
        cb(null, extArray[0] + '.zip')
        
        else
        cb(null, extArray[0]+ '.' +extension)        
	} 
}) 
	
// Define the maximum size for uploading the documents 10 Mb
const maxSize = 10 * 1000 * 1000; 
	
var upload = multer({ 
	storage: storage, 
	limits: { fileSize: maxSize }, 
    //If you want to filter the input data then uncommit the code 
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

// upload any file
}).any();	 

// method to upload documents
exports.uploadFile = function (req, res) { 
	upload(req,res,function(err) { 
        if(err) { 
    		res.send(err) 
		} 
		else {
            var outputFile={
                name:req.files[0].originalname,
                size:req.files[0].size,
                url:req.files[0].path,
            };
            res.status(200).send({
                "success" : 1,
                file:outputFile
            });            
		} 
	}) 
}; 