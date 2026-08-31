/**
 * AITradingFinder — Blog Article Manifest (STEP 23-B)
 * ------------------------------------------------------------
 * blog.html reads this file and renders ONLY entries whose `status` is
 * exactly "published". This is the actual publish gate: even if this file
 * and its target .html were committed/pushed/deployed, an article with any
 * other status (e.g. "pending_human_review") never appears on the live
 * blog.html — a human must explicitly change status here (and in the
 * matching tools/content-agent/content-specs/<id>.json) to "published".
 * No script in this repository sets status to "published" automatically.
 */

const BLOG_ARTICLES = [
  {
    content_id: "CONTENT-001",
    title: "プロップファームとは？初心者向けに仕組み・種類・注意点を解説",
    excerpt: "プロップファーム（Prop Firm）とは何か、評価（チャレンジ）の仕組み、Profit Split、注意点を初心者向けに解説。AITradingFinderが公式一次情報で確認できた範囲のFACTのみを使用しています。",
    url: "blog/prop-firm-toha.html",
    search_intent: "informational",
    status: "published",
    published_at: "2026-08-31"
  }
];
