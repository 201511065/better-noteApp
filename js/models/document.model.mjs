export class DocumentModel {

  constructor(para, bold, italic, underLine,
              leftAlign, rightAlign, centerAlign,
              orderList, unOrderList, link) {
    this.docPara = para;
    this.docBold = bold;
    this.docItalic = italic;
    this.docUnderLine = underLine;
    this.docLeftAlign = leftAlign;
    this.docRightAlign = rightAlign;
    this.docCenterAlign = centerAlign;
    this.docOrderList = orderList;
    this.docUnOrderList = unOrderList;
    this.docLink = link;
  }

  get para() {
    return this.docPara;
  }

  set para(value) {
    this.docPara = value;
  }

  get bold() {
    return this.docBold;
  }

  set bold(value) {
    this.docBold = value;
  }

  get italic() {
    return this.docItalic;
  }

  set italic(value) {
    this.docItalic = value;
  }

  get underLine() {
    return this.docUnderLine;
  }

  set underLine(value) {
    this.docUnderLine = value;
  }

  get leftAlign() {
    return this.docLeftAlign;
  }

  set leftAlign(value) {
    this.docLeftAlign = value;
  }

  get rightAlign() {
    return this.docRightAlign;
  }

  set rightAlign(value) {
    this.docRightAlign = value;
  }

  get centerAlign() {
    return this.docCenterAlign;
  }

  set centerAlign(value) {
    this.docCenterAlign = value;
  }

  get orderList() {
    return this.docOrderList;
  }

  set orderList(value) {
    this.docOrderList = value;
  }

  get unOrderList() {
    return this.docUnOrderList;
  }

  set unOrderList(value) {
    this.docUnOrderList = value;
  }

  get link() {
    return this.docLink;
  }

  set link(value) {
    this.docLink = value;
  }
};
