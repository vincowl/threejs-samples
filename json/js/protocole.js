var PROTOCOLE = {
	ms_fileName: "",
	ms_data: null,
	ms_elemHTML: null,
	
	initialize: function initialize(dataJson, elemHTML) {
		this.ms_data = dataJson;
		this.ms_elemHTML = elemHTML;
		this.getElemClass("pTitle").innerHTML = "";
		this.getElemClass("pContent").innerHTML = "";
	},
	
	getElemClass: function getElemClass(className) {
		return this.ms_elemHTML.getElementsByClassName(className)[0];
	},
	
	getProtocoleHeader: function getProtocoleHeader() {
		return this.getElemClass("pTitle");
	},

	getProtocoleContent: function getProtocoleContent() {
		return this.getElemClass("pContent");
	},

	formatProtocole: function formatProtocole() {
		this.addTitle();
		this.addMeta(this.getProtocoleContent());
		this.addPreTest(this.getProtocoleContent());
		this.addProtocole(this.getProtocoleContent());
		this.addPostTest(this.getProtocoleContent());
	},
	
	addTitle: function addTitle() {
		this.getProtocoleHeader().innerHTML = this.ms_data.title;
	},
	
	addParaWithHeader: function addParaWithHeader(headerTxt, text, parentNode) {
		var para = document.createElement("p");
		var header = document.createElement("b");
		var headerNode = document.createTextNode(headerTxt);
		header.appendChild(headerNode);
		para.appendChild(header);
		var text = document.createTextNode(text);
		para.appendChild(text);
		parentNode.appendChild(para);
	},
	
	addElem: function addElem(elem, id, className, text, parentNode) {
		var item = document.createElement(elem);
		if (id != "") {
			item.id = id;
		}
		if (className != "") {
			item.className = className;
		}	
		if (text != "") {
			var textnode = document.createTextNode(text);
			item.appendChild(textnode);
		}
		parentNode.appendChild(item);
	},

	addList: function addList(liste, parentNode) {
		var nodelist = document.createElement("ol");
		for (var i=0,  tot=liste.length; i < tot; i++) {
			this.addElem("li", "", "", liste[i], nodelist);
			//nodelist.appendChild(item);
		}
		parentNode.appendChild(nodelist);
	},
	
	
	addMeta: function addMeta(parentNode) {
		this.addParaWithHeader('But : ', this.ms_data.but, parentNode);
		
		// this.getProtocoleContent().innerHTML  = "<p><b>But : </b>"+this.ms_data.but+"</p>";
		// this.getProtocoleContent().innerHTML += "<p><b>Matière : </b>"+this.ms_data.matiere+"</p>";
	},
	
	addPreTest: function addPreTest(parentNode) {
		this.addElem("div", "pretest", "", "", parentNode);
		var newNode = parentNode.lastChild;
		this.addElem("p", "", "title", "Pré-tests", newNode);
		this.addList(this.ms_data.pretest,newNode);
	},
	
	addProtocole: function addProtocole(parentNode) {
		this.addElem("div", "protocole", "", "", parentNode);
		var newNode = parentNode.lastChild;
		this.addElem("p", "", "title", "Protocole", newNode);
		this.addList(this.ms_data.protocole,newNode);
	},
	
	addPostTest: function addPostTest(parentNode) {
		this.addElem("div", "posttest", "", "", parentNode);
		var newNode = parentNode.lastChild;
		this.addElem("p", "", "title", "Post-tests", newNode);
		this.addList(this.ms_data.posttest,newNode);
	},

	getFile: function getFile(protocoleName) {
		var fileName = '';
		switch(protocoleName) {
		    case "toto":
		        fileName = 'toto.json';
		        break;
		    default:
		        fileName = './test.json';
		}
		return serverURL+fileName;
	}
}