export class EditorController {

  constructor(editorService, editorView) {
    this.editorService = editorService;
    this.editorView = editorView;

    this.editorView.btnsEditDocument(this.handleBtnsEdit);
    this.editorView.editDocument(this.setText, this.handelIndexBIU,
      this.handleIndexList, this.handleIndexAlign
      , this.handleIndexLink);
    this.editorView.renderingText(this.handleRendering());

  }

  // 실시간 문자 받아서 모델, 로컬스토리지에 저장하기
  setText = text => {
    this.editorService.addTextToModel(text);
  }

  handleRendering() {
    return this.editorService.rendering();
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
