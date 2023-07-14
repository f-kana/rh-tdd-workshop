/*

Done
1. 引数としてページ数を示す文字列と、MAXページ数を受け取り、印刷対象ページの数値のリストを返す関数を作成する。
2. 単独の数字を入力→その数字を印刷対象ページとして返す
3. カンマ区切りを処理する＋昇順
4. 重複削除
5. 範囲指定（ハイフン区切り）の正常系（テストは複合系を含む）
6. ゼロパディング
7. トリム（半角スペース）
8. エラー：入力無し（引数無し、空文字）
9. エラー：OK以外（全角数字、全角カンマなど含め）

ToDo
10. エラー：「,,」、「--」などのケース
12. 「1      5」→ERROR
13. エラー：範囲指定の「開始番号（From）」が「終了番号（To）」より大きい場合
14. OKケース、エラーケースを主つくままに。

15. 「-6」 -> 1,2,3,4,5,6　「10-」 10から最後まで

*/
function parsePrintingPage(pages, maxPage) {
    let printingPages = [];

    if (pages === undefined || pages === "") {
        throw new Error("数値が指定されていません。");
    }
    if (doesIncludeInvalidChar(pages)) {
        throw new Error("不正な文字列が使われています。");
    }

    pages.split(",").forEach(splittedPage => {
        if (splittedPage.includes("-")) {
            const [startPage, endPage] = splittedPage.split("-").map((hyphenSplittedPage) => Number(hyphenSplittedPage));
            printingPages = range(startPage, endPage);

        } else {
            printingPages.push(Number(splittedPage));
        }
    })

    return Array.from(new Set(printingPages)).sort((a, b) => a - b)
}

function range(startPage, endPage) {
    const len = endPage - startPage + 1;
    return  [...Array(len).keys()].map((_, i) => i + startPage);
}

function doesIncludeInvalidChar(pages) {
    const regex = /[^0-9,\- ]/;
    return regex.test(pages);
}


export {parsePrintingPage, range}
