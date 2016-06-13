/*
*This is a script to access the node js API on the backend.
*
*It's a really simple and unimportant javascript lab in a
*school course called web programing and scripting.
*/

// work around for fixing headers by php_script.
var getUrl = "http://127.0.0.1:3000/courses/";
var deleteUrl = "http://127.0.0.1:3000/courses/";

/*
*Displays the content from paramenter coursesArr
*
*coursesArr should come getAll and will be arrege and 
*should on the page as wanted
*/
function displayFunction (coursesArr){
	var out = "<tr><td>ID</td><td>Course ID</td><td>Course Name</td><td>Period</td><td>button for delete coursesArr[i]</td></tr>";
	var i;
	for(i=0; i < coursesArr.length;i++){
		out += "<tr>";
		out += "<td>"+JSON.stringify(coursesArr[i]._id)+"</td>";
		out += "<td>"+coursesArr[i].courseId+"</td>";
		out += "<td>"+coursesArr[i].courseName+"</td>";
		out += "<td>"+coursesArr[i].coursePeriod+"</td>";
		out += '<td><button type="button" id="'+coursesArr[i]._id+'">remove</button></td>';
		out += "</tr>";
	}
	document.getElementById("present").innerHTML = out;
};

/*
* Ajax get request to get the data from server.
*/
function getAll(){
	$.ajax({
		dataType: 'json',
		url: getUrl,
		type: 'GET',
		success: function(result){
			// For showing the recived data.
			displayFunction(result);
		}
	});
}

/*
*Delte a specific data entry and call getAll for updating
*the page.
*/
function remove(id){
	var del = deleteUrl+id;
	$.ajax({
		// url: deleteUrl,
		url: del,
		type: 'DELETE',
		data: {urlID: id},
		success: function(result) {
			// Find our daddy
			var daddy = document.getElementById("present");
			// Kill daddys children
			while(daddy.hasChildNodes()){
				daddy.removeChild(daddy.firstChild);
			}
			// get som small beutiful children for daddy.
			getAll();
		}
	});
};

/*
*When the document is ready we'll call getAll
*/
$(document).ready(function(){
	// Call getAll.
	getAll();
	// Lissen to button and remove after clicked.
	$("#present").on('click', 'button', function(){
		remove($(this).prop('id'));
	});
});