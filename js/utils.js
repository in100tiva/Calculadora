/**
 * Funções utilitárias para a calculadora
 */

// Formata um número para exibição
function formatNumber(number) {
  // Converte para string e verifica se é um número válido
  const numStr = number.toString()
  if (numStr === "Infinity" || numStr === "-Infinity") {
    return "Erro"
  }
  if (numStr === "NaN") {
    return "Erro"
  }

  // Formata o número para exibição
  const maxDigits = 12

  // Se o número for muito grande, use notação científica
  if (Math.abs(number) >= 1e12) {
    return number.toExponential(6)
  }

  // Verifica se o número tem parte decimal
  if (Number.isInteger(number)) {
    return number.toString()
  }

  // Limita o número de casas decimais para caber no display
  const parts = numStr.split(".")
  if (parts[0].length >= maxDigits) {
    return number.toExponential(6)
  }

  // Limita o número de casas decimais
  const decimalPlaces = Math.min(maxDigits - parts[0].length - 1, 10)
  return number.toFixed(decimalPlaces).replace(/\.?0+$/, "")
}

// Verifica se uma string é um operador
function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char)
}

// Obtém o símbolo de exibição para um operador
function getOperatorSymbol(operator) {
  const symbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
  }
  return symbols[operator] || operator
}
