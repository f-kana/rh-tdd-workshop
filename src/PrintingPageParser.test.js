import {parsePrintingPage, range} from './PrintingPageParser';

describe('parsePrintingPage', () => {
    it('2. 単独の数字を入力→その数字を印刷対象ページとして返す', () => {
        expect(parsePrintingPage("1", 100)).toStrictEqual([1]);
        expect(parsePrintingPage("100", 100)).toStrictEqual([100]);
    });

    it('3. カンマ区切りを処理する＋昇順', () => {
        expect(parsePrintingPage("1,2", 100)).toStrictEqual([1,2]);
        expect(parsePrintingPage("2,1", 100)).toStrictEqual([1,2]);
        expect(parsePrintingPage("2,10,1", 100)).toStrictEqual([1,2,10]);
    });

    it('4. 重複削除', () => {
        expect(parsePrintingPage("1,2,2,3", 100)).toStrictEqual([1,2,3]);    });

    it('5. 範囲指定（ハイフン区切り）の正常系（テストは複合系を含む）', () => {
        expect(parsePrintingPage("1-3", 100)).toStrictEqual([1,2,3]);
        expect(parsePrintingPage("1-3,4", 100)).toStrictEqual([1,2,3,4]);
    });

    it('range', () => {
        expect(range(1, 3)).toStrictEqual([1,2,3]);
    });

    it('6. ゼロパディング', () => {
        expect(parsePrintingPage("01,002", 100)).toStrictEqual([1, 2]);
    });

    it('7. トリム（半角スペース）', () => {
        expect(parsePrintingPage("1, 2", 100)).toStrictEqual([1, 2]);
        expect(parsePrintingPage(" 1 - 2 ", 100)).toStrictEqual([1,2]);
    });

    it('8. エラー：入力無し', () => {
        expect(() => parsePrintingPage()).toThrowError();
        expect(() => parsePrintingPage("", 100)).toThrowError();
    });

    it('9. エラー：OK以外（全角数字、全角カンマなど含め）', () => {
        expect(() => parsePrintingPage("あいうえお", 100)).toThrowError();
        expect(() => parsePrintingPage("一", 100)).toThrowError();
        expect(() => parsePrintingPage("、", 100)).toThrowError();
        expect(() => parsePrintingPage("１", 100)).toThrowError();
        expect(() => parsePrintingPage("a", 100)).toThrowError();
        expect(() => parsePrintingPage("−", 100)).toThrowError();
        expect(() => parsePrintingPage("ー", 100)).toThrowError();
        expect(() => parsePrintingPage("/", 100)).toThrowError();
        expect(() => parsePrintingPage("　", 100)).toThrowError();
        expect(() => parsePrintingPage("1.1", 100)).toThrowError();
    });

    // it('', () => {
    //     expect(parsePrintingPage()).toStrictEqual();
    //     expect(parsePrintingPage()).toStrictEqual();
    // });
})



//Unit Test Demo //////////////////////
function myThreeTimes(n) {
  return n * 4;
}

describe('myThreeTimes', () => {
    it('引数を3倍にして返す', () => {
        expect(myThreeTimes(1)).toBe(4);
        expect(myThreeTimes(-2.1)).toBe(-8.4);
        expect(myThreeTimes(0)).toBe(0);
    });
})
