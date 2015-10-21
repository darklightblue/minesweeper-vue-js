/* globals module */

"use strict";

module.exports = {
  props: ["picture", "idprop", "bomb", "vid", "hid", "id"],
  template: "<img bomb='{{bomb}}' vid='{{vid}}' hid='{{hid}}'" +
    " v-on='click: showBlock' idprop='{{id}}' id={{id}}" +
    " class='imgblock' src='images/{{picture}}' />",
  methods: {

    showBlock: function() {
      const theindex = this.id;
      const bombnum = this.$parent.bombnum;
      const overall = document.querySelectorAll("img[idprop^='b_']");
      let gameover = false;
      let endGame = false;
      let loadedAlready = this.$parent.loadedAlready;
      let ask = false;
      let hid;
      let vid;

      //if first time being loaded, then enter the if statement
      if (loadedAlready === false) {
        const tempholder = [];
        const all = document
          .querySelectorAll("img[idprop^='b_']:not([idprop='" + theindex + "'])");
        document.querySelector("[idprop='" + theindex + "']")
          .setAttribute("bomb", "noBomb");

        //assigning the bombs to a random cell
        for (let i = 0; i < all.length; i++) {
          tempholder.push(all[i]);
        }
        for (let s = 0; s < all.length - bombnum; s++) {
          let num = Math.floor(Math.random() * tempholder.length - 1);
          tempholder.splice(num, 1);
        }

        for (let b = 0; b < all.length; b++) {
          all[b].setAttribute("bomb", "noBomb");
        }
        for (let d = 0; d < tempholder.length; d++) {
          tempholder[d].setAttribute("bomb", "hasBomb");
        }
        //----------------------------------------------------------------------
        // Setting the value of cells based on the number of bombs around it. 
        for (let a = 0; a < overall.length; a++) {

          hid = overall[a].getAttribute("hid");
          vid = overall[a].getAttribute("vid");
          const cellcont = document
            .querySelector("[idprop='" + overall[a].id + "']");
          const blkCnt = cellcont.getAttribute("bomb");
          const upVal = parseInt(hid) - 1;
          const downVal = parseInt(hid) + 1;
          const leftVal = parseInt(vid) - 1;
          const rightVal = parseInt(vid) + 1;
          let bomNum = 0;

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
      } else {

      }

      const cellEl = document.querySelector("[idprop='" + theindex + "']");
      let bombVer = cellEl.getAttribute("bomb");
      const BombVerNum = bombVer.replace(/^\D+/g, "");
      const elems = document.querySelectorAll("img[bomb='hasBomb']");
      hid = cellEl.getAttribute("hid");
      vid = cellEl.getAttribute("vid");
      //if  a bomb was clicked enter and reveal all bombs
      if (bombVer == "hasBomb") {


        gameover = true;
        for (let i = 0; i <= elems.length; i++) {
          let setAtt;
          let loopErr = false;
          try {
            setAtt = document.querySelector("[idprop='" + elems[i].id + "']");
          } catch (err) {
            loopErr = true;
          }
          if (!loopErr) {
            setAtt = document.querySelector("[idprop='" + elems[i].id + "']");
            const currId = elems[i].id;
            setAtt.setAttribute("src", "images/bombrevealed.gif");
            setAtt.parentElement.setAttribute("data-revealed", "true");

            document.querySelector("[idprop='" + currId + "']")
              .parentElement.style.pointerEvents = "none";
          }
          document.querySelector("[idprop='" + theindex + "']")
          .setAttribute("src", "images/bombdeath.gif");
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
      const bomblength = elems.length;
      let angbilin = document
      .querySelectorAll("horizontal[data-revealed=false]").length;
      if (bomblength == angbilin && gameover === false) {
        endGame = true;
        ask = window.confirm("Congratulations, You Win, New Game?");
      }

      if (ask) {
        endGame = false;
        this.$parent.changeLvl(this.level);
      } else {

      }

      if(endGame){
        for (let k = 0; k < overall.length; k++) {
          document.querySelector("[idprop='" + overall[k].id + "']")
            .parentElement.style.pointerEvents = "none";
        }
      }

    },

    //checks if the cell contains a bomb
    getVbombVal: function(idn) {
      let mayErr = false;
      let thecellcont;
      let vBombval;
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
    getNeighbor: function(hid, vid) {
      const el = document
      .querySelector("[idprop='b_" + hid + "_" + vid + "']");
      let bombVer = el.getAttribute("bomb");


      for (let i = 1; i <= 8; i++) {
        let dummyHid = parseInt(hid);
        let dummyVid = parseInt(vid);
        let myErr = false;
        let dEl;
        let val;

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
            dEl = document
            .querySelector("[idprop='b_" + dummyHid + "_" + dummyVid + "']");
            val = dEl.getAttribute("bomb");
          } catch (err) {
            myErr = true;
          }
          if (myErr === false) {
            dEl = document
            .querySelector("[idprop='b_" + dummyHid + "_" + dummyVid + "']");
            val = dEl.getAttribute("bomb");

            if (dEl.getAttribute("src") == "images/shadow0.gif") {
              let theval = val.replace(/^\D+/g, "");
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

    getpic: function(val) {
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

    getCell: function(hidval, vidval) {
      let dummyTryId;
      let theErr;
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

    getBombNum: function(hidval, vidval, bombnums) {
      let bomNum = bombnums;
      if (this.getCell(hidval, vidval) === false) {
        if (this.getVbombVal("b_" + hidval + "_" + vidval) === "hasBomb") {
          bomNum = bomNum + 1;
        }
      }
      return bomNum;
    }

  }
};