import {DocumentModelTest} from "../models/document.modelTest.mjs";

export class EditorServiceTest {
  constructor() {
    const ts = "";
    this.model = new DocumentModelTest(ts);

  }

  // 모델에 저장
  addTextToModelTest(ts) {
    this.model = ts;

  }

  getModelTextTest() {
    return this.model.text;
  }

}
