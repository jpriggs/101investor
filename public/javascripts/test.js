window.onload = function () {

    //Set initial attributes and values to element
    var textToColorize = 'Street';
    setInitialLetterColor(textToColorize);

    //Get child node
    var children = document.getElementById('street').childNodes;
    var node = children[0];

    //Store child node's original color
    var originalColor = node.style.color;

    //Randomize the time between flickers
    var flickerTimeMin = 50;
    var flickerTimeMax = 200;

    //Randomize number of times flicker happens
    var flickerAmtMin = 1;
    var flickerAmtMax = 7;

    //Start global interval for flickering event
    var globalTimeMin = 300;
    var globalTimeMax = 10000;
    var startGlobalInterval = function () {

        var intervalTiming = getRandomNumber(globalTimeMin, globalTimeMax);
        var outerCounter = 0;

        var timer = setInterval(function () {
            
            //Allow one global interval to pass before executing flickering
            if (outerCounter > 0) {
                var innerCounter = 0;
                var flickerAmount = getRandomNumber(flickerAmtMin, flickerAmtMax);
                var flickerTimer = getRandomNumber(flickerTimeMin, flickerTimeMax);

                //Start flickering timer
                var innerTimer = setInterval(function () {

                    //Get new random color if current color state is gray on new set interval
                    if (node.style.color == 'rgb(128, 128, 128)' && innerCounter === 0) {
                        originalColor = getRandomColor();
                    }

                    //Call flickering effect
                    flickerText(node, originalColor);

                    //Increment and check if all flickers have gone off
                    innerCounter++
                    if (innerCounter === flickerAmount) {
                        clearInterval(innerTimer);
                    }
                }, flickerTimer);
               
            }
            
            outerCounter++;
            //End current global event timer to reset and call again
            if (outerCounter == 2) {
                clearInterval(timer);
                startGlobalInterval();
            }
        }, intervalTiming);

    }
    startGlobalInterval();
}

//Creates and appends a "P" element with a stylized color and shadow
function setInitialLetterColor(word) {

    var textColor = getRandomColor();

    //Create node
    var node = document.createElement('P');
    node.style.color = textColor;
    node.style.textShadow = `3px 3px 3px #191919, 5px 5px 30px ${textColor}`;
    node.textContent = word;
    document.getElementById('street').appendChild(node);
}

//Toggles the color of neon effect on "Street" word
function flickerText(element, color) {

    if (element.style.color === 'rgb(128, 128, 128)') {
        element.style.color = color;
        element.style.textShadow = `3px 3px 3px #191919, 5px 5px 30px ${color}`;
    }
    else {
        element.style.color = 'rgb(128, 128, 128)';
        element.style.textShadow = '3px 3px 3px #191919';
    }
    
}

//Random number generator
function getRandomNumber(min, max) {
    var numMin = min;
    var numMax = max;
    var result = 0;

    //Check that max is larger than min or return zero
    if (numMax > numMin) {
        result = Math.floor(Math.random() * (numMax - numMin)) + numMin;
    }
    return result;
}

//Get random color
function getRandomColor() {
    //Blue, Red, Green, Orange, Purple, Yellow
    var hexColors = ['rgb(0,30,255)', 'rgb(255,53,94)', 'rgb(116,238,21)', 'rgb(255,204,51)', 'rgb(76,0,76)', 'rgb(255,231,0)'];
    var randIndex = Math.floor(Math.random() * hexColors.length);

    return hexColors[randIndex];
}

