const FileUtils = {
  saveFileToClient: (filename, content) => {
    const element = document.createElement('a');
    const contentText = JSON.stringify(content, null, 2);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contentText));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
};

module.exports = {
  FileUtils
};

