song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist>0.2){
    circle(leftwristX, leftwristY, 20);
    innumberleftwristY=Number(leftwristY);
    removedecimal=floor(innumberleftwristY);
    volume=removedecimal/500;
    document.getElementById("volume").innerHTML="Volume= " + volume;
    song.setVolume(volume);
    }
}

function playSong(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function preload(){
song=loadSound("music.mp3");
}

function modelLoaded(){
    console.log("Model Loaded")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;

    console.log("leftwristX = " + leftwristX + " leftwristY = " + leftwristY);
    console.log("rightwristX = " + rightwristX + " rightwristY = " + rightwristY);
    console.log("scoreleftwrist= " + scoreleftwrist);
    }
}