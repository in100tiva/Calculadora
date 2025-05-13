/**
 * Lógica principal da calculadora
 */

import { Display } from "./display.js"
import { getOperatorSymbol } from "./utils.js"
import { formatNumber } from "./utils.js"

class Calculator {
  constructor() {
    this.display = new Display()
    this.currentOperand = "0"
    this.previousOperand = ""
    this.operation = null
    this.shouldResetDisplay = false
    this.lastResult = null

    this.initEventListeners()
  }

  // Inicializa os event listeners
  initEventListeners() {
    // Botões numéricos
    document.querySelectorAll("[data-number]").forEach((button) => {
      button.addEventListener("click", () => {
        this.appendNumber(button.dataset.number)
      })
    })

    // Botões de operação
    document.querySelectorAll("[data-operation]").forEach((button) => {
      button.addEventListener("click", () => {
        this.chooseOperation(button.dataset.operation)
      })
    })

    // Botões de ação
    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action

        switch (action) {
          case "clear":
            this.clear()
            break
          case "calculate":
            this.calculate()
            break
          case "backspace":
            this.backspace()
            break
          case "percent":
            this.percent()
            break
          case "sqrt":
            this.squareRoot()
            break
        }
      })
    })

    // Suporte a teclado
    document.addEventListener("keydown", (event) => {
      this.handleKeyboardInput(event)
    })
  }

  // Adiciona um número ao display
  appendNumber(number) {
    if (this.shouldResetDisplay) {
      this.display.updateDisplay("")
      this.shouldResetDisplay = false
    }
    this.display.appendDigit(number)
    this.currentOperand = this.display.currentValue
  }

  // Escolhe uma operação
  chooseOperation(operation) {
    if (this.currentOperand === "Erro") return

    if (this.operation !== null && !this.shouldResetDisplay) {
      this.calculate()
    }

    this.previousOperand = this.currentOperand
    this.operation = operation
    this.shouldResetDisplay = true

    // Atualiza o histórico
    this.display.updateHistory(`${this.previousOperand} ${getOperatorSymbol(this.operation)}`)
  }

  // Realiza o cálculo
  calculate() {
    if (this.operation === null || this.shouldResetDisplay || this.currentOperand === "Erro") return

    const prev = Number.parseFloat(this.previousOperand)
    const current = Number.parseFloat(this.currentOperand)
    let result

    switch (this.operation) {
      case "+":
        result = prev + current
        break
      case "-":
        result = prev - current
        break
      case "*":
        result = prev * current
        break
      case "/":
        if (current === 0) {
          result = "Erro"
        } else {
          result = prev / current
        }
        break
      default:
        return
    }

    // Atualiza o histórico
    this.display.updateHistory(`${this.previousOperand} ${getOperatorSymbol(this.operation)} ${this.currentOperand} =`)

    // Formata e exibe o resultado
    if (result === "Erro") {
      this.display.updateDisplay("Erro")
    } else {
      this.lastResult = result
      this.display.updateDisplay(formatNumber(result))
    }

    this.currentOperand = this.display.currentValue
    this.operation = null
    this.shouldResetDisplay = true
  }

  // Limpa a calculadora
  clear() {
    this.display.clear()
    this.currentOperand = "0"
    this.previousOperand = ""
    this.operation = null
    this.shouldResetDisplay = false
    this.lastResult = null
  }

  // Remove o último dígito
  backspace() {
    if (this.shouldResetDisplay || this.currentOperand === "Erro") {
      this.clear()
      return
    }

    this.display.removeLastDigit()
    this.currentOperand = this.display.currentValue
  }

  // Calcula a porcentagem
  percent() {
    if (this.currentOperand === "Erro") return

    const current = Number.parseFloat(this.currentOperand)
    let result

    if (this.operation === "+" || this.operation === "-") {
      // Para adição e subtração, calcule a porcentagem do número anterior
      result = Number.parseFloat(this.previousOperand) * (current / 100)
    } else {
      // Para outros casos, apenas divida por 100
      result = current / 100
    }

    this.display.updateDisplay(formatNumber(result))
    this.currentOperand = this.display.currentValue
  }

  // Calcula a raiz quadrada
  squareRoot() {
    if (this.currentOperand === "Erro") return

    const current = Number.parseFloat(this.currentOperand)

    if (current < 0) {
      this.display.updateDisplay("Erro")
    } else {
      const result = Math.sqrt(current)
      this.display.updateDisplay(formatNumber(result))
    }

    this.currentOperand = this.display.currentValue
    this.shouldResetDisplay = true
  }

  // Manipula entrada do teclado
  handleKeyboardInput(event) {
    // Números e ponto decimal
    if (/[0-9.]/.test(event.key)) {
      event.preventDefault()
      this.appendNumber(event.key)
    }

    // Operadores
    if (["+", "-", "*", "/"].includes(event.key)) {
      event.preventDefault()
      this.chooseOperation(event.key)
    }

    // Enter ou = para calcular
    if (event.key === "Enter" || event.key === "=") {
      event.preventDefault()
      this.calculate()
    }

    // Backspace para apagar
    if (event.key === "Backspace") {
      event.preventDefault()
      this.backspace()
    }

    // Escape ou Delete para limpar
    if (event.key === "Escape" || event.key === "Delete") {
      event.preventDefault()
      this.clear()
    }

    // % para porcentagem
    if (event.key === "%") {
      event.preventDefault()
      this.percent()
    }
  }
}

// Inicializa a calculadora quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  const calculator = new Calculator()
})
