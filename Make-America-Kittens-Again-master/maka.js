// maka.js - part of make america kittens again
// v1.1.3
// by Tom Royal 
// tomroyal.com

var makaTesting = false; // for debugging only

if (makaTesting){
	console.log('maka initiated');
	
	var makaReplacements = 0;
	
}	

// init blacklist

var blacklist = ["trump", "трамп", "トランプ"]; // thanks to jSanchoDev and akiatoji for translations

// get additional settings from chrome storage

chrome.storage.local.get({
    blockPence: false,
    blockFarage: false,
    blockLePen: false,
    blockWilders: false,
    blockBannon: false
  }, function(items) { 
	  if (items.blockPence){
		  blacklist.push("mike pence");
		  blacklist.push("ペンス");
	  };
	  if (items.blockFarage){
		  blacklist.push("farage");
	  };
	  if (items.blockLePen){
		  blacklist.push("le pen");
	  };
	  if (items.blockWilders){
		  blacklist.push("wilders");
	  };
	  if (items.blockBannon){
		  blacklist.push("bannon");
	  };
	  
	  document.addEventListener('DOMContentLoaded', makanow(theKittens), false);
	  
  });

// kitten data!
// Note - update 1.0.1 moves these to Amazon S3, as my old server wasn't designed to take the amount of traffic that MAKA was generating. If you use this code, please host your own copy of the images - thanks!

var theKittens = {"kitten": [
    {"file": "1.png", "type":"0"},
	{"file": "2.png", "type":"0"},
	{"file": "3.jpg", "type":"0"},
	{"file": "4.gif", "type":"0"},
	{"file": "5.jpg", "type":"0"},
	{"file": "6.jpg", "type":"0"},
	{"file": "7.jpg", "type":"0"},
	{"file": "8.gif", "type":"0"},
	{"file": "9.jpg", "type":"0"},
	{"file": "10.jpg", "type":"0"},
	{"file": "11.jpg", "type":"0"},
	{"file": "12.jpg", "type":"0"},
	{"file": "13.jpg", "type":"0"},
	{"file": "14.jpg", "type":"0"},
	{"file": "15.jpg", "type":"0"},
	{"file": "16.jpeg", "type":"0"},
	{"file": "17.jpg", "type":"0"},
	{"file": "18.jpg", "type":"0"},
	{"file": "19.jpg", "type":"0"},
	{"file": "20.jpg", "type":"0"},
	{"file": "21.jpeg", "type":"0"},
	{"file": "22.jpeg", "type":"0"},
	{"file": "23.gif", "type":"0"},
	{"file": "24.png", "type":"0"},
	{"file": "25.jpg", "type":"0"},
	{"file": "26.jpg", "type":"0"},
	{"file": "27.jpeg", "type":"0"},
	{"file": "28.jpg", "type":"0"},
	{"file": "29.jpg", "type":"0"},
	{"file": "30.png", "type":"0"},
	{"file": "31.jpg", "type":"0"},
	{"file": "32.jpeg", "type":"0"},
	{"file": "33.jpg", "type":"0"},
	{"file": "34.jpg", "type":"0"},
	{"file": "35.jpg", "Credit": "Mami Terai", "URL": "http://www.google.com", "type":"1"},
	{"file": "36.jpg", "Credit": "Sam Scheibel", "URL": "http://www.google.com", "type":"1"}
    ]
};

function makanow(theKittens){
	if (makaTesting){
		console.log('maka processing blacklist is '+blacklist);
	}

	// called on page load. Searches all img alt text and srcs for the strings in blacklist, replaces with kittens
	var pagepics=document.getElementsByTagName("img"), i=0, img;	
	while (img = pagepics[i++])
	{	
		
		if (img.hasAttribute('makareplaced')){
			// already replaced	
		}
		else {
			// not yet replaced
			var alttext = String(img.alt).toLowerCase();
			var imgsrc = String(img.src).toLowerCase();
			
			if (img.parentElement.nodeName != 'BODY'){
				// check parent innerHTML for blackilist
				var parenttag = img.parentElement.innerHTML.toLowerCase();
			}
			else {
				// prevent parse of entire doc
				var parenttag = '';
			};
			
			var imgwidth = img.clientWidth;
			var imgheight = img.clientHeight;
	
			blacklist.forEach(function(blist) {	
				if ((alttext.indexOf(blist) != -1) || (imgsrc.indexOf(blist) != -1) || (parenttag.indexOf(blist) != -1)){
					
					// append old src
					img.setAttribute("makareplaced", img.src);
					
					// remove srcsets, forcing browser to the kitten - eg, BBC News
					if (img.hasAttribute('srcset')){
						img.removeAttribute('srcset');	
					};
					// remove source srcsets if children of same parent <picture> element - eg, the Guardian
					if (img.parentElement.nodeName == 'PICTURE'){
						var theparent = img.parentNode;
						for(var child=theparent.firstChild; child!==null; child=child.nextSibling) {
						    if (child.nodeName == "SOURCE"){
							    child.removeAttribute('src');
							    child.removeAttribute('srcset');
						    };
						};
						
					};
					// knock out lazyloader data URLs so it doesn't overwrite kittens
					if (img.hasAttribute('data-src')){
						img.removeAttribute('data-src');	
					};
					if (img.hasAttribute('data-hi-res-src')){
						img.removeAttribute('data-hi-res-src');	
					};
					if (img.hasAttribute('data-low-res-src')){
						img.removeAttribute('data-low-res-src');	
					};
					
					// main replacement here
					var randk = Math.floor(Math.random() * 33) + 1
					
					img.src = 'https://easkira.github.io/trump/'+theKittens.kitten[randk].file+'';
					img.width = imgwidth;
					img.height = imgheight;
					
	
					makaReplacements++;
				};
			});	
		};				
	}
	if (makaTesting){
		console.log('maka processing complete, replaced '+makaReplacements+' images');
	}	    
};

// function to replace kittened-images with the original SRCs

function undomakanow(){
	if (makaTesting){
		console.log('undoing MAKA');
	}

	var pagepics=document.getElementsByTagName("img"), i=0, img;	
	while (img = pagepics[i++])
	{	
		if (img.hasAttribute('makareplaced')){
			if (makaTesting){
				console.log('replacing image');
			};
			img.src = img.getAttribute('makareplaced');
			img.removeAttribute('makareplaced');
		};	
	};
	
}

// listener for context menu click invoking the above

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.functiontoInvoke == "undoMAKA") {
	    // undo function called
        undomakanow();
    };
    /*
    else if (message.functiontoInvoke == "redoMAKA") {
        makanow(theKittens);
    }
    */
});