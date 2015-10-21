/* globals Vue, require */
"use strict";
const vm = new Vue({
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
    }, ],
  },

  directives: {
    bomb: function() {

    },

    bombval: function() {

    },
  },

  components: {
    //calls the component thecell.js
    "cell": require("./thecell")
  },

  methods: {



    changeLvl: function(lvlval) {
      /*  changes the height and width of the board (dropdown)
    level - width
    horizontal - height
    */
      const overall = vm.$el.querySelectorAll("img[id^='b_']");
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
        vm.$el.querySelector("[idprop='" + overall[i].id + "']")
          .parentElement.style.pointerEvents = "auto";
        const overallId = overall[i].id;
        const overall2 = vm.$el.querySelector("#" + overallId);
        
        overall2.setAttribute("src", "images/shadow0.gif");
        overall2.setAttribute("data-revealed", "false");
      }

    },

    customValues: function() {
      this.level = parseInt(this.lvlSelect);
      this.horizontal = parseInt(this.horizontalSelect);
      this.bombnum = parseInt(this.bombSelect);
      this.levelSelect = 8;
    },

  },

  ready: function() {

  }
});