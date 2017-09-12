

var cartoonChar = [
    'Doug Funnie', 'Angelica Pickles', 'Johnny Bravo', 'Scooby Doo', 'Arthur', 'Eliza Thornberry', 'Ash Ketchum', 'Timmy Turner', 'Helga Pataki', 'Max Goof', 'The Powerpuff Girls', 'Tommy Pickles',
    ];

    var cartoonDisplay = [''];
    var cartoonGif;

$(document).ready(function () {



///same function as displayAnswers in the Trivia Game
    function cartoonButton() {
        $('.cartoon-buttons').html('');
        for (var i = 0; i < cartoonChar.length; i++) {
            var b = $('<button>');
            b.attr('data-name', cartoonChar[i]);
            b.attr('class', 'character');
            b.text(cartoonChar[i]);
            b.appendTo('.cartoon-buttons')
        }
    }

    cartoonButton();


    function displayCartoon() {
        $(document).on('click', '.cartoon-buttons .character', function () {
            $('.cartoon-display').empty();
            var cartoonGif = $(this).attr('data-name');
            console.log('the name is ' + this);
            var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + cartoonGif + '&api_key=dc6zaTOxFJmzC';
            $.ajax({url: queryURL, method: 'GET'})
                .done(function (response) {
                    console.log(response);
                    var gifResults = response.data;
                    console.log('where am i ' + gifResults);
                    for (var i = 0; i < 10; i++) {
                        if (gifResults[i].rating !== 'r' && gifResults[i].rating !== 'pg-13') {
                            var gifImage = $('<img>');
                            gifImage.attr({
                                'src': gifResults[i].images.fixed_height_still.url,
                                'data-animate': gifResults[i].images.fixed_height.url,
                                'data-still': gifResults[i].images.fixed_height_still.url,
                                'data-state': 'still'
                            });

                            $('.cartoon-display').append(gifImage);

                        }
                    }
                });
        });
    }
    displayCartoon();

//Adds character to the Array
    function addChar() {
        $(document).on('click', '#search', function (event) {
            var newChar = $('#user-character').val();
            console.log(newChar);
            if (newChar !== '') {
                cartoonChar.push(newChar);
                console.log(cartoonChar);
                cartoonButton();
                displayCartoon();
            }
        })
    }
    addChar();


//Animates the gifs once they are clicked
    function animate() {
        $(document).on('click', 'img', function () {
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
        });

    }
    animate();



    });


