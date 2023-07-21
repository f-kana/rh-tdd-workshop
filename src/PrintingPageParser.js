/*
1 引数が単独の数字(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。
2 引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。
3 引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。
4 ゼロ埋めを正常系として処理する。(001 -> 1)
5 重複は一意化する。
6 数値リストは昇順（1, 2, 3, …, 100）でソートする。
7 引数が未指定（無し or 空文字""）の場合、例外をスローする。
8 受入可能文字（数値またはハイフンまたはカンマまたは半角スペース「0123456789,- 」)以外の場合、例外をスローする。
9 ハイフン繋ぎでFrom > To の場合、例外をスローする。（From = Toは単独の数値と同じ扱いとする。）
10 受入可能文字だが不正な並び（0/   /1   2/,/,,,,,/-/–--/1-2-3/-10/10-/等）は例外をスローする

11. -5 は 1,2,3,4,5に展開する

*/


function parsePrintingPage(strPage) {
    if (strPage === "" || strPage === undefined) {
        throw new Error('何も入力されていません。');
    }
    const pageSet = new Set();

    for (const pagePart of strPage.split(",")) {
        if (pagePart.includes("-")) {
            const [from, to] = pagePart.split("-").map(Number);

            for (let i = from; i <= to; i++) {
                pageSet.add(i);
            }
        } else {
            pageSet.add(Number(pagePart));
        }
    }
    return Array.from(pageSet).sort((a, b) => a - b);

}




export {parsePrintingPage}
