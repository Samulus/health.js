# HACKING.md
This document along with the other file(s) in this folder are designed to aid
other programmers in quickly understanding how health.js works / is structured
so that they can submit patches and tweak health.js to their own liking. It also
helps me keep track of my own project's structure as well.

# Organization

## js/lib/*.js
These files are included first. They perform small but important tasks that are
integral to health.js's functioning. 

| Library   | Function |
|-----------|----------|
| routie.js | Handles '#' routing for multiple views |
| tinytim.js| Allows templating for various modules |
|-----------|----------|


## js/core/*.js
These files are the heart of health.js. 
(TODO)
