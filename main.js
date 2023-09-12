song1="";
song2="";
leftWristX=0;
leftWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
rightWristX=0;
rightWristY=0;
song1_status="";
song2_status="";
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Posenet is intiallized")
}
function draw(){
    image(video,0,0,600,500);
    fill("#9D44C0");
    stroke("FF6969");
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("play_song").innerHTML = "Playing Peter Pan Song"
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("play_song").innerHTML = "Playing Harry potter Song"
        }
    }
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

    }
}