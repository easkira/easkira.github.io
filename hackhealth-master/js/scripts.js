$(document).ready(function(){
	
	var submit = function() {
		$("#answer").hide(); 
		var medicine = $("input[type=text]").val(); 
		$.get( "https://hackahackahack.herokuapp.com/lookup?drug=" + medicine , function( data ) {
			switch(data.shortAnswer) {
			    case 0:
			        $("#short").html("low concern");
			        $("body").animate({
			        	backgroundColor: "#5C8AD1" // blue
					}, 400, function() {
					    // Animation complete.
					});
			        break;
			    case 1:
			        $("#short").html("not recommended");
			        $("body").animate({
			        	backgroundColor: "#FFC914" // yellow
					}, 400, function() {
					    // Animation complete.
					});
			        break;
			    case 2: 
			    	$("#short").html("moderate risk");
			    	$("body").animate({
			        	backgroundColor: "#FF6700" // orange
					}, 400, function() {
					   // Animation complete.
					}); 
			    	break;
			    case 3: 
			    	$("#short").html("very dangerous"); 
			    	$("body").animate({
			        	backgroundColor: "#D72638" // red 
					}, 400, function() {
					    // Animation complete.
					}); 
			    	break;
			    case 4: 
			    	$("#short").html("unknown severity"); 
			    	$("body").animate({
			        	backgroundColor: "#FFC914" // yellow
					}, 400, function() {
					    // Animation complete.
					}); 
			    	break;
			    default:
			        $("#short").html("not found"); 
			        $("body").animate({
			        	backgroundColor: "#333333" // black
					}, 400, function() {
					    // Animation complete.
					}); 
			}
		  $("input[type=text]").val(data.drugName); 
		  $("#long").html(data.longAnswer);
		  $("#answer").fadeIn();
		  console.out("submit button");
		});
	}

	$("input").keypress(function(event) {
	    if (event.which == 13) {
	        event.preventDefault();
	        submit();
	    }
	});

	$("#submit").on("click", submit);
});