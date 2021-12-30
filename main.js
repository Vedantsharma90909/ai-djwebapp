scorelistright = 0;
scorelist = 0;
song = "";
leftWristx = 0;
rightWristx = 0;
leftWristy = 0;
rightWristy = 0;

function setup() {

    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotposes);
}

function draw() {
    image(video, 0, 0, 600, 500);

    if (scorelist > 0.2) {
        fill('#FF0000');
        stroke('#FF0000');


        circle(leftWristx, leftWristy, 20);
        inNumberleftwristY = Number(leftWristy);
        remove_decimal = floor(inNumberleftwristY);
        volume = remove_decimal / 500;
        document.getElementById('volume').innerHTML = 'volume = ' + volume;
        song.setVolume(volume);
    }

    if (scorelistright > 0.2) {
        circle(rightWristx, rightWristy, 20);
        console.log('rightwrist');

        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById('speed').innerHTML = 'Speed = 0.5x';
            song.rate(0.5);
        } else if (rightWristy > 100 && rightWristy <= 200) {
            document.getElementById('speed').innerHTML = 'Speed = 1x';
            song.rate(1);
        } else if (rightWristy > 200 && rightWristy <= 300) {
            document.getElementById('speed').innerHTML = 'Speed = 1.5x';
            song.rate(1.5);
        }
        else if (rightWristy > 300 && rightWristy <= 400) {
            document.getElementById('speed').innerHTML = 'Speed = 2x';
            song.rate(2);
           }
        else if (rightWristy > 400 && rightWristy <= 500) {
            document.getElementById('speed').innerHTML = 'Speed = 2.5x';
            song.rate(2.5);
           }
    }


}

function preload() {
    song = loadSound('[MP3DOWNLOAD.TO] ATC - All Around The World (la la la la la la la la)-320k (1).mp3');
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("model is loaded");
}

function gotposes(results) {

    if (results.length > 0) {
        console.log(results);
        scorelist = results[0].pose.keypoints[9].score;
        leftWristx = results[0].pose.leftWrist.x;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        leftWristy = results[0].pose.leftWrist.y;
        console.log(leftWristx, rightWristx, leftWristy, rightWristy);
        scorelistright = results[0].pose.keypoints[10].score;
    }

}

function stop(){
    song.stop();
}