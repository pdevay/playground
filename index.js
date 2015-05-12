var player = document.querySelector(".player")
var baseShape = document.querySelector("#mainShape")
var baseClasses = baseShape.classList
var shape = null
var rotater = 7
var scaler = 1
var cloneNum = 36
var originX = 0
var originY = 0
var gradientMultiplier = 2
var allShapes = document.querySelectorAll("div[class*='shape'], div[class*=' shape']")

// Basic Add Transformation Function

var addTransform = function(rotater, scaler, originX, originY) {
  var getShapes = document.querySelectorAll(".shape")
  player.classList.add("transformed")

  for (var i = 0; i < getShapes.length; i++) {
    var rotationAmt = i * rotater
    var thisShape = getShapes[i]

    var currStyle = getComputedStyle(thisShape).getPropertyValue('transform')
    var newStyle = "rotate(" + (i * rotater) + "deg) translate(-50%, -50%)"
    var newSize = (Math.pow(scaler / 10, i / 5) + 5) + "vh"

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

  if(player.classList.contains("transformed")) {
    resetTransform()
  }
  else {
    addTransform(rotater, scaler)
  }
}

player.addEventListener('click', startUp, false)
player.addEventListener('touchend', startUp, false)

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var cloneShapes = function(cloneNum) {
  var clones = document.querySelectorAll("div[class*='clone'], div[class*=' clone']")

  var currClones = clones.length
  var needMoreShapes = cloneNum > currClones
  var noShapes = currClones === 0

  if(noShapes) {
    for(var i = 0; i < cloneNum; i++) {
      var cln = baseShape.cloneNode(true)
      player.appendChild(cln)

      cln.removeAttribute("id")
      cln.className = cln.className + " clone-" + i
    }

    startUp()
  }

  else if(needMoreShapes) {
    for (var i = currClones; i < cloneNum; i++) {
      var cln = baseShape.cloneNode(true)
      player.appendChild(cln)

      cln.removeAttribute("id")
      cln.className = cln.className + " clone-" + i
    }

    addTransform(rotater, scaler)
  }

  else if(currClones > cloneNum) {
    for(var i = currClones - 1; i >= cloneNum; i--) {
      clones[i].remove()
    }
    addTransform(rotater, scaler)
  }

  else return

  allShapes = document.querySelectorAll("div[class*='shape'], div[class*=' shape']")
}

// Initialize
cloneShapes(cloneNum)

// Get Value of Sliders

var allSliders = document.querySelectorAll("input[type='range']")
var allLabels = document.querySelectorAll(".sliderValue")

var swapValues = function(slider, label) {
  label.innerHTML = slider.value

  var sliderID = slider.getAttribute("id").replace("slider-", "")

  switch (sliderID) {
    case "shapes":
      cloneNum = parseInt(slider.value)
      cloneShapes(cloneNum)
      break
    case "rotation":
      rotater = parseInt(slider.value)
      addTransform(rotater, scaler, originX, originY)
      break
    case "scale":
      scaler = parseInt(slider.value)
      addTransform(rotater, scaler, originX, originY)
      break
    case "originX":
      originX = parseInt(slider.value)
      addTransform(rotater, scaler, originX, originY)
      break
    case "originY":
      originY = parseInt(slider.value)
      addTransform(rotater, scaler, originX, originY)
      break
    case "animate":
      console.log('toggle')
      player.classList.toggle('rotating')
      if(slider.value == 1)
        label.innerHTML = "On"
      else
        label.innerHTML = "Off"
      break
  }
}

var setSliders = function(slider, label) {

  var sliderID = slider.getAttribute("id").replace("slider-", "")

  switch (sliderID) {
    case "shapes":
      slider.value = cloneNum
      break
    case "rotation":
      slider.value = rotater
      break
    case "scale":
      slider.value = scaler
      break
    case "originX":
      slider.value = originX
      break
    case "originY":
      slider.value = originY
      break
    case "animate":
      if(slider.value == 1)
        label.innerHTML = "On"
      else
        label.innerHTML = "Off"
      break
  }
}

var getSliderValue = function(slider, label) {
  if(slider.classList.contains('switch')) {
    if(slider.value == 1)
        label.innerHTML = "On"
    else
      label.innerHTML = "Off"
  }
  else {
    label.innerHTML = slider.value
  }

  slider.addEventListener("input", function() {
    swapValues(slider, label)
  })
}

for(var i = 0; i < allSliders.length; i++) {

  var slider = allSliders[i]
  var label = allLabels[i]

  setSliders(slider, label)
  getSliderValue(slider, label)
}

// Change Shapes

var shapeSwitches = document.querySelectorAll('.shapeSwitch')

var shapeSwitch = function(switchID, shapeToChange) {
  switch (switchID) {
    case "square":
      shapeToChange.classList.remove("circle", "triangle", "hexagon")
      shapeToChange.classList.add("square")
      break
    case "circle":
      shapeToChange.classList.remove("square", "triangle", "hexagon")
      shapeToChange.classList.add("circle")
      break
    case "triangle":
      shapeToChange.classList.remove("circle", "square", "hexagon")
      shapeToChange.classList.add("triangle")
      break
    case "hexagon":
      shapeToChange.classList.remove("circle", "triangle", "square")
      shapeToChange.classList.add("hexagon")
      break
  }
}

var changeShapes = function(switchID) {

  shapeSwitch(switchID, baseShape)

  for(var i = 0; i < allShapes.length; i++) {
    shapeSwitch(switchID, allShapes[i])
  }
}

var addSwitches = function(shapeSwitch) {
  var switchID = shapeSwitch.getAttribute("id").replace("Switch", "")

  shapeSwitch.addEventListener("click", function() {
    changeShapes(switchID)
  })
}

for(var i = 0; i < shapeSwitches.length; i++) {
  addSwitches(shapeSwitches[i])
}
