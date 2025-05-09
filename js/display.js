class display {
    constructor() {
        this.displayElement = document.getElementById("display")
        this.historyElement = document.getElementById("history-display")
        this.currentValue = 0
        this.history = ""
    }

    updateDisplay(value = this.currentValue) {
        this.currentValue = value
        this.displayElement.textContent = value
    }

    updateHistory(value = this.history) {
        this.currentValue = value
        this.historyElement.textContent = value
    }

    clear() {
        this.updateDisplay("0")
        this.updateHistory("")
    }

    appendDigit(digit) {
        if (this.currentValue === "0" && digit !== "."){
            this.updateDisplay(digit)
        }

        else if (digit === "." && this.currentValue.includes(".")) {
            return
        }

        else {
            this.updateDisplay(this.currentValue + digit)
        }
    }

    removeLastDigit() {
        if (this.currentValue.length === 1) {
            this.updateDisplay("0")
        } else {
            this.updateDisplay(this.currentValue.slice(0, -1))
        }
    }
}  