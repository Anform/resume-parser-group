import React from "react";
import langFile from "../test-files/languages.txt"
import educationFile from "../test-files/education.txt"
import {collection, addDoc} from "firebase/firestore"
import {db} from "../firebase-config"

function FileUploadPage() {

	const getName = (textFile) => {
		textFile.split(" ").slice(0, 2).join(" ");
	};

	const getLanguages=(textFile)=>{
		getWords(langFile, textFile)
		
	}

	const getEducation=(textFile) =>{
		getWords(educationFile, textFile)
	}

	const getWords = (sourceFile, resumeFile) => {
		//First we need to get sourceFile 

		//then get words
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

	const handleFileChange = (textFile) => {
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
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

		fileReader.readAsText(textFile);
	};

	return (
		<div>
			
			<input
				type="file"
				className="fileUpload"
				onChange={(e) => {
					handleFileChange(e.target.files[0]);
				}}
			/>

			<br />
		</div>
	);
}

export default FileUploadPage;
