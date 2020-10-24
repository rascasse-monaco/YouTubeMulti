'use strict';

let urlNum = 1;//動画URLのナンバー
let resoArray = new Array();
let globalInputUrl = new String();
let iframeUrlList = new Map();

//全て削除ボタン作成
function removeAll() {
    const removeAll = document.getElementById('removeAll');
    const removeAllButton = document.createElement('input');
          removeAllButton.type = 'button';
          removeAllButton.id = 'removeAllbutton';
          removeAllButton.value = '埋め込んだ動画をすべて削除';
          removeAllButton.setAttribute("class", "removeBtn");
          removeAllButton.setAttribute("onClick", "refresh()");
    removeAll.appendChild(removeAllButton);
}
//全て削除ボタンの動作
function refresh() {
    window.location.reload();//ページ再読み込み
    //localstorage初期化
    localStorage.removeItem('iframeUrlJson');
    localStorage.removeItem('resoArrayJson');
}
//iframeUrlListの値をローカルストレージに保存
function iframeSetLocalStorage(){
    let iframeUrlListJSON = new Map();
    iframeUrlListJSON = JSON.stringify([...iframeUrlList]);//スプレッド構文[...]
    console.log(iframeUrlListJSON);
    localStorage.setItem('iframeUrlJson', iframeUrlListJSON);
}
//iframeUrlListの値をローカルストレージから取り出す
function iframeGetLocalStorage() {
    let iframeUrlListJSONNew = localStorage.getItem('iframeUrlJson');
    let iframeUrlListJSONObj = JSON.parse(iframeUrlListJSONNew);
    let map = new Map(iframeUrlListJSONObj);//JSON.praseしたものをMapオブジェクトに変換する。
    return map
}
//resoArrayの値をローカルストレージに保存
function resoArraySetLocalStorage(){
    let resoArrayJSON = new Array();
    resoArrayJSON = JSON.stringify(resoArray);
    localStorage.setItem('resoArrayJson', resoArrayJSON);
}
//resoArrayの値をローカルストレージから取り出す
function resoArrayGetLocalStorage() {
    let resoArrayJSONNew = localStorage.getItem('resoArrayJson');
    let resoArrayJSONObj = JSON.parse(resoArrayJSONNew);
    return resoArrayJSONObj
}
//フォームボタン作成関数
createForm(urlNum);
//セレクトメニュー作成関数
selectMenu();
//埋込ボタン作成関数
embedButtonfunc();
//localStorageからurlListのオブジェクトを読み込んで代入
if (iframeGetLocalStorage()) {
  iframeUrlList = iframeGetLocalStorage();
} else {}
//localStorageからresoArrayの配列を読み込んで代入
if (resoArrayGetLocalStorage()) {
  resoArray = resoArrayGetLocalStorage();
} else {}
//iframeUrlListに値がある場合は動画をすべて削除ボタンを作成。
if (!iframeUrlList) {
  removeAll();
} else {}
//-------------------------------------------
//動画埋込ボタン押下後処理用関数
function embed(){
    let embedUrl = document.getElementById("input_url-" + urlNum).value;
    //ID取得時間設定
    let getNow = new Date();
    let idNow = 'Time_' +
                  getNow.getFullYear() + 
                  (getNow.getMonth() + 1) +
                  getNow.getDate() +
                  getNow.getHours() + 
                  getNow.getMinutes() + 
                  getNow.getSeconds() +
                  getNow.getMilliseconds();
    let urlID = idNow;

    //URL未入力の場合はボタン押下無視
    if (embedUrl) {      
        //削除ボタンの作成（同時に埋め込みエリアの作成）
        removeThisVideo(embArea(urlNum, urlID), urlNum, urlID);
        //Iframe作成
        createIframe();
        //form_button_areaに動画を追加ボタンを作成
        addBtnfunc();
        //埋め込み動作によって不要になる要素を削除する
        remove();
        //MapオブジェクトのiframeUrlListに削除ボタンと同じIDを添え字としたURLのオブジェクトを保存する
        iframeUrlList.set(`${urlNum}_${urlID}`, globalInputUrl);
        //iframeUrlListをローカルストレージに代入;
        iframeSetLocalStorage();
        //resoArrayをローカルストレージに保存
        resoArraySetLocalStorage();
        //全て動画を削除ボタンあったらなにもしない、なかったら作る document.getElementById('removeAllbutton')
        if (iframeUrlList) {
          if (document.getElementById('removeAllbutton')){
          } else {
            removeAll();
          }
        } else {}
    } else {}
embedUrl = null;
}
//------------------------------------

/**
 * 動画埋め込みエリアの作成
 * @param {Number} embAreaurlNum 通し番号
 * @param {String} embAreaurlID 埋込時間入れたID
 * @return {String} コンテナID
 */
