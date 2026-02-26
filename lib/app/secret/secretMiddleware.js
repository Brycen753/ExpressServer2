// use /init
// only run if there isn't a secret #
function init(req, res, next) {
    if (req.session.secretNumber === undefined) {
        req.session.secretNumber = Math.floor(Math.random() * 100) + 1;
        req.session.guesses = [];
        req.session.invalidGuess = false;
    }
    next();
}

// get /play 
// 
function showPlayPage(req, res, next) {
    const secret = req.session.secretNumber;

    // I feel like I'm missing something here.
    const reversedGuesses = [req.session.guesses].reverse();

    const guesses = reversedGuesses.map((guess) => {

        if (guess > secret) {
            return {result: ' - too high', className: 'high'};
        } 
        else if (guess < secret) {
            return {result: ' - too low', className: 'low'};
        } 
        else {
            return {result: ' - correct', className: 'correct'};
        }

        /*return {
            value: guess,
            result: result,
            class: className
        };*/
    });

    const won = req.session.guesses.includes(secret);

    res.status(200);
    res.render('guessingGame.hbs', {
        guesses: guesses,
        won: won,
        guessCount: req.session.guesses.length,
        invalidGuess: req.session.invalidGuess,
        debug: req.query.mode === 'debug' ? true : false,
        secretNumber: secret
        });
}

// post /guess
// add the valid guess to the sessions guess list
// or set invalid to tue
function guessSubmission(req, res, next) {
    const guess = Number(req.body.guess);

    if (Number.isNaN(guess)) {
        req.session.invalidGuess = true;
    }
    else {
        req.session.invalidGuess = false;
        req.session.guesses.push(guess);
    }

    res.redirect(303, 'play');
}

// post /reset
function resetFeature(req, res, next) {
    req.session.secretNumber = undefined;
    req.session.guesses = undefined;
    req.session.invalidGuess = undefined;

    res.redirect(303, 'play');
}

module.exports = {
    init,
    showPlayPage,
    guessSubmission,
    resetFeature,
}