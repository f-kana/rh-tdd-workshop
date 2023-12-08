import {parsePrintingPage} from './PrintingPageParser';

describe('parsePrintingPage', () => {
    it('1.引数が単独の正の数(文字列型)のみの場合、その数値(Number型)を格納したリストを返す', () => {
        expect(parsePrintingPage("1")).toStrictEqual([1]);
        expect(parsePrintingPage("100")).toStrictEqual([100]);
    });
    it('2.引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。', () => {
        // テストの観点
        // * 境界値(1)を含むか否か
        // * 順子 or 嵌張
        expect(parsePrintingPage("1-3")).toStrictEqual([1,2,3]);
        expect(parsePrintingPage("3-4")).toStrictEqual([3,4]);
    });
    it('3-1.引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。', () => {
        // * カンマの数：１か１以上か
        // * 順子 or 嵌張
        // * 境界値(1)を含むか否か
        expect(parsePrintingPage("1,2,3")).toStrictEqual([1,2,3]);
        expect(parsePrintingPage("3,5")).toStrictEqual([3,5]);
    });
    // it('3-2.引数がカンマとハイフンが混在。', () => {
    //     /**
    //     * カンマで区切られた要素が、単独なのか、ハイフン含みなのか
    //     * 順序：単独→ハイフン、ハイフン→単独、ハイフン＆ハイフン、（単独＆単独）
    //     */
    //     expect(parsePrintingPage("1,3-5,7-9")).toStrictEqual([1,3,4,5,7,8,9]);
    //     expect(parsePrintingPage("3-5,7")).toStrictEqual([3,4,5,7]);
    // });
    // it('xxx', () => {
    //     expect(true).toStrictEqual(true);
    // });
    // it('xxx', () => {
    //     expect(true).toStrictEqual(true);
    // });
    // it('xxx', () => {
    //     expect(true).toStrictEqual(true);
    // });
})



// Unit Test Demo //////////////////////
// function myThreeTimes(n) {
//     return n * 3;
// }

// describe('myThreeTimes', () => {
//     it('引数を3倍にして返す', () => {
//         expect(myThreeTimes(1)).toBe(3);
//     });
// })
