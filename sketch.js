var mic;
// Maurer Roses: n, d values
let n = 0;
let d = 0;
let nSlider;
let dSlider;
let sensitivity;
let checkbox;
let bool = false;

function audioCheckbox() {
  bool = !bool;
}

function setup()
{
    // Setup Canvas
    createCanvas(800, 800);
    // Radians -> Degrees
    angleMode(DEGREES);

    // Start Mic
    mic = new p5.AudioIn();
    mic.start();

    // nslide range [1,180] start: 30
    nSlider = createSlider(1, 180, 30);
    nSlider.parent(createDiv('Fine Tune N'));

    // dslide range [1,180] start: 30
    dSlider = createSlider(1, 180, 30);
    dSlider.parent(createDiv('Fine Tune D'));
  
    sensitivity = createSlider(1, 10000, 90);
    sensitivity.parent(createDiv('Sensitivity'));

    checkbox = createCheckbox('Turn on Audio', bool);
    checkbox.changed(audioCheckbox);
}


function draw()
{   
    // Get volume level of mic and sensitivity
    var vol = 0;
    if (bool) {
      vol = mic.getLevel()*sensitivity.value() * dSlider.value();
    } else {
      vol = dSlider.value();
    }

    // Set Maurer n value
    n = nSlider.value();
    console.log(`n: ${n}, (d)vol: ${vol}, sensitivity: ${sensitivity.value()}`);
    if (vol >= 1) {
        // Set background to black
        background(0);
        // Center drawing
        translate(width / 2, height / 2);
        stroke(255);

        // Set Maurer d value
        // The bigger the d value the more "chaotic" the maurer rose will be.
        d = vol;

        noFill();
        beginShape();
        strokeWeight(1);
        // Maurer rose uses polar coordinates to draw roses
        // Where n is the number of petals and d is the rotation
        for (let i = 0; i < 361; i++) {
            let k = i * d;
            let r = 400 * sin(n * k);
            let x = r * cos(k);
            let y = r * sin(k);
            vertex(x, y);
        }
        endShape();
    }
}