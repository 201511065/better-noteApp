import {DocumentModel} from "../models/document.model.mjs";

export class EditorService {
  constructor() {
    const ts = JSON.parse(localStorage.getItem('_document')) || [];
    this.model = new DocumentModel(ts._para, ts._bold, ts._italic, ts._underLine,
      ts._leftAlign, ts._rightAlign, ts._centerAlign,
      ts._orderList, ts._unOrderList, ts._link);

    //this.model = new DocumentModel();
  }

  // 로컬스토리지에 저장
  _commit(model) {
    localStorage.setItem("_document", JSON.stringify(model));
  }

  // 모델에 저장
  addTextToModel(ts) {
    this.model.para = ts.document.para;
    this.model.bold = ts.document.bold;
    this.model.italic = ts.document.italic;
    this.model.underLine = ts.document.underLine;
    this.model.leftAlign = ts.document.leftAlign;
    this.model.rightAlign = ts.document.rightAlign;
    this.model.centerAlign = ts.document.centerAlign;
    this.model.orderList = ts.document.orderList;
    this.model.unOrderList = ts.document.unOrderList;
    this.model.link = ts.document.link;

    if (this.model.para === undefined) {
      this.model.para = [];
    }
    if (this.model.bold === undefined) {
      this.model.bold = [];
    }
    if (this.model.italic === undefined) {
      this.model.italic = [];
    }
    if (this.model.underLine === undefined) {
      this.model.underLine = [];
    }
    if (this.model.leftAlign === undefined) {
      this.model.leftAlign = [];
    }
    if (this.model.rightAlign === undefined) {
      this.model.rightAlign = [];
    }
    if (this.model.centerAlign === undefined) {
      this.model.centerAlign = [];
    }
    if (this.model.orderList === undefined) {
      this.model.orderList = [];
    }
    if (this.model.unOrderList === undefined) {
      this.model.unOrderList = [];
    }
    if (this.model.link === undefined) {
      this.model.link = [];
    }

    this._commit(this.model);
  }

  rendering() {

    let rootDiv = '';
    let div = "<div>";

    if (this.model) {

      loop : for (let p = 0; p < this.model.para.length; p++) {

        div = this.renderingAlign(div, p);
        div += this.renderingBIU(p);
        div += this.renderingLink(p);
        div += this.renderingList(p);

        // 리스트는 한 div안에서 한꺼번에 처리해주기 때문에 처리된 para index는 넘어가기
        for (let i = 0; i < this.model.orderList.length; i++) {

          if (this.model.orderList[i][0] < p && p <= this.model.orderList[i][1]) {
            continue loop;
          }

        }

        for (let i = 0; i < this.model.unOrderList.length; i++) {

          if (this.model.unOrderList[i][0] < p && p <= this.model.unOrderList[i][1]) {
            continue loop;
          }

        }

        if (div === "<div>" || div === '<div style=\"text-align: right;\">'
          || div === '<div style=\"text-align: left;\">'
          || div === '<div style=\"text-align: center;\">') {
          div += this.model.para[p];
        }

        div += "</div>"

        rootDiv += div;

        div = "<div>";

      }

    }

    return rootDiv;
  }

  // 왼, 오, 가운데 정렬 렌더링
  renderingAlign(div, p) {

    let leftNum = -1;
    let rightNum = -1;
    let centerNum = -1;

    for (let i = 0; i < this.model.leftAlign.length; i++) {
      if (this.model.leftAlign[i] === p) {
        leftNum = i;
        break;
      }
    }

    for (let i = 0; i < this.model.rightAlign.length; i++) {
      if (this.model.rightAlign[i] === p) {
        rightNum = i;
        break;
      }
    }

    for (let i = 0; i < this.model.centerAlign.length; i++) {
      if (this.model.centerAlign[i] === p) {
        centerNum = i;
        break;
      }
    }

    // 왼, 오, 가 정렬 스타일 적용
    if (rightNum > -1) {
      div = '<div style=\"text-align: right;\">'
    } else if (centerNum > -1) {
      div = '<div style=\"text-align: center;\">'
    } else if (leftNum > -1) {
      div = '<div style=\"text-align: left;\">'
    } else {
      div = '<div>'
    }

    return div;

  }

