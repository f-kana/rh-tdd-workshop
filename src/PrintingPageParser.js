/*
1. 引数として文字列を受け取り、印刷対象ページの数値のリストを返す関数を作成する。
2. 引数が単独の数値のみである場合、その数値を格納したリストを返す。
3. 引数がハイフン繋ぎの数値である場合、FromからToまでの数値を展開したリストを返す。但し、From＞Toの場合はエラー、From=Toの場合は通常処理。
4. 引数がカンマ区切りである場合、カンマで区切られた各要素のFromからToまでの数値を展開したリストを返す。
5. 数値リストは昇順（１ -> 100）でソートされている。
6. 重複は一意化する。
7. 引数が未指定の場合、例外をスローする。
8. 引数が数値, ハイフン, カンマ, 空白文字でない場合、例外をスローする。
9. 数値に1未満の値が含まれる場合、例外をスローする。
10. “--”や",,"などは例外をスローする
  * ,で要素をSplitした際に空要素が発生するケース
  * カンマ分解後に-で要素をSplitした際に空要素が発生するケースと非空の要素数が2にならないケース
11. スペースは無視するのが基本だが、"1 2"を"12"とは解釈せず、例外をスローする。
12. -nは1ページ目からnページまでのリストを返す。

備考
* 例外はErrorオブジェクトをthrowする
* 最大ページ数を超えるかどうかは、今回の演習では考慮しない。

*/

function parsePrintingPage(pages) {
    if (pages === undefined) {
        throw new Error('The argument is empty.');
    }
    validateIncludeInvalidChar(pages);

    // Remove spaces
    pages = removeSpaces(pages);

    let comma_parsed_list = splitCommaSeparatedCharIntoList(pages);
    let ret = []
    comma_parsed_list.forEach(elem => {
        parseHyphenSeparatedPages(elem).forEach(page_num => {
            ret.push(page_num);
        });
    });
    
    ret = unique(ret).sort((a, b) => a - b);

    // 1未満の値が含まれる場合は例外をスローする。
    // 既に昇順に並び替えているので、先頭の値が1未満であれば、それ以降の値も1未満である。
    if (ret[0] < 1) {
        throw new Error('The argument includes invalid page number.'); 
    }
    return ret;
}

/// カンマ区切りの文字列をリストに分割する
/// 空要素があれば例外をスローする
function splitCommaSeparatedCharIntoList(csv) {
    let list = csv.split(',');
    list.forEach(elem => {
        if (elem === '') {
            throw new Error('The argument is empty.');
        }
    });
    return list;
}

/// ハイフンを含む文字列を数値のリストに変換する。引数pagesにカンマは含まれない想定。
/// 単体の数値の場合はその数値を格納した長さ１のリストを返す。
function parseHyphenSeparatedPages(pages) {
    if (pages.includes('-')) {
        const hyphenSperatedValueList = pages.split('-').map(elem => parseInt(elem));
        if (hyphenSperatedValueList.length !== 2) {
            throw new Error('The argument includes invalid value');
        }
        let [from, to] = hyphenSperatedValueList;
        if (Number.isNaN(from)) {
            from = 1;
        }
        if (from > to) {
            throw new Error('from > to');
        }
        const length = to - from + 1;
        return [...Array(length).keys()].map(i => i + from);
    } else {
        return [parseInt(pages)]
    }
}

// 引数のリストを一意化する
function unique(list) {
    return Array.from(new Set(list));
}

// 引数の文字列pagesが(半角数字 or マイナス記号 or カンマ or 半角スペース)以外の文字を含んでいる場合trueを返す
function validateIncludeInvalidChar(pages) {
    const regex = /[^0-9,\- ]/;
    if (regex.test(pages)) {
        throw new Error('The argument is empty.');
    }
}

/// 引数の文字列pagesからスペースを除去する。
/// 但し、数値を空白で区切った書式は例外をスローする（例："1 2"を"12"とは解釈しない）
function removeSpaces(pages) {
    const regex = /[0-9] +[0-9]/;
    if (regex.test(pages)) {
        throw new Error('The argument cannot include space-separated numbers.');
    }
    return pages.replace(/ +/g, '');
}


export {
    parsePrintingPage,
    parseHyphenSeparatedPages,
    unique,
    validateIncludeInvalidChar,
    removeSpaces,
}