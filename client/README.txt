run this to connect to git repo
git remote add origin https://github.com/mgbarsky/tracker.git
git push -u origin main

npm create vite@latest

npm install react-bootstrap bootstrap

npm i react-router-dom


run this from tracker folder
npm i

to start 
npm run dev


to build:
in main.jsx change 
const PRODUCTION_SUB_DIRECTORY = "/ontrack";
in App.jsx change  <Routes basename="/ontrack">
in db.js 
const db = new Dexie("ontrackDB");
npm run build

Explore:
https://tailwindcss.com/
https://web.dev/explore/progressive-web-apps
