//Require Frameworks
 const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set('view engine', 'ejs');
//Configure Server
var Port = process.env.PORT || 5000;
app.use("/static", express.static('./static/'));


app.get("/" , (req,res) => {
    res.send("This is the HomePage");
});

app.get("/watch/:vid" , (req,res) => {

        var currentVideo;
        var currentChannel;
        var JSONREPLY;
        //Get Current Video Details
            getVideo(req.params.vid,(vidResp) =>{
                currentVideo = vidResp;

                    //Get Current Channel Details
                    getChannel(currentVideo.channelID, (channelResp) =>{
                        currentChannel = channelResp;


                        //Sets Reply Params
                        JSONREPLY={
                            //current video Details
                            "title":currentVideo.title,
                            "channelID": currentVideo.channelID,
                            "videoViewCount":currentVideo.viewCount,
                            "description":currentVideo.description,
                            "videoURL":currentVideo.videoURL,
                            "thumbnailURL":currentVideo.thumbnailURL,
                            "tags":currentVideo.tags,
                            "isVideoActive":currentVideo.isVidActive,

                            //current Channel Details
                            "channelName":currentChannel.channelName,
                            "channelIconURL":currentChannel.channelIconURL,
                            "isChannelActive":currentChannel.isChannelActive,
                            "channelViewCount":currentChannel.viewCount,
                            "videos":currentChannel.videos
                        }
                        //Renders Page
                        res.render('watch',JSONREPLY);
                    })




        })
        

        


});



function readJSON(url,callback){
    fs.readFile(url, (err, data) => {
        if (err) return err;
        var response = JSON.parse(data);
        callback(response);
      });
}

function getVideo(id,callback){
    var vidData;
    readJSON("static/db/videos.json", (res) =>{
        vidData = res;
        var RequestedVideo = vidData[id];
        callback(RequestedVideo);
    })
}

function getChannel(id,callback){
    var channelData;
    readJSON("static/db/channels.json", (response) =>{
        channelData = response;
        var RequestedChannel = channelData[id];
        callback(RequestedChannel);
    })
}

//Start Server
app.listen(Port, ()=> console.log('Server is Started on Port: '+Port));
