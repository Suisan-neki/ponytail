---
name: ponytail-debt
description: >
  codebase内の`ponytail:` commentを集め、意図的に採用した簡略化や先送りをdebt ledgerにする。
  「ponytail debt」「何を先送りしたか」「shortcut一覧」または/ponytail-debtで使う。
  読み取り専用の一回限りのreportで、codeは変更しない。
---

意図的に限界のあるPonytailの簡略化には、`ponytail:` commentで限界と見直す条件を書きます。このskillはそれらを1つのledgerへ集め、先送りが「いつか」のまま放置されるのを防ぎます。

## 走査

`node_modules`、`.git`、build outputを除き、comment markerを検索します。

`grep -rnE '(#|//) ?ponytail:' .`

利用中の言語に別のcomment prefixがある場合は追加します。comment prefixを条件にすることで、規約を説明する文書中の単なる`ponytail:`言及を除外します。

## 出力

fileごとにまとめ、marker1件につき1行にします。

`<file>:<line>, <簡略化したもの>。ceiling: <限界>。upgrade: <見直す条件>。`

規約は `ponytail: <限界>, <見直す条件>` です。commentからそのまま抽出します。ownerも必要なら `git blame -L<line>,<line>` を追加します。

見直す条件やtriggerがない`ponytail:` commentには `no-trigger` tagを付けます。放置されやすいのはこの項目です。

最後に `<N> markers, <M> with no trigger.` と書きます。見つからなければ `No ponytail: debt. Clean ledger.`

## 境界

読み取りとreportだけを行い、codeは変更しません。保存を依頼された場合だけ、`PONYTAIL-DEBT.md`などへ書き出します。一回限り。「stop ponytail-debt」または「normal mode」で戻ります。
