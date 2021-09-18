let arrayOfCards = [];

const saveCard = (e) => {
  e.preventDefault();
  let name = document.forms["myForm"]["txt_name"];
  let lastname = document.forms["myForm"]["txt_lastname"];
  if (name.value === "" || lastname.value === "") {
    return false;
  }
  arrayOfCards.push({
    name: name.value,
    lastname: lastname.value,
  });
  buildCard();
};

const buildCard = () => {
  var index = arrayOfCards.length;
  const item = arrayOfCards[index - 1];
  let yard = document.getElementById("yardOfCards");
  let cardTemp = document.getElementsByTagName("template")[0];
  var templateFragment = document.importNode(cardTemp.content, true);
  var cardClon = templateFragment.querySelector("div");

  cardClon.id = "card_" + index;
  cardClon.style.left = index * 10 + "rem";
  cardClon.getElementsByClassName("div__header")[0].id =
    "card_" + index + "_header";
  cardClon.getElementsByClassName("name")[0].innerHTML = item.name;
  cardClon.getElementsByClassName("lastname")[0].innerHTML = item.lastname;

  yard.appendChild(cardClon);
  dragElement(document.getElementById(cardClon.id));
};

const dragElement = (elmnt) => {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var header = document.getElementById(elmnt.id + "_header");
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  const elementDrag = (e) => {
    e = e || window.event;

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  };
  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };
};

var form = document.getElementById("myForm");
form.addEventListener("submit", saveCard, true);
