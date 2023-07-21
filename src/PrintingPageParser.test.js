import {parsePrintingPage} from './PrintingPageParser';

describe('parsePrintingPage', () => {
    it('1 引数が単独の数字(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。', () => {
        expect(parsePrintingPage("1")).toStrictEqual([1]);
    });

    it('2. 引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。', () => {
        expect(parsePrintingPage("1-3")).toStrictEqual([1,2,3]);
    });

    it('3 引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。', () => {
        expect(parsePrintingPage("1,2,3")).toStrictEqual([1,2,3]);
        expect(parsePrintingPage("1,3,5")).toStrictEqual([1,3,5]);
        expect(parsePrintingPage("1,3-5")).toStrictEqual([1,3,4,5]);
    });

    it('4 ゼロ埋めを正常系として処理する。(001 -> 1)', () => {
        expect(parsePrintingPage("001")).toStrictEqual([1]);
        expect(parsePrintingPage("100")).toStrictEqual([100]);
        expect(parsePrintingPage("0100")).toStrictEqual([100]);
        expect(parsePrintingPage("001,003-005")).toStrictEqual([1,3,4,5]);
    });

    it('5 重複は一意化する。', () => {
        expect(parsePrintingPage("1,1,2,3")).toStrictEqual([1,2,3]);
        expect(parsePrintingPage("1-4,2-5")).toStrictEqual([1,2,3,4,5]);
        expect(parsePrintingPage("1-4,2,3")).toStrictEqual([1,2,3,4]);
    });

    it('6 数値リストは昇順（1, 2, 3, …, 100）でソートする。', () => {
        expect(parsePrintingPage("1,3,2")).toStrictEqual([1,2,3]);
    });

    it('7 引数が未指定（無し or 空文字""）の場合、例外をスローする。エラーメッセージは「何も入力されていません。」', () => {
        expect(() => parsePrintingPage()).toThrow();
        expect(() => parsePrintingPage("")).toThrow();
    });

    // it('7 引数が未指定（無し or 空文字""）の場合、例外をスローする。', () => {
    //     expect(parsePrintingPage("1")).toStrictEqual([1]);
    // });

    // it('7 引数が未指定（無し or 空文字""）の場合、例外をスローする。', () => {
    //     expect(parsePrintingPage("1")).toStrictEqual([1]);
    // });
})



// Unit Test Demo //////////////////////
// function myThreeTimes(n) {
//   return n * 4;
// }

// describe('myThreeTimes', () => {
//     it('引数を3倍にして返す', () => {
//         expect(myThreeTimes(1)).toBe(4);
//     });
// })
