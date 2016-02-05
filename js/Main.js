var _foldersTree;//This variable contains all the tree structure of the files

// Function to call when resizing the window
$(window).resize(function(){
});

//Funtion to call when the page is ready
$( document ).ready(function() {
	//When the File "Files.txt" 
	$.get(codeFolder+"/Files.txt", readFilesTxt);
});


function fillWebSite(){
	
	var files = _foldersTree
	//Filling first level
	_.each(files, function(fileFolder){
		addFolderToWebsite(fileFolder, document.getElementById("left_list"));
		//For each of its children adds folder or file
	});
	
	//Everytime you click something, clear the code window
	$("#left_list a").click( function(event){
		$("#code_area .in").removeClass("in");
	});
}

/**
 * This function is in charge of creating the logic to display the readme file
 * if is inside a folder 
 * @param {type} folderObj
 * @param {type} link
 * @returns {undefined}
 */
function addReadmeVideoAndImages(folderObj, link){
	// Check it has childrens
	if(folderObj.children !== null){
		addCodeDiv(folderObj, "Bash")
		// Check one of those childrens is a text file 
		for(var i = 0; i< folderObj.children.length; i++){
			var currChildren = folderObj.children[i];
			var fileName = currChildren.name;
			
			//If images 
			if(fileName.toLowerCase().indexOf(".png") > -1 ||
				fileName.toLowerCase().indexOf(".jpg") > -1){
				fileName = currChildren.path;
				// Adds the logic to display the images
				var figObj = d3.select("#codecontainer"+folderObj.id)
					.append("figure");
				
				figObj.append("img")
					.attr("src",fileName)
					.attr("width",300)
					.attr("height",300);
				
				figObj.append("figcaption")
					.text("Fig. " + nameFromPath(fileName));
				
			}
			
			// For Text files
			if(fileName.toLowerCase().indexOf(".txt") > -1){
				// Adds the logic to display the readme
				
				//Adds the path into the link
				$(link).attr("readmefile", currChildren.path );
				
				//When you click display the readme
				$(link).click( function(event){
					//Close all previously open files
					$("#code_area .in").removeClass("in");
					// Gets current id
					var fileName = event.target.getAttribute("readmefile");
					var currId = event.target.getAttribute("aria-controls");
					// Gets the related folder object
					// Adds the text into the dive
					console.log("Reading file: "+fileName)
					$.get(fileName, function(data){ 
						//Searchs for the correct container
						var code_container = $("#code"+currId);
						//Add the data of the file into the container
						code_container.text(data);
						//Displays the container
						$("#code_area #codecontainer"+currId).addClass("in");
						//Sets the Highlight
						highlightAllCode();
					});//Closing getting the file
				});//Clossing the click event of link
			}
			
			//This link opens the RHS after a small delay
			$(link).click( function(event){
				//We need to wait for the other events.
				setTimeout(function(){
					var currId = event.target.getAttribute("aria-controls");
					$("#code_area #codecontainer"+currId).addClass("in");
				})
			});
		}
	}
}

/**
 * This recursive function adds the folder in the current element and
 * iterate over its children
 * @param {type} folderObj
 * @param {type} parentElement
 * @returns {undefined}
 */
