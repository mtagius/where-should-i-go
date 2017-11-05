
function setCopyrightFooter() {
    $("#copyrightFooter").html("© " + new Date().getFullYear() + " Matt Agius & Makeda Phoenix, All Rights Reserved");
}

$(document).ready(function () {
    $("#searchButton").click(function() {
        searchPlaces();
        $("#searchButton").remove();
        $("#city").remove();
    });
    $('#city').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                searchNewCity();
            }
        });
    setCopyrightFooter();
});