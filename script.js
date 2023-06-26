const container = document.querySelector("#container");
let rainbowMode = false;
let opacityMode = false

createGrid(16);
addListeners();

const sizeButton = document.querySelector("#size");
sizeButton.addEventListener("click", () => {
    changeSize();
});

const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", () => {
    if (rainbowMode) {
        rainbowMode = false;
        rainbowButton.style.cssText = "background-color: white";
    } else {
        rainbowMode = true;
        rainbowButton.style.cssText = "background-color: lightgray";
    }
    if (opacityMode) {
        opacityMode = false;
        opacityButton.style.cssText = "background-color: white";
    }
});

const opacityButton = document.querySelector("#opacity");
opacityButton.addEventListener("click", () => {
    if (opacityMode) {
        opacityMode = false;
        opacityButton.style.cssText = "background-color: white";
    } else {
        opacityMode = true;
        opacityButton.style.cssText = "background-color: lightgray";
    }
    if (rainbowMode) {
        rainbowMode = false;
        rainbowButton.style.cssText = "background-color: white";
    }
});

function createGrid(size) {
    for (let i = 0; i < size ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        container.style.cssText = `grid-template-columns: repeat(${size}, 1fr)`;
        container.appendChild(pixel);
    }
}

function addListeners() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        let opacity = 0;
        pixel.addEventListener("mouseover", () => {
            if (rainbowMode) {
                let r = Math.floor(Math.random() * 256);
                let g = Math.floor(Math.random() * 256);
                let b = Math.floor(Math.random() * 256);
                pixel.style.cssText = `background-color: rgb(${r}, ${g}, ${b})`;
            } else {
                if (opacityMode) {
                    opacity += 0.1;
                    pixel.style.cssText = `background-color: rgba(0, 0, 0, ${opacity})`;
                } else {
                    pixel.style.cssText = "background-color: black";
                }   
            }           
        });
        const clearButton = document.querySelector("#clear");
        clearButton.addEventListener("click", () => {
            pixels.forEach((pixel) => {
                pixel.style.cssText = "background-color: white";
                opacity = 0;
            }); 
        });
    }); 
}

function changeSize() {
    const pixels = document.querySelectorAll(".pixel");
    let size = prompt("Enter the size of the new canvas");
    if (size <= 100 && size != null) {
        pixels.forEach((pixel) => {
            container.removeChild(pixel);
        });
        createGrid(size);
        addListeners();
    }
}
