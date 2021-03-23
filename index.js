//
// index.js
//

function initialize() {
  // move p5.js default canvas to <div id="preview">

  let defaultCanvasElement = document.getElementById('defaultCanvas0');
  let previewElement = document.getElementById('preview');

  if (defaultCanvasElement && previewElement)
    previewElement.appendChild(defaultCanvasElement);
}

window.onload = initialize;
