// ==UserScript==
// @name         Talibri Chemo
// @namespace    http://tampermonkey.net/
// @version      1.2.2
// @description  Remove some of the Cancer
// @author       Dan Campbell
// @match        https://www.talibri.com/*
// @match        https://talibri.com/*
// @grant        none
// ==/UserScript==

// BEGIN EDITING
var highlightColor     = '#0c0'; // hex color code or recognized color code
var textColor          = '#ccc'; // hex color code or recognized color code
var chatColor          = '#ccc'; // hex color code or recognized color code
var btnColor           = '#0c0';
var defaultBtnColor    = '#ccc';
var infoBtnColor       = '#5bc0de';
var primaryBtnColor    = '#0c0';
var goodBtnColor       = '#0c0';
var badBtnColor        = '#c00';
var starColor          = '#0c0';
var diceColor          = '#0c0';

var glassMode          = true;   // true or false
var displayChatHeading = false; // true or false
// END EDITING

/* and if you screwed something up, here are the default values:

var highlightColor     = '#0c0'; // hex color code or recognized color code
var textColor          = '#ccc'; // hex color code or recognized color code
var chatColor          = '#ccc'; // hex color code or recognized color code
var btnColor           = '#0c0';
var defaultBtnColor    = '#ccc';
var infoBtnColor       = '#5bc0de';
var primaryBtnColor    = '#069';
var goodBtnColor       = '#5cb85c';
var badBtnColor        = '#d9534f';
var starColor          = '#ccc';
var diceColor          = '#0c0';
var darkMode           = true;   // true or false
var displayChatHeading = false; // true or false
*/

