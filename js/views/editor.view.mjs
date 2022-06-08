
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

    this.insertImageButton = this.createElement('button', 'insertImage');
    this.insertImageButton.append(this.createElement('img', false, './img/image.png'));

    this.createInput({
      key: 'imgFile',
      id: 'imgFile',
      type: 'file',
      accept: 'image/*'
    })

    this.editor = this.createElement('div', 'textField', false);
    this.editor.contentEditable = true;

    this.btns.append(this.leftButton, this.centerButton, this.rightButton, this.boldButton
                    , this.italicButton, this.underlineButton, this.orderListButton, this.unOrderListButton,this.linkButton
                    , this.insertImageButton, this.imgFile);

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
    this.img = [];

  }

  createElement(tag, id, src) {
    const element = document.createElement(tag);

    if (id) element.setAttribute('id', id);
    if (src) element.setAttribute('src', src);

    return element;
  }

  createInput(
    { key, id, type, accept} = {
      key: 'default',
      id: 'default',
      type: 'file',
      accept: 'image/*'
    }
  ) {
    this[key] = this.createElement('input');
    this[key].id = id;
    this[key].type = type;
    this[key].accept = accept;
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
        if (handler(id) === 'insertImage') {
          this.imgFile.click();
          this.setImage();
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
      .replaceAll("</li><li>", "<div>").split("<div>")
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
      //this.img = imgHandler(this.paraArrayToTag);

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
  renderingTextEvent(handler) {

    document.addEventListener('DOMContentLoaded', evt => {
      evt.preventDefault();
      this.refreshText(handler);
      this.clickLink();
    });

  }

  // 데이터 렌더링 분리
  // display 해주기
  refreshText(text) {
    let div = '';

    if(text) {

      loop : for (let p=0; p<text._para.length; p++) {

        div = this.createElement('div');

        div = this.renderingAlign(text, div, p);
        div = this.renderingLink(text, div, p);
        div = this.renderingList(text, div, p);
        div = this.renderingBIU(text, div, p);

        // 리스트는 한 div안에서 한꺼번에 처리해주기 때문에 처리된 para index는 넘어가기
        for (let i=0; i<text._orderList.length; i++) {

          if (text._orderList[i][0] < p && p <= text._orderList[i][1]) {
            continue loop;
          }

        }

        for (let i=0; i<text._unOrderList.length; i++) {

          if (text._unOrderList[i][0] < p && p <= text._unOrderList[i][1]) {
            continue loop;
          }

        }

        // 태그 따로 없을 때
        if(div.innerText === '') {
          div.append(text._para[p]);
        }

        this.editor.append(div);

      }

    }

  }

  // 왼, 오, 가운데 정렬 렌더링
  renderingAlign(text, div, p) {

    let leftNum = -1;
    let rightNum = -1;
    let centerNum = -1;

    for(let i=0; i<text._leftAlign.length; i++) {
      if(text._leftAlign[i] === p) {
        leftNum = i;
        break;
      }
    }

    for(let i=0; i<text._rightAlign.length; i++) {
      if(text._rightAlign[i] === p) {
        rightNum = i;
        break;
      }
    }

    for(let i=0; i<text._centerAlign.length; i++) {
      if(text._centerAlign[i] === p) {
        centerNum = i;
        break;
      }
    }

    // 왼, 오, 가 정렬 스타일 적용
    if (rightNum > -1) {
      div.style.textAlign = "right"
    }
    else if (centerNum > -1) {
      div.style.textAlign = "center"
    }
    else if (leftNum > -1) {
      div.style.textAlign = "left"
    }

    return div;

  }

  // 링크 렌더링
  renderingLink(text, div, p) {
    let linkNum = -1;

    for(let i=0; i<text._link.length; i++) {
      if(text._link[i][0] === p) {
        linkNum = i;
        break;
      }
    }

    if (linkNum > -1) {

      let a = this.createElement('a');
      a.href = text._link[linkNum][1];

      a.append(text._para[p]);

      div.append(a);

    }

    return div;

  }

  // 리스트 렌더링
  renderingList(text, div, p) {

    let orderNum = -1;
    let unOrderNum = -1;

    for(let i=0; i<text._orderList.length; i++) {
      if(text._orderList[i][0] === p) {
        orderNum = i;
        break;
      }
    }

    for(let i=0; i<text._unOrderList.length; i++) {
      if(text._unOrderList[i][0] === p) {
        unOrderNum = i;
        break;
      }
    }

    // 리스트 두개 넣기
    // 다음 문자열로 넘어갈 때 태그가 없는것으로 판단되어 한번 더 들어감
    if (orderNum > -1) {
      let ol = this.createElement('ol');

      for (let i = p; i <= text._orderList[orderNum][1]; i++) {
        let li = this.createElement('li');
        li.append(text._para[i]);
        ol.append(li);
      }

      div.append(ol);

    }

    if (unOrderNum > -1) {
      let ul = this.createElement('ul');

      for (let i = p; i <= text._unOrderList[unOrderNum][1]; i++) {
        let li = this.createElement('li');
        li.append(text._para[i]);
        ul.append(li);
      }

      div.append(ul);

    }

    return div;

  }

  // 굵게, 기울기, 언더라인 렌더링
  renderingBIU(text, div, p) {

    let iNum = -1;
    let bNum = -1;
    let uNum = -1;

    // 각각의 버튼 기능이 있는 문자열 인덱스 찾기
    for(let i=0; i<text._bold.length; i++) {
      if(text._bold[i][0] === p) {
        bNum = i;
        break;
      }
    }

    for(let i=0; i<text._italic.length; i++) {
      if(text._italic[i][0] === p) {
        iNum = i;
        break;
      }
    }

    for(let i=0; i<text._underLine.length; i++) {
      if(text._underLine[i][0] === p) {
        uNum = i;
        break;
      }
    }

    // bold 만 있다는 뜻
    if (bNum > -1) {

      div = this.renderingBIUTag(text._para, text._bold, div, p, bNum, 'b')

    }
    // italic 만 있다는 뜻
    if (iNum > -1) {

      div = this.renderingBIUTag(text._para, text._italic, div, p, iNum, 'i')

    }

    if (uNum > -1) {

      div = this.renderingBIUTag(text._para, text._underLine, div, p, uNum, 'u')

    }

    return div;

  }

  renderingBIUTag(para, text, div, p, num, tag) {

    let s = this.createElement(tag);
    let str = '';
    let biuStr = '';

    for (let k = 0; k < para[p].length; k++) {

      if (k !== text[num][1]) {
        str = para[p].charAt(k);
        div.append(str);
        str = '';
      }
      else {

        for (let t = k; t<= text[num][2]; t++) {
          biuStr += para[p].charAt(t);
        }

        s.append(biuStr);
        div.append(s);

        s = '';
        biuStr = '';
        k = text[num][2];

      }

    }

    return div;

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

  // 이미지 넣기
  setImage() {

    this.imgFile.addEventListener('change', ev => {

      const files = ev.currentTarget.files;

      if(!!files) {
        this.insertImgData(files[0]);
      }

      // 같은 이미지 넣을수 있도록
      // 이미지 넣을수록 계속 증가됨을 방지 초기화
      ev.target.value = '';

    });

  }

  insertImgData(file) {

    if(file) {

      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.focusEditor();
        document.execCommand('insertImage', false, `${reader.result}`);
      });

      reader.readAsDataURL(file);

    }

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

