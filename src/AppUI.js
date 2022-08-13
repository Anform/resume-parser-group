import React from "react";
import "AppUI.css"

function AppUI() {
	return (
		<div className="container-center-horizontal">
			<div className="hi-fi-resume screen">
				<div className="overlap-group">
					<div className="flex-row">
						<img className="logo" src="logo.svg" />
						<h1 className="title">Resume Parser</h1>
					</div>
					<div className="frame-8">
						<div className="submit-resume">Submit Resume</div>
					</div>
					<div className="database-view">Database View</div>
				</div>
				<div className="overlap-group1">
					<img
						className="ant-designfile-done-outlined"
						src="ant-design-file-done-outlined.svg"
					/>
					<div className="drop-or-upload-your-resume">
						Drop or upload your resume
					</div>
					<div className="frame-7">
						<UploadYourResume>Upload your Resume</UploadYourResume>
					</div>
					<p className="as-docx-or-pdf-file">as .docx or .pdf file</p>
				</div>
			</div>
		</div>
	);
}

export default AppUI;

function UploadYourResume(props) {
	const { children } = props;

	return <div className="upload-your-resume">{children}</div>;
}
