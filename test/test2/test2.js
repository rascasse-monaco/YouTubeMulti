'use strict'

let iframeUrlList  = new Map([
    ["removeBtn_1_Time_20201019173249227", "de6s3RJMX4o"],
    ["removeBtn_2_Time_2020101917347737", "WvX2H6Q4P54"]
]);
const results = [];
//([["key1", "value1"], ["key2", "value2"]]);
//iframeUrlList = ([
//    ["removeBtn_1_Time_20201019173249227", "de6s3RJMX4o"],
//    ["removeBtn_2_Time_2020101917347737", "WvX2H6Q4P54"]
//]);
iframeUrlList.forEach((value, key) => {
    const test = document.getElementById('test');
    const testDiv = document.createElement('div');
        testDiv.id = 'test';
        testDiv.setAttribute("onClick", "addForm(urlNum)");
        test.appendChild(testDiv);
        testDiv.innerHTML = `<iframe id="player" width=640 height=360 src=" https://www.youtube.com/embed/${value}?rel=0&amp;enablejsapi=1&amp;widgetid=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
});

