
# Node.js Backend Docs 
In this Document, I will explain you how to setup the server and how to use this rest api in more convient way.
## [](https://github.com/prateek1998/event-workshop-backend#installation)Installation

### [](https://github.com/prateek1998/event-workshop-backend#install-via-npm)Install via NPM
```shell
npm install
```

**To run Development  environment**
```shell
npm run dev
```
**To run Production environment**

```shell
npm run start
```
Now your service is running on '[http://localhost:5000](http://localhost:5000/)'.

## Project Directory Structure

```
├── config
│	└── index.js
├── controllers
│	└── event.controller.js
├── models
│	└── Event.model.js
├── routes
│	└── events.routes.js
├── uploads
├── .gitignore
├── LICENCE
├── app.js
├── package-lock.json
├── package.json
└── readme.md
```
## Changing the Port No
open config folder where you will find  the index.js file then simply change the port no.
```javascript
PORT: process.env.PORT || 5000
```
## Changing the Database Url
open config folder where you will find  the index.js file then simply change the port no.
```javascript
uri: process.env.NODE_ENV ||mongodb://localhost/workshop
```


## JSON Objects returned by API:

Make sure the right content type like  `Content-Type: application/json; charset=utf-8`  is correctly returned.
## Endpoints:

### Create Event

`POST /api/event`

Example request body:
```
{
	"title": "India Craft Week, 2021",
	"link": "https://www.indiancrafts.com",
	"description":{"time":1612726658456,"blocks":[{"type":"header","data":
	{"text":"Editor.js","level":2}},{"type":"attaches","data":{"file"{"url":"https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/road
ster_and_semi/roadster/hero.jpg","name":"hero.jpg","extension":"jpg","size"
:91},"title":"Hero"}},{"file":{"url":"uploads\\file.pdf","name":"Information.pdf","extension":"pdf","size":94597},"title":"Information.pdf"}}],"version":"2.19.1"},
	"start_date": "2021-02-05T18:50:37.457Z",
	"end_date": "2021-02-05T19:00:01.609Z",
	"user": [
		{
			"username": "Prateek Saini",
			"info": "Software Developer",
			"avatar":"/uploads/avatar.png"
		},{
			"username": "Nikhil Saini",
			"info": "Game Developer",
			"roles": "moderator"
		}
	],
	"tags": [
		"Nodejs",
		"MongoDb"
	],
}
```
Required fields:  `title`,  `link`, `description`,  `start_date`, `end_date`, 	`user`.

Optional fields:  `tags`,`resources`,`joining_resources`,`organizer`,   as an array of Strings

Example response body:
```
{	
	"success": 1,
	"message": "Event Added Successfully",
	"outputResult": {
		"id": "6021250578846f0664647dc1",
		"title": "India Craft Week, 2021",
		"link": "https://www.indiancrafts.com",
		"date": "2021-02-05T18:50:37.457Z"
	}
}
```
### Get Event

`GET /api/event/:id`

Example response body:
```
{	
	"organizer": [],
	"tags": [
		"Nodejs",
		"MongoDb"
	],
	"_id": "6021250578846f0664647dc1",
	"title": "India Craft Week, 2021",
	"link": "https://www.indiancrafts.com",
	"description": {
		"time": 1612726658456,
		"blocks": [
			{
				"type": "header",
				"data": {
					"text": "Editor.js",
						"level": 2
				}
			},
			{
				"type": "attaches",
				"data": {
					"file": {
						"url":"https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
						"name": "hero.jpg",
						"extension": "jpg",
						"size": 91
					}
			},
		}
	},
	"start_date": "2021-02-05T18:50:37.457Z",
	"end_date": "2021-02-05T19:00:01.609Z",
	"user": [
		{
			"roles": ["speaker"],
			"avatar": "/uploads/avatar.png",
			"_id": "6021250578846f0664647dc2",
			"username": "Prateek Saini",
			"info": "Software Developer"
		},
		{
			"roles": ["moderator"],
			"avatar": "/uploads/avatar.png",
			"_id": "6021250578846f0664647dc3",
			"username": "Nikhil Saini",	
			"info": "Software Developer"	
		}
	],
	"created_at": "2021-02-08T11:48:21.557Z",
	"updated_at": "2021-02-08T11:48:21.563Z",
	"__v": 0
}
```
### Fetching All Events

