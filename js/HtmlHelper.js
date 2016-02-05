/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * Adds one div to the 'code' section using the id of the folder object
 * and uses the codeClas to highlight the code 
 * @param {type} currFileOrFolder
 * @param {type} codeClass
 * @returns {undefined}
 */
function addCodeDiv(currFileOrFolder,  codeClass){
	var code_div = document.createElement("div");

	d3.select(code_div)
			.classed("panel-collapse collapse",true)
			.attr("role","tabpanel");
	
	//Title of each file on the code side
	d3.select(code_div)
		.append("h2")
		.html(pathToTitle(currFileOrFolder.path));

	d3.select(code_div)
			.append("pre")
			.append("code")
			.attr("id","code"+currFileOrFolder.id)
			.classed(codeClass,true);
	
	d3.select( code_div )
			.attr("id","codecontainer"+currFileOrFolder.id)
	
	document.getElementById("code_area")
			.appendChild( code_div );
}