# Train-Schedule
A train-themed, multiple entry timer application. 	

## Overview
The Train Schedule is primarily an exercise in moment.js and recursive setInterval in JavaScript. The application stores train name, destination, first train time and interval (in minutes) in Firebase. On page launch, all of the current schedules are loaded 
and the next train time and minutes to next train are calculated and displayed. An event listener on Firebase automatically sends an updated snapshot of the database whenever an entry is changed, removed or added, enabling multiple users to see the same schedules in real time. 

## See it Live Here
  [Train Schedule](https://rgerboth.github.io/Train-Schedule/ "Train Schedule").

## Key Technologies

* JavaScript
* bootstrap