function addFolderToWebsite(folderObj, parentElement){
	//Initializes all the elements for this new folder
	var panel_group = document.createElement("div");
	var panel = document.createElement("div");
	var heading = document.createElement("div");
	var panel_title = document.createElement("h4");
	var link = document.createElement("a");
	
	//Adds the proper attribute for each element
	d3.select(panel_group).classed("panel-group",true)
		.attr("id","grp_"+folderObj.id)
		.attr("role","tablist");
	
	d3.select(panel).classed("panel panel-default",true);
	
	d3.select(heading).classed("panel-heading",true)
		.attr("role","tab");
	
	d3.select(panel_title).classed("panel-title",true);
	
	//Sets the link as collapsed 
	d3.select(link).classed("collapsed",true)
		.attr("role","button")
		.attr("data-toggle","collapse")
		.attr("data-parent",folderObj.id)
		.attr("aria-controls",folderObj.id)
		.attr("href","#"+folderObj.id)
		.html(folderObj.name);
	
	
	addReadmeVideoAndImages(folderObj, link);
	
	//Adding into the left area
	parentElement
		.appendChild( panel_group )
		.appendChild( panel)       
		.appendChild( heading)     
		.appendChild( panel_title) 
		.appendChild( link);
	
	
	//Adding the right part (in the code area)
	if(folderObj.children !== null){
		var tab_panel= document.createElement("div");
		var panel_body = document.createElement("div");
		var list = document.createElement("ul");
		
		//div  panel-collapse
		d3.select(tab_panel).classed("panel-collapse collapse",true)
			.attr("role","tabpanel")
			.attr("id",folderObj.id);
		
		// div panelbody
		d3.select(panel_body).classed("panel-body",true);
		
		// ul 
		d3.select(list).classed("list-group",true);
		
		var totCodeFiles = 0;//It is used to count how many 'code' files are children
		var onlyChildren = "";//This variable is a hack to know the only children IMPROVE
		
		// For each children we add it as a folder or as a file
		for(var i = 0; i < folderObj.children.length; i++){
			var currFileOrFolder = folderObj.children[i];
			//Each children will be part of a list
			var list_element = document.createElement("li");
			d3.select(list_element).classed("list-group-item",true);
			
			//If the children is a file
			if(folderObj.children[i].isItFile){
				var linkChildren = document.createElement("a");
				d3.select(linkChildren).classed("collapsed",true)
					.attr("role","button")
					.attr("data-toggle","collapse")
					.attr("aria-controls",currFileOrFolder.id)
					.attr("href","#codecontainer"+currFileOrFolder.id)
					.html(currFileOrFolder.name);
				
				list_element.appendChild(linkChildren);
				
				if(isDesiredFile(currFileOrFolder.name)){
					totCodeFiles++;
					onlyChildren = currFileOrFolder.id;
					addCodeDiv(currFileOrFolder,codeHighlight);
				}else{
					//Add link only
					addCodeDiv(currFileOrFolder,codeHighlight,true);
				}	//Is a proper file file
				
				// Every time we click on the file
				$(linkChildren).click(displayOnTheCodeSide);
				list.appendChild(list_element);
				
			}else{//In this case it is a folder
				list_element = addFolderToWebsite(folderObj.children[i], list_element);
				list.appendChild(list_element);
			}
		}//End of iterating with the children
		//
		//If we only have one element then we try to show it
		if(totCodeFiles === 1){
			$(link).click(function (event){
				$("#code_area .in").removeClass("in");
				console.log("Click only one folder: "+onlyChildren);
				$("#code_area div[id='"+folderObj.id+"']").toggle("in");
				$("[aria-controls='"+onlyChildren+"']").click();
			});
		}
		//
		//Add everything inside the panel
		panel.appendChild(tab_panel)
			.appendChild(panel_body)
			.appendChild(list);
	}
	
	return parentElement;
}

function displayOnTheCodeSide(event){
	//Close all previously open files
	$("#code_area .in").removeClass("in");
	// Gets current id
	var currId = event.target.getAttribute("aria-controls");
	// Gets the related folder object
	var currFileOrFolder = findFolderById(_foldersTree, currId);
	console.log("Getting file: "+ currFileOrFolder.path);
	// Adds the text into the dive
	$.get(currFileOrFolder.path, function(data){ 
		//Searchs for the correct container
		var code_container = $("#code"+currId);
		code_container.text(data);
		highlightAllCode();
	});
}


/**
 * This function simply indicates if the file is a proper file extension or not 
 * @param {type} fileName
 * @returns {Boolean}
 */
function isDesiredFile(fileName){
	return fileName.indexOf(fileExtension) > -1;
}

/**
 * This is the main object for each file or folder that is being displayed
 * in the page.  
 * @param {type} name
 * @param {type} id
 * @param {type} children
 * @param {type} isItFile
 * @param {type} level
 * @param {type} path
 * @returns {Folder}
 */
function Folder(name, id, children, isItFile, level, path){
	this.name = name;
	this.id = id;
	this.level = level;
	this.children = children;
	this.isItFile = isItFile;
	this.path = path;
	// Define methods
	this.addChildren = addChildren;
}


/**
 * This function highlights the code that has been added into the page 
 * @returns {undefined}
 */
function highlightAllCode(){
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
	$('body').scrollTop(0);
}