import {EditorServiceTest} from "./services/editor.serviceTest.mjs";
import {EditorViewTest} from "./views/editor.viewTest.mjs";
import {EditorControllerTest} from "./controllers/editor.controllerTest.mjs";
import assert from "assert";
import jsdom from "mocha-jsdom"

const testText = {
  text: "<div><i>하이하이</i></div>"
};

const main = new EditorControllerTest(new EditorServiceTest(), new EditorViewTest());
const s = new EditorServiceTest();
const v = new EditorViewTest();

describe("text를 저장한다.", () => {

  it("바로 model에 testText를 저장한다", () => {

    s.addTextToModelTest(testText);

    assert.equal(s.getModelTextTest(), testText.text);

  })

  it("컨트롤러를 통해서 view의 saveLocalstorage가 제대로 작동하는지 확인한다.", () => {

    main.setTest();

    assert.equal(main.getTest(), "<div><b>채나은 테스트</b></div>")

  })

})

describe("text가 제대로 렌더링 되는지 확인한다", () => {

  it("모델에 데이터를 저장하고 렌더링 시킨 후 모델의 데이터와 같은지 확인한다.", (done) => {
    try {
      // this.editor 내용을 모델에 저장
      main.setTest();

      // 테스트에 있는 가짜 데이터를 모델에 저장
      main.setText(testText);

      // 데이터 렌더링
      main.renderingTest();

      // 에러나는게 맞음
      assert.equal(main.getTest(), v._editorText);
      done();
    }
    catch (e) {
      done(e);
    }
  });

})



global.document = jsdom({url: "http://localhost"});

global.localStorage = {
  data: {},
  setItem(key, value) {
    this.data[key] = value;
  },
  getItem(key) {
    return this.data[key];
  },
  removeItem(key) {
    return this.data[key];
  }
};


describe('가상 dom sample Test', function() {

  it("div element 가 존재할것이다", (done) => {
    try {
      let div = document.createElement('div');
      assert.equal(true, div != null);
      done();
    }
    catch (e) {
      done(e);
    }

  });

});

describe("가상 로컬스토리지에 저장한다.", () => {

  global.localStorage.setItem("text","<div>반갑습니다.</div>");

  it("로컬스토리지에 text가 저장되었다. ", () => {

    let text = global.localStorage.getItem("text");
    console.log(text);
    assert.equal(text, "<div>반갑습니다.</div>")

  })
})
