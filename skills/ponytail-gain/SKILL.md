---
name: ponytail-gain
description: >
  公開benchmarkで測定されたPonytailの効果を、code量・cost・速度のscoreboardとして表示する。
  現在のrepository固有の推定値ではない。一回限りの表示でmodeは変更しない。
  /ponytail-gain、「ponytailの効果」「どれだけ減るか」で使う。
---

# Ponytail Gain

呼び出されたら次のscoreboardを表示します。一回限りで、mode変更、flag fileの作成、状態の永続化は行いません。

数値は公開benchmarkのmedianです。日常的な5task（email validator、debounce、CSV sum、countdown timer、rate limiter）を、Haiku、Sonnet、Opusの3modelで測定したものです。現在のrepositoryから計算した数値ではありません。出典は`benchmarks/`とREADMEです。

## Scoreboard

plain ASCII barで表示します。barの長さは測定範囲、labelは正確な数値です。

```
  ponytail gain                     benchmark median · 5 tasks · 3 models

  コード行数       no-skill  ████████████████████  100%
                  ponytail  ██▌·················    6–20%   ▼ 80–94%
  Cost            no-skill  ████████████████████  100%
                  ponytail  █████▌··············   23–53%  ▼ 47–77%
  Speed           ponytail  ▸ 3–6× faster

  このrepo:  /ponytail-debt  （先送りしたshortcut）
             /ponytail-audit （まだ削れるもの）
```

## 誠実さの境界

これはbenchmarkのmedianであり、現在のrepositoryの数値ではありません。「このrepoでX行／X token削減した」のような値を出さないでください。作らなかった版は存在せず、比較するbaselineがないためです。repositoryごとに数えられる実値は`/ponytail-debt`のledgerだけです。

## 境界

一回限りの表示。fileを編集せず、modeも変更しません。「stop ponytail」または「normal mode」で通常状態へ戻ります。
