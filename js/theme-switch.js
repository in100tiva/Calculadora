/**
 * Alternador de tema claro/escuro
 */

class ThemeSwitcher {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle")
    this.currentTheme = localStorage.getItem("theme") || "light"

    this.initTheme()
    this.initEventListeners()
  }

  // Inicializa o tema com base na preferência salva
  initTheme() {
    if (
      this.currentTheme === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.setAttribute("data-theme", "dark")
      this.currentTheme = "dark"
    } else {
      document.documentElement.removeAttribute("data-theme")
      this.currentTheme = "light"
    }

    localStorage.setItem("theme", this.currentTheme)
  }

  // Inicializa os event listeners
  initEventListeners() {
    this.themeToggle.addEventListener("click", () => {
      this.toggleTheme()
    })

    // Detecta mudanças na preferência do sistema
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        this.currentTheme = e.matches ? "dark" : "light"
        this.initTheme()
      }
    })
  }

  // Alterna entre os temas claro e escuro
  toggleTheme() {
    if (this.currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark")
      this.currentTheme = "dark"
    } else {
      document.documentElement.removeAttribute("data-theme")
      this.currentTheme = "light"
    }

    localStorage.setItem("theme", this.currentTheme)
  }
}

// Inicializa o alternador de tema quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  const themeSwitcher = new ThemeSwitcher()
})
