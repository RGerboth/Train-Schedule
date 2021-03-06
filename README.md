# Train-Schedule
A train station-themed, multiple entry timer application. 	

## Overview
The Train Schedule is primarily an exercise in moment.js and recursive JavaScript using setTimeout. Train name, destination, first train time and interval (frequency in minutes) are stored in Firebase. On page launch, all of the current schedules are loaded and the next train time and minutes until next train are calculated and displayed. An event listener on Firebase automatically sends an updated snapshot of the database whenever an entry is changed, removed or added, enabling multiple users to see the same schedules in real time. This applictaion could be easily re-branded for cooking timers, sprinkler controllers or coordinating an elaborate heist.

The layout is responsive down to 500px width and fully functional in landscape mode on an iPhone 6/7/8 or similar. 

**See it Live Here: [Train Schedule](https://rgerboth.github.io/Train-Schedule/ "Train Schedule")**

## Key Technologies
* JavaScript
* bootstrap
* jQuery
* Firebase 
* Google Fonts
* moment.js
