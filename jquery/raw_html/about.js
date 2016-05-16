// Script should run when it's ready to be manipulated.
// Not when loaded (.onload()), which waits for all elements, including images, etc.
$(document).ready(function() {
    // assign a click handler to all "a" elements that alerts and does not follow the link
    $("a").click(function (event) {
        alert("Thanks for visiting! Sorry, but we're going to prevent you from leaving...");
        event.preventDefault();
    });
    // assign a click handler to all "a" elements to slowly hide them
    $("a").click(function (event) {
        event.preventDefault();
        $(this).hide("slow");
    });
    // assign all "a" elements a css class (properties which are defined in the html)
    $("a").addClass("test");
});
