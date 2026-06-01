# Yugo Nagasawa — Portfolio

静的な1ページのポートフォリオサイトです。

## ディレクトリ構成

```
src/
  index.template.html   # ページ骨格（include コメント）
  partials/
    sidebar.html        # 左サイドバー
    footer.html         # フッター
  sections/
    about.html          # 私について
    career.html           # 経歴
    certifications.html # 資格
    internship.html     # インターン
    projects.html       # プロジェクト
    hobbies.html        # 趣味
index.html              # ビルド成果物（GitHub Pages 用）
styles.css
js/reveal-sections.js
js/copy-email.js
```

## 編集の流れ

1. `src/sections/` または `src/partials/` 内の HTML を編集する
2. ルートでビルドを実行する

```bash
npm run build
```

3. 生成された `index.html` をブラウザで確認する

セクションの追加・並び替えは `src/index.template.html` の `<!-- include:... -->` 行を編集してください。

## CSS 命名規則

| 種類       | 形式              | 例                          |
| ---------- | ----------------- | --------------------------- |
| レイアウト | ブロック名        | `layout`, `layout__main`    |
| コンポーネント | ブロック + BEM | `sidebar__name`, `project-card__desc` |
| ユーティリティ | 単語1つ        | `container`, `card`, `section` |
| 状態       | `is-` 接頭辞      | `is-reveal`, `is-visible`   |
| セクション id | 英語・内容一致 | `#about`, `#projects`       |

### 主なブロック

- `layout` — ページ全体のグリッド
- `sidebar` — 左プロフィール
- `section` — 各コンテンツセクション
- `dated-list` — 年月 + ラベル（経歴・資格）
- `timeline` — インターン年表
- `project-list` / `project-card` — プロジェクト一覧
- `hobby-list` — 趣味（項目名 + コメント）
- `footer` — フッター
