/**
 * This file is a set of utileries to manipulate strings 
 */

// This function obtains the name of the 
function nameFromPath(path){
	var name  = path.split('/').pop();
	return name;
}

//Transforms the path into a simple title for the file
function pathToTitle(path){
	var title = path.split('/');
	title.shift();//Removing the first folder which is always code
	//
	//If the title contains a file then we make a link
	var lastLevel = title.pop();
	if(lastLevel.indexOf(".") !== -1){
		lastLevel = "&rarr; " + $("<span/>")
			.append($("<a/>")
			.attr("href",path)
			.attr("target","_blank")
			.text(lastLevel)).html();
	}
	return title.join([separator = ', '])+" "+lastLevel;
}