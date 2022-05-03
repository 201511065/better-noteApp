export class EditorController {

  constructor(editorService, editorView) {
    this.editorService = editorService;
    this.editorView = editorView;

    this.editorView.btnsEdit();

  }

}
