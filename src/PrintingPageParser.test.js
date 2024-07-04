import {
    parsePrintingPage,
    parseHyphenSeparatedPages,
    unique,
    validateIncludeInvalidChar,
    removeSpaces,
} from './PrintingPageParser';

describe('parsePrintingPage', () => {
    it('2. 引数が単独の数値のみである場合、その数値を格納したリストを返す。', () => {
        expect(parseHyphenSeparatedPages('1')).toStrictEqual([1]);
        expect(parseHyphenSeparatedPages('123')).toStrictEqual([123]);
        expect(parseHyphenSeparatedPages('  123   ')).toStrictEqual([123]);
    });

    it('3. 引数がハイフン繋ぎの数値である場合、FromからToまでの数値を展開したリストを返す。但し、From＞Toの場合はエラー、From=Toの場合は通常処理。', () => {
        expect(parseHyphenSeparatedPages('1-3')).toStrictEqual([1, 2, 3]);
        expect(parseHyphenSeparatedPages('102-105')).toStrictEqual([102, 103, 104, 105]);

        expect(() => parseHyphenSeparatedPages('5-4')).toThrowError();

        expect(parseHyphenSeparatedPages('3-3')).toStrictEqual([3]);
    });

    it('4. 引数がカンマ区切りである場合、カンマで区切られた各要素のFromからToまでの数値を展開したリストを返す。', () => {
        expect(parsePrintingPage('1, 3')).toStrictEqual([1, 3]);
        expect(parsePrintingPage('1, 3-5')).toStrictEqual([1, 3, 4, 5]);
        expect(parsePrintingPage('10, 1-3')).toStrictEqual([1, 2, 3, 10]);
    });

    it('5. 数値リストは昇順（１ -> 100）でソートされている。', () => {
        expect(parsePrintingPage('3,2,1,4')).toStrictEqual([1,2,3,4]);
    });

    it('6. 重複は一意化する。', () => {
        expect(unique([1,1])).toStrictEqual([1]);
        expect(unique([5, 7, 5, 7])).toStrictEqual([5, 7]);
    });

    it('7. 引数が未指定の場合、例外をスローする。', () => {
        expect(() =>parsePrintingPage()).toThrow();
        expect(() =>parsePrintingPage('')).toThrow();
    });

    it('8. 引数が数値, ハイフン, カンマ, 空白文字でない場合、例外をスローする。', () => {
        expect(validateIncludeInvalidChar('1, 2-3')).toBeUndefined();

        //（最終的な仕様上はNGだが、）このメソッドは無効な文字の有無を判定するだけなので下記はPass
        expect(validateIncludeInvalidChar(',,')).toBeUndefined();
        expect(validateIncludeInvalidChar(', , ')).toBeUndefined();
        expect(validateIncludeInvalidChar('-')).toBeUndefined();
        expect(validateIncludeInvalidChar('--')).toBeUndefined();
        expect(validateIncludeInvalidChar('-  -')).toBeUndefined();

        // NG
        expect(() => validateIncludeInvalidChar('abc')).toThrow();
        expect(() => validateIncludeInvalidChar('+')).toThrow();
        expect(() => validateIncludeInvalidChar('あいうえお')).toThrow();
    });

    it('9. 数値に1未満の値や非整数が含まれる場合、例外をスローする。', () => {
        expect(() => parsePrintingPage('0')).toThrow();
        expect(() => parsePrintingPage('0.1')).toThrow();
        expect(() => parsePrintingPage('1.1')).toThrow();
        expect(() => parsePrintingPage('0.1-0.9')).toThrow();
        expect(() => parsePrintingPage('0.1-2.1')).toThrow();
        expect(() => parsePrintingPage('0.1,2.1')).toThrow();
        //expect(() => parsePrintingPage('-1')).toThrow();
    });

    it('10. “--”や",,"などは例外をスローする', () => {
        expect(() => parsePrintingPage(' ')).toThrow();
        expect(() => parsePrintingPage(',')).toThrow();
        expect(() => parsePrintingPage(',,')).toThrow();
        expect(() => parsePrintingPage('-')).toThrow();
        expect(() => parsePrintingPage('--')).toThrow();
        expect(() => parsePrintingPage(' - ')).toThrow();
        expect(() => parsePrintingPage(',  ')).toThrow();
        expect(() => parsePrintingPage('2--4')).toThrow();
        expect(() => parsePrintingPage('2-4-6')).toThrow();
        //expect(() => parsePrintingPage('-6')).toThrow();
        expect(() => parsePrintingPage('6-')).toThrow();
    });``

    it('11. スペースは無視するのが基本だが、"1 2"を"12"とは解釈せず、例外をスローする。', () => {
        expect(parsePrintingPage(' 1, 2 ')).toStrictEqual([1, 2]);
        expect(parsePrintingPage(' 1 - 2 ')).toStrictEqual([1, 2]);

        expect(() => parsePrintingPage('1 2')).toThrow();
        expect(() => parsePrintingPage('100      102')).toThrow();
    });

    it('12. -nは1ページ目からnページまでのリストを返す。', () => {
        expect(parsePrintingPage('-3')).toStrictEqual([1, 2, 3]);
    });
    
})



// // Unit Test Demo //////////////////////
// function myThreeTimes(n) {
//   return n * 3;
// }

// describe('myThreeTimes', () => {
//     it('引数を3倍にして返す', () => {
//         expect(myThreeTimes(1)).toBe(3);
//     });
// })