function embArea(embAreaurlNum, embAreaurlID) {
  const embedArea = document.getElementById("embed_area");
  const embedContainer = document.createElement('div');
  const embedID = 'container_' + embAreaurlNum + '_' + embAreaurlID;
    embedContainer.id = embedID;
    embedContainer.setAttribute("class", "containerVideo");
  embedArea.appendChild(embedContainer);

      //埋込用子要素
      const video = document.getElementById(embedID);
      const embTag = document.createElement('div');
        embTag.id = 'output_url-' + embAreaurlNum;
        embTag.setAttribute("class", "embed");
      video.appendChild(embTag);
      return embedID;
}

//form_button_areaに動画を追加ボタンを作成関数
function addBtnfunc() {
    const parentButton = document.getElementById('form_button_area');
    const addButton = document.createElement('input');
          addButton.type = 'button';
          addButton.id = 'add_button';
          addButton.value = 'さらに動画を追加';
          addButton.setAttribute("onClick", "addForm(urlNum)");
    parentButton.appendChild(addButton);
}
//削除ボタンの作成
function removeThisVideo(remVideoAreaID, remBtnurlNum, remBtnurlID) {
  const removeVideoArea = document.getElementById(remVideoAreaID);
  const removeSubBtn = document.createElement('input');
        removeSubBtn.type = 'submit';
        removeSubBtn.value = 'この動画を削除';
        removeSubBtn.id = 'removeBtn_' + remBtnurlNum + '_' + remBtnurlID;
        removeSubBtn.setAttribute("class", "removeBtn");
        removeSubBtn.setAttribute("onClick", "remVideo(this.id);deleteList(this.id)");
  removeVideoArea.appendChild(removeSubBtn);
}
//動画を削除ボタン関数
function remVideo(id){
    console.log ('削除するIDは' + id);
    let containerID = 'container_' + id.split('removeBtn_')[1];
    let rmoveVideo = document.getElementById(containerID);
    rmoveVideo.remove(id);
}
//iframeUrlListから削除した動画のIDを削除する関数
function deleteList(id) {
    console.log (`${id}を削除する処理を実行`);
    const removeID = id.split('removeBtn_')[1];
    iframeUrlList.delete(removeID);//mapオブジェクトからキー「id」を削除。
    //当該ボタンの動画を削除したiframeUrlListをローカルストレージに代入;
    iframeSetLocalStorage();
    //iframeUrlListに何も入っていないとき全てを削除ボタンを削除(最後の動画が削除されたときリロードして最初の画面にもどる)
    if (iframeUrlList.size === 0) {
      refresh();
    } else {}
}

//iframeを作成
//埋め込みエリアに動画（iframe）を埋め込み
function createIframe() {
    //YouTube PC スマホ短縮URL用分岐、ニコニコ動画分岐
    const iframeInputUrl = document.getElementById("input_url-" + urlNum).value;
    let videoUrl = new Array();
        videoUrl = [ /youtube/ig, /nicovideo/ig, /youtu\.be/ig, /nico\.ms/ig ];//URLを判別するための正規表現

    if (videoUrl[0].test(iframeInputUrl)) {//youtubeの文字列があったらtrue
      let urLStr = iframeInputUrl.split('v=')[1];//通常URL用ID抽出
      globalInputUrl = urLStr.slice(0, 11);//先頭から11文字取得
      youTubeIframe(resoArray[0], resoArray[1], globalInputUrl);//YouTube用Iframe作成関数
    } else if (videoUrl[1].test(iframeInputUrl)) {//nocovideoの文字列があったらtrue
      let urLStr = iframeInputUrl.split('watch/')[1];//ニコニコ動画URL用ID抽出
      globalInputUrl = urLStr.slice(0, 10);//先頭から10文字取得
      nicoVideoScriptGen(resoArray[0], resoArray[1], globalInputUrl);
    } else if (videoUrl[3].test(iframeInputUrl)) {//nocovideoの文字列があったらtrue
      let urLStr = iframeInputUrl.split('nico.ms/')[1];//ニコニコ動画スマホ用URL用ID抽出
      globalInputUrl = urLStr.slice(0, 10);//先頭から10文字取得
      nicoVideoScriptGen(resoArray[0], resoArray[1], globalInputUrl);
    } else if (videoUrl[2].test(iframeInputUrl)) {//nocovideoの文字列があったらtrue
      globalInputUrl = iframeInputUrl.split('be/')[1];//短縮URL用ID抽出
      youTubeIframe(resoArray[0], resoArray[1], globalInputUrl);//YouTube用Iframe作成関数
    } else {
      globalInputUrl = iframeInputUrl;//ニコニコ動画URL用ID抽出
      nicoVideoScriptGen(resoArray[0], resoArray[1], globalInputUrl);
    }
}

