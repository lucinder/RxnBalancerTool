let reactants = [];
let products = [];
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
let nodeCount = 0;

function getXY(text){
   console.log("DEBUG: Node Text = " + text);
   let x = -1; let y = -1;
   for(let i = 0; i < ptable.length; i++){
       console.log("Current i: " + i);
       if(ptable[i].indexOf(text) != -1){
         y = i; x = ptable[y].indexOf(text);
         console.log("DEBUG: Node position in table = " + y + ", " + x);
         break;
       }
   }
   return [x+1,y+1];
}

function addElement(x, y) {
  console.log("DEBUG: Node position per function call = " + (y-1) + ", " + (x-1));
  let rct = document.getElementsByClassName('reactants');
  let prd = document.getElementsByClassName('products');
  let text = "";
  if(x > 0 && y > 0){
    text = ptable[y-1][x-1];
  }
  // custom behavior for lanthanides and actinides
  if(y > 7){
    x = 3;
    y -= 2;
  }
  let color = colors[(x+y)-2];
  console.log("DEBUG: color = " + color);
  let size = 15 + (x+(y-1)*18);
  let fontsize = 10 + (x + y)/2;
  /**
  let testText = "Reactant Container Found: "+ (rct.length > 0)+ ". Product Container Found: " + (prd.length > 0) + "\nNode size: " + size + ". Node color: " + color + ". Node text: " + text + ". Node font size: " + fontsize;
  let test = document.getElementById('testtext');
  test.innerHTML = testText;
  **/
  // let nodeHTML = "<div class=\"node\" id=\"node\" style=\"background-color:" + color + "; width:" + size + "px; height:" + size + "px; font-size:" + fontsize + "px;\">" + text + "</div>";
  var node = document.createElement("div");
  node.className = 'node';
  node.id = 'node' + nodeCount;
  console.log("DEBUG: Node Id is " + node.id);
  node.style.backgroundColor = color;
  node.style.width = size + 'px';
  node.style.height = size + 'px';
  node.style.fontSize = fontsize + 'px';
  node.innerHTML = text;
  var node2 = document.createElement("div");
  node2.className = 'node';
  node2.id = 'node' + nodeCount;
  console.log("DEBUG: Node Id is " + node2.id);
  node2.style.backgroundColor = color;
  node2.style.width = size + 'px';
  node2.style.height = size + 'px';
  node2.style.fontSize = fontsize + 'px';
  node2.innerHTML = text;
  rct[0].appendChild(node);
  prd[0].appendChild(node2);
  /**
  var allNodes = document.getElementsByClassName('node');
  for(let i = 0; i < allNodes.length; i++){
    dragElement(allNodes[i]);
  }
  **/
  nodeCount++;
  // let reactants = document.getElementById('reactants');
  // let products = document.getElementById('products');
  $(".node").draggable({ // reload drag-drop capabilities for new nodes
    containment: 'parent'
  });
  $(".node").droppable();
  reactants.push(node);
  products.push(node2);
  return [node, node2];
}

function clearElements(){
  console.log("DEBUG: Clear called");
  let rct = document.getElementById('reactants');
  let prd = document.getElementById('products');
  rct.innerHTML = "<!-- Reactant nodes go here! -->";
  prd.innerHTML = "<!-- Product nodes go here! -->";
  console.log("New inner html: " + rct.innerHTML);
  while(!reactants.length == 0){
    let cur = reactants.pop();
    cur.parentNode.removeChild(cur);
    cur = products.pop();
    cur.parentNode.removeChild(cur);
  }
  nodeCount = 0;
}

function doubleElements(){
  // var allReactants= Array.prototype.slice.call(document.getElementById('reactants').querySelectorAll("*")); // get all nodes under the reactant box
  // var allProducts= Array.prototype.slice.call(document.getElementById('products').querySelectorAll("*")); // get all nodes under the product box
  const len = reactants.length;
  for(let i = 0; i < len; i++){
    // console.log("Selected node text: " + reactants[i].innerHTML);
    let newEl = getXY(reactants[i].innerHTML);
    let newNodes = addElement(newEl[0], newEl[1]);
    newNodes[0].style.left += 10;
    newNodes[0].style.top += 10;
    newNodes[1].style.left += 10;
    newNodes[1].style.top += 10;
  }
}
