var api_baseurl = '/cgi-bin/test/myrest';
$(document).ready(function () {
	displayall();
});

function displayall() {
	jQuery.get(api_baseurl + '/display/all', function (response) {
		var kvpair = JSON.parse(response);
		
		for (var k in kvpair) {
		    if (kvpair.hasOwnProperty(k)) {
				$("#items").append("<div id='kvpair_" + k + "' class='kvpair'>" + 
					"<div id='key'>" + k + "</div>" + 
					"<div id='value'>" + kvpair[k] + "</div>" +
					"<div id='action'><input type='button' value='x' onclick=\"deletekey('" + k + "')\"></div>" +
					"</div>");
		    }
		}
	});
}

function putkvpair () {
	jQuery.get(api_baseurl + '/put/key/' + $('#inputkey').val() + '/value/' + $('#inputval').val(), function (response) {
		$("#items").empty();
		displayall();
	});	
}

function deletekey(k) {
	jQuery.get(api_baseurl + '/delete/key/' + k, function (response) {
		if (response == '{}') {
			alert('key not found');
		}
		else {
			$('#kvpair_'+k).remove();
			//alert('key deleted: ' + k);
		}
	});
}
