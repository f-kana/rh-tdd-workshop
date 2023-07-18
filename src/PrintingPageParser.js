
/*

1引数としてページ数を示す文字列を受け取り、印刷対象ページの数値のリストを返す関数を作成する。
2単独数字が入力されたら、要素数１（入力された数字）の数字のリストを返す。
3カンマ区切りが入力されたら、数字のリストを返す
4ハイフン区切り
5重複削除
6昇順
7入力無し→エラー
8（0123456789,- )か否かを判別し、数値でなければエラー。
9単独はダメ。
10カンマの前後が数字じゃない、ハイフンの前後が数字じゃない　→エラー

追加仕様
11. "-3": 最初のページから３ぺーじ目まで印刷
12. "3-": ３ページ目から最終ページまで印刷

*/

function parsePrintingPage(pages) {
    return [1];
}

function parsePrintingPage(pages) {
    let printPages = [];
    pages.split(',').forEach(function (value) {
        if (value.includes('-')) {
            let [startVal, endVal] = value.split('-').map(Number);
            if (startVal > endVal) {
                [startVal, endVal] = [endVal, startVal];
            }

            printPages = printPages.concat(myRange(startVal, endVal))
        } else {
            printPages = printPages.concat(value.split(',').map(Number));
        }
    });

    return printPages;
    
}

function myRange(startVal, endVal) {
    let ret = [];
    for(let i = startVal; i <= endVal; i++) {
        ret.push(i)
    }
    return ret;
}

export {parsePrintingPage}
