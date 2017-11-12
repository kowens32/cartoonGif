$(document).ready(function () {

var cartoonChar = [
    'Doug Funnie', 'Angelica Pickles', 'Johnny Bravo', 'Scooby Doo', 'Arthur', 'Eliza Thornberry', 'Ash Ketchum', 'Timmy Turner', 'Helga Pataki', 'Max Goof', 'The Powerpuff Girls', 'Tommy Pickles',
    ];

    var cartoonDisplay = [''];
    var cartoonGif;



    createButtons();

    $(document).on('click', '.cartoon-buttons .character', createGif);
    $(document).on('click', '#search', addCharacterToArray);
    $(document).on('click', 'img', updateGifState);


    function updateGifState () {
        var state = $(this).attr('data-state');
        console.log('who ' + state);
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }

    function addCharacterToArray() {
        var newChar = $('#user-character').val();
        console.log(newChar);
        if (newChar !== '') {
            cartoonChar.push(newChar);
            console.log(cartoonChar);
            createButtons();

        }
    }
    function createGifImage(animateSrc, src) {
        var gifImage = $('<img>');
        gifImage.attr('class', '.img-resposive');
        gifImage.attr({
            'src': src,
            'data-animate': animateSrc,
            'data-still': src,
            'data-state': 'still'
        });

        return gifImage;
    }

    function  appendGif(div, rating, img) {
        div.append(rating);
        div.append(img);
        $('.cartoon-display').append(div);
    }

    function createGif () {
        $('.cartoon-display').empty();
        var cartoonGif = $(this).attr('data-name');
        console.log('the name is ' + this);
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + cartoonGif + '&api_key=dc6zaTOxFJmzC';
        var gifQuery = $.ajax({url: queryURL, method: 'GET'})
        gifQuery.done(init);
    };

    function init(response) {
        console.log(response);

        var gifResults = response.data;
        console.log('where am i ' + gifResults);

        for (var i = 0; i < 15; i++) {
            if (gifResults[i].rating !== 'r' && gifResults[i].rating !== 'pg-13') {

                var gifDiv = $('<div>');
                gifDiv.attr('class', 'gifDiv');
                var gifRating = ('<p>' + 'Rating ' + gifResults[i].rating + '</p>');

                var gifImage = createGifImage(gifResults[i].images.fixed_height.url, gifResults[i].images.fixed_height_still.url);

                appendGif(gifDiv, gifRating, gifImage);
            }
        }
    }

    function createButtons() {
        $('.cartoon-buttons').html('');
        for (var i = 0; i < cartoonChar.length; i++) {
            var b = $('<button>');
            b.attr('data-name', cartoonChar[i]);
            b.attr('class', 'character');
            b.text(cartoonChar[i]);
            b.appendTo('.cartoon-buttons')
        }
    }
});


