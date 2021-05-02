# Project Diploma New Explorer API Front End + Back End
* Part of the [Practicum by Yandex](https://practicum.yandex.com/) Web Development Bootcamp Curriculum.

[Demo link](http://lkovacs-news.students.nomoreparties.site/)

# react-around-api-full
The "New Explorer API" has authorization and registration handled by the back-end server and handles articles and users. 

### Server
- Api hosted on AWS Cloud
- Server IP: 3.142.148.60
- Back-end/Api: http://lkovacs-news.students.nomoreparties.site/
- Front-end: TBD

The Express NodeJs project implements the API in the backend.

A responsive website using HTML5, CSS3 (flexbox, grid, BEM), JavaScript, built following the design mokup in Figma.
This adaptive page includes form validation, interactive popups, fade-in and fade-out animations, functional like and delete buttons, modular JavaScript, and Object Oriented JS design.

The React Framework is used to add functionality to Form Fields in a Popup Box and save the edited values. Used BEM methodology with a nested file structure.

The server-side web framework Express.js is used to help deploy our own back-end server faster, work with databases, set up security and testing, as well as deploying the back end on a remote machine. The goal of all this is to create a server with an API and user authentication.

The project interactivity includes:

- Popup modals for: signup/signin
- Adding new articles and Deleting user's own articles only
- Liking and unliking articles

The current version is responsive gets profile information and images via API, and has functioning modal popups.
The project adapts to the width of various devices (from 320px to 1280px). The project is based on dynamically editing the profile information on popup modals and adding cards of places and image popups. Everything is rendering responsively adapting to different screen sizes.

**Features**

- Form Popup Modal: editing profile information, adding/deleting articles with images, titles, taxt, date, link, source, image
- Forms are validated using javascript. card popup for each card with Delete and Like button.

**Technologies**

Stack: HTML5, CSS3, flexbox, grid layout, BEM, Media queries, transition, JavaScript/JSX, DOM, Debugging Git, Git/Github, Figma, Form validation, OOP, Webpack, NPM, React, React components, React hooks, Node.js, Express.js, AWS

**Figma**

The website was made up according to the Figma layout requirements:

- [Link to the project in Figma](https://www.figma.com/file/z1bxDn7eBEDlsDhnZ9dtin/Your-Final-Project?node-id=0%3A1)

- Export images directly from Figma and optimize them [here](https://tinypng.com/), so your project loads faster.

**Articles**

All the articles are pulled from the server using the API.

## Directories

`/public` — static files from the build of the React front-end app.

`/data` — JSON files to temporarily emulate database integration.

`/routes` — routing files.

All other directories are optional and may be created by the developer if necessary.

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.
