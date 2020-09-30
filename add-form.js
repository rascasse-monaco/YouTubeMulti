'use strict';

let urlNum = 1 ;//動画URLのナンバー

function addForm() {

  //フォーム本体作成
  var input_data = document.createElement('input');
    input_data.type = 'text';
    input_data.setAttribute("class", "text_area");
    input_data.id = 'input_url-' + (urlNum + 1);
    input_data.placeholder = '動画のURL' + (urlNum + 1);
  
  //フォームエリア作成
  var parentFormarea = document.getElementById('form_area');
  parentFormarea.appendChild(input_data)

  //フォームを追加ボタン削除
  var removeAddBotton = document.getElementById('add_button_area');
  var addButton = document.getElementById('add_button');
  removeAddBotton.removeChild(addButton);

  //埋め込みボタン作成
  var embedButton = document.getElementById('embed_button_area');
  var addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.id = 'embed_button';
    addButton.value = '動画を埋め込み';
    addButton.setAttribute("onClick", "embed(urlNum)");

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
  var iframe = '<iframe width="480" height="270" src="https://www.youtube.com/embed/' + input_url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';//iframeに動画のIDを代入
  //埋め込みエリアに動画（iframe）を埋め込み
  var output_url = document.getElementById("output_url-" + urlNum);
  output_url.innerHTML = iframe;

  //add_button_areaに動画を追加ボタンを作成
  var parentButton = document.getElementById('add_button_area');
  var addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.id = 'add_button';
    addButton.value = '＋ 動画を追加';
    addButton.setAttribute("onClick", "addForm(urlNum)");
  parentButton.appendChild(addButton);

  //フォームエリア削除
  var removeFormArea = document.getElementById('form_area');
  var form = document.getElementById('input_url-' + urlNum);
  removeFormArea.removeChild(form);


  //埋め込みボタン削除
  var removeEmbedBotton = document.getElementById('embed_button_area');
  var embedButton = document.getElementById('embed_button');
  removeEmbedBotton.removeChild(embedButton);
}