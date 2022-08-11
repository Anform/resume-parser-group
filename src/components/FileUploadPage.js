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

	const getWords = (sourceFile, resumeFile) => {
		//First we need to get sourceFile 
		fetch(sourceFile)
			.then((response) => response.text())
			.then((data) => {
				// Match data with resumeFile
				const sourceFileWords = data.split(" "); //split source file by spaces
				console.log(sourceFileWords)
				text = sourceFileWords.toString();
				console.log(text)
			});
	}

	const saveChange = async (name, languages, education) => {
		//addDoc() cloud firestore auto generates an ID 
		await addDoc(collection(db, "resume"), {
			//our data we are storing OR fields
			name: name,
			education: education,
			languages: languages,
		})
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
			//console.log(name);
			
			const languages = getLanguages(textFile)
			//console.log(languages)

			const education = getEducation(textFile) //education
			//console.log(education);
			
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
		</div>
	);
}

export default FileUploadPage;
