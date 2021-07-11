const $lis = document.querySelectorAll(".button")

$lis.forEach((node) => {
    node.addEventListener('mousedown', function(event) {
        const value = node.innerText.trim()
        const $result = document.querySelector(".viewer")
        const resultText = $result.innerText.trim()

        if(resultText == "0" || resultText == "undefined" || resultText == "Infinity") {
            $result.innerText = ""
        }

        if(value == "=") {
            let solution = eval(resultText)
            $result.innerText = solution
            return true
        }

        if(value == 'C') {
            $result.innerText = "0"
            return true
        }

        $result.append(value)
    })
})