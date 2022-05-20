import {EditorServiceTest} from "../services/editor.serviceTest.mjs";
import {EditorViewTest} from "../views/editor.viewTest.mjs";

export class EditorControllerTest {

  constructor(editorService, editorView) {
    this.editorService = editorService;
    this.editorView = editorView;

    this.setTest();
    this.getTest();

  }

  setTest() {
    this.editorView.saveLocalstorageTest(this.setText)
  }

  renderingTest() {
    this.editorView.refreshTextTest(this.getTest());
  }

  setText = text => {
    this.editorService.addTextToModelTest(text);
  }

  getTest() {
    return this.editorService.getModelTextTest();
  }

}
