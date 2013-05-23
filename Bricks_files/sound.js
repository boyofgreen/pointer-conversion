/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/

var Sound = (function () { 
	
	function play (sound) {
		var isOn = Options && Options.sound && Options.sound();
		if ( ! isOn ) {
			return;
		}
		
		var id = "sound_" + sound;
		var audio = document.getElementById(id) 
					|| document.getElementById(sound);
		var sources = [null, null];
		var SOUNDROOT = "sounds/";
		var element;

		if (!audio) {
			audio = document.createElement("audio");
			audio.id = sound;

			sources[0] = document.createElement("source");
			sources[0].setAttribute("src", SOUNDROOT + sound + ".mp3");
			sources[0].setAttribute("type", "audio/mp3");

			sources[1] = document.createElement("source");
			sources[1].setAttribute("src", SOUNDROOT + sound + ".ogg");
			sources[1].setAttribute("type", "audio/ogg");
			
			audio.appendChild(sources[0]);
			audio.appendChild(sources[1]);
			
			document.body.appendChild(audio);
			element = audio;
		} else {
			element = audio.cloneNode(true);
		}
		Event(element, "ended", function (e) { element.parentNode.removeChild(element); }, false);
		
		if (audio.play) {
			audio.play();
		} 
		audio.id = "";
		audio.className = "oldAudio";
		document.body.appendChild(element);
		element.id = id;
	};
	
	return {
		"play" : play
	};
}());