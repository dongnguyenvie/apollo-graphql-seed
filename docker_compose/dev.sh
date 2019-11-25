  
#!/bin/bash
cd /usr/app
npm install nodemon --global
npm install
nodemon -L --inspect start.js
