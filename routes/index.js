var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

var courses = [
	{_id : 1, courseId : "DT162G", courseName : "Javascript-baserad webbutveckling", coursePeriod : 1},
	{_id : 2, courseId : "IK060G", courseName : "Projektledning", coursePeriod : 1},
	{_id : 3, courseId : "DT071G", courseName : "Programmering i C#.NET", coursePeriod : 2},
	{_id : 4, courseId : "DT148G", courseName : "Webbutveckling för mobila enheter", coursePeriod : 2},
	{_id : 5, courseId : "DT102G", courseName : "ASP.NET med C#", coursePeriod : 3},
	{_id : 6, courseId : "IG021G", courseName : "Affärsplaner och kommersialisering", coursePeriod : 3},
	{_id : 7, courseId : "DT069G", courseName : "Multimedia för webben", coursePeriod : 4},
	{_id : 8, courseId : "DT080G", courseName : "Självständigt arbete", coursePeriod : 4}
];

/*
* Get all courses
*/
router.get('/', function(req, res, next){
	console.log("All");
	res.statusCode = 200;
	res.json(courses);
});

/*
* Get a specific course of id
*/
router.get('/:id', function(req, res, next){
	var Found = [{text : "This courses doesn't exist"}];

	var id = req.params.id;
	
	for(row of courses){
		if(row._id == id){
			Found = row;
		}
	}
	console.log("Sent data: "+Found);

	// res.ContentType('application/json');
	res.statusCode = 200;
	res.json(Found);
});

/*
* Delete course according to id
*/
router.delete('/:id', function(req, res, next){
	

	var id = req.params.id;
	var del = -1;
	var cnt = 0;

	for(row of courses){
		// find what should be deleted
		if(row._id == id){ del = cnt; }
		cnt++;
	}
	var found = [{text: "Not found"}];
	if(del >= 0){
		courses.splice(del, 1);
		res.statusCode = 200;
		console.log("id that gets deleted: "+id);
		found = [{text: "Done"}];
	} else{
		res.statusCode = 404;
		console.log("Id not found (delete)");
	}
	res.statusCode = 200;
	res.json(true);
});

module.exports = router;