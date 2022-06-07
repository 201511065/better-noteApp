import {DocumentModel} from "../models/document.model.mjs";

export class EditorService {
  constructor() {
    const ts = JSON.parse(localStorage.getItem('_document')) || [];
    if (ts.length !== 0) {
      this.model = new DocumentModel(ts._para, ts._bold, ts._italic, ts._underLine,
                                    ts._leftAlign, ts._rightAlign, ts._centerAlign,
                                    ts._orderList, ts._unOrderList, ts._link);
    }

    //this.model = new DocumentModel();
  }

  // 로컬스토리지에 저장
  _commit(model) {
    localStorage.setItem("_document", JSON.stringify(model));
  }

  // 모델에 저장
  addTextToModel(ts) {
    console.log(ts);
    this.model.bold = ts.document.bold;
    this.model.para = ts.document.para;
    this.model.italic = ts.document.italic;
    this.model.underLine = ts.document.underLine;
    this.model.leftAlign = ts.document.leftAlign;
    this.model.rightAlign = ts.document.rightAlign;
    this.model.centerAlign = ts.document.centerAlign;
    this.model.orderList = ts.document.orderList;
    this.model.unOrderList = ts.document.unOrderList;
    this.model.link = ts.document.link;

    this._commit(this.model);
  }

  // 모델에 저장된 text 가져오기
  getModelText() {

    if (this.model._bold === undefined) {
      this.model._bold = [];
    }
    if (this.model._italic === undefined) {
      this.model._italic = [];
    }
    if (this.model._underLine === undefined) {
      this.model._underLine = [];
    }
    if (this.model._leftAlign === undefined) {
      this.model._leftAlign = [];
    }
    if (this.model._rightAlign === undefined) {
      this.model._rightAlign = [];
    }
    if (this.model._centerAlign === undefined) {
      this.model._centerAlign = [];
    }
    if (this.model._orderList === undefined) {
      this.model._orderList = [];
    }
    if (this.model._unOrderList === undefined) {
      this.model._unOrderList = [];
    }
    if (this.model._link === undefined) {
      this.model._link = [];
    }

    console.log(this.model);
    return this.model;
    //console.log(JSON.parse(localStorage.getItem('_document')));
    //return JSON.parse(localStorage.getItem('_document'));
  }

  btnsEdit(id) {

    switch (id) {
      case 'left': return 'justifyLeft';
      case 'center': return 'justifyCenter';
      case 'right': return 'justifyRight';
      case 'bold': return 'bold';
      case 'italic': return 'italic';
      case 'underline': return 'underline';
      case 'orderList': return 'insertOrderedList';
      case 'unOrderList': return 'insertUnorderedList';
      case 'link': return 'link';
      case 'insertImage': return 'insertImage';
    }

  }

  // bold, italic, underline 인덱스 구하기
  indexToBIU(paraArray, tag) {

    let indexArray = [];
    let startBoldIndexArray = [];
    let endBoldIndexArray = [];

    // 새로고침하고나면 이상하게 paraArray[0]에 빈값이 생성됨
    if(paraArray[0] === '') {
      paraArray.shift();
    }

    paraArray.forEach((value, index) => {

      let biu = value.match("(?<=\<"+tag+">)(.*?)(?=<\/"+tag+">)");

      if (biu != null) {

        indexArray.push(index);
        if (value.includes("left;\">")) {
          startBoldIndexArray.push(value.indexOf("<"+tag+">")-7);
          endBoldIndexArray.push(value.indexOf("</"+tag+">")-11);
        }
        else if(value.includes("right;\">")) {
          startBoldIndexArray.push(value.indexOf("<"+tag+">")-8);
          endBoldIndexArray.push(value.indexOf("</"+tag+">")-12);
        }
        else if(value.includes("center;\">")) {
          startBoldIndexArray.push(value.indexOf("<"+tag+">")-9);
          endBoldIndexArray.push(value.indexOf("</"+tag+">")-13);
        }
        else {
          startBoldIndexArray.push(value.indexOf("<"+tag+">"));
          endBoldIndexArray.push(value.indexOf("</"+tag+">")-4);
        }
      }

    })

    return this.saveIndexByTag(indexArray, startBoldIndexArray, endBoldIndexArray);

  }

  // 태그 b, i, u index 저장하기
  saveIndexByTag(paraIndexArray, startIndexArray, endIndexArray) {

    let array = [];

    if (paraIndexArray.length !== 0 && startIndexArray.length !== 0 && endIndexArray.length !== 0) {

      for (let i=0; i<paraIndexArray.length; i++) {
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
    if(paraArray[0] === '') {
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
          liIndexArray.push(ind[ind.length-1]);
          liArray.push(liIndexArray);

          ind = [];
          liIndexArray = [];
        }
        else {
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
    if(paraArray[0] === '') {
      paraArray.shift();
    }

    paraArray.forEach((value, index) => {

      if (value.includes(align+";\">")) {

        ind.push(index);

      }

    })

    return ind;

  }

  // 링크 인덱스, url 저장
  indexToLink(paraArray) {

    let ind = [];
    let href = [];

    if(paraArray[0] === '') {
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

      for (let i=0; i<hrefArray.length; i++) {
        array[i] = [indArray[i], hrefArray[i]];
      }

    }

    return array;

  }

}
