# Resume Parser
Headstarter Summer Fellowship Week 5 Project. This project is the same as the project from Week 1, but Headstarter Fellows were put into groups to work on their projects.

## Group Members and Responsibilities

| Name                                                 | Role                                                            | External Component Repos (if applicable)                                                                                                                     | Week 1 Project Link                                    |
|------------------------------------------------------|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| Agustin Escoda<br>https://github.com/Anform          | Upload pdf and convert to string                                | Worked solely within the project repo.                                                                                                                       | https://github.com/Anform/resume-parse                 |
| Russell Elliott<br>https://github.com/russellelliott | Parse through string, find keywords                             | Parsing Logic: <br>https://github.com/russellelliott/parser-logic<br><br>Implementation in React: <br>https://github.com/russellelliott/react-read-text-file | https://github.com/russellelliott/python-resume-parser |
| Sagar Rathod<br>https://github.com/sagarbrathod1     | Upload keywords to firebase database                            | Worked solely within the project repo.                                                                                                                       | https://github.com/sagarbrathod1/resume-parser         |
| You Kwhan Kim<br>https://github.com/Youkwhan         | Display information from Firebase,<br>allow to search for terms | https://github.com/Youkwhan/resume-parser-group                                                                                                              | Not Public                                             |
| Celine Wu<br>https://www.celine-wu.com/              | UI Designer                                                     | Figma Layout/CSS<br>https://www.figma.com/file/yNIDi2wCH8gvRpvrQPZjf8/Resume-Parser?node-id=0%3A1                                                            | N/A                                                    |

## Functionality
The user uploads their resume into the provided input field. From there, the program performs 3 main tasks:

### Resume Parsed for Keywords
Resume are parsed for keywords (name, programming languages, education). The name of the person on the resume is considered to be the first 2 words in the file.
Education level and programming languages are checked with their respective keywords (array) and user's resume (string) into `getWords()`.
- Related to this, one major challenge of this assignment was reading the keywords from a file, converting them to an array, and checking if the resume contained any of these words. For whatever reason, the read contents of the file weren't read properly. Our solution was to store the keywords in arrays; one for education and one for programming languages. This solved the issue of passing the data.

### Upload Keywords to Firebase
Keywords are uploaded to Firebase. Keywords are retrieved using `getWords()`, returned as a string, and passed to Firebase. Education is passed into the `education` field and languages are passed into the `languages` field.

### Filter Through Resumes by Keywords
Users can filter through resumes in the database using keywords in a search bar.
Searches through the database and finds resumes with the keywords the user provided.

##  Setup

Do `npm install` to install the necessary packages to run this app.

##  Running the app

Type `npm start` to run the app. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Resources

### Upload Files in Firebase Storage Using ReactJS
https://www.geeksforgeeks.org/how-to-upload-files-in-firebase-storage-using-reactjs/

### Perform Fetch and Send with ReactJS
https://www.geeksforgeeks.org/how-to-perform-fetch-and-send-with-firestore-using-reactjs/

### Site Layout on Figma
https://www.figma.com/file/yNIDi2wCH8gvRpvrQPZjf8/Resume-Parser?node-id=0%3A1

### Resolving Firebase
https://bobbyhadz.com/blog/react-module-not-found-cant-resolve-firebase
<br>
https://stackoverflow.com/questions/69044315/module-not-found-cant-resolve-firebase-in
<br>
https://exerror.com/module-not-found-cant-resolve-firebase-index/

### How to Read File in Firebase
https://stackoverflow.com/questions/55830414/how-to-read-text-file-in-react
<br>
https://stackblitz.com/edit/react-read-text-file?file=index.js
<br>
https://thewebdev.info/2021/11/26/how-to-read-a-text-file-in-react/
<br>
https://stackoverflow.com/questions/55830414/how-to-read-text-file-in-react

### List of Education Levels
https://help.nfc.usda.gov/publications/EPICWEB/6592.htm

### List of Common Programming Languages
https://statisticstimes.com/tech/top-computer-languages.php (used PYPL list)