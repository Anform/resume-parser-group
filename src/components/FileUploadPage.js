import React from "react";
import langFile from "../test-files/languages.txt"
import educationFile from "../test-files/education.txt"
import {collection, addDoc} from "firebase/firestore"
import {db} from "../firebase-config"

function FileUploadPage() {

	const getName = (textFile) => {
		return textFile.split(" ").slice(0, 2).join(" ");
	};

	const getLanguages=(textFile)=>{
		return getWords(langFile, textFile)
		
	}

	const getEducation=(textFile) =>{
		return getWords(educationFile, textFile)
	}

	//this function sets the content of a div
	function fetchFileText(sourceFile, resumeFile){
		fetch(sourceFile)
		.then(r => r.text())
		.then(text => {
			console.log('text decoded:', text);
			var preview = document.getElementById('result');
			preview.innerHTML = text;
			console.log("first preview", preview);
			//TEXT = text;
			//alert(text);
			//alert('text decoded:', text);
			//return text;
		});
		//return "execute";
	}

	function getWords(sourceFile, resumeFile){
		fetchFileText(sourceFile, resumeFile); //set text in div
		//if(fetchFileText(sourceFile, resumeFile)=="execute"){
		var preview = document.getElementById('result');
		console.log("the preview", preview);
		//var test = "cmon you sdlkhgkjshdj"; //var test = preview.textContent;
		//var test = preview.innerText;
		//remove div tags and id
		/*var test = preview.replace("<div>", "");
		test = preview.replace('<div id="result">', '');*/
		//var test = "fhfhfh";
		//var test = preview.toString();
		var test = "preview";
		console.log("here it is: ", test); //where is it?
		test = test.replace(/\n/g, " ");
		console.log("again: ", test);
		//preview.innerHTML = ""; //clear the div for reuse
		return test;
	//}

	}

	const getWords2 = (sourceFile, resumeFile) => {
		//First we need to get sourceFile 
		fetch(sourceFile)
			.then((response) => response.text())
			.then((data) => {
				// Match data with resumeFile
				const sourceFileWords = data.split("\n"); //split source file by spaces
				console.log(sourceFileWords)
				
				/*//is this an array? let's find out.
				const text = sourceFileWords.toString();
				console.log(text) //this is the text from the source file*/

				var wordsList = []; //words present in the resume will be stored here.
				//for each word in the sourceFile, check if it's in the resumeFile
				for(var i=0; i<sourceFileWords.length; i++){ //iterate through all words of source file
					var currentWord = sourceFileWords[i]; //current word being looked at
					//console.log("current word: ", currentWord);
					//what does the resume file look like?
					//console.log("resume: ", resumeFile);
					if(resumeFile.includes(currentWord) && !wordsList.includes(currentWord)){ //selection logic
						wordsList.push(currentWord);
					}
				}
				//print out the words list for inspection
				console.log(wordsList);
				//turn it into a string for export
				wordsList = wordsList.toString(); //use toString() to turn array into string. elements seperated by commas.
    			//ex: ["apples", "oranges", "bananas"] -> "apples,oranges,bananas"
				//print out the words list for inspection
				console.log(wordsList);
				var preview = document.getElementById('result'); //get the div
        		preview.innerHTML = wordsList; //set text of div
				console.log("text: ", preview);

			});
			//this stuff goes BEFORE the stuff in the .then((data)=>) statement
			//first, check if there is nothing. if there is, wait to get something?
			var preview = document.getElementById('result'); //get the div
			console.log("text test 2", preview);
			var wordsList = preview.textContent; //set wordslist
			console.log("the words: ", wordsList);
			preview.innerHTML = ""; //delete div content
    		//return wordsList;
			return wordsList;
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
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		const fileReader = new FileReader();
		fileReader.onload = async (e) => {
			const text = e.target.result;
			// console.log(text);
			var textFile = text.replace(/\n/g, " ");
			//console.log(textFile);

			const name = getName(textFile);
			console.log("name: ", name);
			
			const languages = getLanguages(textFile)
			console.log("languages: ", languages)

			const education = getEducation(textFile) //education
			console.log("education: ", education);
			//education = languages;
			//upload to fb
			saveChange(name, languages, education)
		};

		fileReader.readAsText(e.target.files[0]);
	};

	return (
		<div>
			
			<input
				type="file"
				className="fileUpload"
				onChange={(e) => {
					handleFileChange(e);
				}}
			/>

			<br />
			<div id="result"></div>
		</div>
	);
}

export default FileUploadPage;
