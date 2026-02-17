Part the First
Use express.static to serve static files. Mount it at the root directory so that it can serve files for your entire site.
Use body-parser to parse POST requests. You may choose whether to use this for the entire server or just for features that need it.
Use the express-session module for sessions. You may choose whether to use this for the entire server or just for features that need them. You may choose whether to store sessions in files or to just use the default memory store. If you are saving them in files, make sure you do not submit session files along with your project.
Have a “not found” handler at the end of your middleware chain that gives a 404 status code and displays a nice HTML page that says the URL is not found
You should have a static directory for static files. Make an index.html for your site that contains your name, the text "Comp 4310", and a link to the feature described in the second part.
Part the Second
Create a feature called secret. The point of this feature is to play a guessing game where the user guesses a secret number between 1 and 100 and the server tells him if his guess is too high, too low, or correct. We will store all data in the session.

It should be mounted at the URL prefix /secret. However, your feature should not know (or care) where it is mounted. That means that, when referencing endpoints in your feature, you should use relative URLs. For example, just redirect to "play" instead of "/secret/play".
Your feature should be organized as discussed in class; i.e., with its own folder and router. Your application should just mount the router.
Any URLs not handled by your router should pass through to the normal middleware chain; i.e., express.static and your “not found” handler.
Do not make any assumptions about how I will use your feature. I may call any of the endpoints in any order I choose. (I don't have to use your web page to make a request.)
This feature should have the following endpoints:

GET /play.css
Returns a CSS file used by your web page.
Have at least five rules to make your web page look nice.
This should just be a static file returned by express.static.
GET /play
Displays a (valid) HTML web page containing the following:
A list (ordered or unordered) showing the guesses the user has made so far.
The list should be ordered so that the most recent guess is first and the least recent is last.
The contents of each list item should contain the number guessed, and either the text “too high”, “too low”, or “correct”. (Case doesn't matter.)
Each list item should have a class of either low, high, or correct. Use your style sheet to give these different colors.
If (and only if) the user has not guessed the secret number yet, there should be a form that contains a text box and a button.
Use autofocus so that the text box will start with input focus.
I should be able to submit the form by pressing Enter while the text box has input focus.
If (and only if) the user has guessed the secret number, it should contain the text “you won” and the text “N guesses”, where N is the number of guesses they have made total. (Case does not matter; include any guesses made after winning in the count.)
If (and only if) the user has guessed the secret number, it should contain a form with a button that can be pressed to start a new game. Give the button autofocus.
If (and only if) the user's last guess was not actually a number, it should contain the text “invalid guess”. (Case does not matter.)
If (and only if) the query string contains the parameter mode=debug, it should contain the text “#M#”, where M is the secret number. (This text may be in an HTML comment if you prefer.)
This endpoint should not make any changes to the session; i.e., reloading the page should always result in the same HTML.
You must use a Handlebars template to create the web page.
Do not generate any page content using JavaScript. (My unit tests will not execute the JavaScript in the page.)
POST /guess
Submits a guess
The guess should be in the POST data (as a url-encoded form) under the name guess (e.g., the form data might be guess=7).
If the guess is a number, it should be added to the list of guesses
If the guess is not a number, then the next time the /play page is displayed it should contain an error message
Redirects to the play URL with a 303 status code
POST /reset
Throws out the current game so that any future requests will be for a new game
Redirects to the play URL with a 303 status code
Tips:

We will be using the session as our model. Think about what data you need to keep track of in this application and what its format will be. Remember that you can have data that the user does not see.
Make a middleware function to initialize your session, and have it execute first (on any request method). Then the rest of your functions can assume the session is initialized.

--- ACTUAL README ---

Names of contributors:
- Brycen Biskner
- Jayden Dees

Project title & description:
- Express Server
- For this assignment you should modify your web server from the first project so that it uses an Express application.

External resources:
- Class videos (Feb 3rd - Feb 12th)

Project weaknesses:
- None

Project strengths:
- None
