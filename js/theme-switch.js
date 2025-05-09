class ThemeSwitcher {
    constructor() {
        this.themeToggle = document.getElementById("theme-toggle")
        this.currentTheme = localStorage.getItem("theme") || "light"

        this.initTheme()
        this.initEventListners()
    }

    initTheme() {
        if (
            this.currentTheme === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.setAttribute("data-theme", "dark")
            this.currentTheme = "dark"
        } else {
            document.documentElement.removeAttribute("data-theme")
            this.currentTheme = "light"
        }

        localStorage.setItem("theme", this.currentTheme)
    }

    initEventListners() {
        this.themeToggle.addEventListener("click", () => {
            this.toggleTheme()
        })

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                this.currentTheme = e.matches ? "dark" : "light"
                this.initTheme()
            }
        })
    }

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

document.addEventListener("DOMContentLoaded", () => {
    const themeSwitcher = new ThemeSwitcher()
})