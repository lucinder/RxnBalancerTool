const colors = ["#FFA7A7", // 1
  "#FFBEA6", // 2
  "#FFC8A6", // 3
  "#FFD7A6", // 4
  "#FFE6A6", // 5
  "#FFF2A6", // 6
  "#F8FFA6", // 7
  "#ECFFA6", // 8
  "#C8FFA6", // 9
  "#A7FFA6", // 10
  "#A6FFC6", // 11
  "#A6FFD0", // 12
  "#A6FFF0", // 13
  "#A6F6FF", // 14
  "#A6DBFF", // 15
  "#A6BFFF", // 16
  "#B0A6FF", // 17
  "#C6A6FF", // 18
  "#DBA6FF", // 19
  "#EDA6FF", // 20
  "#FFA6FF", // 21
  "#FFA6EF", // 22
  "#FFA6DE", // 23
  "#FFA6C8" // 24
];
const ptable = [
  ["H","","","","","","","","","","","","","","","","","He"],
  ["Li","Be","","","","","","","","","","","B","C","N","O","F","Ne"],
  ["Na","Mg","","","","","","","","","","","Al","Si","P","S","Cl","Ar"],
  ["K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr"],
  ["Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe"],
  ["Cs","Ba","57-71","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn"],
  ["Fr","Ra","89-103","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"],
  ["","","","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu"],
  ["","","","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr"]
];
function addElement(x, y) {
  let rct = document.getElementsByClassName('reactants');
  let prd = document.getElementsByClassName('products');
  let size = 15 + (x+(y-1)*18);
  let fontsize = 10 + (x + y)/2;
  let color = colors[(x+y)-2];
  let text = "";
  if(x > 0 && y > 0){
    text = ptable[y-1][x-1];
  }
  let testText = "Reactant Container Found: "+ (rct.length > 0)+ ". Product Container Found: " + (prd.length > 0) + "\nNode size: " + size + ". Node color: " + color + ". Node text: " + text + ". Node font size: " + fontsize;
  let test = document.getElementById('testtext');
  test.innerHTML = testText;
  let nodeHTML = "<div class=\"node\" id=\"node\" style=\"background-color:" + color + "; width:" + size + "px; height:" + size + "px; font-size:" + fontsize + "px;\">" + text + "</div>";
  var node = document.createElement("div");
  var node2 = document.createElement("div");
  node.innerHTML = nodeHTML;
  node2.innerHTML = nodeHTML;
  rct[0].appendChild(node);
  prd[0].appendChild(node2);
  /**
  var allNodes = document.getElementsByClassName('node');
  for(let i = 0; i < allNodes.length; i++){
    dragElement(allNodes[i]);
  }
  **/
  
  let reactants = document.getElementById('reactants');
  let products = document.getElementById('products');
  //$(".node").draggable();
  $( node ).draggable({
    containment: reactants
  });
  $( node2 ).draggable({
    containment: products
  });
  $(".node").droppable();
}
function clear(){
  let rct = document.getElementById('reactants');
  let prd = document.getElementById('products');
  let rctHTML = "<!-- Reactant nodes go here! -->";
  let prdHTML = "<!-- Reactant nodes go here! -->";
  rct.innerHTML = rctHTML;
  prd.innerHTML = prdHTML;
}
function doubleElements(){
  let rct = document.getElementById('reactants');
  let prd = document.getElementById('products');
  var allReactants= Array.prototype.slice.call(document.getElementById('reactants').querySelectorAll("*")); // get all nodes under the reactant box
  var allProducts= Array.prototype.slice.call(document.getElementById('products').querySelectorAll("*")); // get all nodes under the product box
  let newRctNode = (allReactants[i]).cloneNode(true);
  let newPrdNode = (allReactants[i]).cloneNode(true);
  for(let i = 0; i < allReactants.length; i++){
    rct.appendChild(newRctNode);
  }
  for(let i = 0; i < allProducts.length; i++){
    prd.appendChild(newPrdNode);
  }
}
/**
// ELEMENT DRAGGER for non jquery ui builds
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
**/
