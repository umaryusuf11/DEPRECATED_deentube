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
        var MoreVids1 = {};
        var JSONREPLY;
        //Get Current Video Details
            getVideo(req.params.vid,(vidResp) =>{
                currentVideo = vidResp;


                    //Get Current Channel Details
                    getChannel(currentVideo.channelID, (channelResp) =>{
                        currentChannel = channelResp;

                        var similarVideos;
                        getVideosWithTag("a",5,(results)=>{
                            similarVideos = results;
                            console.log(similarVideos);
        
                            getVideo(similarVideos[0], (vidResp) => {
                                
                                getChannel(vidResp.channelID, (channelResp) => {
                                    MoreVids1 = {
                                        "thumbnailURL": vidResp.thumbnailURL,
                                        "title": vidResp.title,
                                        "viewCount": vidResp.title,
                                        "channelName":channelResp.channelName
                                    }
                                    console.log(MoreVids1);
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
                                        "videos":currentChannel.videos,

                                        //more videos
                                        //more videos 1
                                        "moreVids1ThumbnailURL":MoreVids1.thumbnailURL,
                                        "moreVids1Title":MoreVids1.title,
                                        "moreVids1ViewCount":MoreVids1.viewCount,
                                        "moreVids1ChannelName": MoreVids1.channelName
                                    }
                                    //Renders Page
                                    res.render('watch',JSONREPLY);
                                });
            
            
                            });
        
                        });
                            

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

function getVideosWithTag(tags,number,callback){
    readJSON("static/db/videos.json", (res) =>{

        var results = [];
        var searchField = "tags";
        var searchVal;
        ////////////////////////////////////////////////////////////////
        //for each tag in tags passed into function
        for(i=0; i<tags.length;i++){
            searchVal = tags[i];

            //for each item in res object
            for(var x in res){
                //for each tag in item in res object
                for(var i=0 ; i < res[x].tags.length ; i++){
                    //if tag = searVal
                    if (res[x][searchField] == searchVal) {
                        //Add item to results array
                        results.push(x);
                        console.log(results.length)
                        }
                }
            } 
    
        }

        //if number was passed
        if(number != null && number != "" && number != undefined ){
            while(results.length != number){
                if(results.length<number){
                    var length = results.length;
                    for(i=0; i<length; i++){
                        var add = results[i];
                        results.push(add);
                    }
    
                    if(results.length>number){
                        while(results.length>number){
                            results.shift();
                        }
                    }
    
                }
    
                //if results is larger than number requested remove all the extras starting from the top (oldest in db)
                if(results.length>number){
                    while(results.length>number){
                        results.shift();
                    }
                }

            }
        }

        
        callback(results);



    })

}


//Start Server
app.listen(Port, ()=> console.log('Server is Started on Port: '+Port));
