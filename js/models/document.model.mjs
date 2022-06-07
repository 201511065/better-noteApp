export class DocumentModel {

  constructor(para, bold, italic, underLine,
              leftAlign, rightAlign, centerAlign,
              orderList, unOrderList, link) {
    this._para = para;
    this._bold = bold;
    this._italic = italic;
    this._underLine = underLine;
    this._leftAlign = leftAlign;
    this._rightAlign = rightAlign;
    this._centerAlign = centerAlign;
    this._orderList = orderList;
    this._unOrderList = unOrderList;
    this._link = link;
  }

  get para() {
    return this._para;
  }

  set para(value) {
    this._para = value;
  }

  get bold() {
    return this._bold;
  }

  set bold(value) {
    this._bold = value;
  }

  get italic() {
    return this._italic;
  }

  set italic(value) {
    this._italic = value;
  }

  get underLine() {
    return this._underLine;
  }

  set underLine(value) {
    this._underLine = value;
  }

  get leftAlign() {
    return this._leftAlign;
  }

  set leftAlign(value) {
    this._leftAlign = value;
  }

  get rightAlign() {
    return this._rightAlign;
  }

  set rightAlign(value) {
    this._rightAlign = value;
  }

  get centerAlign() {
    return this._centerAlign;
  }

  set centerAlign(value) {
    this._centerAlign = value;
  }

  get orderList() {
    return this._orderList;
  }

  set orderList(value) {
    this._orderList = value;
  }

  get unOrderList() {
    return this._unOrderList;
  }

  set unOrderList(value) {
    this._unOrderList = value;
  }

  get link() {
    return this._link;
  }

  set link(value) {
    this._link = value;
  }
};
