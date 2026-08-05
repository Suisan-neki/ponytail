---
name: ponytail-help
description: "Ponytailのmode、skill、commandを一覧するquick reference。"
homepage: https://github.com/Suisan-neki/ponytail
license: MIT
---

# Ponytail Help

呼び出されたら次のreferenceを表示します。一回限りで、mode変更、flag fileの作成、状態の永続化は行いません。

## Level

| Level | Trigger | 動作 |
|-------|---------|------|
| **Lite** | `/ponytail lite` | 依頼されたものは作り、より小さい代案を1行で示す。 |
| **Full** | `/ponytail` | YAGNI → stdlib → native → 1行 → 最小実装の順に判断する。既定。 |
| **Ultra** | `/ponytail ultra` | YAGNIを強く適用し、追加前に削除と要件の見直しを行う。 |

Levelは変更するかsessionが終了するまで維持します。

## Skill

| Skill | Trigger | 動作 |
|-------|---------|------|
| **ponytail** | `/ponytail` | 動作する最小の解決策を選ぶmode。 |
| **ponytail-review** | `/ponytail-review` | diffの過剰設計をreviewし、削除候補を示す。 |
| **ponytail-audit** | `/ponytail-audit` | repository全体をauditし、削除候補を優先順で示す。 |
| **ponytail-debt** | `/ponytail-debt` | `ponytail:` shortcut commentをledgerへ集める。 |
| **ponytail-gain** | `/ponytail-gain` | 公開benchmarkの効果をscoreboardで示す。 |
| **ponytail-help** | `/ponytail-help` | このreferenceを表示する。 |

Codexでは`@ponytail`、`@ponytail-review`、`@ponytail-help`を使います。Claude CodeとOpenCodeでは上記のslash commandを使います。OpenCodeには6つすべてがslash commandとして含まれます。

## 解除

「stop ponytail」または「normal mode」と伝えます。`/ponytail off`でも解除できます。再開は`/ponytail`。

## 既定modeの変更

既定は`full`で、sessionごとに自動で有効になります。

**環境変数**（最優先）：

```bash
export PONYTAIL_DEFAULT_MODE=ultra
```

**設定file**（`~/.config/ponytail/config.json`、Windowsは`%APPDATA%\ponytail\config.json`）：

```json
{ "defaultMode": "lite" }
```

自動有効化を止める場合は`"off"`にし、必要な時だけ`/ponytail`を使います。優先順位は環境変数、設定file、`full`の順です。

## Update

Claude Codeでは`/plugin`を開き、Marketplacesからponytailのauto-updateを有効にできます。手動更新は`/plugin marketplace update ponytail`、続けて`/reload-plugins`。

`/plugin`が認識されない場合はClaude Codeを更新し、再起動してください。他のhostはそれぞれのupdate方法を使います。

## 詳細

日本語版：`README.ja.md`  
Upstream：https://github.com/DietrichGebert/ponytail
