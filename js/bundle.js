/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* globals Vue, require */
	"use strict";
	var vm = new Vue({
	  el: "#demo",
	  data: {
	    //picture: 'shadow0.gif',
	    level: 8,
	    levelSelect: 8,
	    lvlSelect: 8,
	    horizontalSelect: 8,
	    bombSelect: 10,
	    loadedAlready: false,
	    bombnum: 10,
	    horizontal: 8,
	    options: [{
	      text: "Beginner",
	      value: 8,
	      bomb: 10
	    }, {
	      text: "Intermediate",
	      value: 16,
	      bomb: 18
	    }, {
	      text: "Expert",
	      value: 30,
	      bomb: 35
	    }, {
	      text: "Custom",
	      value: 9,
	      bomb: 10
	    }]
	  },

	  directives: {
	    bomb: function bomb() {},

	    bombval: function bombval() {}
	  },

	  components: {
	    //calls the component thecell.js
	    "cell": __webpack_require__(1)
	  },

	  methods: {

	    changeLvl: function changeLvl(lvlval) {
	      /*  changes the height and width of the board (dropdown)
	      level - width
	      horizontal - height
	      */
	      var overall = vm.$el.querySelectorAll("img[id^='b_']");
	      this.loadedAlready = false;
	      if (lvlval == "8") {
	        this.level = 8;
	      }
	      if (lvlval == 8) {
	        this.bombnum = 10;
	        this.horizontal = 8;
	        this.level = 8;
	      } else if (lvlval == 16) {
	        this.horizontal = 16;
	        this.bombnum = 40;
	        this.level = 16;
	      } else if (lvlval == 30) {
	        this.horizontal = 16;
	        this.bombnum = 99;
	        this.level = 30;
	      }
	      //sets the default attributes and images on every
	      //change of dropdown value
	      for (var i = 0; i <= overall.length - 1; i++) {
	        vm.$el.querySelector("[idprop='" + overall[i].id + "']").parentElement.style.pointerEvents = "auto";
	        var overallId = overall[i].id;
	        var overall2 = vm.$el.querySelector("#" + overallId);

	        overall2.setAttribute("src", "images/shadow0.gif");
	        overall2.setAttribute("data-revealed", "false");
	      }
	    },

	    customValues: function customValues() {
	      this.level = parseInt(this.lvlSelect);
	      this.horizontal = parseInt(this.horizontalSelect);
	      this.bombnum = parseInt(this.bombSelect);
	      this.levelSelect = 8;
	    }

	  },

	  ready: function ready() {}
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* globals module */

	"use strict";

	module.exports = {
	  props: ["picture", "idprop", "bomb", "vid", "hid", "id"],
	  template: "<img bomb='{{bomb}}' vid='{{vid}}' hid='{{hid}}'" + " v-on='click: showBlock' idprop='{{id}}' id={{id}}" + " class='imgblock' src='images/{{picture}}' />",
	  methods: {

	    showBlock: function showBlock() {
	      var theindex = this.id;
	      var bombnum = this.$parent.bombnum;
	      var overall = document.querySelectorAll("img[idprop^='b_']");
	      var gameover = false;
	      var endGame = false;
	      var loadedAlready = this.$parent.loadedAlready;
	      var ask = false;
	      var hid = undefined;
	      var vid = undefined;

	      //if first time being loaded, then enter the if statement
	      if (loadedAlready === false) {
	        var tempholder = [];
	        var all = document.querySelectorAll("img[idprop^='b_']:not([idprop='" + theindex + "'])");
	        document.querySelector("[idprop='" + theindex + "']").setAttribute("bomb", "noBomb");

	        //assigning the bombs to a random cell
	        for (var i = 0; i < all.length; i++) {
	          tempholder.push(all[i]);
	        }
	        for (var s = 0; s < all.length - bombnum; s++) {
	          var num = Math.floor(Math.random() * tempholder.length - 1);
	          tempholder.splice(num, 1);
	        }

	        for (var b = 0; b < all.length; b++) {
	          all[b].setAttribute("bomb", "noBomb");
	        }
	        for (var d = 0; d < tempholder.length; d++) {
	          tempholder[d].setAttribute("bomb", "hasBomb");
	        }
	        //----------------------------------------------------------------------
	        // Setting the value of cells based on the number of bombs around it.
	        for (var a = 0; a < overall.length; a++) {

	          hid = overall[a].getAttribute("hid");
	          vid = overall[a].getAttribute("vid");
	          var cellcont = document.querySelector("[idprop='" + overall[a].id + "']");
	          var blkCnt = cellcont.getAttribute("bomb");
	          var upVal = parseInt(hid) - 1;
	          var downVal = parseInt(hid) + 1;
	          var leftVal = parseInt(vid) - 1;
	          var rightVal = parseInt(vid) + 1;
	          var bomNum = 0;

	          //--

	          if (blkCnt === "hasBomb") {
	            cellcont.setAttribute("bomb", "hasBomb");
	          } else {
	            //----
	            bomNum = this.getBombNum(downVal, vid, bomNum);
	            bomNum = this.getBombNum(upVal, vid, bomNum);
	            bomNum = this.getBombNum(hid, rightVal, bomNum);
	            bomNum = this.getBombNum(hid, leftVal, bomNum);
	            bomNum = this.getBombNum(upVal, leftVal, bomNum);
	            bomNum = this.getBombNum(upVal, rightVal, bomNum);
	            bomNum = this.getBombNum(downVal, leftVal, bomNum);
	            bomNum = this.getBombNum(downVal, rightVal, bomNum);

	            if (bomNum === 0) {
	              cellcont.setAttribute("bomb", "noBomb");
	            } else {
	              cellcont.setAttribute("bomb", "withBomb" + bomNum);
	            }
	            //---
	          }
	        }

	        //----------------------------------------------------------------------
	        loadedAlready = true;
	        this.$parent.loadedAlready = true;
	      } else {}

	      var cellEl = document.querySelector("[idprop='" + theindex + "']");
	      var bombVer = cellEl.getAttribute("bomb");
	      var BombVerNum = bombVer.replace(/^\D+/g, "");
	      var elems = document.querySelectorAll("img[bomb='hasBomb']");
	      hid = cellEl.getAttribute("hid");
	      vid = cellEl.getAttribute("vid");
	      //if  a bomb was clicked enter and reveal all bombs
	      if (bombVer == "hasBomb") {

	        gameover = true;
	        for (var i = 0; i <= elems.length; i++) {
	          var setAtt = undefined;
	          var loopErr = false;
	          try {
	            setAtt = document.querySelector("[idprop='" + elems[i].id + "']");
	          } catch (err) {
	            loopErr = true;
	          }
	          if (!loopErr) {
	            setAtt = document.querySelector("[idprop='" + elems[i].id + "']");
	            var currId = elems[i].id;
	            setAtt.setAttribute("src", "images/bombrevealed.gif");
	            setAtt.parentElement.setAttribute("data-revealed", "true");

	            document.querySelector("[idprop='" + currId + "']").parentElement.style.pointerEvents = "none";
	          }
	          document.querySelector("[idprop='" + theindex + "']").setAttribute("src", "images/bombdeath.gif");
	        }
	      }

	      if (gameover) {
	        endGame = true;
	        ask = window.confirm("Game Over!, New Game?");
	      }
	      if (bombVer == "noBomb") {
	        //if empty cell, then enter the function
	        this.getNeighbor(hid, vid);
	      } else if (bombVer != "hasBomb") {
	        //if cell is not empty, yet doesn't contain a bomb.
	        cellEl.setAttribute("src", "images/" + this.getpic(BombVerNum));
	        cellEl.parentElement.setAttribute("data-revealed", "true");
	      }

	      //checks the remaining cell (closed) and the number of bomb
	      //if number of close cell == number of bombs, then "you win"
	      var bomblength = elems.length;
	      var angbilin = document.querySelectorAll("horizontal[data-revealed=false]").length;
	      if (bomblength == angbilin && gameover === false) {
	        endGame = true;
	        ask = window.confirm("Congratulations, You Win, New Game?");
	      }

	      if (ask) {
	        endGame = false;
	        this.$parent.changeLvl(this.level);
	      } else {}

	      if (endGame) {
	        for (var k = 0; k < overall.length; k++) {
	          document.querySelector("[idprop='" + overall[k].id + "']").parentElement.style.pointerEvents = "none";
	        }
	      }
	    },

	    //checks if the cell contains a bomb
	    getVbombVal: function getVbombVal(idn) {
	      var mayErr = false;
	      var thecellcont = undefined;
	      var vBombval = undefined;
	      try {
	        thecellcont = document.querySelector("[idprop='" + idn + "']");
	        vBombval = thecellcont.getAttribute("bomb");
	      } catch (err) {
	        mayErr = true;
	      }
	      if (mayErr === false) {
	        thecellcont = document.querySelector("[idprop='" + idn + "']");
	        vBombval = thecellcont.getAttribute("bomb");
	        return vBombval;
	      }
	    },

	    //if the cell is empty, check the neighboring cell and open it if empty
	    getNeighbor: function getNeighbor(hid, vid) {
	      var el = document.querySelector("[idprop='b_" + hid + "_" + vid + "']");
	      var bombVer = el.getAttribute("bomb");

	      for (var i = 1; i <= 8; i++) {
	        var dummyHid = parseInt(hid);
	        var dummyVid = parseInt(vid);
	        var myErr = false;
	        var dEl = undefined;
	        var val = undefined;

	        if (i == 1) {
	          dummyHid = parseInt(hid) + 1; //down
	        } else if (i == 2) {
	            dummyHid = parseInt(hid) - 1; //up
	          } else if (i == 3) {
	              dummyVid = parseInt(vid) - 1; //left
	            } else if (i == 4) {
	                dummyVid = parseInt(vid) + 1; // right
	              } else if (i == 5) {
	                  dummyVid = parseInt(vid) - 1; //upleft
	                  dummyHid = parseInt(hid) - 1;
	                } else if (i == 6) {
	                  dummyVid = parseInt(vid) + 1;
	                  dummyHid = parseInt(hid) + 1; //downright
	                } else if (i == 7) {
	                    dummyVid = parseInt(vid) - 1;
	                    dummyHid = parseInt(hid) + 1; //downleft
	                  } else if (i == 8) {
	                      dummyVid = parseInt(vid) + 1;
	                      dummyHid = parseInt(hid) - 1; //upright
	                    }

	        if (bombVer == "noBomb") {
	          el.setAttribute("src", "images/open0.gif");
	          el.parentElement.setAttribute("data-revealed", "true");
	          try {
	            dEl = document.querySelector("[idprop='b_" + dummyHid + "_" + dummyVid + "']");
	            val = dEl.getAttribute("bomb");
	          } catch (err) {
	            myErr = true;
	          }
	          if (myErr === false) {
	            dEl = document.querySelector("[idprop='b_" + dummyHid + "_" + dummyVid + "']");
	            val = dEl.getAttribute("bomb");

	            if (dEl.getAttribute("src") == "images/shadow0.gif") {
	              var theval = val.replace(/^\D+/g, "");
	              theval = parseInt(theval);

	              if (val != "hasBomb") {
	                dEl.setAttribute("src", "images/" + this.getpic(theval));
	                dEl.parentElement.setAttribute("data-revealed", "true");
	                if (val == "noBomb") {
	                  this.getNeighbor(dummyHid, dummyVid);
	                }
	              }
	            }
	          }
	        }
	      }
	    },

	    getpic: function getpic(val) {
	      if (val == "0") {
	        return "open0.gif";
	      }
	      if (val == "1") {
	        return "open1.gif";
	      } else if (val == "2") {
	        return "open2.gif";
	      } else if (val == "3") {
	        return "open3.gif";
	      } else if (val == "4") {
	        return "open4.gif";
	      } else if (val == "5") {
	        return "open5.gif";
	      } else if (val == "6") {
	        return "open6.gif";
	      } else if (val == "7") {
	        return "open7.gif";
	      } else if (val == "8") {
	        return "open8.gif";
	      } else {
	        return "open0.gif";
	      }
	    },

	    getCell: function getCell(hidval, vidval) {
	      var dummyTryId = undefined;
	      var theErr = undefined;
	      try {
	        dummyTryId = "b_" + hidval + "_" + vidval;
	        this.getVbombVal(dummyTryId);
	      } catch (err) {
	        theErr = true;
	      }
	      if (theErr === true) {
	        return true;
	      } else {
	        return false;
	      }
	    },

	    getBombNum: function getBombNum(hidval, vidval, bombnums) {
	      var bomNum = bombnums;
	      if (this.getCell(hidval, vidval) === false) {
	        if (this.getVbombVal("b_" + hidval + "_" + vidval) === "hasBomb") {
	          bomNum = bomNum + 1;
	        }
	      }
	      return bomNum;
	    }

	  }
	};

/***/ }
/******/ ]);