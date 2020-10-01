'use strict';

let urlNum = 1 ;//動画URLのナンバー
let resolution = 'width="480" height="270"';

function addForm() {

  //フォーム本体作成
  var input_data = document.createElement('input');
    input_data.type = 'text';
    input_data.setAttribute("class", "text_area");
    input_data.id = 'input_url-' + (urlNum + 1);
    input_data.placeholder = '"YouTubeのURLをペースト';
  
  //フォームエリア作成
  var parentFormarea = document.getElementById('form_button_area');
  parentFormarea.appendChild(input_data)

  //フォームを追加ボタン削除
  var removeAddBotton = document.getElementById('form_button_area');
  var addButton = document.getElementById('add_button');
  removeAddBotton.removeChild(addButton);

  //埋め込みボタン作成
  var embedButton = document.getElementById('form_button_area');
  var addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.id = 'embed_button';
    addButton.value = '動画を埋め込み';
    addButton.setAttribute("onClick", "embed(urlNum);resoSet()");

  embedButton.appendChild(addButton);

  urlNum++
  
}

function embed(){

  //動画埋め込みエリアの作成
  var embedArea = document.getElementById("embed_area");
  var span = document.createElement('span');
  span.id = 'output_url-' + urlNum;
  span.setAttribute("class", "embet");
  embedArea.appendChild(span)

  var input_url = document.getElementById("input_url-" + urlNum).value;
  var input_url = input_url.split('v=')[1];//URLから動画のIDを抽出
  var iframe = '<iframe ' + resolution + ' src="https://www.youtube.com/embed/' + input_url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';//iframeに動画のIDを代入
  //埋め込みエリアに動画（iframe）を埋め込み
  var output_url = document.getElementById("output_url-" + urlNum);
  output_url.innerHTML = iframe;

  //form_button_areaに動画を追加ボタンを作成
  var parentButton = document.getElementById('form_button_area');
  var addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.id = 'add_button';
    addButton.value = '動画を追加';
    addButton.setAttribute("onClick", "addForm(urlNum)");
  parentButton.appendChild(addButton);

  //フォームエリア削除
  var removeFormArea = document.getElementById('form_button_area');
  var form = document.getElementById('input_url-' + urlNum);
  removeFormArea.removeChild(form);


  //埋め込みボタン削除
  var removeEmbedBotton = document.getElementById('form_button_area');
  var embedButton = document.getElementById('embed_button');
  removeEmbedBotton.removeChild(embedButton);

  //動画サイズプルダウンメニュー削除（初回埋め込み移行エラー出るので要修正）
  var removeResoMenu = document.getElementById('form_button_area');
  var resoMenu = document.getElementById('set_reso');
  removeResoMenu.removeChild(resoMenu);

}

function resoSet() {
  resolution = document.getElementById('set_reso').value;
  return resolution = resolution
}