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
        res.status(200);
    res.type('text/html');
    res.send(`<!DOCTYPE html>
    <html>
        <ul class="guesses">
            {{#each guess}}
                <li>{{this}}</li>
            {{/each}}
        </ul>

        {{unless secretNumber}}

    </html>
    `);
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

    res.redirect(303, '/play');
}

// post /reset
function resetFeature(req, res, next) {
    req.session.secretNumber = undefined;
    req.session.guesses = undefined;
    req.session.invalidGuess = undefined;

    res.redirect(303, '/play');
}

module.exports = {
    init,
    showPlayPage,
    guessSubmission,
    resetFeature,
}