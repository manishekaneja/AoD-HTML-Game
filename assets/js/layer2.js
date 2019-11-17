// Binding with Resize Event
// For Screen Validation
function validateScreenSize() {
    if (window.innerWidth < 1200) {
        $("#screenSizeError").removeClass("hide");
    }
    else {
        $("#screenSizeError").addClass("hide");
    }
}
//On Ready => Initiating the intro part script
$(document).ready(function () {

    //First Click Event Listener 
    $("#layer2 h1").on('click', function () {
        let count = 0;

        $(this)
            .html(`~<i class="em em-bow"></i>~ Here are few instructions for you ~<i class="em em-cactus"></i>~`)
            .off();

        // Animations of Rules 
        $("#layer2 p")
            .each(function () {
                ++count;
                $(this).fadeIn(count * 2000)
            })
        
        //Callback functionality for Skip Button
        $("#skip")
            .on('click', function () {
                $("#layer2 p").stop().fadeIn();
                $("#skip").stop().fadeOut(10);
                $("#nextButton1").fadeIn().css('display', 'block').on('click', function () {
                    $("#layer2").fadeOut();
                    GET_INFOS();
                })
                clearTimeout(timeout);
            })
        
        // Functionality of showing the Proceed Button if skip button is not Pressed
        const timeout = setTimeout(function () {
            $("#skip").stop().fadeOut(10);
            $("#nextButton1").fadeIn().css('display', 'block');
            $("#nextButton1").on('click', function () {
                $("#layer2").fadeOut();

                //Call to next Screen
                GET_INFOS();
            })
        }, count * 500);

    });

    //check on Screen Resolution
    $(window).on('resize', validateScreenSize)
    validateScreenSize();

})