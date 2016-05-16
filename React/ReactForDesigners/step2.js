// Script should run when document ready to be manipulated.
$(document).ready(function() {
    // initially disable
    $("button").prop("disabled", true);

    // when value in text area changes...
    $("textarea").on("input", function() {
		    // If there's text in there
		    if ($(this).val().length > 0) {
			      $("button").prop("disabled", false);
		    } else {
			      $("button").prop("disabled", true);
		    }
    });
});