  renderingBIU(p) {

    let tag = '';
    let iNum = -1;
    let bNum = -1;
    let uNum = -1;

    // 각각의 버튼 기능이 있는 문자열 인덱스 찾기
    for (let i = 0; i < this.model.bold.length; i++) {
      if (this.model.bold[i][0] === p) {
        bNum = i;
        break;
      }
    }

    for (let i = 0; i < this.model.italic.length; i++) {
      if (this.model.italic[i][0] === p) {
        iNum = i;
        break;
      }
    }

    for (let i = 0; i < this.model.underLine.length; i++) {
      if (this.model.underLine[i][0] === p) {
        uNum = i;
        break;
      }
    }

    if (bNum > -1) {
      tag = this.rederingBIUTag(this.model.bold, p, bNum, 'b');
    }
    if (iNum > -1) {
      tag = this.rederingBIUTag(this.model.italic, p, iNum, 'i');
    }
    if (uNum > -1) {
      tag = this.rederingBIUTag(this.model.underLine, p, uNum, 'u');
    }

    return tag;

  }

  rederingBIUTag(text, p, num, tag) {
    let s = '';

    let div = '';
    let str = '';
    let biuStr = '';

    for (let k = 0; k < this.model.para[p].length; k++) {

      if (k !== text[num][1]) {
        str = this.model.para[p].charAt(k);
        div += str;
        str = '';
      } else {

        if (tag === 'b')
          s = "<b>";
        else if (tag === 'i')
          s = "<i>";
        else if (tag === 'u')
          s = "<u>";

        for (let t = k; t <= text[num][2]; t++) {
          biuStr += this.model.para[p].charAt(t);
        }

        s += biuStr;
        div += s;

        s = '';
        biuStr = '';
        k = text[num][2];

        if (div.includes("<b>"))
          div += "</b>";
        else if (div.includes("<i>"))
          div += "</i>";
        else if (div.includes("<u>"))
          div += "</u>";

      }

    }

    return div;

  }

  // 링크 렌더링
  renderingLink(p) {
    let linkNum = -1;
    let a = '';

    for (let i = 0; i < this.model.link.length; i++) {
      if (this.model.link[i][0] === p) {
        linkNum = i;
        break;
      }
    }

    if (linkNum > -1) {

      a = '<a href="' + this.model.link[linkNum][1] + '"/>';

      a += this.model.para[p];

    }

    return a;

  }

  // 리스트 렌더링
  renderingList(p) {

    let tag = '';
    let orderNum = -1;
    let unOrderNum = -1;

    for (let i = 0; i < this.model.orderList.length; i++) {
      if (this.model.orderList[i][0] === p) {
        orderNum = i;
        break;
      }
    }

    for (let i = 0; i < this.model.unOrderList.length; i++) {
      if (this.model.unOrderList[i][0] === p) {
        unOrderNum = i;
        break;
      }
    }

    // 리스트 두개 넣기
    // 다음 문자열로 넘어갈 때 태그가 없는것으로 판단되어 한번 더 들어감
    if (orderNum > -1) {
      let ol = "<ol>";

      for (let i = p; i <= this.model.orderList[orderNum][1]; i++) {
        let li = "<li>";
        li += this.model.para[i];
        li += "</li>";
        ol += li;
      }

      ol += "</ol>"

      tag = ol;

    }

    if (unOrderNum > -1) {
      let ul = "<ul>";

      for (let i = p; i <= this.model.unOrderList[unOrderNum][1]; i++) {
        let li = "<li>";
        li += this.model.para[i];
        li += "</li>";
        ul += li;
      }

      ul += "</ul>";

      tag = ul;

    }

    return tag;

  }

  btnsEdit(id) {

    switch (id) {
      case 'left':
        return 'justifyLeft';
      case 'center':
        return 'justifyCenter';
      case 'right':
        return 'justifyRight';
      case 'bold':
        return 'bold';
      case 'italic':
        return 'italic';
      case 'underline':
        return 'underline';
      case 'orderList':
        return 'insertOrderedList';
      case 'unOrderList':
        return 'insertUnorderedList';
      case 'link':
        return 'link';
      case 'insertImage':
        return 'insertImage';
    }

  }

