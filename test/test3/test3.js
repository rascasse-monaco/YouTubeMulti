'use strict'
let urlNum = 1;
let iframeUrlList  = new Map([
    ["1_Time_20201019173249227", "de6s3RJMX4o"],
    ["2_Time_2020101917347737", "WvX2H6Q4P54"],
    ["3_Time_2020101916347737", "sm37400343"]
]);
let iframe = new String();
let resoArray = ["480", "270"];

addBtnfunc();

iframeUrlList.forEach((value, key) => {
    removeThisVideo(embArea(urlNum, 0, key), urlNum, 0, key);

        if (value.length === 11) {
          let output_url = document.getElementById("output_url-" + urlNum);
          iframe = `<iframe id="player" width=${resoArray[0]} height=${resoArray[1]} src=" https://www.youtube.com/embed/${value}?rel=0&amp;  enablejsapi=1&amp;widgetid=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  picture-in-picture" allowfullscreen></iframe>`;
          output_url.innerHTML = iframe;
        } else {
          let output_url = document.getElementById("output_url-" + urlNum);
          iframe =  `<iframe allowfullscreen="allowfullscreen" allow="autoplay" frameborder="0" width=${resoArray[0]} height=${resoArray[1]} src="https://embed.nicovideo.jp/watch/${value}?oldScript=1&amp;referer=&amp;from=0&amp;allowProgrammaticFullScreen=1" style="max-width:100%; "></iframe>`;
          output_url.innerHTML = iframe;
        }
        urlNum++;
});

/**
 * 動画埋め込みエリアの作成
 * @param {Number} embAreaurlNum 通し番号 urlNum
 * @param {String} embAreaurlID 埋込時間入れたID urlID
 * @return {String} コンテナID
 */
function embArea(embAreaurlNum, embAreaurlID, key) {
    const embedArea = document.getElementById("embed_area");
    const embedContainer = document.createElement('div');
    let embedID = new String();
    if (embAreaurlID === 0){
      embedID = `container_${key}`;
    } else {
      embedID = `container_${embAreaurlNum}_${embAreaurlID}`;
    }
      embedContainer.id = embedID;
      embedContainer.setAttribute("class", "containerVideo");
    embedArea.appendChild(embedContainer);
  
        //埋込用子要素
        const video = document.getElementById(embedID);
        const embTag = document.createElement('div');
          embTag.id = `output_url-${embAreaurlNum}`;
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
  /**
   * 削除ボタンの作成
   * @param {Function} remVideoAreaID embArea retrun embedID
   * @param {Number} remBtnurlNum urlNum
   * @param {Number} remBtnurlID urlID
   */
  function removeThisVideo(remVideoAreaID, remBtnurlNum, remBtnurlID, key) {
      const removeVideoArea = document.getElementById(remVideoAreaID);
      const removeSubBtn = document.createElement('input');
            removeSubBtn.type = 'submit';
            removeSubBtn.value = 'この動画を削除';
      let remSubBtn = new String();
      if (remBtnurlID === 0) {
        remSubBtn = `removeBtn_${key}`;
      } else {
        remSubBtn = `removeBtn_${remBtnurlNum}_${remBtnurlID}`;
      }
            remSubBtn = removeSubBtn.id;
            removeSubBtn.setAttribute("class", "removeBtn");
            removeSubBtn.setAttribute("onClick", "remVideo(this.id);deleteList(this.id)");
      removeVideoArea.appendChild(removeSubBtn);
  }