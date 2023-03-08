var jsPsychSortingTask = (function (jspsych) {
  "use strict";

  const info = {
    name: "SORTING-TASK",
    parameters: {
      initial_ordering: {
        type: jspsych.ParameterType.ARRAY,
        default: [
          'assets/blue.jpg',
          'assets/cyan.jpg',
          'assets/green.jpg',
          'assets/yellow.jpg',
          'assets/red.jpg',
          'assets/magenta.jpg'
          ],
      },
      image_ranks: {
        type: jspsych.ParameterType.ARRAY,
        default: [0,1,2,3,4,5],
      },
      score_function: {
        type: jspsych.ParameterType.FUNCTION,
        default: function (n) {
          return n
        }
      },
    },
  };

  class jsPsychSortingTask {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    trial(display_element, trial) {

      // display the target word
      // and two buttons
      var html_content = `
          <h1 class="center">Sorting</h1>
          <div class="sixButtons center">
              <button class="b" id="b0">img</button>
              <button class="b" id="b1">img</button>
              <button class="b" id="b2">img</button>
              <button class="b" id="b3">img</button>
              <button class="b" id="b4">img</button>
              <button class="b" id="b5">img</button>
          </div>

          <br>

          <div class="center">
              <button id="f">Finish</button>
          </div>

          <div class="center" id="finish"></div>
      `
      display_element.innerHTML = html_content;

      let img1 = `<img src='${trial.initial_ordering[0]}'/ height='150'>`;
      let img2 = `<img src='${trial.initial_ordering[1]}'/ height='150'>`;
      let img3 = `<img src='${trial.initial_ordering[2]}'/ height='150'>`;
      let img4 = `<img src='${trial.initial_ordering[3]}'/ height='150'>`;
      let img5 = `<img src='${trial.initial_ordering[4]}'/ height='150'>`;
      let img6 = `<img src='${trial.initial_ordering[5]}'/ height='150'>`;

      // initial display; a button always contains the same image, determined by initial order
      let initialOrder = [img1,img2,img3,img4,img5,img6];
      // true order
      let trueOrder = initialOrder.slice().sort((a, b) => trial.image_ranks[initialOrder.indexOf(a)] - trial.image_ranks[initialOrder.indexOf(b)]);


      let buttonsSelected = [];
      let N = initialOrder.length;
      let timesSwitched = 0;
      let buttons = document.getElementsByClassName("b");

      function init() {
          //put the buttons containing images into a HTMLcollection so I can easily access them 
          for (let i = 0; i < buttons.length; i++) {
                  let id = "b" + i.toString();
                  let curB = document.getElementById(id);
                  curB.style.order = i;
                  curB.innerHTML = initialOrder[i];
                  //set each button's onclick to select function
                  curB.onclick = function () {
                    select(curB.id)
                  }
              }
        //set finish button's onclick to finish function
        let finishButton = document.getElementById("f");
        finishButton.onclick = function () {
          finish()
        }
        //set css of the div containing the image buttons to flex display so REORDERING WORKS 
        // (since I reorder buttons by editing button.style.order)
        let sixButtonClass = document.getElementsByClassName("sixButtons")[0];
        sixButtonClass.style.display = "flex";
      }

      //reorder and highlight selected images by adding a thich solid black border
      function select(id) {
          let b = document.getElementById(id);
          buttonsSelected.push(b);
          b.style.border = "thick solid black";
          if (buttonsSelected.length == 2) {
              reOrder();
          }
      }
      //reorder images if satisfy condition
      function reOrder() {
          let ba =  buttonsSelected[0];
          let bb = buttonsSelected[1];
          buttonsSelected = [];
          setTimeout(function() {
              ba.style.border = "none";
              bb.style.border = "none";
          }, 100);
          if (ba.id == bb.id) {
              return
          }
          if (switchOrNot(ba, bb)) {
              let temp = ba.style.order;
              ba.style.order = bb.style.order;
              bb.style.order = temp;
          }
          timesSwitched++;
      }
      //check conditions are met to switch order
      function switchOrNot(ba, bb) {
          if (trueOrder.indexOf(getImg(ba)) > trueOrder.indexOf(getImg(bb))) {
            var bigger = ba;
            var smaller = bb;
          }
          else {
            var bigger = bb;
            var smaller = ba;
          }
          return !(bigger.style.order > smaller.style.order) ;
        }

      function getButton(img) {
          return buttons[initialOrder.indexOf(img)];
      }
      //helper
      function getImg(button) {
          return initialOrder[button.id.slice(-1)];
      }
      //show finish message and reveal correct image ranks
      function finish() {
          const para = document.createElement("p");
          const lb = document.createElement("br");
          const revealOrder = document.createElement("p");
          const node = document.createTextNode("You finish with a score of "+ trial.score_function(timesSwitched).toString() + "!");
          let curOrder = [];
          for (let i = 0; i < N; i++){
              curOrder.push(trueOrder.indexOf(getImg(document.getElementsByClassName("b")[i])));
          }
          const node1 = document.createTextNode(curOrder.toString());
          revealOrder.appendChild(node1);
          para.appendChild(node);
          let div = document.getElementById("finish");
          div.appendChild(revealOrder);
          div.appendChild(lb);
          div.appendChild(para);
          document.getElementById("f").onclick = null;
          this.jsPsych.finishTrial({choice: "button_b2"})
      }
      init()
    }
  }
  jsPsychSortingTask.info = info;

  return jsPsychSortingTask;
})(jsPsychModule);