<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.png">
    <img src="assets/logo.png" width="220" alt="Ponytail">
  </picture>
</p>

<h1 align="center">Ponytail 日本語版</h1>

<p align="center"><em>何も言わず、1行だけ書く。それで動く。</em></p>

> [!NOTE]
> これは [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) の非公式日本語forkです。MIT Licenseに基づき、原著作者の著作権表示とライセンスを保持しています。

Ponytailは、AI coding agentへ「余計なものを作らないシニア開発者」の判断基準を追加するpluginです。単に短いcodeを書かせるものではありません。問題と変更経路を理解したうえで、YAGNI、既存実装、標準ライブラリ、platform標準機能、導入済みdependencyの順に確認し、それでも必要な場合だけ最小の正しい実装を書かせます。

## 何が日本語化されているか

- `AGENTS.md`と主要agent向けrule copy
- `ponytail`、`review`、`audit`、`debt`、`gain`、`help`の6skill
- Codex pluginの表示名、説明、初期prompt、marketplace source
- OpenClaw向けに生成されるskill本文
- rule copyの同期を確認するtest用invariant

command名、mode名、`ponytail:` commentなど、pluginが識別に使う文字列は互換性のため英語のままです。

## 判断の順番

```text
1. そもそも必要か                → 不要なら作らない（YAGNI）
2. codebaseに既にあるか          → 再利用する
3. 標準ライブラリでできるか      → 使う
4. platform標準機能でできるか    → 使う
5. 導入済みdependencyでできるか  → 使う
6. 1行で書けるか                 → 1行にする
7. それでも必要なら              → 動作する最小限を書く
```

これは調査を省くための順番ではありません。変更対象と実際の処理を読んだ後に使います。入力検証、データ損失を防ぐerror handling、security、accessibility、実機calibrationは削りません。

## Install

### Codex

hookの実行にNode.jsを使います。`node --version`が通る状態で、次を実行してください。

```bash
codex plugin marketplace add Suisan-neki/ponytail
codex plugin add ponytail@ponytail
```

続けてCodexを起動します。

```bash
codex
```

`/hooks`を開き、Ponytailのlifecycle hookを確認して信頼します。その後、新しいthreadを開始してください。既定の`full` modeがsession開始時に有効になります。

動作確認は、Codexのpromptで次を実行します。

```text
@ponytail-help
```

または、通常の開発依頼に`@ponytail`を付けます。

```text
@ponytail このバグを直して。変更対象と呼び出し元を確認してから、最小の正しいdiffにして。
```

Codexでよく使う呼び出し方：

| Prompt | 動作 |
|---|---|
| `@ponytail` | 現在のmodeを確認し、Ponytailを使う |
| `@ponytail lite` | 依頼どおり実装し、より小さい代案を1行で示す |
| `@ponytail full` | 標準ライブラリとnative機能を優先し、最小の正しいdiffを選ぶ |
| `@ponytail ultra` | YAGNIを強く適用し、要件自体も問い直す |
| `@ponytail-review` | diffを過剰設計の観点だけでreviewする |
| `@ponytail-help` | Codexでの使い方を表示する |
| `@ponytail off` | 現在のsessionで解除する |
| `@ponytail default ultra` | 新しいsessionの既定modeを変更する |

Ponytailは短いcodeを目的にするのではなく、不要な実装を避けます。security、validation、データ損失を防ぐ処理、明示要件まで削って短くする動作は対象外です。

### Claude Code

次の2commandを、別々のpromptとして実行します。

```text
/plugin marketplace add Suisan-neki/ponytail
```

```text
/plugin install ponytail@ponytail
```

Claude Code Desktopでも、Code tabのprompt欄へ同じcommandを入力できます。

### Gemini CLI

```bash
gemini extensions install https://github.com/Suisan-neki/ponytail
```

### OpenCode

forkをcheckoutし、`opencode.json`からplugin fileを指定します。

```json
{
  "plugin": ["/absolute/path/to/ponytail/.opencode/plugins/ponytail.mjs"]
}
```

相対pathを使う場合は、各projectの`opencode.json`から見たpathにします。

## 既定mode

環境変数：

```bash
export PONYTAIL_DEFAULT_MODE=ultra
```

設定file：`~/.config/ponytail/config.json`

```json
{ "defaultMode": "lite" }
```

優先順位は環境変数、設定file、`full`の順です。

## Upstreamとの同期

このforkは日本語のinstruction本文を変更しているため、upstreamをそのままmergeするとrule copyやgenerated skillが衝突する可能性があります。同期時は次を確認します。

```bash
node scripts/check-rule-copies.js
node scripts/build-openclaw-skills.js
npm test
```

## License

MIT License。原著作者はDietrich Gebertです。詳細は`LICENSE`を参照してください。
