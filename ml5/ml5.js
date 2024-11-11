let video;
let handPose;
let hands = []; 
let painting;
let px = 0;
let py = 0; 

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
  painting = createGraphics(640, 480);
  //painting.background(255);
  painting.clear();
  video=createCapture(VIDEO,{flipped:true});
  video.hide();
  handPose.detectStart(video, gotHands); 
}

function drawAllPoints(){
  if(hands.length>0){
    for (let hand of hands){
      if(hand.confidence > 0.1){
        for(let i=0; i<hand.keypoints.length;i++){
          let keypoint = hand.keypoints[i];
          if(hand.handedness=="Left"){
          fill(255,0,255);
          }
          else{
          fill(255,255,0);
        }
          noStroke();
          circle(keypoint.x,keypoint.y,16);
          }
        }
      }
    }
}

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
function drawWithIndex(){
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;

    let d = dist(index.x, index.y, thumb.x, thumb.y);
    if (d < 35) {
      painting.stroke(255, 255, 0);
      painting.strokeWeight(8);
      painting.line(px, py, x, y);
    } else { 
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
  image(video,0,0);
  drawWithIndex();
}