/** YouTube用 Iframe作成関数 
 * @param {Array} width resoArray[0]
 * @param {Array} height resoArray[1]
 * @param {Map} value value iframeUrlList or globalInputUrl
 */
function youTubeIframe(width, height, value) {
    /**iframeに動画のIDとサイズ等を入れ込んで代入
     * ?enablejsapi=1によって"https://www.youtube.com/iframe_api"を使用可能にして、
     * apiオプションを追加できるようにする。(できてない)
    */
    let iframe = new String();
    iframe = 
      `<iframe id="player" width=${width} height=${height} src=" https://www.youtube.com/embed/${value}?rel=0&amp;  enablejsapi=1&amp;widgetid=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  picture-in-picture" allowfullscreen></iframe>`;

    let output_url = document.getElementById("output_url-" + urlNum);
    output_url.innerHTML = iframe;
} 

/** ニコニコ動画用 埋込scriptリンク作成関数
* @param {Array} width resoArray[0]
 * @param {Array} height resoArray[1]
 * @param {Map} value value iframeUrlList
 */
function nicoVideoScriptGen(width, height, value) {
    //iframeに動画のIDとサイズ等を入れ込んで代入
    let nicoScript = new String();
    nicoScript =
      `<iframe allowfullscreen="allowfullscreen" allow="autoplay" frameborder="0" width=${width} height=${height} src="https://embed.nicovideo.jp/watch/${value}?oldScript=1&amp;referer=&amp;from=0&amp;allowProgrammaticFullScreen=1" style="max-width:100%;"></iframe>`; 

    let output_url = document.getElementById("output_url-" + urlNum);
    output_url.innerHTML = nicoScript;
}

/**YouTubeApi読み込みとオプション設定部分未実装
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
function onPlayerStateChange(event) {}
*/

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
    //動画サイズプルダウンメニュー削除
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
      } else if (resolution === 'large') {
        resoArray = ['640', '360'];
      } else {
        let width = document.body.clientWidth-20;
        let hight = parseInt(width * 0.5625, 10);
        resoArray = [ `'${width}'`, `'${hight}'`];
      }
}

//動画を埋め込みボタンの動作
function addForm() {
    //フォーム作成関数
    urlNum++
    createForm();
    //フォームを追加ボタン削除
    const removeAddBotton = document.getElementById('form_button_area');
    const addFrom = document.getElementById('add_button');
    removeAddBotton.removeChild(addFrom);
    //埋め込みボタン作成関数
    embedButtonfunc();
}

//フォーム作成関数
function createForm() {
    //フォーム本体作成
    const input_data = document.createElement('input');
          input_data.type = 'text';
          input_data.setAttribute("class", "text_area");
          input_data.id = 'input_url-' + urlNum;
          input_data.placeholder = '追加する動画のURLをペースト';
    //フォームエリア下にフォーム本体作成
    const parentFormarea = document.getElementById('form_button_area');
    parentFormarea.appendChild(input_data);
}
//セレクトメニュー作成関数
function selectMenu() {
    const selectM = document.createElement('select');
          selectM.name = 'reso';
          selectM.id = 'set_reso';
          selectM.setAttribute('class', 'select_menu');
    const parentFormarea = document.getElementById('form_button_area');
    parentFormarea.appendChild(selectM);
    //メニュー内オプションを作成し中を選択済みにする。
    selectOpt('large', '動画サイズ：大');
    selectOpt('middle', '動画サイズ：中');
    selectOpt('small', '動画サイズ：小');
    selectOpt('windowSize', '横幅に合わせる');
    document.getElementById('set_reso').options[1].selected = true;
}
/**
 * セレクトメニュー内オプション作成関数
 * @param {String} size セレクトメニューオプションのvalue
 * @param {String} text セレクトメニューオプションのinnerText
 */
function selectOpt(size, text) {
    const selectO = document.createElement('option');
          selectO.value = size;
          selectO.innerText = text;
    const parentMenu = document.getElementById('set_reso');
    parentMenu.appendChild(selectO);
    return;
}

//埋め込みボタン作成関数
function embedButtonfunc() {
    const embedButton = document.getElementById('form_button_area');
    const addButton = document.createElement('input');
          addButton.type = 'button';
          addButton.id = 'embed_button';
          addButton.value = '動画を追加';
    //onclickでfunction、embedとreoSetを呼び出し解像度が設定されている場合はresoset関数は呼び出さない。
    if (!resoArray.length) {
      addButton.setAttribute("onClick", "resoSet();embed()");
    } else {
      addButton.setAttribute("onClick", "embed()");
    }
    embedButton.appendChild(addButton);
}