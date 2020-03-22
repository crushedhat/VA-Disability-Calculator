const arr = []

function createDiv(clicked_id){
    let divContainer = document.getElementById("ratings")
    var divElement = document.createElement("div")
    divElement.setAttribute("class", "percentage-entry")
    divElement.setAttribute("id", clicked_id + "-entry")
    
    if (document.getElementById("bilateral").checked) {
        divElement.innerText = clicked_id + "%" + " Bilateral Condition"
        var bilateralRating = calculateBilateral(clicked_id)
        divContainer.appendChild(divElement)
        calculatePercentage(bilateralRating)
    } else {
        divElement.innerText = clicked_id + "%"
        divContainer.appendChild(divElement)
        calculatePercentage(clicked_id)
    }
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
    
    combinedRating = arr[0]+(100-arr[0])*(arr[1]/100)
    
    for(let i = 2; i < arr.length; i++) {
        totalRating = combinedRating+(100-combinedRating)*(arr[i]/100)
        combinedRating = Math.round(totalRating)
    }
    //starting values of text boxes need to be 0% initialize in creatediv
    //need to catch if there is only one disability percentage click and output into textbox
    document.getElementById("cdisability").value = Math.round(combinedRating)
    document.getElementById("fdisability").value = Math.round(combinedRating/10) * 10
}