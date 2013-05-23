var Keys = (function () {
	// Key constants
	KEY_PLUS_NUMROW = 187;
	KEY_MINUS_NUMROW = 189;
	KEY_PLUS_NUMPAD = 43;
	KEY_LEFT_CARET = 44;
	KEY_MINUS_NUMPAD = 45;
	KEY_RIGHT_CARET = 46;
	
	//KEY_O = 111;
	
	KEY_A = 65;
	KEY_B = 66;
	KEY_C = 67;
	KEY_D = 68;
	KEY_E = 69;	
	KEY_F = 70;	
	KEY_L = 76;	
	KEY_O = 79;
	KEY_P = 80;
	KEY_S = 83;
	KEY_T = 84;
	KEY_V = 86;
	KEY_W = 87;
	KEY_X = 88;
	
	KEY_ENTER = 13;

	KEY_DOWN_ARROW_NUMPAD = 98; 		// 50;
	KEY_LEFT_ARROW_NUMPAD = 100; 		// 52;
	KEY_RIGHT_ARROW_NUMPAD = 102; 		// 54;
	KEY_UP_ARROW_NUMPAD = 104; 			// 56;
	
	LOCK_KEY_LEFT_ARROW_NUMPAD = 37; 	// 52;
	LOCK_KEY_RIGHT_ARROW_NUMPAD = 39; 	// 54;
	LOCK_KEY_UP_ARROW_NUMPAD = 38; 		// 56;
	LOCK_KEY_DOWN_ARROW_NUMPAD = 40;	// 50;

	KEY_LEFT = 37;
	KEY_UP = 38;
	KEY_RIGHT = 39;
	KEY_DOWN = 40;

	KEY_ESCAPE = 27;
	KEY_TAB = 9;
	KEY_SHIFT = 16;

	KEY_SPACE = 32;
	KEY_PAGE_UP = 33;
	KEY_PAGE_DOWN = 34;

	KEY_LEFT_BRACE = 219;
	KEY_RIGHT_BRACE = 221;
	KEY_BACK_SLASH = 220;	
	
	
	
	function handle (e) {
		switch(e.keyCode) {
			case KEY_PLUS_NUMROW:
			case KEY_PLUS_NUMPAD:
				Game.nextLevel();
				break;
			case KEY_MINUS_NUMROW:
			case KEY_MINUS_NUMPAD:
				Game.previousLevel();
				break;
			case KEY_L:
				LevelSelector.show();
				break;
			
		}
	};


	return {
		"handle" : handle
	};
}());