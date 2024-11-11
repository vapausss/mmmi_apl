let video;
let handPose;
let hands = []; 
let painting;
let px; //früher beide mit 0 initialisiert, sprang vom 0,0 punkt zu der erst gezeichneten linie - nervig
let py; //so passiert es nicht mehr, dennoch schlecht dass uninitialized 

function preload(){
    handPose = ml5.handPose({flipped:true});
}
function mousePressed(){
  console.log(hands);
}
function gotHands(results){
hands=results;
}

function setup() {
  createCanvas(640, 480);
  //man kann das painting kleiner als der 'fullscreen' ist machen und nur da die zeichnen möglichkeit geben
  painting = createGraphics(640, 480);
  /*
  mit dieser funktion sieht man nur einen weissen background statt sich selbst
  es wird trd gemalt 
  nützlich zu gestenerkennung?
   */
  //painting.background(255);
  painting.clear();
  video=createCapture(VIDEO,{flipped:true});
  video.hide();
  handPose.detectStart(video, gotHands); 
}

//alle punkte werden angegeben, man kann gucken ob man weitere fingerkombinationen für was anderes nutzen können
//für uns nicht notwendig aber gut zum nachgucken
function drawAllPoints(){
  if(hands.length>0){
    for (let hand of hands){
      if(hand.confidence > 0.1){
        for(let i=0; i<hand.keypoints.length;i++){
          let keypoint = hand.keypoints[i];
          if (hand.handedness == "Left") {
            //lila
          fill(255,0,255);
          }
          else {
            //gelb
          fill(255,255,0);
        }
          noStroke();
          circle(keypoint.x,keypoint.y,16); 
          }
        }
      }
    }
}
//einfache ausgabe von beiden punkten, kann man als default implementieren
//wenn wir weitere fingerkombinationen wählen kann man hier in einer if/case anweisung die funktionen switchen
//aber eigentlich brauchen wir die funktion nicht, man hat alles was hier steht und meht in der nächsten funktion 
//dient nur zur veranschaulichung 
function showIndexThumb() {
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    noStroke();
    fill(255, 0, 255);
   let d = dist(index.x, index.y, thumb.x, thumb.y);
    if (d < 35) {
      fill(255, 255, 0);
      let x = (index.x + thumb.x) * 0.5;
      let y = (index.y + thumb.y) *0.5;
      circle(x,y,16);
    } else {
      fill(255, 0, 255);
      circle(index.x, index.y, 16);
      circle(thumb.x, thumb.y, 16);
    }
  }
}

//implementation von dem malen mit beiden fingern

//wichtige frage- wie kann man die eingabe löschen um was neues zu zeichen
//nach einer erfolgreichen gestenerkennung den screen löschen?
//eine fingerkombination fürs löschen aussuchen?
//farben wechseln mit fingern?(in unserem fall nicht so wichtig)
//farbe wechseln wenn eine geste erkannt wurde?
//emoji für bestimmte gesten hinzufügen?
function drawWithIndex(){
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;

    let d = dist(index.x, index.y, thumb.x, thumb.y);
    //bestimmter abstand ab dem gemalt wird auf dem painting layer
    if (d < 35) {
      painting.stroke(255, 255, 0);
      painting.strokeWeight(8);
      painting.line(px, py, x, y);
    } else { 
      //sonst sehen wir nur die beiden punkte, ohne dass die malen 
      noStroke();
      fill(255, 0, 255);
      circle(index.x, index.y, 16);
      circle(thumb.x, thumb.y, 16);
    }
      px = x;
      py = y;
  }
  image(painting, 0, 0);
}

function draw() {
  image(video, 0, 0);
  //man kann die drawWithIndex funktion in die showIndexThumb implementieren
  drawWithIndex();
}
