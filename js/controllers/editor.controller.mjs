export class EditorController {

  constructor(editorService, editorView) {
    this.editorService = editorService;
    this.editorView = editorView;

    this.editorView.btnsEdit(this.setText);

    this.editorView.inputText(this.setText);
    this.editorView.refreshTextEvent(this.getText());

  }

  // 실시간 문자 받아서 모델, 로컬스토리지에 저장하기
  setText = text => {
    this.editorService.addTextToModel(text);
  }

  // 값 가져오기
  getText() {
    return this.editorService.getModelText();
  }


}
