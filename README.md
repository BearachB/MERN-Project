#MERN Stack Project - 5th December 2021
##Created by:Bearach Byrne - C15379616 & Daragh Kneeshaw - D20128577


##Installation Assumptions:
Windows 10 machine (should also work on Mac/Linux).
npm version v8.1.0 is installed
Node version v16.13.0 is installed

###If continuing to use MongoDB Atlas Server (Easiest Method):
1. Clone files from Git - https://github.com/BearachB/MERN-Project.git
2. Open overall folder in CLI.
3. In overall folder install npm - "npm install",
4. CD into client folder and install npm - "cd .\client\" followed by “npm install”.
5. CD into server folder and install npm - "cd .\server\" followed by “npm install”.
6. In “client” CLI, “npm start” to start the client server.
7. In “server” CLI, “npm run dev” to start the backend server.
8. The web. app. will now open in your default browser.

###If using a local MongoDB server (Harder method):
1. Clone files from Git.
2. Open overall folder in CLI.
3. Start MongoDB Compass.
4. Create a new database called "mern_project".
5. Within the "mern_project" database, create a collection called "music_data".
6. In the "music_data" collection, click on "Add Data" in the top left of collection, then click on "Import File".
7. When it prompts you to select a file, select the "music_data.json" file in the top level project folder (MERN-project/music_data.json).
8. Ensure the "JSON" file type is selected and click on "Import". Once imported, your database is ready to be used by the app.
9. In overall folder install npm - "npm install".
10. CD into client folder and install npm - "cd .\client\" followed by “npm install”.
11. CD into server folder and install npm - "cd .\server\" followed by “npm install”.
12. In “client” CLI, “npm start” to start the client server.
13. In “server” CLI, “npm run dev” to start the backend server.
14. The web. app. will now open in your default browser.



FOR Connection to MongoDB Atlas Server:
      username="bearach"; password="mernproject"
      Connecting in Compass: mongodb+srv://bearach:mernproject@cluster0.d4sre.mongodb.net/mern_project