(function() {
    'use strict';

    //global styles
    //reset body height to 100% of window
    addGlobalStyle('html, body { height: 100%; }');
    //change colors
    addGlobalStyle('body { color:'+textColor+' !important; }');
    addGlobalStyle('.btn,.required-ingredient { background-color: '+btnColor+'; border-color: #333; color:#333}');
    addGlobalStyle('.btn:hover { background-color: '+btnColor+'; border-color: black; filter: brightness(120%); }');
    addGlobalStyle('.btn-default { background-color:'+defaultBtnColor+'; color:#333}');
    addGlobalStyle('.btn-default:hover { background-color:'+defaultBtnColor+';}');
    addGlobalStyle('.required-ingredient { background-color: '+btnColor+'; border-color: #333; color:#333}');
    addGlobalStyle('.required-ingredient:hover { background-color: '+btnColor+'; border-color: black; filter: brightness(120%); }');
    addGlobalStyle('.btn-info { background-color:'+infoBtnColor+' !important;  color: white}');
    addGlobalStyle('.btn-info:hover { background-color:'+infoBtnColor+' !important;}');
    addGlobalStyle('.btn-primary { background-color:'+primaryBtnColor+' !important; color: white}');
    addGlobalStyle('.btn-primary:hover { background-color:'+primaryBtnColor+' !important;}');
    addGlobalStyle('.btn-danger { background-color: '+badBtnColor+' !important; color: white}');
    addGlobalStyle('.btn-danger:hover { background-color: '+badBtnColor+' !important;}');
    addGlobalStyle('.btn-success { background-color:'+goodBtnColor+' !important; color: white}');
    addGlobalStyle('.btn-success:hover { background-color:'+goodBtnColor+' !important;}');
    addGlobalStyle('.fa-star,.fa-star-half-o { color:'+starColor+' !important;}');
    addGlobalStyle('.bg-success { background-color: '+highlightColor+';}');
    addGlobalStyle('.tier-3 { color: #48f; }');
    addGlobalStyle('.tier-4 { color: #b4e; }');
    addGlobalStyle('.tier-6 { color: #f24; }');

    //set static height
    addGlobalStyle('.navbar-fixed-top { height:50px !important }');
    addGlobalStyle('.navbar-fixed-bottom { height:65px !important }');
    addGlobalStyle('.panel-footer { height:143px }');
    addGlobalStyle('.row:first-of-type { margin-left:0 !important; margin-right:0 !important; }');
    addGlobalStyle('body>.container-fluid:first-of-type { margin-top:0 !important; padding-top:50px !important; padding-left:0 !important; padding-bottom:0 !important; background-size:cover; background-position: center center; background-attachment: fixed; }');

    //modify chat panel
    addGlobalStyle('body>.container-fluid:first-of-type>div.row>div.col-xs-3 { padding-left:0 !important; height:calc(100vh - 228px) !important; position: fixed !important; width:20%; }');
    addGlobalStyle('.main-chat-panel.panel-heading { height:37px !important; }');
    addGlobalStyle('#messages { height:calc(100vh - 228px) !important; }');
    addGlobalStyle('#messages .card-text { color: '+chatColor+';}');
    addGlobalStyle('#messages .admin {background-color: '+highlightColor+'; color: black !important;}');
    addGlobalStyle('.main-page { margin-left:20% !important; width:80% !important; margin-right:0 !important; padding-right:0 !important; }');
    addGlobalStyle('.main-chat-panel .form-group>br,.main-chat-panel .form-group>.text-muted {display:none; }');
    addGlobalStyle('.main-chat-panel .panel-footer { height:80px !important; }');
    $('#main-chat-text-area').attr('placeholder','Enter text');
    addGlobalStyle('.main-chat-panel .form-group { margin-bottom:0 !important; }');
    addGlobalStyle('.main-chat-panel .form-control { width:450px; }');

    //footer styles
    addGlobalStyle('.percentage-circle-fill {fill: '+highlightColor+'}');

    //login styles
    addGlobalStyle('.jumbotron { background-color:rgba(0,0,0,0.75) !important; }');

    //dashboard styles
    addGlobalStyle('.main-page .jumbotron { display:none !important; }');

    //inventory styles
    addGlobalStyle('.inventory-panel { max-height:none !important; overflow-y:visible !important; margin-bottom: 75px;}');
    addGlobalStyle('.inventory-panel>.panel-body { max-height:none !important; overflow-y:visible !important;  }');
    addGlobalStyle('.components-panel>.panel-body { max-height:none !important; overflow-y:visible !important;  }');

    //profile styles
    addGlobalStyle('#profile-main-div .col-xs-8 { max-height:none !important; overflow-y:visible !important; margin-bottom:75px;}');
    addGlobalStyle('.progress-bar {background-color:'+highlightColor+'; color: black !important;}');
    addGlobalStyle('.main-page>.well-transparent {margin-bottom: 75px; !important; max-height:100vh !important;}');
    addGlobalStyle('#profile-main-div .col-xs-8 .panel-success .panel-body { max-height:none !important; overflow-y:visible !important;}');

    //leaderboard styles
    addGlobalStyle('.leaderboard-panel {overflow-y:visible !important; max-height:none !important; margin-bottom: 75px; }');

    //market styles
    addGlobalStyle('div.col-xs-9.main-page .panel-success {margin-bottom: 75px;}');

    //skillbar styles
    addGlobalStyle('#skill_details .panel-footer {height: auto !important;}');
    addGlobalStyle('#skill_details .panel-body {text-align:center;}');
    addGlobalStyle('#skill_details {width: 450px; max-height:none !important; overflow-y:visible !important;}');
    addGlobalStyle('.dropdown .dropdown-toggle {height:100%;}');
    addGlobalStyle('#dice-roll {width: 300px; margin-left:auto !important; margin-right:auto !important;display:flex;flex-flow:row;justify-content:space-evenly;}');
    addGlobalStyle('#dice-roll div {width: 37px;padding:0 !important;margin:0 !important;color:'+diceColor+';}');
    addGlobalStyle('#active_skill_dropdown { color: #ccc !important; }');
    addGlobalStyle('.dropdown.active-skill-dropdown.bg-success { background-color: black !important; border-left:1px solid '+highlightColor+';border-right:1px solid '+highlightColor+'; }');

    if(glassMode) enterGlassMode();
    if(displayChatHeading == false) {
        addGlobalStyle('.main-chat-panel>.panel-heading {display:none}');
        addGlobalStyle('#messages { height:calc(100vh - 191px) !important; overflow-y:default !important; }');
    }

})();
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function enterGlassMode(){
    addGlobalStyle('.navbar-default { background-color:#333; color:#ccc !important; }');
    addGlobalStyle('.navbar-default .navbar-nav>li>a { color:#999 !important }');
    addGlobalStyle('.navbar-default .navbar-nav>li>a:hover { color:#ccc !important }');
    addGlobalStyle('.navbar-default .navbar-nav>li>a:focus { color:#ccc !important }');
    addGlobalStyle('.navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:focus, .navbar-default .navbar-nav>.open>a:hover { background-color:#111 !important }');
    addGlobalStyle('.percentage-circle-contents { color:#ccc !important }');
    addGlobalStyle('.percentage-circle-contents>img { filter: invert(100%); }');
    addGlobalStyle('.percentage-circle-fg {fill: black;}');
    addGlobalStyle('a { color:'+highlightColor+' !important; }');

    //panel colors
    addGlobalStyle('.panel, .breadcrumb { background-color: rgba(0,0,0,0.5) !important; }');
    addGlobalStyle('.main-chat-panel .panel-footer { background-color:rgba(0,0,0,0.5) !important; }');
    addGlobalStyle('.panel-heading, .alert-success {color: #ccc !important; background-color: rgba(0,0,0,0.5) !important; border-color: #666 !important;}');
    addGlobalStyle('.panel-success, .panel-default, .panel-info, .panel-primary { border-color: #666;}');
    addGlobalStyle('.panel-footer {color: #ccc; background-color: rgba(0,0,0,0.5); border-color: #666;}');

    addGlobalStyle('.dropdown-menu,.list-group-item,.well { background-color:#333; }');
    addGlobalStyle('.dropdown-menu a:hover { background-color:#111 !important; }');
    addGlobalStyle('.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li>a:hover{ background-color:rgba(0,0,0,0.5) !important; }');
    addGlobalStyle('.table>tbody>tr.success>td, .table>tbody>tr.success>th, .table>tbody>tr>td.success, .table>tbody>tr>th.success, .table>tfoot>tr.success>td, .table>tfoot>tr.success>th, .table>tfoot>tr>td.success, .table>tfoot>tr>th.success, .table>thead>tr.success>td, .table>thead>tr.success>th, .table>thead>tr>td.success, .table>thead>tr>th.success{background-color: rgba(255,255,255,0.25) !important;}');
    addGlobalStyle('select {background-color:#333}');
    addGlobalStyle('.table-striped>tbody>tr:nth-of-type(odd) { background: none !important}');
    addGlobalStyle('.table-hover>tbody>tr:hover { background-color: rgba(0,0,0,0.4) !important}');
    addGlobalStyle('.popover { background-color: #333 !important}');
    addGlobalStyle('.popover-title { background-color: #333 !important}');
    addGlobalStyle('#main-chat-text-area {background-color: #333 !important;color: #ccc !important}');
    addGlobalStyle('#progressBarContainer {background-color:#ccc !important;border-radius: 4px;-webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);}');
    addGlobalStyle('#progressBar {background-color:'+highlightColor+' !important;}');
    addGlobalStyle('#user-stat-actions td.row-1.column-1,#user-stat-actions td.row-1.column-2{ color: black !important; padding-top:2px !important;}');
    addGlobalStyle('.nav>li>a:hover { background-color: #333;');
    addGlobalStyle('.progress,.input-group-addon,.form-control { background-color: #ccc;');
    //modal
    addGlobalStyle('.modal-content{ background-color:#333; }');
    addGlobalStyle('.modal-content input, .modal-content select{ background-color:#ccc !important; color: black }');
    //skills
    addGlobalStyle('#skill_details, #skill_details .panel-default { background-color:rgba(0,0,0,.5) !important; margin-bottom:0;}');

}
