# Train-Schedule
A train-themed, multiple entry timer application. 

## Overview

The Train Schedule was primarily an exercise in moment.js and recursive setInterval. The basic application stores the train name, destination, first train time and interval (in minutes) in Firebase. On page launch, all of the current schedules are loaded 
and the next train time and minutes to next train are calculated and displayed. An event listener on Firebase automatically sends an updated snapshot of the database whenever an entry is changed, removed or added, enabling multiple users to see the same schedules in real time. 

## Key Technologies
