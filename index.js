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
    var newSize = ((baseScale * i) + 10) + "vh"

    thisShape.style.transform = newStyle.toString()
    thisShape.style.width = newSize.toString()
    thisShape.style.height = newSize.toString()
  }
}

var resetTransform = function() {
  var getShapes = document.querySelectorAll(".shape")

  player.classList.remove("transformed")

  for (var i = 0; i < getShapes.length; i++) {
    var thisShape = getShapes[i]

    thisShape.style.transform = null
    thisShape.style.width = null
    thisShape.style.height = null
  }
}

player.onclick = function() {

  if(player.classList.contains("transformed"))
    resetTransform()
  else
    addTransform(12, 0)
}

getShapes()
cloneShapes(30)