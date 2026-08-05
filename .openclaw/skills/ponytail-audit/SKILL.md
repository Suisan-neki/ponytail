---
name: ponytail-audit
description: "repository全体の過剰設計をauditし、削除・簡素化・stdlibやnative機能への置換候補を優先順で示す。"
homepage: https://github.com/Suisan-neki/ponytail
license: MIT
---

`ponytail-review`をrepository全体へ広げたものです。diffではなくtree全体を走査し、削減量が大きい順に並べます。

## Tag

`ponytail-review`と同じです。

- `delete:` dead code、使われない柔軟性、推測だけで追加された機能。置き換え不要。
- `stdlib:` 標準ライブラリにある処理の再実装。関数名を示す。
- `native:` platform標準機能で代替できるdependencyまたはcode。機能名を示す。
- `yagni:` 実装が1つしかない抽象化、誰も変更しないconfig、呼び出し元が1つのlayer。
- `shrink:` 同じlogicをより少ない行で書ける。短い形を示す。

## 探すもの

標準ライブラリやplatformで代替できるdependency、実装が1つだけのinterface、製品が1つだけのfactory、処理を委譲するだけのwrapper、1つしかexportしない不要なfile、使われていないflagやconfig、標準ライブラリの再実装。

## 出力

1件1行。削減量が大きい順に並べます。

`<tag> <削るもの>。<置き換え先>。[path]`

最後に `net: -<N> lines, -<M> deps possible.` と書きます。削れるものがなければ `Lean already. Ship.`

## 境界

対象は過剰設計と複雑さだけです。correctness bug、security hole、performanceは対象外。通常のreviewへ回します。指摘を列挙するだけで、修正は適用しません。一回限り。

「stop ponytail-audit」または「normal mode」で戻ります。