  // bold, italic, underline 인덱스 구하기
  indexToBIU(paraArray, tag) {

    let indexArray = [];
    let startBoldIndexArray = [];
    let endBoldIndexArray = [];

    // 새로고침하고나면 이상하게 paraArray[0]에 빈값이 생성됨
    if (paraArray[0] === '') {
      paraArray.shift();
    }

    paraArray.forEach((value, index) => {

      let biu = value.match("(?<=\<" + tag + ">)(.*?)(?=<\/" + tag + ">)");

      if (biu != null) {

        indexArray.push(index);
        if (value.includes("left;\">")) {
          startBoldIndexArray.push(value.indexOf("<" + tag + ">") - 7);
          endBoldIndexArray.push(value.indexOf("</" + tag + ">") - 11);
        } else if (value.includes("right;\">")) {
          startBoldIndexArray.push(value.indexOf("<" + tag + ">") - 8);
          endBoldIndexArray.push(value.indexOf("</" + tag + ">") - 12);
        } else if (value.includes("center;\">")) {
          startBoldIndexArray.push(value.indexOf("<" + tag + ">") - 9);
          endBoldIndexArray.push(value.indexOf("</" + tag + ">") - 13);
        } else {
          startBoldIndexArray.push(value.indexOf("<" + tag + ">"));
          endBoldIndexArray.push(value.indexOf("</" + tag + ">") - 4);
        }
      }

    })

    return this.saveIndexByTag(indexArray, startBoldIndexArray, endBoldIndexArray);

  }

  // 태그 b, i, u index 저장하기
  saveIndexByTag(paraIndexArray, startIndexArray, endIndexArray) {

    let array = [];

    if (paraIndexArray.length !== 0 && startIndexArray.length !== 0 && endIndexArray.length !== 0) {

      for (let i = 0; i < paraIndexArray.length; i++) {
        array[i] = [paraIndexArray[i], startIndexArray[i], endIndexArray[i]];
      }

    }

    return array;

  }

  // 숫자, 점 리스트 인덱스 저장
  indexToList(paraArray, tag) {

    let liIndexArray = [];
    let ind = [];
    let liArray = [];

    // 새로고침하고나면 이상하게 paraArray[0]에 빈값이 생성됨
    if (paraArray[0] === '') {
      paraArray.shift();
    }

    paraArray.forEach((value, index) => {

      let orderList;
      if (value.includes(tag)) {
        orderList = value.replace(/<(\/ol|ol)([^>]*)>/gi, "").replace(/<(\/ul|ul)([^>]*)>/gi, "");
      }

      if (orderList) {

        if (value.includes("</ol>") || value.includes("</ul>")) {
          ind.push(index);
          liIndexArray.push(ind[0]);
          liIndexArray.push(ind[ind.length - 1]);
          liArray.push(liIndexArray);

          ind = [];
          liIndexArray = [];
        } else {
          ind.push(index);
        }

      }

    });

    return liArray;

  }

  // 왼, 오, 가운데 정렬 인덱스 저장
  indexToAlign(paraArray, align) {

    let ind = [];

    // 새로고침하고나면 이상하게 paraArray[0]에 빈값이 생성됨
    if (paraArray[0] === '') {
      paraArray.shift();
    }

    paraArray.forEach((value, index) => {

      if (value.includes(align + ";\">")) {

        ind.push(index);

      }

    })

    return ind;

  }

  // 링크 인덱스, url 저장
  indexToLink(paraArray) {

    let ind = [];
    let href = [];

    if (paraArray[0] === '') {
      paraArray.shift();
    }

    paraArray.forEach((value, index) => {
      let link = value.match("(?<=\<a href=\")(.*?)(?=\"\>)");

      if (link != null) {
        ind.push(index);
        href.push(link[0]);
      }

    })

    return this.saveIndexByLink(ind, href);

  }

  saveIndexByLink(indArray, hrefArray) {

    let array = [];

    if (indArray.length !== 0 && hrefArray.length !== 0) {

      for (let i = 0; i < hrefArray.length; i++) {
        array[i] = [indArray[i], hrefArray[i]];
      }

    }

    return array;

  }

}
