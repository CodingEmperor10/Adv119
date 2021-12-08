function setup()
{
canvas =  createCanvas(450, 400);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function preload()
{
classifier = ml5.imageClassifier("DoodleNet");  
}

function clear_canvas()
{
  background("white");  
}

function draw()
{
strokeWeight(13);
stroke(0);
if(mouseIsPressed){
line(pmouseX, pmouseY, mouseX, mouseY);
}
}

function classifyCanvas()
{
 classifier.classify(canvas, gotResults); 
}

function gotResults(error,results){
if (error){
  console.error(error);
}  
console.log(results);
document.getElementById("label").innerHTML = "Lable : " + results[0].label;
document.getElementById("confidence").innerHTML = "Confidence : " + Math.round(results[0].confidence * 100) + "%";
utterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(utterThis);
}