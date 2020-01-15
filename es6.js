class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    createNewDiv() {
        let div = document.createElement("div");

        div.textContent = `I'm here`;

        div.style.height = `${this.height}px`;
        div.style.width = `${this.width}px`;
        div.style.background = `${this.bg}`;
        div.style.textAlign = `${this.textAlign}`;
        div.style.fontSize = `${this.fontSize}px`;

        document.body.append(div);
    }
}

const newDiv = new Options(100, 100, "tomato", 25, "center");

newDiv.createNewDiv();
