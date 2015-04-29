var player = document.querySelector(".player")
var baseShape = document.querySelector("#mainShape")
var baseClasses = baseShape.classList
var shape = null
var rotater = 32
var scaler = .25
var shapeNum = 36
var originX = 0
var originY = 0

var getShapes = function() {

}

// Basic Add Transformation Function

var addTransform = function(baseRotation, baseScale, originX, originY) {
  var getShapes = document.querySelectorAll(".shape")
  player.classList.add("transformed")

  for (var i = 0; i < getShapes.length; i++) {
    var rotationAmt = i * baseRotation
    var thisShape = getShapes[i]

    var currStyle = getComputedStyle(thisShape).getPropertyValue('transform')
    var newStyle = "rotate(" + (i * baseRotation) + "deg) translate(-50%, -50%)"
    var newSize = ((baseScale * i) + 10) + "vh"

    console.log(getShapes.length, i)
    var opacity = (getShapes.length - i) / getShapes.length + .25

    thisShape.style.transform = newStyle
    thisShape.style.webkitTransform = newStyle
    thisShape.style.width = newSize
    thisShape.style.height = newSize
    thisShape.style.opacity = opacity
    thisShape.style.transformOrigin = (originX + "%") + " " + (originY + "%") + " 0px"
  }
}

// Reset to Zero

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

// Button press Function

var makeButton = function(el, f) {
  el.addEventListener('click', f, false)
  el.addEventListener('touchend', f, false)
}

// Start & Stop

var startUp = function() {

  if(player.classList.contains("transformed"))
    resetTransform()
  else
    addTransform(rotater, scaler)
}

makeButton(player, startUp)

// player.addEventListener('click', startUp, false)
// player.addEventListener('touchend', startUp, false)


var cloneShapes = function(shapeNum) {
  var currShapes = player.children.length
  var needMoreShapes = shapeNum + 1 > currShapes
  var noShapes = currShapes === 1

  if(noShapes) {
    for(var i = 0; i < shapeNum; i++) {
      var cln = baseShape.cloneNode(true)
      player.appendChild(cln)

      cln.removeAttribute("id")
      cln.className = cln.className + " clone-" + i
    }

    startUp()
  }

  else if(needMoreShapes) {
    for (var i = currShapes - 1; i < shapeNum; i++) {
      var cln = baseShape.cloneNode(true)
      player.appendChild(cln)

      cln.removeAttribute("id")
      cln.className = cln.className + " clone-" + i
    }

    addTransform(rotater, scaler)
  }

  else {
    console.log('removing shape ' + shapeNum)
    player.removeChild(player.childNodes[shapeNum + 3])
  }
}

// Initialize

cloneShapes(shapeNum)


// Add/Remove Rotation

var rotationUp = document.querySelector("#rotation-up")
var rotationDown = document.querySelector("#rotation-down")

var addRotation = function(e) {
  e.preventDefault()

  console.log('adding rotation')
  rotater = rotater + 1

  addTransform(rotater, scaler)
}

var removeRotation = function(e) {
  e.preventDefault()

  console.log('adding rotation')
  rotater = rotater - 1

  addTransform(rotater, scaler)
}

makeButton(rotationUp, addRotation)
makeButton(rotationDown, removeRotation)

// Add/Remove Scale

var scaleUp = document.querySelector("#scale-up")
var scaleDown = document.querySelector("#scale-down")

var addScale = function(e) {
  e.preventDefault()

  scaler = scaler + .25

  addTransform(rotater, scaler)
}

var removeScale = function(e) {
  e.preventDefault()

  scaler = scaler - .25

  addTransform(rotater, scaler)
}

makeButton(scaleUp, addScale)
makeButton(scaleDown, removeScale)

// Add/Remove Elements

var shapesUp = document.querySelector("#shapes-up")
var shapesDown = document.querySelector("#shapes-down")


var addShapes = function(e) {
  e.preventDefault()

  shapeNum = shapeNum + 1

  cloneShapes(shapeNum)
}

var removeShapes = function(e) {
  e.preventDefault()

  shapeNum = shapeNum - 1

  cloneShapes(shapeNum)
}

makeButton(shapesUp, addShapes)
makeButton(shapesDown, removeShapes)

// Change Transform Origin

var transformXup = document.querySelector("#originX-up")
var transformYup = document.querySelector("#originY-up")

var increaseOriginX = function(e) {
  e.preventDefault()

  originX = originX + 10

  addTransform(rotater, scaler, originX, originY)
}

var increaseOriginY = function(e) {
  e.preventDefault()

  originY = originY + 10

  addTransform(rotater, scaler, originX, originY)
}

makeButton(transformXup, increaseOriginX)
makeButton(transformYup, increaseOriginY)