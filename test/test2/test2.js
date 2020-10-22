'use strict'

let iframeUrlList  = new Map([
    ["removeBtn_1_Time_20201019173249227", "de6s3RJMX4o"],
    ["removeBtn_2_Time_2020101917347737", "WvX2H6Q4P54"],
    ["removeBtn_3_Time_2020101916347737", "sm37400343"]
]);

let resoArray = ["480", "270"];
iframeUrlList.forEach((value, key) => {
    const test = document.getElementById('test');
    const testDiv = document.createElement('div');
        testDiv.id = key;
        test.appendChild(testDiv);

        if (value.length === 11) {
            testDiv.innerHTML =  `<iframe id="player" width=${resoArray[0]} height=${resoArray[1]} src=" https://www.youtube.com/embed/${value}?rel=0&amp;enablejsapi=1&amp;widgetid=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            testDiv.innerHTML =  `<iframe allowfullscreen="allowfullscreen" allow="autoplay" frameborder="0" width=${resoArray[0]} height=${resoArray[1]} src="https://embed.nicovideo.jp/watch/${value}?oldScript=1&amp;referer=&amp;from=0&amp;allowProgrammaticFullScreen=1" style="max-width:100%; "></iframe>`; 
        }
});



