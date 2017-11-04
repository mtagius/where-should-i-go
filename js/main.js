
function setCopyrightFooter() {
    $("#copyrightFooter").html("© " + new Date().getFullYear() + " Matt Agius & Makeda Phoenix, All Rights Reserved");
}

$(document).ready(function () {
    setCopyrightFooter();
});