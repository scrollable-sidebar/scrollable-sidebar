/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/**
* Makes entire scrollbar scrollable as one unit. If you use Taller Working Files extension and have lots of Working Files open the Project selector box and Project Files can dissapear off the bottom of the screen. This amateurish extension attempts to solve that. Only tested on Windows. Breaks sidebar resizing and "show in file tree". Please improve if you know how. Based on Taller Working Files.
**/
define(function (require, exports, module) {
  "use strict";

  var CommandManager = brackets.getModule("command/CommandManager"),
	  Menus = brackets.getModule("command/Menus"),
	  PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
	  prefs = PreferencesManager.getExtensionPrefs("scrollableSidebar"),
	  menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU),
	  commandId = 'scrollable-sidebar',
	  prefKey = 'scrollable';


	// Create our handler
  CommandManager.register("Scrollable Sidebar", commandId, function() {
	prefs.set(prefKey, !prefs.get(prefKey));
	prefs.save();
  });

	// Add our item to the menu
  menu.addMenuItem(commandId);

  // Set the state of the working files area when our preference is changed
  prefs.definePreference(prefKey, 'boolean', 'false').on('change', function() {
	var on = prefs.get(prefKey);
	CommandManager.get(commandId).setChecked(on);
	$('.open-files-container').css('max-height', on ? 'none' : '200px'); //remove working files max-height
	$('.main-view .sidebar').css('overflow-x', on ? 'hidden' : 'inherit'); //horizontal scroll a bit prettier
	$('.main-view .sidebar').css('overflow-y', on ? 'scroll' : 'inherit'); //enables vertical scrolling
	$('.main-view .sidebar').css('display', on ? 'block' : '-webkit-box'); //enables vertical scrolling
	$('.main-view .sidebar').css('display', on ? 'block' : '-moz-box'); //enables vertical scrolling
	$('.main-view .sidebar').css('display', on ? 'block' : 'box'); //enables vertical scrolling
  });
});
