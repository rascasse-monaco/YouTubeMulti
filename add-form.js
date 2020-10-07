'use strict';

let urlNum = 1 ;//動画URLのナンバー
let resoArray = new Array();

function embed(){

  //動画埋め込みエリアの作成
  const embedArea = document.getElementById("embed_area");
  const span = document.createElement('span');
  span.id = 'output_url-' + urlNum;
  span.setAttribute("class", "embed");
  embedArea.appendChild(span);

  createIframe(urlNum);

  //form_button_areaに動画を追加ボタンを作成
  const parentButton = document.getElementById('form_button_area');
  const addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.id = 'add_button';
    addButton.value = 'さらに動画を追加';
    addButton.setAttribute("onClick", "addForm(urlNum)");
  parentButton.appendChild(addButton);

  remove();

}




//iframeを作成
function createIframe() {

//スマホ短縮URL用分岐
let input_url = document.getElementById("input_url-" + urlNum).value;
let youTubeUrl = /youtube/ig;
if (youTubeUrl.test(input_url)) {
  input_url = input_url.split('v=')[1];//通常URL用
} else {
  input_url = input_url.split('be/')[1];//短縮URL用
}

  /**iframeに動画のIDとサイズ等を入れ込んで代入
   * ?enablejsapi=1によって"https://www.youtube.com/iframe_api"を使用可能にして、
   * apiオプションを追加できるようにする。
  */
  let iframe = '<iframe id="player" width= ' + resoArray[0] + ' height=' + resoArray[1] + ' src=" https://www.youtube.com/embed/' + input_url + '?rel=0&amp;enablejsapi=1&amp;widgetid=1' + '" frameborder="0"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

  
  //埋め込みエリアに動画（iframe）を埋め込み
  let output_url = document.getElementById("output_url-" + urlNum);
      output_url.innerHTML = iframe;
}

//YouTubeApi読み込みとオプション設定部分
var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//APIを実行
 var player;
  function onYouTubeIframeAPIReady() {
	  player = new YT.Player("player",{
	    events: {
        'onReady': onPlayerReady,//API呼び出しの受信を開始する準備ができると起動
        'onStateChange': onPlayerStateChange// プレーヤーの状態が変わると起動
      }
	  });
  }
//onPlayerReadyとonPlayerStateChange関数、動画を制御するイベントを中に入れる
function onPlayerReady(event) {
  event.target.playVideo();
  event.target.mute();
}
function onPlayerStateChange(event) {

}


//埋め込み動作によって不要になる要素を削除する
function remove() {
    //フォームエリア削除
    const removeFormArea = document.getElementById('form_button_area');
    let form = document.getElementById('input_url-' + urlNum);
    removeFormArea.removeChild(form);
  
  
    //埋め込みボタン削除
    const removeEmbedBotton = document.getElementById('form_button_area');
    const embedButton = document.getElementById('embed_button');
    removeEmbedBotton.removeChild(embedButton);
  
    //動画サイズプルダウンメニュー削除（初回埋め込み移行エラー出るので要修正）
    const removeResoMenu = document.getElementById('form_button_area');
    const resoMenu = document.getElementById('set_reso');
    if (resoMenu) {
      removeResoMenu.removeChild(resoMenu);
    }
}


//セレクトメニューの動画の大きさの選択肢から縦横サイズの配列を代入する
function resoSet() {

  let resolution = document.getElementById('set_reso').value;
      if (resolution === 'small') {
        resoArray = ['320', '180'];
      } else if (resolution === 'middle'){
        resoArray = ['480', '270'];
      } else {
        resoArray = ['800', '450'];
      } 

}

//動画を埋め込みボタンの動作
function addForm() {

  //フォーム本体作成
  const input_data = document.createElement('input');
    input_data.type = 'text';
    input_data.setAttribute("class", "text_area");
    input_data.id = 'input_url-' + (urlNum + 1);
    input_data.placeholder = '追加するYouTube動画のURLをペースト';
  
  //フォームエリア作成
  const parentFormarea = document.getElementById('form_button_area');
  parentFormarea.appendChild(input_data)

  //フォームを追加ボタン削除
  const removeAddBotton = document.getElementById('form_button_area');
  const addFrom = document.getElementById('add_button');
  removeAddBotton.removeChild(addFrom);

  //埋め込みボタン作成
  const embedButton = document.getElementById('form_button_area');
  const addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.id = 'embed_button';
    addButton.value = '動画を埋め込み';
    //onclickでfunction、embedとreoSetを呼び出し
    addButton.setAttribute("onClick", "embed(urlNum)");

  embedButton.appendChild(addButton);

  urlNum++
  
}