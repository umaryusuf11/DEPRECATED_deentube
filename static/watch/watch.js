// var currentVideo;
// var videoId;
// var currentChannel;


//Simplify running startup tasks
// window.onload=Startup();
// function Startup(callback){
//     videoId = "h";
//     afterglow.play('videoPlayer');
//     console.log("started");






// }


// function configDisplay(){
//     console.log(currentChannel)
//     console.log("Config Display...");
//     var currentVideoTitleDisp = document.getElementById("currentVideoTitleText");
//     currentVideoTitleDisp.innerHTML = currentVideo.title;
    
//     var currentVideoChannelNameDisp = document.getElementById("currentVideoChannelNameText");
//     currentVideoChannelNameDisp.innerHTML = currentChannel.channelName;

//     var currentVideoViewsDisp = document.getElementById("viewsText");
//     currentVideoViewsDisp.innerHTML = currentVideo.viewCount + "views";

//     var currentVideoDescDisp = document.getElementById("DescText");
//     currentVideoDescDisp.innerHTML = currentVideo.description;

//     var videoPlayer = document.getElementById("videoPlayer");
//     videoPlayer.poster = currentVideo.thumbnailURL;
//     videoPlayer.src = currentVideo.videoURL;
// 	if(currentVideo!=""){
// 		afterglow.init()
// 	}
//     console.log("Video Set")

//     afterglow.on('videoPlayer', 'ready', function(){
        
//       });
// }

// //Read File Api
// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }

// //usage:
