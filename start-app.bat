@echo off
start powershell -NoExit -Command "cd ./backend; nodemon server.js"
start powershell -NoExit -Command "cd ./frontend; npm run dev"
