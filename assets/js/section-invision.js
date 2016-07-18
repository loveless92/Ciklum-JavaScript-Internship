$( document ).ready(function() {

var inputs = $('.signup_form input');

inputs.each(function (i) {
    $(this).focus(function() {
        $(this).parent().find('label').css( "opacity", ".5" );
    });
    $(this).focusout(function(){
        $(this).parent().find('label').css( "opacity", "1" )
    });
});


inputs.focusout(function(){
    if ($(this).val() < 2){
        $(this).addClass('error');
    } else {
        $(this).removeClass('error');
    }
});


inputs.keyup(function(e){
    if ($(this).val().length > 0 && $(this).val().length !== "") {
        $(this).parent().find('label').css( "display", "none" );
    } else {
        $(this).parent().find('label').css( "display", "block" );
    }
});

});