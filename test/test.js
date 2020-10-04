var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
height: '270',
width: '480',
videoId: 'lmYiKATgGOA',
playerVars:{
'rel': '0',
},

//API が起動するイベントと、これらのイベントが発生したときに API が呼び出す関数（イベント リスナー）を識別
events: {
'onReady': onPlayerReady,
'onStateChange': onPlayerStateChange
}
});
}

//eventsに入っている関数類
function onPlayerReady(event) {
event.target.playVideo();
event.target.mute();
}
function onPlayerStateChange(event) {
}