/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
 var LevelSelector = (function () {
	"use strict";
	var selector = null;
	var mini_selector = null;
	var showing = false;
	function show () {
		if (showing) { return; }
		
		Resources.addImage("levelEight", "Bricks_files/images/eight_m2.png", function() {} );
		Resources.addImage("levelExplorer", "Bricks_files/images/explorer_m2.png", function() {} );
		Resources.addImage("levelHtml", "Bricks_files/images/html5_m2.png", function() {} );
		Resources.addImage("levelManyBricks", "Bricks_files/images/manybricks_m2.png", function() {} );
		Resources.addImage("levelTen", "Bricks_files/images/ten_m2.png", function() {} );
		
		LevelSelector.hideMiniSelector();
	
		var title = document.createElement("h1");
		var g, game, article, image, top;
		
		selector = document.createElement("section");
		selector.id = "levelSelector";
	
		title.appendChild( document.createTextNode("Level Selection") );
		selector.appendChild(title);
	
		var levels = Game.getLevels();
	
		for (g in levels) {
			var game = GameDefinitions[levels[g]];
			var title_text, id;

			if (game && game.title) {
				article = document.createElement("div");
				article.className = "gameSelectorLevel";
				article.id = "level_" + levels[g];
				if(game.image) {
					image = Resources.getImage(game.image).cloneNode(true);				
					image.setAttribute("alt", game.title + " game level");
					image.setAttribute("title", game.title);
					article.appendChild(image);
				}
				Event(article, "click", function(e) { 
						var target = e.srcElement || e.originalTarget;
						id = target.id || target.parentNode.id;
						Game.setLevel(id.substring(6)); 
						LevelSelector.showMiniSelector();
					});
				Event(article, "mouseover", function(e) { 
						var target = e.toElement || e.originalTarget;
						title_text = "Level Selection: " + target.title;
						if (title.innerText) {
							title.innerText = title_text;
						} else if (title.textContent) {
							title.textContent = title_text;
						}
					});
				selector.appendChild(article);
			}
		}
		document.body.appendChild(selector);

		top = ((document.body.clientHeight - selector.clientHeight) / 2);
		selector.style.left = ((document.body.clientWidth - selector.clientWidth)) / 2 + "px";
		selector.style.top =  (top > 0 ? top : 200) + "px";
		showing = true;
	}
	
	function hide () {
		if(selector) {
			showing = false;
			selector.parentNode.removeChild(selector);
			selector = null;
		}
	}
	
	function showMiniSelector () {
		var t;
		var title_text, id;
		var dock;
		
		mini_selector = document.createElement("section");
		mini_selector.id = "levelMiniSelector";
		mini_selector.appendChild( document.createTextNode("Level") );
		
		Event(mini_selector, "click", LevelSelector.show, false);
		
		var dock = document.getElementById("levelSelectorDock");
		
		dock.appendChild(mini_selector);
		
	}
	
	function hideMiniSelector () {
		if(mini_selector) {
			mini_selector.parentNode.removeChild(mini_selector);
			mini_selector = null;
		}
	}

	return {
		"show" : show,
		"hide" : hide,
		"showMiniSelector" : showMiniSelector,
		"hideMiniSelector" : hideMiniSelector
	};
}());