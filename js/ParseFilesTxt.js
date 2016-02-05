/*
 * Copyright (c) 2016 Olmo Zavala
 * Permission is hereby granted, free of charge, to any person obtaining a copy of 
 * this software and associated documentation files (the "Software"), to deal in the 
 * Software without restriction, including without limitation the rights to use, copy, 
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions: 
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
 */

/**
 * This function is in charge of parsing the text file data. 
 * The data is the output from the linux command 'ls -RF' 0 
 * It creates a three of folder and file objects
 * @param {type} data
 * @returns {undefined}
 */
function readFilesTxt(data){
    //Reads all the files and folders
    var allLines = data.split('\n');
    var allFiles = new Array();
    
    //-------------- Reads first level of folders ----------------
    var moreLevelOne = true;
    var idx = 1;
    while(moreLevelOne){
	//All first level is detected until we get one empty line
	if(allLines[idx] === ""){
	    idx++;
	    moreLevelOne = false;
	    break;
	}
	var folder = new Folder(allLines[idx],"level1_folder"+idx,null,false,1,codeFolder+"/"+allLines[idx]);
	allFiles.push(folder);
	idx++;
    }
    
    //----------- Reads all the others levels -----------------
    for(idx; idx < allLines.length; idx++){
	// Find proper folder
	var folders = allLines[idx].split('/');
	folders = folders.splice(1,folders.length-1);
	var folderObject; 
	
	// Finds the current 'parent' folder
	folderObject = findFolderNode(folders, allFiles, 2);
	idx++;//Read next line
	
	// Add Children to current folder
	var changeFolder = false;//Validates we still in the same folder
	var childIdx = 1;
	var curreLevel = folderObject.level+1;
	while(!changeFolder){
	    //Every new folder starts with a new line
	    if(allLines[idx] === ""){
		changeFolder = true;
		break;
	    }
	    var fileOrFolder; 
	    //Check if is a file or a folder (we dont accepts folder with '.')
	    if(allLines[idx].split('.').length > 1){
		//Adds file
		fileOrFolder = new Folder(allLines[idx],"level"+curreLevel+"_file"+childIdx+"_"+folderObject.id,
					    null,true, curreLevel, folderObject.path+"/"+ allLines[idx]);
	    }else{
		//Adds a folder
		fileOrFolder = new Folder(allLines[idx],"level"+curreLevel+"_folder"+childIdx+"_"+folderObject.id,
					    null,false, curreLevel, folderObject.path+"/"+ allLines[idx]);
	    }
	    folderObject.addChildren(fileOrFolder);
	    idx++;
	    childIdx++;
	}
    }// End of file
    _foldersTree = allFiles;
    fillWebSite();
}

/**
 * Simple function to add a new children to the folder object
 * @param {type} child
 * @returns {addChildren}
 */
function addChildren(child){
    if(this.children === null){
	this.children = new Array();
    }
    this.children.push(child);
}

/**
 * This recursive function receives a list of folders, and the a list of folderObjects and it
 * iterate over the folders until it finds the proper one. It adds the filder at the end 
 * @param {String array} folders  Array of string with the name of the folders
 * @param {Folder array} allFolders Array of objects with the 'Folder' nodes
 * @param {int} level Current level of the folder
 * @returns {findFolderNode.allFolders|findFolderNode.currFileOrFolder|unresolved}
 */
function findFolderNode(folders, allFolders,level){
    //Obtains the first folder name (the only one we evaluate)
    var folderName = folders[0].split(':')[0];
    var currFileOrFolder;
    
    //Searchs for the current folder name inside the folder objects. It stops when
    // it finds it
    for(var i=0; i< allFolders.length; i++){
	if(allFolders[i].name === folderName){
	    currFileOrFolder = allFolders[i];
	    break;
	}
    }
    
    // If this is the last folder of the list we return the folder.
    if(folders.length === 1){
	return currFileOrFolder;
    }else{
	//If not we keep searching in the children of the current folder
	if(currFileOrFolder.children === null){
	    fileOrFolder = new Folder(folderName,"level"+level+"_folder1",null,false,level, currFileOrFolder.path+"/"+folderName);
	    currFileOrFolder.addChildren(fileOrFolder);
	}
	return findFolderNode(folders.splice(1,folders.length-1),currFileOrFolder.children,level+1);
    }
    return null;
}

/**
 * Finds a folder by its id 
 * @param {type} folders
 * @param {type} id
 * @returns {findFolderById.folders|Number}
 */
function findFolderById(folders, id){
    if(folders.children === null){
	return -1;// We didn't find it
    }
    
    for(var i = 0; i < folders.length; i++){
	if(folders[i].id === id){
	    return folders[i];// -------- Found it -----
	}
	if(folders[i].children !== null){
	    //Search recursively
	    var found = findFolderById(folders[i].children, id);
	    if(found !== -1){// Also found it 
		return found;
	    }
	}
    }
    return -1;//Not found
}