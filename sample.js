let resoArray = new Array();

function resoSet() {
    let resolution = 'small';
  
      if (resolution === 'small') {
        resoArray = ['320', '180'];
      } else if (width === 'middle'){
        resoArray = ['400', '270'];
      } else {
        resoArray = ['800', '450'];
      }
      console.log (resoArray[0]);
  }
  
resoSet();