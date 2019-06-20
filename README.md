# book_app
# Project Name

**Author**: Your Name Goes Here
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code 301 class. (i.e. What's your problem domain?) -->

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->

Number and name of feature: features 1-4

Estimate of time needed to complete: 4 hours

Start time: 9 am

Finish time: 1:30

Actual time needed to complete: 6 hours total

<!-- finish ejs and css -->

Number and name of feature: Schema

DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author VARCHAR (255),
  title VARCHAR(255),
  ISBN VARCHAR (255),
  image_URL VARCHAR (255),
  bookshelf VARCHAR  (255),
  description TEXT
);

INSERT INTO books (author, title, ISBN, image_URL, bookshelf, description)

VALUES ('author','title','ISBN','image_URL', 'bookshelf', 'description');

Number and name of feature: Feture 1 lab 12

Estimate of time needed to complete: 3 hours

Start time: 9:43

Finish time: 1:30

Actual time needed to complete: 6 hours total



Number and name of feature: Feature 2 lab 12

Estimate of time needed to complete: 3 hours

Start time: 11:45

Finish time: 

Actual time needed to complete: 
