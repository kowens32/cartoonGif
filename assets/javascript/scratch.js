

$(document).on('click', '#search', function (){
    var value = $('#user-character').val();
    console.log('whats going on ' +value);
    if (value !== '') {
        cartoonChar.push(value);
        console.log(cartoonChar);

    }


});