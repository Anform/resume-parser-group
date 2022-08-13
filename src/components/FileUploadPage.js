import React, { useState } from "react";
import langFile from "../test-files/languages.txt"
import educationFile from "../test-files/education.txt"
import {collection, addDoc} from "firebase/firestore"
import {db} from "../firebase-config"
import "./Upload.css"
import resume from "./resume.png"

function FileUploadPage() {

	const [lanArray, setLanArray] = useState(["Python","Java","JavaScript","C#","C","C++", "PHP", "R", "TypeScript","Objective-C","Swift","Matlab","Kotlin","Go", 
	"Rust", "Ruby","VBA","Ada","Scala", "Dart", "Abap","Lua", "Groovy", "Perl", "Julia", "Cobol", "Haskell", "Delphi", "Pascal"])

	const [diplomaArr, setDiplomaArr] = useState(["diploma", "associate","bachelor", "master", "doctorate"])

	const getName = (textFile) => {
		return textFile.split(" ").slice(0, 2).join(" ");
	};

	const getLanguages=(textFile)=>{
		return getWords(lanArray, textFile)
		
	}

	const getEducation=(textFile) =>{
		return getWords(diplomaArr, textFile)
	}

	const getWords = (array, resumeFile) => {
		//First we need to get sourceFile 
				// Match data with resumeFile
				//console.log("Source File; ",array)
				
				/*//is this an array? let's find out.
				const text = sourceFileWords.toString();
				console.log(text) //this is the text from the source file*/

				var wordsList = []; //words present in the resume will be stored here.
				//for each word in the sourceFile, check if it's in the resumeFile
				for(var i=0; i<array.length; i++){ //iterate through all words of source file
					var currentWord = array[i]; //current word being looked at
					//console.log("current word: ", currentWord);
					//what does the resume file look like?
					//console.log("resume: ", resumeFile);
					if(resumeFile.includes(currentWord) && !wordsList.includes(currentWord)){ //selection logic
						wordsList.push(currentWord);
					}
				}
				//print out the words list for inspection
				//console.log(wordsList);
				//turn it into a string for export
				wordsList = wordsList.toString(); //use toString() to turn array into string. elements seperated by commas.
    			//ex: ["apples", "oranges", "bananas"] -> "apples,oranges,bananas"
				//print out the words list for inspection
				//console.log(wordsList);
				return wordsList

	}

	const saveChange = async (name, languages, education) => {
		//addDoc() cloud firestore auto generates an ID 

		await addDoc(collection(db, "resume"), {
			//our data we are storing OR fields
			name: name,
			education: education,
			languages: languages,
		})
			.then((docRef) => {
				console.log("Document " + docRef.id + " has been added successfully");
			})
			.catch((error) => {
				console.log(error);
			});
		window.location.reload()
		window.alert("File Uploaded!")
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		const fileReader = new FileReader();
		fileReader.onload = async (e) => {
			const text = e.target.result;
			// console.log(text);
			var textFile = ""
			textFile = text.replace(/\n/g, " ");
			//console.log(textFile);

			const name = getName(textFile);
			//console.log(name);

			var languages = getLanguages(textFile)
			//console.log(languages)
			
			var education = getEducation(textFile)
			//console.log(education)
			
			//upload to fb
			saveChange(name, languages, education)

			
		};

		fileReader.readAsText(e.target.files[0]);
	};

	return (
		<div>
			<img className = "image" source = {resume}></img>
			<rect className = "uploadBox">
			<p className = "inst">Upload your resume</p>
			<input
				type="file"
				className="fileUpload"
				onChange={(e) => {
					handleFileChange(e);
				}}
			/>
			<p className = "files">as .txt file</p>
			<br />
			</rect>
		</div>
	);
}

export default FileUploadPage;
