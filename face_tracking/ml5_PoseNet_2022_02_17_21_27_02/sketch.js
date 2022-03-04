// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let xcircle = random(width);
let ycircle = random(height);

let prevPointer = [
  [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
  [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
]

let fingertips = [8, 12, 16, 20]


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  colorMap = [
    [color(0, 0, 0), color(255, 0, 255), color(0, 0, 255), color(255, 255, 255)],
    [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)]
  ]

  handsfree = new Handsfree({hands: {
    enabled: true,
    maxHands: 2,
    }
  })

//  handsfree.start();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  //ellipse(width/2, height/2, 30, 30);
  //ellipse(xcircle, ycircle, 50, 50);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  drawGrid();
  drawHands();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}


function drawGrid(){
  //noStroke();
  for (var x = 0; x < width; x += width / 10) {
		for (var y = 0; y < height; y += height / 10) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
      //ellipse(xcircle, ycircle, 20, 20);
		}
	}
  //ellipse(random(k()), random(k*height), 50, 50);
}


function drawHands(){
  const hands = handsfree.data.hands

  hands.landmarks.forEach((hand, handIndex) => {
    hand.forEach((landmark, landmarkIndex) => {
      if(colorMap[handIndex]{
        switch(landmarkIndex){
          case 8: fill(colorMap[handIndex][0]); break
          case 12: fill(colorMap[handIndex][1]); break
          case 16: fill(colorMap[handIndex][2]); break
          case 20: fill(colorMap[handIndex][3]); break
          default:
            fill(color(255, 255, 255))
        }
      }
      if(handIndex == 0 && landmarkIndex == 8){
        stroke(color(255, 255, 255));
        strokeWeight(5);
        ellipse(landmark.position.x, landmark.position.y, 10, 10);
      }else {
        stroke(color(0, 0, 0));
        strokeWeight(0);
        ellipse(landmark.position.x, landmark.position.y, 10, 10);
      }
    )
    })
  })
}
