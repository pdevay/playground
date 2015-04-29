var player = document.querySelector(".player")
var base = document.querySelector("#mainShape")
var baseClasses = base.classList
var shape = null

var getShapes = function() {

}

var cloneShapes = function(num) {
  for(var i = 0; i < num; i++) {
    var cln = base.cloneNode(true)
    player.appendChild(cln)

    cln.removeAttribute("id")
    cln.className = cln.className + " clone-" + i
  }
}

var addTransform = function(baseRotation, baseScale) {
  var getShapes = document.querySelectorAll(".shape")

  player.classList.add("transformed")

  for (var i = 0; i < getShapes.length; i++) {
    var rotationAmt = i * baseRotation
    var thisShape = getShapes[i]

    var currStyle = getComputedStyle(thisShape).getPropertyValue('transform')
    var newStyle = "rotate(" + (i * baseRotation) + "deg) translate(-50%, -50%)"
    var newSize = ((baseScale) + 10) + "vh"

    console.log(thisShape.style)

    thisShape.style.transform = newStyle
    thisShape.style.webkitTransform = newStyle
    thisShape.style.width = newSize
    thisShape.style.height = newSize
  }
}

var resetTransform = function() {
  var getShapes = document.querySelectorAll(".shape")

  player.classList.remove("transformed")

  for (var i = 0; i < getShapes.length; i++) {
    var thisShape = getShapes[i]

    thisShape.style.transform = null
    thisShape.style.webkitTransform = null
    thisShape.style.width = null
    thisShape.style.height = null
  }
}

var startUp = function(event) {

  event.preventDefault()

  if(player.classList.contains("transformed"))
    resetTransform()
  else
    addTransform(12, 3)
}

player.addEventListener('click', startUp, false);
player.addEventListener('touchend', startUp, false);

getShapes()
cloneShapes(30)
addTransform(12, 3)