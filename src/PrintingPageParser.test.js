import {parsePrintingPage} from './PrintingPageParser';

describe('parsePrintingPage', () => {
    it('2単独数字が入力されたら、要素数１（入力された数字）の数字のリストを返す。', () => {
        expect(parsePrintingPage("1")).toStrictEqual([1]);
        expect(parsePrintingPage("12")).toStrictEqual([12]);
    });

    it('3カンマ区切りが入力されたら、数字のリストを返す', () => {
        expect(parsePrintingPage("1,3")).toStrictEqual([1,3]);
    });

    it('4-1 ハイフン区切り 1-3', () => {
        expect(parsePrintingPage("1-3")).toStrictEqual([1,2,3]);
    });

    it('4-2 ハイフン区切りとカンマ区切りの複合系 1-3,5', () => {
        expect(parsePrintingPage("1-3,5")).toStrictEqual([1,2,3,5]);
    });

    it('4-3 ハイフン区切り 逆転 3-1', () => {
        expect(parsePrintingPage("3-1")).toStrictEqual([1,2,3]);
    });

    // it('4-4 ハイフン区切り 逆転 複合 3-1', () => {
    //     expect(parsePrintingPage("3-1,5")).toStrictEqual([1,2,3,5]);
    // });

    // it('', () => {
    //     expect(parsePrintingPage(???)).toStrictEqual(???);
    // });

    // it('', () => {
    //     expect(parsePrintingPage(???)).toStrictEqual(???);
    // });

    // it('', () => {
    //     expect(parsePrintingPage(???)).toStrictEqual(???);
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
