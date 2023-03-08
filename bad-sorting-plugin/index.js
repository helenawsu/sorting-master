import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";

var sorting_plugin = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "sorting-task",
      parameters: {
        // a list of images in their initial display order
        initialOrder: {
          type: jspsych.ParameterType.LIST,
          default: undefined,
        },
        // a list of images their true order
        trueOrder: {
          type: jspsych.ParameterType.LIST,
          default: undefined,
        },
        scoreFunction: {
        // evaluate the performance based on number of switches attempted
            type: jspsych.ParameterType.FUNCTION,
            default: (value) => value, 
        },
      },
    };
  
    /**
     * **PLUGIN-NAME**
     *
     * SHORT PLUGIN DESCRIPTION
     *
     * @author YOUR NAME
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class SortingPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
        var html = '<h1 class="center">Sorting</h1>' + 
        '<div class="sixButtons center">'+
            '<button class="b" id="b0" onClick="select(this.id)">img</button>' + 
            '<button class="b" id="b1" onClick="select(this.id)">img</button>' + 
            '<button class="b" id="b2" onClick="select(this.id)">img</button>' + 
            '<button class="b" id="b3" onClick="select(this.id)">img</button>' + 
            '<button class="b" id="b4" onClick="select(this.id)">img</button>' + 
            '<button class="b" id="b5" onClick="select(this.id)">img</button>' + 
        '</div>' + 
        
        '<br>' +
        
        '<div class="center">' + 
            '<button onClick="finish()">Finish</button>' + 
        '</div>' + 
        
        '<div class="center" id="finish"></div>' 
        display_element.innerHTML = html;


// initial display; a button always contains the same image, determined by initial order
let initialOrder = trial.initialOrder;
// true order
let trueOrder =  trial.trueOrder;
// evaluate how effective this sorting is
const score = trial.scoreFunction;

let buttonsSelected = [];
let N = initialOrder.length;
let timesSwitched = 0;
let switchAttempted = false;
let buttons = document.getElementsByClassName("b");
window.onload = init();
function init() {
    for (let i = 0; i < buttons.length; i++) {
            let id = "b" + i.toString();
            let curB = document.getElementById(id);
            curB.style.order = i;
            curB.innerHTML = initialOrder[i];
        }
}

function select(id) {
    let b = document.getElementById(id);
    buttonsSelected.push(b);
    b.style.border = "thick solid black";
    if (buttonsSelected.length == 2) {
        reOrder();
    }
}

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
        ba.style.order = buttonsSelected[1].style.order;
        bb.style.order = temp;
    }
    timesSwitched++;
}

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

function getImg(button) {
    return initialOrder[button.id.slice(-1)];
}

function finish() {
    const para = document.createElement("p");
    const lb = document.createElement("br");
    const revealOrder = document.createElement("p");
    const node = document.createTextNode("You finish with a score of "+ score(timesSwitched).toString() + "!");
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
}

        // end trial
        this.jsPsych.finishTrial(score(times));
      }
    }
    sorting_plugin.info = info;
  
    return sorting_plugin;
  })(jsPsychModule);