/**
 * Gerenciamento do display da calculadora
 */

class Display {
  constructor() {
    this.displayElement = document.getElementById("display")
    this.historyElement = document.getElementById("history-display")
    this.currentValue = "0"
    this.history = ""
  }

  // Atualiza o display principal
  updateDisplay(value = this.currentValue) {
    this.currentValue = value
    this.displayElement.textContent = value
  }

  // Atualiza o histórico
  updateHistory(value = this.history) {
    this.history = value
    this.historyElement.textContent = value
  }

  // Limpa o display e o histórico
  clear() {
    this.updateDisplay("0")
    this.updateHistory("")
  }

  // Adiciona um dígito ao display
  appendDigit(digit) {
    // Se o valor atual for '0', substitua-o pelo dígito (exceto para o ponto decimal)
    if (this.currentValue === "0" && digit !== ".") {
      this.updateDisplay(digit)
    }
    // Se já houver um ponto decimal, não adicione outro
    else if (digit === "." && this.currentValue.includes(".")) {
      return
    }
    // Caso contrário, adicione o dígito ao valor atual
    else {
      this.updateDisplay(this.currentValue + digit)
    }
  }

  // Remove o último dígito do display
  removeLastDigit() {
    if (this.currentValue.length === 1) {
      this.updateDisplay("0")
    } else {
      this.updateDisplay(this.currentValue.slice(0, -1))
    }
  }
}
