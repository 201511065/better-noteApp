import {EditorService} from "../../js/services/editor.service.mjs";
import assert from "assert";

const document = {
  para: ['sdffef', 'fsfkej', 'fbkjew', 'kgjs', 'wekrjwelk', 'dfsdfef', 'cvkjs', 'wekrjwl', 'sfdfef', 'wfdfds', 'dfsdfw', 'sdfsdf', 'werdf', 'vbvbfdg', 'wesdsfs', 'vcbc', 'sdffsf', 'sdfefdfs', 'wfewef', 'www.naver.com'],
  bold: [[8, 0, 5], [17, 0, 7]],
  italic: [[0, 0, 5], [5, 0, 6], [12, 0, 2], [18, 0, 5]],
  underLine: [[4, 0, 8], [9, 0, 5], [16, 0, 5]],
  orderList: [[1, 3], [6, 7]],
  unOrderList: [[10, 11], [13, 15]],
  leftAlign: [17, 18],
  rightAlign: [12],
  centerAlign: [16],
  link: [[19, 'https://www.naver.com']],
  img: []
}

const paraArray = ['right;">?????', 'center;">hihihi', 'm<b>yname</b>', '<b>is</b>',
  '<ol><li>chae na eun', 'wer', 'ssss</li></ol>', 'right;\"><i>mungga</i>', 'd<u>ltkddltkd</u>',
  '<ul><li>dltksgksep</li></ul>', 'center;">dhodlfjsmsrjdi', '<i>wpqkfdlfjwlak</i>',
  "<a href=\"https://www.naver.com\">www.naver.com</a>"];

const paraArray2 = ['<b>1234567890</b>', '1<i>234567890</i><br>', '<u>1234567</u>890<br>', 'center;">1234567890<br>', 'center;">1234567890<br>', 'right;">1234567890<br>', '<ol><li>1234567890', '1234567890</li></ol><ul><li><span style="font-size: 1.5rem;">1234567890</span>', '1234567890', '1234567890</li></ul>', '<a href="https://www.naver.com">1234567890</a>', '12<b>345678</b>90<br>'];

const s = new EditorService();

describe("인덱스를 제대로 저장하는지 확인한다.", (done) => {

  it("숫자로 정렬된 리스트는 4번째 인덱스부터 6번째 인덱스까지 적용되어 있다.", (done) => {
      let arr = s.indexToList(paraArray, 'ol');
      assert.deepEqual(arr, [[4,6]]);

      done();
  });

  it("오른쪽 정렬된 문자열은 0번째와 7번째 문자열이다", (done) => {
    let arr = s.indexToAlign(paraArray, 'right');
    assert.deepEqual(arr, [0,7]);

    done();
  });

  it("링크는 14번째 인덱스와 네이버 주소가 들어가있다.", (done) => {
    let arr = s.indexToLink(paraArray);
    assert.deepEqual(arr, [[12, 'https://www.naver.com']]);

    done();
  });

  it("bold, italic, underline 을 같은 메서드로 보냈을때 제대로 인덱스를 뽑아낸다.", (done) => {
    let boldArr = s.indexToBIU(paraArray, 'b');
    assert.deepEqual(boldArr, [[ 2, 1, 5 ], [ 3, 0, 1 ]]);

    let italicArr = s.indexToBIU(paraArray, 'i');
    assert.deepEqual(italicArr, [[7, 0, 5], [11, 0, 12]]);

    let underlineArr = s.indexToBIU(paraArray, 'u');
    assert.deepEqual(underlineArr, [[8, 1, 9]]);

    done();
  })

  done;

})

describe("렌더링이 제대로 되는지 확인한다.", () => {

  it("링크 렌더링이 제대로 되는지 확인한다", () => {

    s.refreshText()
  })

})
