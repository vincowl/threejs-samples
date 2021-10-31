var serverURL = './'; //http://nas.heliosphere.fr/tests/json/';

function loadJSON(file, callback) {   

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);  
}


function displayProtocole(protocoleName) {
	var file = PROTOCOLE.getFile(protocoleName); //'./test.json';
	loadJSON(file, function(response) {
		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		//alert(actual_JSON.but)
		var divProtocole = document.getElementById("modalProtocol");
		PROTOCOLE.initialize(actual_JSON, divProtocole);
		PROTOCOLE.formatProtocole();
	});
}




