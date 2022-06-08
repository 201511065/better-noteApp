export class EditorController {

  constructor(editorService, editorView) {
    this.editorService = editorService;
    this.editorView = editorView;

    this.editorView.bindBtnsEdit(this.handleBtnsEdit);
    this.editorView.inputDocument(this.setText, this.handelIndexBIU,
      this.handleIndexList, this.handleIndexAlign
      , this.handleIndexLink);
    //this.editorView.renderingTextEvent(this.getText());
    this.editorView.renderingText(this.handleRendering());
  }

  // 실시간 문자 받아서 모델, 로컬스토리지에 저장하기
  setText = text => {
    this.editorService.addTextToModel(text);
  }

  handleRendering() {
    return this.editorService.rendering()
  }

  // 값 가져오기
  getText() {
    return this.editorService.getModelText();
  }

  handleBtnsEdit = id => {
    return this.editorService.btnsEdit(id);
  }

  handelIndexBIU = (paraArray, tag) => {
    return this.editorService.indexToBIU(paraArray, tag);
  }

  handleIndexList = (paraArray, tag) => {
    return this.editorService.indexToList(paraArray, tag);
  }

  handleIndexAlign = (paraArray, align) => {
    return this.editorService.indexToAlign(paraArray, align);
  }

  handleIndexLink = paraArray => {
    return this.editorService.indexToLink(paraArray);
  }

}
