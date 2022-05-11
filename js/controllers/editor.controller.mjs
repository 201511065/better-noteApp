export class EditorController {

  constructor(editorService, editorView) {
    this.editorService = editorService;
    this.editorView = editorView;

    this.editorView.btnsEdit();

    this.editorView.inputText(this.setText);
    this.editorView.refreshText(this.getText());

  }

  // 실시간 문자 받아서 모델, 로컬스토리지에 저장하기
  setText = text => {
    this.editorService.addTextToModel(text);
  }

  // 로컬스토리지에 저장되어있는 값 가져오기
  getText() {
    return this.editorService.getStorageText();
  }


}
