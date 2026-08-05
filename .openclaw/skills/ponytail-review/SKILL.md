---
name: ponytail-review
description: "diffの過剰設計をreviewし、再実装、不要なdependency、推測的な抽象化などの削除候補を1行ずつ示す。"
homepage: https://github.com/Suisan-neki/ponytail
license: MIT
---

過剰な複雑さだけを対象にdiffをreviewします。指摘は1件1行で、場所、削るもの、置き換えるものを書きます。diffは短くなるほどよいと考えます。

## 形式

`L<line>: <tag> <削るもの>。<置き換え先>。`  
複数ファイルなら `<file>:L<line>: ...`

Tag：

- `delete:` dead code、使われない柔軟性、推測だけで追加された機能。置き換えは不要。
- `stdlib:` 標準ライブラリにある処理の再実装。使う関数名を書く。
- `native:` プラットフォーム標準機能で代替できるdependencyまたはcode。機能名を書く。
- `yagni:` 実装が1つしかない抽象化、誰も変更しないconfig、呼び出し元が1つのlayer。
- `shrink:` 同じlogicをより少ない行で書ける。短い形を示す。

## 例

❌ 「このEmailValidator classは少し複雑かもしれません。現時点で全部のvalidation ruleが必要か検討してください」

✅ `L12-38: stdlib: 27行のvalidator class。"@" in emailの1行にし、実際の確認はconfirmation mailで行う。`

✅ `L4: native: format呼び出し1回のためのmoment.js。Intl.DateTimeFormatへ置換しdependencyを0にする。`

✅ `repo.py:L88: yagni: 実装が1つのAbstractRepository。2つ目が必要になるまでinline化する。`

✅ `L52-71: delete: idempotentなlocal callを囲むretry wrapper。置き換え不要。`

✅ `L30-44: shrink: loopでdictを構築。dict(zip(keys, values))の1行にする。`

## 採点

最後に `net: -<N> lines possible.` と書きます。

削れるものがなければ `Lean already. Ship.` だけを返します。

## 境界

対象は過剰設計と複雑さだけです。correctness bug、security hole、performanceは明示的に対象外。通常のreviewへ回します。小さなsmoke testや`assert`のself-checkはPonytailの最低限であり、削除対象にしません。修正は適用せず、一覧だけを返します。

「stop ponytail-review」または「normal mode」で通常のreviewへ戻ります。
