# Maze Generation Algorithms

This is the project for MTAT.03.238 Algorithmics course in University of Tartu.

It is an interactive web application that visualizes maze generation step by step.

The user can select the size of the maze and an algorithm. Then he/she can run either a single step with a click of a button or a continuous loop until the end.

## Setup

1) Install Node.js
2) Clone this repo.
3) Navigate to the repo folder on command line.
4) Run `npm install`. This takes some time and it creates the `node_modules` folder.

## Running the application

Run `npm start` and open `http://localhost:3000` in your browser. The browser automatically refreshes when you change the source code in `src` folder and save the file.

You can change `localhost` port by `devServer.port` setting in `webpack.config.js`.
