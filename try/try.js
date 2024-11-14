let video;
let handPose;
let hands = []; 
let painting;
let px = 0; // Set to 0 initially to avoid "jumping" issue
let py = 0; 

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640, 480);
  painting.clear(); // Ensure it's transparent at the start
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands); 
}

function gotHands(results) {
  hands = results;
}

// Draws all key points on detected hands (can be useful for gesture debugging)
function drawAllPoints() {
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        for (let keypoint of hand.keypoints) {
          fill(hand.handedness == "Left" ? color(255, 0, 255) : color(255, 255, 0)); // Left: Purple, Right: Yellow
          noStroke();
          circle(keypoint.x, keypoint.y, 16); 
        }
      }
    }
  }
}

// Checks distance between index and thumb and triggers drawing if they’re close
function drawWithIndex() {
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;

    let d = dist(index.x, index.y, thumb.x, thumb.y);

    if (d < 35) {  // Draw if index and thumb are close enough
      painting.stroke(255, 255, 0);
      painting.strokeWeight(8);
      painting.line(px, py, x, y);
    } else { 
      // Show index and thumb points when not drawing
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

// Resets the painting canvas when 'r' is pressed
function keyPressed() {
  if (key === 'r' || key === 'R') {
    painting.clear();
    console.log("Canvas cleared");
  }
}

function draw() {
  image(video, 0, 0);
  drawWithIndex();
  // Optional: Uncomment to visualize key points on hands
  // drawAllPoints();
}