`GET /api/events`

Example response body:
```
[
	{	
		"organizer": [],
		"tags": [
			"Nodejs",
			"MongoDb"
		],
		"_id": "6021250578846f0664647dc1",
		"title": "India Craft Week, 2021",
		"link": "https://www.indiancrafts.com",
		"description": {
			"time": 1612726658456,
			"blocks": [
				{
					"type": "header",
					"data": {
						"text": "Editor.js",
							"level": 2
					}
				},
				{
					"type": "attaches",
					"data": {
						"file": {
							"url":"https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
							"name": "hero.jpg",
							"extension": "jpg",
							"size": 91
						}
				},
			}
		},
		"start_date": "2021-02-05T18:50:37.457Z",
		"end_date": "2021-02-05T19:00:01.609Z",
		"user": [
			{
				"roles": ["speaker"],
				"avatar": "/uploads/avatar.png",
				"_id": "6021250578846f0664647dc2",
				"username": "Prateek Saini",
				"info": "Software Developer"
			},
			{
				"roles": ["moderator"],
				"avatar": "/uploads/avatar.png",
				"_id": "6021250578846f0664647dc3",
				"username": "Nikhil Saini",	
				"info": "Software Developer"	
			}
		],
		"created_at": "2021-02-08T11:48:21.557Z",
		"updated_at": "2021-02-08T11:48:21.563Z",
		"__v": 0
	}
]
```

### Update Event

`PUT /api/event`

Example request body:
```
{
	"id": "6021250578846f0664647dc1",
	"title": "Country Event 2021",
	"link": "https://www.greatIndia.com",
}
```
Required fields:  `id`.

Optional fields:  `link`,`title`,`descriptions`,`tags`,`resources`,`joining_resources`,
`organizer`, and so on

Example response body:
```
{
	"success": 1,
	"message": "Event Updated Successfully",
	"outputResult": {
		"id": "6021250578846f0664647dc1",
		"title": "Country Event 2021",
		"link": "https://www.greatIndia.com",
		"start_date": "2021-02-05T18:50:37.457Z"
	}
}
```
### Delete Event

`DELETE /api/event`

Example request body:
```
{
	"id": "6021250578846f0664647dc1",
}
```
Required fields:  `id`.

Example response body:
```
{
	"status": 1,
	"message": "Successfully Deleted",
	"Event Detail": {
		"organizer": [],
			"tags": [
				"Nodejs",
				"MongoDb"
			],
			"_id": "6021250578846f0664647dc1",
			"title": "India Craft Week, 2021",
			"link": "https://www.indiancrafts.com",
			"description": {
				"time": 1612726658456,
				"blocks": [
					{
						"type": "header",
						"data": {
							"text": "Editor.js",
								"level": 2
						}
					},
					{
						"type": "attaches",
						"data": {
							"file": {
								"url":"https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
								"name": "hero.jpg",
								"extension": "jpg",
								"size": 91
							}
					},
				}
			},
			"start_date": "2021-02-05T18:50:37.457Z",
			"end_date": "2021-02-05T19:00:01.609Z",
			"user": [
				{
					"roles": ["speaker"],
					"avatar": "/uploads/avatar.png",
					"_id": "6021250578846f0664647dc2",
					"username": "Prateek Saini",
					"info": "Software Developer"
				},
				{
					"roles": ["moderator"],
					"avatar": "/uploads/avatar.png",
					"_id": "6021250578846f0664647dc3",
					"username": "Nikhil Saini",	
					"info": "Software Developer"	
				}
			],
			"created_at": "2021-02-08T11:48:21.557Z",
			"updated_at": "2021-02-08T11:48:21.563Z",
			"__v": 0
	}
}
```
### Delete All Event

`DELETE /api/events`

Example response body:
```
{
	"status": 1,
	"message": "All Events Successfully Deleted "
}
```


### Uploading Documents/Files

`POST /api/uploadFile`

Example response body:
```
{
	"success": 1,
	"file": {
		"name": "avataar.png",
		"size": 5009,
		"url": "uploads/upload.png"
	}
}
```
## Output data
| Field |  Description|
|--|--|
| name | file name  |
| size| file size in Kbs |
| url | server destination path |


