# Happy people, happy company

## Intro
It is a issue ticket app in real-time, faster knowledge of the problem, faster response. Don´t make your customers wait!!!

It makes to people doesn´t want disturb my talking, or doesn´t want to stop what they are doing, eassier to report anyproblems and resolve without any physical iteraction. 

Because we want the best experience for our customers, improve your NPS, the limit is the sky. Happy people, happy company!!!

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm1td3kzN290eTJ3MGNtam14NDY2OXFseWdmaXIxOTg5ZDdzaXYydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/chzz1FQgqhytWRWbp3/giphy.gif)

## Functional Description

### Use Cases

Customer
- open an issue
- list issues
- view issue
- edit an issue
- delete issue
- add comment to issues
- QR reader for fast autofill some fields of the issue

Manager
- view issue
- change issue status(close, cancel...)
- list issues
- change actual temperature
- add comment to issue

### UI Design

TODO Figma

## Technical Description

### Technologies

- JavaScript
- React
<!-- - React Native -->
- Node
- Express
- Mongo

## Modules

- API (server)
- AppWeb (client, customers's client)
<!-- - AppMovile (client, customers's client) -->

### Data Model

User
- id(auto)
- name(string,required)
- birthdate(string,required) //Bolean
- email(string,required)
- roles(string,required default= customer|manager)
- cinema(Cinema.id,optional)

Cinema(cinema)
- id(auto)
- name(string,required) 
- address(string,required)

Room(Today)
- id(auto)
- num(number,required)
- cinema(Cinema.id,required)
- temperature(string,required)
<!-- - films(array of strings,required) -->

Ticket
- id(auto)
- user(User.id)
- cinema(Cinema.id,required)
- room(Room.id,required)
<!-- - buyDate(date,required)
- filmDate(date, required) -->
<!-- - *film(string, required)* -->
- seat(string, required)

Issue
- id(auto)
- cinema(Cinema.id,required)
- room(Room.id,optional)
- user(User.id)
- description(string,required)
- type(string,required,enum: temperature|sound|film|cleaning)
- status(string,required, open|closed)
- location (string, required)
- ticket (Ticket.id,optional)
- date(date, required)

Comment
- id(auto)
- text(string,required)
- issue(issue.id,required)
- author(User.id, required)
- date(date, required)