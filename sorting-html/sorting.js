let img1 = "<img src='assets/blue.jpg'/ height='150'>";
let img2 = "<img src='assets/cyan.jpg'/ height='150'>";
let img3 = "<img src='assets/green.jpg'/ height='150'>";
let img4 = "<img src='assets/yellow.jpg'/ height='150'>";
let img5 = "<img src='assets/red.jpg'/ height='150'>";
let img6 = "<img src='assets/magenta.jpg'/ height='150'>";


// initial display; a button always contains the same image, determined by initial order
let initialOrder = [img1,img2,img3,img4,img5,img6];
// true order
let trueOrder = [img2,img1,img3,img4,img5,img6];
// evaluate how effective this sorting is
const score = function (timesSwitched) {
    return timesSwitched
}

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
