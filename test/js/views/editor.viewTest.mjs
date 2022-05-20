export class EditorViewTest {

  constructor() {
    this.editor = "<div><b>채나은 테스트</b></div>";
  }

  // innerHTML 한 이유 : 새로고침시 버튼 기능까지 유지하려고 (태그까지 들어가야됨)
  get _editorText() {
    return this.editor;
  }

  // 실시간 입력, 버튼 기능 눌렀을 떄에도 적용되기 위함
  saveLocalstorageTest(handler) {

    if(this._editorText) {
      handler({
        text: this._editorText
      });
    }

  }

  // 테스트를 위해 데이터 렌더링 분리
  refreshTextTest(handler) {

    if(handler) {
      this.editor = Object.values(handler);
    }

  }

}
