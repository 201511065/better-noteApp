
export class EditorView {

  constructor() {
    this.app = this.getElement('.wrapper');

    this.btns = this.getElement('.btns');

    this.leftButton = this.createElement('button', 'left');
    this.leftButton.append(this.createElement('img', false, './img/left.png'));

    this.centerButton = this.createElement('button', 'center');
    this.centerButton.append(this.createElement('img', false, './img/center.png'));

    this.rightButton = this.createElement('button', 'right');
    this.rightButton.append(this.createElement('img', false, './img/right.png'));

    this.boldButton = this.createElement('button', 'bold');
    this.boldButton.append(this.createElement('img', false, './img/bold.png'));

    this.italicButton = this.createElement('button', 'italic');
    this.italicButton.append(this.createElement('img', false, './img/italic.png'));

    this.underlineButton = this.createElement('button', 'underline');
    this.underlineButton.append(this.createElement('img', false, './img/underline.png'));

    this.orderListButton = this.createElement('button', 'orderList');
    this.orderListButton.append(this.createElement('img', false, './img/orderList.png'));

    this.unOrderListButton = this.createElement('button', 'unOrderList');
    this.unOrderListButton.append(this.createElement('img', false, './img/nonOrderList.png'));

    this.linkButton = this.createElement('button', 'link');
    this.linkButton.append(this.createElement('img', false, './img/link.png'));

    this.editor = this.createElement('div', 'textField', false);
    this.editor.contentEditable = true;

    this.btns.append(this.leftButton, this.centerButton, this.rightButton, this.boldButton
                    , this.italicButton, this.underlineButton, this.orderListButton, this.unOrderListButton,this.linkButton);
                    //, this.insertImageButton, this.imgFile

    this.app.append(this.btns, this.editor);

    this.buttonAll = this.getElementAll('button');

    this.para = [];
    this.bold = [];
    this.italic = [];
    this.underLine = [];
    this.orderList = [];
    this.unOrderList = [];
    this.leftAlign = [];
    this.rightAlign = [];
    this.centerAlign = [];
    this.link = [];

    this.preventEvent();

  }

  createElement(tag, id, src) {
    const element = document.createElement(tag);

    if (id) element.setAttribute('id', id);
    if (src) element.setAttribute('src', src);

    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  getElementAll(selector) {
    return document.querySelectorAll(selector);
  }

  bindBtnsEdit(handler) {
    this.buttonAll.forEach(value => {
      value.addEventListener('click', ev => {

        let id = ev.target.closest('button').getAttribute('id');

        if (handler(id) === 'link') {
          this.addLink().catch(e => console.log(e));
        }

        this.setStyle(handler(id));

      });
    });
  }

  get _document() {
    const document = {
      para: this.para,
      bold: this.bold,
      italic: this.italic,
      underLine: this.underLine,
      orderList: this.orderList,
      unOrderList: this.unOrderList,
      leftAlign: this.leftAlign,
      rightAlign: this.rightAlign,
      centerAlign: this.centerAlign,
      link: this.link
    }

    return document;
  }

  // 스트링을 배열로 저장
  savePara() {
    this.para = this.editor.innerText.split("\n");
  }

  // div 제외하고 태그들 찾으려고 , 엔터기준으로 배열 생성
  get paraArrayToTag() {
    return this.editor.innerHTML.replaceAll("</div>", "")
      .replaceAll('<div style="text-align: ', "<div>")
      .replaceAll("</li><li>", "<div>")
      .replaceAll("<body>", "")
      .replaceAll("</body>", "")
      .split("<div>")
  }

  preventEvent() {
    window.addEventListener("copy", e => {
      alert("복사 및 붙여넣기 금지");
      e.preventDefault();
      e.clipboardData.clearData("Text");
    })
    window.addEventListener("paste", e => {
      alert("복사 및 붙여넣기 금지");
      e.preventDefault();
      e.clipboardData.clearData("Text");
    })
  }

  inputDocument(handler, biuHandler
              , listHandler, alignHandler, linkHandler) {

    this.editor.addEventListener('keydown', () => {

      // 엔터기준으로 문자열 저장하기
      this.savePara();

      this.bold = biuHandler(this.paraArrayToTag, 'b');
      this.italic = biuHandler(this.paraArrayToTag, 'i');
      this.underLine = biuHandler(this.paraArrayToTag, 'u');
      this.orderList = listHandler(this.paraArrayToTag, 'ol');
      this.unOrderList = listHandler(this.paraArrayToTag, 'ul');
      this.leftAlign = alignHandler(this.paraArrayToTag, 'left');
      this.rightAlign = alignHandler(this.paraArrayToTag, 'right');
      this.centerAlign = alignHandler(this.paraArrayToTag, 'center');
      this.link = linkHandler(this.paraArrayToTag);

      // model 저장
      this.saveModel(handler);

    });

  }

  saveModel(handler) {

    if(this._document) {
      handler({
        document : {
          para : this._document.para,
          bold : this._document.bold,
          italic : this._document.italic,
          underLine: this._document.underLine,
          orderList: this._document.orderList,
          unOrderList: this._document.unOrderList,
          leftAlign: this._document.leftAlign,
          rightAlign: this._document.rightAlign,
          centerAlign: this._document.centerAlign,
          link: this._document.link
        }
      });
    }

  }

  // 데이터 렌더링
  renderingText(handler) {

    document.addEventListener('DOMContentLoaded', evt => {
      evt.preventDefault();
      let doc = new DOMParser().parseFromString(handler, "text/html");

      this.editor.append(doc.body)
      this.clickLink();
    });

  }

  // 하이퍼링크 생성
  async addLink() {

    this.focusEditor();
    const url = prompt("URL을 입력해 주세요: ", "");
    // 하이퍼 링크 생성
    document.execCommand('createLink', false, url);

    this.clickLink();

  }

  clickLink() {

    const links = this.editor.querySelectorAll('a');

    links.forEach(item => {

      // _blank 는 새창으로 열리기
      // 그냥 createLink 만 걸면 하이퍼 링크는 생기는데 이동이 안됨
      // 그래서 click 이벤트를 걸어줌
      item.addEventListener('click', () => {
        window.open(item.href, "_blank");
      });

    });

  }

  setStyle(style) {

    document.execCommand(style);

    document.querySelectorAll('i').forEach((value) => {
      value.removeAttribute("style");
    });
    document.querySelectorAll('b').forEach((value) => {
      value.removeAttribute("style");
    });

    this.focusEditor();

  }

  // 에디터에서 포커스 날아가는것을 방지
  focusEditor() {
    this.editor.focus({preventScroll: true});
  }

}

