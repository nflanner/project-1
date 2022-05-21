# project-1
# Movie Roulette

## Project Description

No longer does anyone have to sit endlessly scrolling movie selections. Our app eleiminates the many hours in between. All you need to do is pick your genre, and start the roullete! If you are not as brave, then you can select the additional information button to learn more about the movie that was seleed for you. 
If you want the full experience, don't even select a genre and you will get a random genre and movie within that genre!

Addtionally, you can log recent movies you watched with the associated genre and user-typed socring (on a scale of zero to ten). Your recent movie selections will be saved to your own browser so that you can reference your movie likes (or dislikes) accordingly for your next roulette.

This project utilizes the [Adanced Movie API](https://advanced-movie-search.p.rapidapi.com) to search by genre and the [OMDBapi](http://omdapi.com/) to deliver a more in-depth overview of the selected Roulette Movie. Recent watches are saved into `localstorage`  via the client-side javascript api.

To use this application:
* Navigate to the 'deployed application' below
* Select the 'Genre'
* Select the 'Start Roulette' button to see the movie selection
* (Optional) Select 'Additional Info' to see a more in-depth review of the selection
* (Optional) Enter your previously-seen movie, score ( out of 0/10) and genre to save your local movie history

## Deployed Application

To see the deployed application, click [here](https://nflanner.github.io/project-1/).

## User Story

```
AS A User
I WANT to spend less time choosing what movie to watch
SO THAT I can enjoy my free time
```

## Acceptance Criteria

```
GIVEN a roulette dashboard
WHEN I slect a genre of movie and select 'Start Roulette'
THEN I am presented with a movie image and short plot
WHEN I select 'Additional Info'
THEN I am presented with a new page that displays tha moive poster and various additiona information
WHEN I am on the main page and I enter a movie title, genre, and personal rating
THEN My inputs are saved and stored in a list that I can reference 
```
