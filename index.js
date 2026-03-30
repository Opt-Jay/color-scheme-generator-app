const colorInput = document.getElementById("color-input")
const modeSelect = document.getElementById("mode-select")
const getSchemeBtn = document.getElementById("get-scheme-btn")
const schemeContainer = document.getElementById("scheme-container")

function renderColors(colors) {
  schemeContainer.innerHTML = colors
    .map(color => {
      const hex = color.hex.value
      return `
        <div class="color-column" data-hex="${hex}">
          <div class="color-block" style="background:${hex};"></div>
          <div class="hex-value">${hex}</div>
        </div>
      `
    })
    .join("")
}

function getColorScheme() {
  const hex = colorInput.value.replace("#", "")
  const mode = modeSelect.value

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`)
    .then(response => response.json())
    .then(data => {
      renderColors(data.colors)
    })
    .catch(error => {
      console.error("Error fetching color scheme:", error);
      schemeContainer.innerHTML = "<p style='padding:20px;'>Could not load color scheme.</p>"
    })
}

getSchemeBtn.addEventListener("click", getColorScheme)

schemeContainer.addEventListener("click", function (e) {
  const colorColumn = e.target.closest(".color-column")
  if (!colorColumn) return

  const hex = colorColumn.dataset.hex
  navigator.clipboard.writeText(hex)

  const hexText = colorColumn.querySelector(".hex-value")
  const originalText = hexText.textContent

  hexText.textContent = "Copied!"
  setTimeout(() => {
    hexText.textContent = originalText
  }, 1000)
})

getColorScheme()