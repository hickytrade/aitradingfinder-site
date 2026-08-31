/**
 * AITradingFinder — User Match Score Engine v0.2
 * ------------------------------------------------------------
 * 重要（2026-08-29 修正指示の反映）:
 * - このファイルは「ユーザーにとっての適合度」だけを計算する。
 * - Affiliate報酬額・収益性（business_score）は絶対にここに混入させない。
 *   business_score を参照・加算するコードをこのファイルに書いてはいけない。
 * - 入力は firm.fact と firm.provider_score のみ。
 */

const BASE_WEIGHTS = {
  cost: 15,
  drawdown: 20,
  flexibility: 15, // Trading Flexibility
  ea: 15,          // EA Compatibility
  payout: 10,
  rules: 10,
  platform: 5,
  account_options: 5
  // affiliate_value は Rev.3 で完全に削除。Business Scoreへ移動済み（assets/js/businessscore.js）。
};
// 注: 8カテゴリ合計は95。clampAndNormalize() が常に合計100へ正規化するため、
// 削除したaffiliateの5点分は他カテゴリへ比例配分される。

function boost(weights, key, amount) {
  const w = { ...weights };
  const others = Object.keys(w).filter(k => k !== key);
  const othersTotal = others.reduce((s, k) => s + w[k], 0);
  if (othersTotal <= 0) return w;
  w[key] += amount;
  others.forEach(k => {
    w[k] -= amount * (w[k] / othersTotal);
  });
  return w;
}

function clampAndNormalize(weights) {
  const w = {};
  Object.keys(weights).forEach(k => (w[k] = Math.max(0, weights[k])));
  const total = Object.values(w).reduce((a, b) => a + b, 0);
  Object.keys(w).forEach(k => (w[k] = (w[k] / total) * 100));
  return w;
}

/**
 * answers = {
 *   instrument, accountSize,
 *   style: 'manual'|'ea'|'scalping'|'swing'|'news',
 *   priority: 'cost'|'drawdown'|'payout_split'|'fast_payout'|'ea'|'flexible_rules',
 *   risk: 'conservative'|'balanced'|'aggressive'
 * }
 */
function computeWeights(answers) {
  let w = { ...BASE_WEIGHTS };

  switch (answers.style) {
    case "ea":
      w = boost(w, "ea", 10);
      break;
    case "scalping":
      w = boost(w, "flexibility", 8);
      w = boost(w, "drawdown", 5);
      break;
    case "swing":
      w = boost(w, "rules", 6);
      w = boost(w, "flexibility", 4);
      break;
    case "news":
      w = boost(w, "flexibility", 6);
      w = boost(w, "drawdown", 4);
      break;
    default:
      break;
  }

  const priorityMap = {
    cost: "cost",
    drawdown: "drawdown",
    payout_split: "payout",
    fast_payout: "payout",
    ea: "ea",
    flexible_rules: "rules"
  };
  if (priorityMap[answers.priority]) {
    w = boost(w, priorityMap[answers.priority], 10);
  }

  if (answers.risk === "conservative") w = boost(w, "drawdown", 8);
  if (answers.risk === "aggressive") w = boost(w, "drawdown", -5);

  return clampAndNormalize(w);
}

// User Match Score のサブスコアは provider_score（サービス品質評価）からのみ取得する。
// business_score は参照しない。
const SUBSCORE_MAP = {
  cost: "cost_score",
  drawdown: "drawdown_score",
  flexibility: "trading_flexibility_score",
  ea: "ea_score",
  payout: "payout_score",
  rules: "rule_score",
  platform: "platform_score",
  account_options: null // provider_scoreに直接対応フィールドなし。銘柄数から簡易推定（下記参照）
};

function accountOptionsSubscore(firm) {
  // 登録プラン数（口座サイズの選択肢の広さ）からユーザー適合度用の簡易スコアを算出。
  // これはビジネス価値ではなく「選択の自由度」というユーザー側メリットの近似値。
  const count = firm.fact.plans.length;
  return Math.min(100, 40 + count * 5); // 11プランなら95点
}

function scoreFirm(firm, weights) {
  const labels = {
    cost: "コスト",
    drawdown: "ドローダウン",
    flexibility: "取引の自由度",
    ea: "EA対応",
    payout: "報酬・出金",
    rules: "ルールの明確さ",
    platform: "プラットフォーム",
    account_options: "口座サイズの選択肢"
  };

  let total = 0;
  const breakdown = Object.keys(weights).map(key => {
    let subscore;
    if (key === "account_options") {
      subscore = accountOptionsSubscore(firm);
    } else {
      const subKey = SUBSCORE_MAP[key];
      subscore = firm.provider_score[subKey] ?? 50; // 未確認/欠損は中立50
    }
    const contribution = (weights[key] / 100) * subscore;
    total += contribution;
    return {
      key,
      label: labels[key],
      weight: Math.round(weights[key] * 10) / 10,
      subscore,
      contribution: Math.round(contribution * 10) / 10
    };
  });

  return {
    firm,
    score: Math.round(total),
    breakdown: breakdown.sort((a, b) => b.weight - a.weight)
  };
}

function matchFirms(answers, firms) {
  const weights = computeWeights(answers);
  return firms.map(f => scoreFirm(f, weights)).sort((a, b) => b.score - a.score);
}
