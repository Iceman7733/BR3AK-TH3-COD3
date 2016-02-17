$(document).ready(function(){
	// Keep track of the # of guess
	var guesses = 0;
	// Generate the dropdownlist values
	var select = '';
	for (i = 0; i <= 9; i++) {
		select += '<option val=' + i + '>' + i + '</option>';
	}
	$('.Guess').html(select);
	
	// Generate 4 random numbers
	var code = [];
	for(i = 0; i <= 3; i++)
	{
		code[i] = Math.floor(Math.random() * 10)
	}
	
	// For debugging, show the answer in the paragraph below
	$("#answer").text("The answer is: " + code.join('-'));
	
	// Event handler for guess submission
	$('#submit').click(function(){
		guesses++;
		// keep track of which positions have correct values using booleans (e.g.  correct[0] = true means the first value is correct)
		var correct = [];
		// keep track of which positions are partially correct
		var almost = []
		// contains the user submission
		var guess = []
		
		var numCorrect = 0, numAlmost = 0;
		// initialize the 'correct' and 'almost' arrays to false
		for(i = 0; i < code.length; i++)
		{
			correct[i] = false;
			almost[i] = false;
		}
		// get the selected value from each drop down
		for(i = 1; i <= code.length; i++)
		{
			var id = "#%s";
			id = id.replace("%s", i);
			guess[i - 1] = parseInt($(id).val());
		}
		
		// check to see if the guess is correct
		if(guess[0] == code[0] && guess[1] == code[1] && guess[2] == code[2] && guess[3] == code[3])
		{
			$("h1").text("You win!");
			$("#reward").toggle();
		}
		else
		{
			// Figure out which positions have correct values
			for(i = 0; i < code.length; i++)
			{
				correct[i] = code[i] == guess[i];
			}
			
			// For each position, if the value is not correct, see if it's partially correct (right number, wrong place)
			for(i = 0; i < code.length; i++)
			{
				if(! correct[i])
				{
					// See if the guess at position 'i' matches any of the numbers in the other positions that haven't already been
					// confirmed as correct
					for(j = 0; j < code.length; j++)
					{
						if(!correct[j] && j != i && !almost[j])
						{
							if (guess[i] == code[j])
							{
								almost[j] = true;
								break;
							}
						}
					}
				}
			}
			
			// count the number of correct and almost answers
			for(i = 0; i < code.length; i++)
			{
				if(correct[i])
				{
					numCorrect++;
				}
				if(almost[i])
				{
					numAlmost++;
				}
			}
			$("#target").text(numCorrect + " are correct and " + numAlmost + " are in the wrong spot");
			var log = "<br>" + guesses + ")";
			for(i = 0; i < numCorrect; i++)
			{
				log += "<span class=\"correct\">&#9899</span>"
			}
			for(i = 0; i < numAlmost; i++)
			{
				log += "<span class=\"almost\">&#9899</span>"
			}
			for(i = 0; i < code.length - (numCorrect + numAlmost); i++)
			{
				log += "<span class=\"incorrect\">&#9899</span>"
			}
			log += "<span> " + guess.join('-') + "</span>";
			$("#log").prepend(log);
		}
	});
	
	// Event handler for showing solution
	$("#solutionToggle").click(function(){
		$("#answer").toggle();
	});
	
	// Event handler for showing log
	$("#logToggle").click(function(){
		$("#log").toggle();
	})
});