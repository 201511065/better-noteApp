import {EditorService} from "../../js/services/editor.service.mjs";
import assert from "assert";

const paraArray = ['right;">?????', 'center;">hihihi', 'm<b>yname</b>', '<b>is</b>',
  '<ol><li>chae na eun', 'wer', 'ssss</li></ol>', 'right;\"><i>mungga</i>', 'd<u>ltkddltkd</u>',
  '<ul><li>dltksgksep</li></ul>', 'center;">dhodlfjsmsrjdi', '<i>wpqkfdlfjwlak</i>',
  "<a href=\"https://www.naver.com\">www.naver.com</a>"];

const s = new EditorService(
  {
    _para: ['0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', '0123456789', 'www.naver.com'],
    _bold: [[8, 0, 5], [17, 3, 7]],
    _italic: [[0, 2, 5], [5, 0, 6], [12, 0, 2], [18, 0, 5]],
    _underLine: [[4, 6, 8], [9, 0, 5], [16, 1, 5]],
    _orderList: [[1, 3], [6, 7]],
    _unOrderList: [[10, 11], [13, 15]],
    _leftAlign: [17, 18],
    _rightAlign: [12],
    _centerAlign: [16],
    _link: [[19, 'https://www.naver.com']]
  }
);

describe("인덱스를 제대로 저장하는지 확인한다.", (done) => {

  it("숫자로 정렬된 리스트는 4번째 인덱스부터 6번째 인덱스까지 적용되어 있다.", (done) => {
    let arr = s.indexToList(paraArray, 'ol');
    assert.deepEqual(arr, [[4, 6]]);

    done();
  });

  it("오른쪽 정렬된 문자열은 0번째와 7번째 문자열이다", (done) => {
    let arr = s.indexToAlign(paraArray, 'right');
    assert.deepEqual(arr, [0, 7]);

    done();
  });

  it("링크는 14번째 인덱스와 네이버 주소가 들어가있다.", (done) => {
    let arr = s.indexToLink(paraArray);
    assert.deepEqual(arr, [[12, 'https://www.naver.com']]);

    done();
  });

  it("bold, italic, underline 을 같은 메서드로 보냈을때 제대로 인덱스를 뽑아낸다.", (done) => {
    let boldArr = s.indexToBIU(paraArray, 'b');
    assert.deepEqual(boldArr, [[2, 1, 5], [3, 0, 1]]);

    let italicArr = s.indexToBIU(paraArray, 'i');
    assert.deepEqual(italicArr, [[7, 0, 5], [11, 0, 12]]);

    let underlineArr = s.indexToBIU(paraArray, 'u');
    assert.deepEqual(underlineArr, [[8, 1, 9]]);

    done();
  })

  done;

})

describe("렌더링이 제대로 되는지 확인한다.", () => {

  it("왼, 오, 가운데 태그 문자열이 제대로 생성되는지 확인한다", (done) => {

    // 12:오, 16:가, 17:왼, 18:왼
    let div = '';

    assert.deepEqual(s.renderingAlign(div, 10), '<div>');
    assert.deepEqual(s.renderingAlign(div, 12), '<div style=\"text-align: right;\">');
    assert.deepEqual(s.renderingAlign(div, 16), '<div style=\"text-align: center;\">');
    assert.deepEqual(s.renderingAlign(div, 17), '<div style=\"text-align: left;\">');
    assert.deepEqual(s.renderingAlign(div, 18), '<div style=\"text-align: left;\">');

    done();

  })

  it("bold, italic, underline 문자열이 제대로 생성되는지 확인한다.", (done) => {

    // 0, 4, 5, 8, 9, 12, 16, 17, 18
    assert.deepEqual(s.renderingBIU(0), '01<i>2345</i>6789');
    assert.deepEqual(s.renderingBIU(2), '');
    assert.deepEqual(s.renderingBIU(3), '');
    assert.deepEqual(s.renderingBIU(4), '012345<u>678</u>9');
    assert.deepEqual(s.renderingBIU(5), '<i>0123456</i>789');
    assert.deepEqual(s.renderingBIU(8), '<b>012345</b>6789');
    assert.deepEqual(s.renderingBIU(9), '<u>012345</u>6789');
    assert.deepEqual(s.renderingBIU(12), '<i>012</i>3456789');
    assert.deepEqual(s.renderingBIU(16), '0<u>12345</u>6789');
    assert.deepEqual(s.renderingBIU(17), '012<b>34567</b>89');
    assert.deepEqual(s.renderingBIU(18), '<i>012345</i>6789');

    done();

  })

  it("link 문자열이 제대로 생성되는지 확인한다.", (done) => {

    // 19
    assert.deepEqual(s.renderingLink(10), '');
    assert.deepEqual(s.renderingLink(11), '');
    assert.deepEqual(s.renderingLink(19), '<a href="https://www.naver.com"/>www.naver.com');

    done();

  })

  it("list 문자열이 제대로 생성되는지 확인한다.", (done) => {

    // 1, 2, 3,  6, 7,  10, 11,  13, 14, 15
    assert.deepEqual(s.renderingList(1), '<ol><li>0123456789</li><li>0123456789</li><li>0123456789</li></ol>');
    assert.deepEqual(s.renderingList(6), '<ol><li>0123456789</li><li>0123456789</li></ol>');
    assert.deepEqual(s.renderingList(10), '<ul><li>0123456789</li><li>0123456789</li></ul>');
    assert.deepEqual(s.renderingList(13), '<ul><li>0123456789</li><li>0123456789</li><li>0123456789</li></ul>');
    assert.deepEqual(s.renderingList(5), '');

    done();

  })

})
