var arr = []

function removePercentage(elem){
    let parentID = elem.parentNode.id
    document.getElementById(parentID).remove()
    recalculate()
}

function recalculate() {
    let percentage;
    arr = []
    document.getElementById("cdisability").value = "0%"
    document.getElementById("fdisability").value = "0%"
    document.querySelectorAll(".percentage-entry").forEach(function(element) {
        percentage = element.getAttribute('id');
        let str = percentage.substring(0,2);
        calculatePercentage(str)
    });
}

function createDiv(clicked_id){
    let finalRating
    let divContainer = document.getElementById("ratings")
    var divElement = document.createElement("div")
    let exitButton = document.createElement("button")
    divElement.setAttribute("class", "percentage-entry")
    divElement.setAttribute("id", clicked_id + "-entry")
    exitButton.setAttribute("id", "exit")
    exitButton.setAttribute("onclick", "removePercentage(this)")
    
    if (document.getElementById("bilateral").checked) {
        divElement.innerText = clicked_id + "%"
        divContainer.appendChild(divElement)
        divElement.appendChild(exitButton)
        finalRating = calculateBilateral(clicked_id)
    } else {
        divElement.innerText = clicked_id + "%"
        divContainer.appendChild(divElement)
        divElement.appendChild(exitButton)
        finalRating = clicked_id
    }
    calculatePercentage(finalRating)
}

function calculateBilateral(rating){
    let x = parseInt(rating) / 10;
    let y = parseInt(rating) + x;
    return y;
}

function calculatePercentage(rating) {
    let combinedRating
    let totalRating
    arr.push(parseInt(rating))
    arr.sort(function(first, last){
        return last-first
    });
    //not erroring out at first if
    if(arr == 0) {
        console.error("here")
    } else if (arr.length == 1) {
        combinedRating = arr[0]
        document.getElementById("cdisability").value = Math.round(combinedRating) + "%"
        document.getElementById("fdisability").value = Math.round(combinedRating) + "%"
    } else {
        combinedRating = arr[0]+(100-arr[0])*(arr[1]/100)
    
        for(let i = 2; i < arr.length; i++) {
            totalRating = combinedRating+(100-combinedRating)*(arr[i]/100)
            combinedRating = Math.round(totalRating)
        }
        document.getElementById("cdisability").value = Math.round(combinedRating) + "%"
        document.getElementById("fdisability").value = Math.round(combinedRating/10) * 10 + "%"
    }
}