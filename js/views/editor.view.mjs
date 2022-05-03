export class EditorView {

  constructor() {
    this.editor = document.getElementById('textField')
    this.buttonAll = document.querySelectorAll('button');
    this.imgFile = document.getElementById('imgFile')
  }

  btnsEdit() {
    this.buttonAll.forEach(value => {
      value.addEventListener('click', ev => {

        let id = ev.target.closest('button').getAttribute('data-nav-btn');

        switch (id) {
          case 'left': this.setStyle('justifyLeft'); break;
          case 'center': this.setStyle('justifyCenter'); break;
          case 'right': this.setStyle('justifyRight'); break;
          case 'bold': this.setStyle('bold'); break;
          case 'italic': this.setStyle('italic'); break;
          case 'underline': this.setStyle('underline'); break;
          case 'orderList': this.setStyle('insertOrderedList'); break;
          case 'unOrderList': this.setStyle('insertUnorderedList'); break;
          case 'link':
            this.addLink()
              .then(v => console.log(v))
              .catch(e => console.log(e));
            break;
          case 'insertImage': this.setImage(); break;
        }

      })
    })
  }

  // 하이퍼링크 생성
  async addLink() {

    this.focusEditor();
    const url = prompt("URL을 입력해 주세요: ", "");
    // 하이퍼 링크 생성
    document.execCommand('createLink', false, url);

    const links = this.editor.querySelectorAll('a');

    links.forEach(item => {

      // _blank 는 새창으로 열리기
      // 그냥 createLink 만 걸면 하이퍼 링크는 생기는데 이동이 안됨
      // 그래서 click 이벤트를 걸어줌
      item.addEventListener('click', ev => {
        window.open(item.href, "_blank");
      });

    });

  }

  setImage() {

    this.imgFile.click();

    this.imgFile.addEventListener('change', ev => {
      const files = ev.currentTarget.files;

      if(files) {
        this.insertImgData(files[0]);
      }

    });

  }

  insertImgData(file) {
    const reader = new FileReader();

    reader.addEventListener('load', ev => {
      this.focusEditor();
      document.execCommand('insertImage', false, `${reader.result}`);
    });

    reader.readAsDataURL(file);
  }

  setStyle(style) {
    document.execCommand(style);
    this.focusEditor();
  }

  // 에디터에서 포커스 날아가는것을 방지
  focusEditor() {
    this.editor.focus({preventScroll: true});
  }

}

