module.exports = {
  props: ['picture', 'idprop', 'bomb','vid', 'hid', 'id'],
    template: "<img bomb='{{bomb}}' vid='{{vid}}' hid='{{hid}}'"+
                " v-on='click: showBlock' idprop='{{id}}' id={{id}}"+
                " class='imgblock' src='images/{{picture}}' />",
	methods: {
	   showBlock: function(){
            var theindex = this.id;
            var gameover = false;
        	var loadedAlready = this.$parent.loadedAlready;
        	var bombnum = this.$parent.bombnum;
            var ask = false;

            //if first time being loaded, then enter the if statement
            if(loadedAlready == false){
            var all=document
            .querySelectorAll("img[idprop^='b_']:not([idprop='"+theindex+"'])");
            document.querySelector("[idprop='"+theindex+"']")
            .setAttribute("bomb", "noBomb");

            //assigning the bombs to a random cell
            var tempholder = [];
            for (i = 0; i < all.length; i++) {
                        tempholder.push(all[i]);
            }
            for (var s = 0; s < all.length-bombnum; s++) {
                var num = Math.floor(Math.random() * tempholder.length-1);
                tempholder.splice(num, 1);
            }                

            for (var b = 0; b < all.length; b++) {
                all[b].setAttribute("bomb", "noBomb");
            }
            for (var d = 0; d < tempholder.length; d++) {
                tempholder[d].setAttribute("bomb", "hasBomb");
            }
//------------------------------------------------------------------------------
            // Setting the value of cells based on the number of bombs around it. 
            var overall=document.querySelectorAll("img[idprop^='b_']");
                for (var a = 0; a < overall.length; a++) {

                var hid = overall[a].getAttribute("hid");
                var vid = overall[a].getAttribute("vid");
                var cellcont = document
                .querySelector("[idprop='"+overall[a].id+"']");
                var cellId = cellcont.id;
                var blkCnt = cellcont.getAttribute("bomb");
                var idnum = cellId.replace(/^\D+/g, "");
                var isErrDown = false;
                var isErrUp = false;
                var isErrLeft = false;
                var isErrRight = false;
                var isErrUr = false;
                var isErrUl = false;
                var isErrDr = false;
                var isErrDl = false;
                var dummyTryId = 0, bomNum = 0;
                var idnum = parseInt(idnum);
                var upVal = parseInt(hid) - 1;
                var downVal = parseInt(hid) + 1;
                var leftVal = parseInt(vid) - 1;
                var rightVal = parseInt(vid) + 1;

                    //--

                if (blkCnt === 'hasBomb') { 
                    cellcont.setAttribute("bomb", "hasBomb")

                }else{
                        //----
                    try{
                        dummyTryId = "b_"+downVal+"_"+vid;
                        var downward = this.getVbombVal(dummyTryId);
                    }catch(err){
                        isErrDown = true; // - down
                    }
                    try{
                        dummyTryId = "b_"+upVal+"_"+vid;
                        var upward = this.getVbombVal(dummyTryId);
                    }catch(err){
                        isErrUp = true; // - up
                    }
                    try{
                        dummyTryId = "b_"+hid+"_"+leftVal;
                        var leftward = this.getVbombVal(dummyTryId);
                    }catch(err){
                        isErrLeft = true; // - left
                    }
                    try{
                        dummyTryId = "b_"+hid+"_"+rightVal;
                        var rightward = this.getVbombVal(dummyTryId);
                    }catch(err){
                        isErrRight = true; // right
                    }
                    try{
                        dummyTryId = "b_"+upVal+"_"+rightVal;
                        var urward = this.getVbombVal(dummyTryId);
                    }catch(err){
                        isErrUr = true; // - upper right
                    }
                    try{
                        dummyTryId = "b_"+downVal+"_"+leftVal;
                        var dlward = this.getVbombVal(dummyTryId);
                    }catch(err){
                        isErrUl = true; // - down left
                    }
                    try{
                        dummyTryId = "b_"+downVal+"_"+rightVal;
                        var drward = this.getVbombVal(dummyTryId);
                    }catch(err){
                        isErrDr = true; // - down right
                    }
                    try{
                        dummyTryId = "b_"+upVal+"_"+leftVal;
                        var ulward = this.getVbombVal(dummyTryId);
                    }catch(err){
                        isErrDl = true; // - upper left
                    }
                    if (isErrDown == false){
                        if (this.getVbombVal("b_"+downVal+"_"+vid) === 'hasBomb') {
                            bomNum=bomNum+1;
                         };
                       
                     }
                    if (isErrUp == false){
                        if (this.getVbombVal("b_"+upVal+"_"+vid) === 'hasBomb') {
                         bomNum=bomNum+1; 
                        };
                    
                     }
                    if (isErrRight == false){
                        if (this.getVbombVal("b_"+hid+"_"+rightVal) === 'hasBomb') { 
                            bomNum=bomNum+1; 
                        };
                    
                     }
                    if (isErrLeft == false){
                        if (this.getVbombVal("b_"+hid+"_"+leftVal) === 'hasBomb') {
                            bomNum=bomNum+1; 
                        };
                    
                     }
                    if (isErrUl == false){
                        if (this.getVbombVal("b_"+upVal+"_"+leftVal) === 'hasBomb') {
                            bomNum=bomNum+1; 
                        };
                    
                     }
                    if (isErrUr == false){
                        if (this.getVbombVal("b_"+upVal+"_"+rightVal) === 'hasBomb') {
                            bomNum=bomNum+1; 
                        };
                    
                     }
                    if (isErrDl == false){
                        if (this.getVbombVal("b_"+downVal+"_"+leftVal) === 'hasBomb') {
                            bomNum=bomNum+1; 
                        };
                    
                     }
                    if (isErrDr == false){
                        if (this.getVbombVal("b_"+downVal+"_"+rightVal) === 'hasBomb') {
                            bomNum=bomNum+1; 
                        };
                    
                     }

                     if(bomNum == 0){
                        cellcont.setAttribute("bomb", "noBomb");
                     }else{
                        cellcont.setAttribute("bomb", "withBomb"+bomNum);
                     }
                        //---
                } 
            }

//------------------------------------------------------------------------------
            loadedAlready = true;
            this.$parent.loadedAlready = true;
            }else{
                
            }

        var cellEl = document.querySelector("[idprop='"+theindex+"']");
        var hid = cellEl.getAttribute("hid");
        var vid = cellEl.getAttribute("vid");
        var bombVer = cellEl.getAttribute("bomb");
        var BombVerNum = bombVer.replace(/^\D+/g, "");
        var elems = document.querySelectorAll("img[bomb='hasBomb']");
        //if  a bomb was clicked enter and reveal all bombs
        if(bombVer == 'hasBomb'){
            
                
            gameover = true;
            for(var i = 0; i <= elems.length; i++) {
                var setAtt, loopErr = false;
                try{
                    setAtt = document.querySelector("[idprop='"+elems[i].id+"']");
                }catch(err){
                    loopErr = true;
                }
                if(!loopErr) {
                setAtt = document.querySelector("[idprop='"+elems[i].id+"']");
                var currId = elems[i].id;
                setAtt.setAttribute("src", "images/bombrevealed.gif");
                //alert(setAtt.getAttribute("src"));
                setAtt.parentElement.setAttribute("data-revealed", "true");

                document.querySelector("[idprop='"+currId+"']").parentElement.style.pointerEvents = "none";
                }

            }

        }

        if(gameover){
            ask = window.confirm("Game Over!, New Game?");
        }
        if (bombVer == 'noBomb') {
        //if empty cell, then enter the function
            this.getNeighbor(hid, vid);
        }else if (bombVer != 'hasBomb'){
        //if cell is not empty, yet doesn't contain a bomb. 
        cellEl.setAttribute("src", "images/"+ this.getpic(BombVerNum));
        cellEl.parentElement.setAttribute("data-revealed", "true");
        }

        //checks the remaining cell (closed) and the number of bomb
        //if number of close cell == number of bombs, then "you win"
        var bomblength = elems.length;
        var angbilin = document.querySelectorAll('horizontal[data-revealed=false]').length;
            if(bomblength == angbilin && gameover == false){
                ask = window.confirm("Congratulations, You Win, New Game?");
            }

            if (ask) {
                this.$parent.changeLvl(this.level);
            }else{
                
            }

        },

        //checks if the cell contains a bomb
        getVbombVal: function(idn){ 
            var mayErr = false;
            try{
                var thecellcont = document.querySelector("[idprop='"+idn+"']");
                var vBombval = thecellcont.getAttribute("bomb");
            }catch(err){
                mayErr = true;
            }
            if(mayErr == false){
            var thecellcont = document.querySelector("[idprop='"+idn+"']");
            var vBombval = thecellcont.getAttribute("bomb");
            return vBombval;
            }

        },

    //if the cell is empty, check the neighboring cell and open it if empty
    getNeighbor: function(hid, vid){
        var el = document.querySelector("[idprop='b_"+hid+"_"+vid+"']");
        var bombVer = el.getAttribute("bomb");
        var selChild = el.childNodes[1];


        for (var i = 1; i <= 8; i++) {
            var dummyHid = parseInt(hid);
            var dummyVid = parseInt(vid);
            if(i == 1){
                dummyHid = parseInt(hid) + 1; //down
            }else if (i == 2) {
                dummyHid = parseInt(hid) - 1; //up
            }else if (i == 3) {
                dummyVid = parseInt(vid) - 1; //left
            }else if (i == 4) {
                dummyVid = parseInt(vid) + 1; // right
            }else if (i == 5) {
                dummyVid = parseInt(vid) - 1; //upleft
                dummyHid = parseInt(hid) - 1;
            }else if (i == 6) {
                dummyVid = parseInt(vid) + 1; 
                dummyHid = parseInt(hid) + 1; //downright
            }else if (i == 7) {
                dummyVid = parseInt(vid) - 1; 
                dummyHid = parseInt(hid) + 1; //downleft
            }else if (i == 8) {
                dummyVid = parseInt(vid) + 1; 
                dummyHid = parseInt(hid) - 1; //upright
            };
            var myErr = false;

            if (bombVer == "noBomb") {
                el.setAttribute("src", "images/open0.gif");
                el.parentElement.setAttribute("data-revealed", "true");
                try{
                    var dEl = document.querySelector("[idprop='b_"+dummyHid+"_"+dummyVid+"']");
                    var val = dEl.getAttribute("bomb");
                    var delChild = el.childNodes[1];
                }catch(err){
                    myErr = true;
                }
                if(myErr==false){
                var dEl = document.querySelector("[idprop='b_"+dummyHid+"_"+dummyVid+"']");
                var val = dEl.getAttribute("bomb");
                    if (dEl.getAttribute("src") == 'images/shadow0.gif') {
                        var theval=val.replace(/^\D+/g, "");
                        theval = parseInt(theval);
                        if(val != "hasBomb"){
                            dEl.setAttribute("src", "images/"+this.getpic(theval));
                            dEl.parentElement.setAttribute("data-revealed", "true");
                            //alert(val)
                            if (val == "noBomb") {
                                this.getNeighbor(dummyHid, dummyVid);
                            };
                        }
                    }
                }
            };    
        };
    },
        getpic: function(val){
            if(val == '0') { return "open0.gif" }
            if(val == '1') { return "open1.gif" }
            else if(val == '2') { return "open2.gif" }
            else if(val == '3') { return "open3.gif" }
            else if(val == '4') { return "open4.gif" }
            else if(val == '5') { return "open5.gif" }
            else if(val == '6') { return "open6.gif" }
            else if(val == '7') { return "open7.gif" }
            else if(val == '8') { return "open8.gif" }
            //else if(val == '9') { return "bombrevealed.gif" }
            else{ return "open0.gif"; }
        },
	}
}