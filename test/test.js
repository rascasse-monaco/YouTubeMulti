var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
height: '503',
width: '894',
videoId: 'iCD-7zn2-gs',
wmode: 'transparent',
playerVars:{
'loop': '1',
'playlist': 'iCD-7zn2-gs',
'rel': '0',
'showinfo': '0',
'color': 'white',
},
events: {
'onReady': onPlayerReady,
'onStateChange': onPlayerStateChange
}
});
}
function onPlayerReady(event) {
event.target.playVideo();
event.target.mute();
}
function onPlayerStateChange(event) {
}