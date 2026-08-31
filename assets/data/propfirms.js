/**
 * AITradingFinder — Prop Firm Database v0.2
 * ------------------------------------------------------------
 * ARCHITECTURE (per 2026-08-29 修正指示):
 *
 *   1) fact              — 公式一次情報のみ。推測禁止。未確認は必ず null。
 *   2) provider_score     — サービス自体の品質評価（AITradingFinder独自）。
 *                           ユーザー個別条件には一切依存しない固定スコア。
 *   3) (computed at runtime) User Match Score — assets/js/matchscore.js が
 *                           fact + provider_score からユーザー回答に応じて動的計算。
 *                           Affiliate/収益性はここに一切混ぜない。
 *   4) business_score     — 完全に別レーン。AITradingFinderの収益・提携価値の
 *                           評価であり、User Match Scoreには絶対に混入させない。
 *                           社内・将来の管理画面専用（エンドユーザー向け画面では
 *                           other than transparency disclosureとしてのみ使用可）。
 *
 * すべての fact フィールドは source_url + fetched_at を持つ（セクション単位 or
 * フィールド単位）。未確認は null のまま。architectural review用に
 * docs/database-schema.md も同時に更新すること。
 */

const DATA_RETRIEVED_AT = "2026-08-29"; // Rev.3 追加調査日

const PROP_FIRMS = [
  {
    id: "fintokei",
    verified: true,

    // ============================================================
    // 1) FACT — 公式一次情報のみ
    // ============================================================
    fact: {
      basic: {
        company_name: "Fintokei a.s.",
        brand_name: "Fintokei（フィントケイ）",
        official_url: "https://www.fintokei.com/jp/",
        country: "チェコ共和国（ブルノ）",
        founded: null,
        website_language: ["日本語", "英語", "その他"],
        affiliate_program: true,
        affiliate_commission: "紹介人数に応じ10%〜15%（1人で10%、20人以上で12%、50人以上で15%）。再購入（同一顧客の継続購入）も報酬対象。",
        affiliate_cookie: null,
        affiliate_conditions: "Fintokeiアカウント作成 → MyFintokeiの「アフィリエイト」タブから申請 → 審査（本人確認は不要）→ 承認後にアフィリエイトリンク/クーポンが発行される。",
        source_urls: {
          top: "https://www.fintokei.com/jp/",
          affiliate_program: "https://www.fintokei.com/jp/affiliates/",
          affiliate_terms_pdf: "https://media.fintokei-web.purple-lab.dev/uploads/Fintokei_Affiliate_Terms_and_Conditions_f6c1564dc5.pdf",
          affiliate_faq: "https://support.fintokei.com/ja/articles/7172495"
        },
        fetched_at: "2026-08-28"
      },

      plans: [
        { plan_group: "チャレンジプラン（ProTrader）", plan_name: "チャレンジプラン（ProTrader）— クオーツ", account_size_jpy: 1000000, challenge_price_jpy: 12500, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 6, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: -3, max_leverage: 100, profit_split_pct: 80, min_trading_days: 3, max_trading_days: null, time_limit_note: "最大無期限。ただし30日間に少なくとも1つの新規取引またはクローズ取引が必要。", reset_option: null, scaling: "Fintokeiスケーリング道場により取引日数・報酬実績に応じ資金拡大。エメラルドプランで最大2億円まで。" },
        { plan_group: "チャレンジプラン（ProTrader）", plan_name: "チャレンジプラン（ProTrader）— クリスタル", account_size_jpy: 2000000, challenge_price_jpy: 21800, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 6, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: -3, max_leverage: 100, profit_split_pct: 80, min_trading_days: 3, max_trading_days: null, time_limit_note: "最大無期限。30日間に1回以上の取引が必要。", reset_option: null },
        { plan_group: "チャレンジプラン（ProTrader）", plan_name: "チャレンジプラン（ProTrader）— パール", account_size_jpy: 5000000, challenge_price_jpy: 39800, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 6, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: -3, max_leverage: 100, profit_split_pct: 80, min_trading_days: 3, max_trading_days: null, time_limit_note: "最大無期限。30日間に1回以上の取引が必要。", reset_option: null },
        { plan_group: "チャレンジプラン（ProTrader）", plan_name: "チャレンジプラン（ProTrader）— ルビー", account_size_jpy: 10000000, challenge_price_jpy: 69800, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 6, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: -3, max_leverage: 100, profit_split_pct: 80, min_trading_days: 3, max_trading_days: null, time_limit_note: "最大無期限。30日間に1回以上の取引が必要。", reset_option: null, note: "公式サイトで「最も人気なプラン」と表示" },
        { plan_group: "チャレンジプラン（ProTrader）", plan_name: "チャレンジプラン（ProTrader）— サファイヤ", account_size_jpy: 20000000, challenge_price_jpy: 109800, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 6, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: -3, max_leverage: 100, profit_split_pct: 80, min_trading_days: 3, max_trading_days: null, time_limit_note: "最大無期限。30日間に1回以上の取引が必要。", reset_option: null },
        { plan_group: "チャレンジプラン（ProTrader）", plan_name: "チャレンジプラン（ProTrader）— トパーズ", account_size_jpy: 35000000, challenge_price_jpy: 209800, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 6, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: -3, max_leverage: 100, profit_split_pct: 80, min_trading_days: 3, max_trading_days: null, time_limit_note: "最大無期限。30日間に1回以上の取引が必要。", reset_option: null },
        { plan_group: "チャレンジプラン（ProTrader）", plan_name: "チャレンジプラン（ProTrader）— エメラルド", account_size_jpy: 50000000, challenge_price_jpy: 309800, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 6, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: -3, max_leverage: 100, profit_split_pct: 80, min_trading_days: 3, max_trading_days: null, time_limit_note: "最大無期限。30日間に1回以上の取引が必要。スケーリング道場適用で最大2億円まで拡大可能。", reset_option: null },

        { plan_group: "入門プラン（StartTrader）", plan_name: "入門プラン（StartTrader）— ビギナー", account_size_jpy: 1000000, challenge_price_jpy: 10000, evaluation_steps: 3, profit_target_step1_pct: 2, profit_target_step2_pct: 3, profit_target_step3_pct: 6, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -6, max_risk_per_open_position_pct: null, max_leverage: 25, profit_split_pct: null, profit_split_note: "ダイナミックな報酬システム（DPR）により50%〜最大100%（成果連動、固定値ではない）", min_trading_days: 3, max_trading_days: 180, time_limit_note: "各ステップ最大180日。30日間に1回以上の取引が必要。1日の最大利益は40%に制限（唯一のプログラム）。", reset_option: null },
        { plan_group: "入門プラン（StartTrader）", plan_name: "入門プラン（StartTrader）— ベーシック", account_size_jpy: 5000000, challenge_price_jpy: 29800, evaluation_steps: 3, profit_target_step1_pct: 2, profit_target_step2_pct: 3, profit_target_step3_pct: 6, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -6, max_risk_per_open_position_pct: null, max_leverage: 25, profit_split_pct: null, profit_split_note: "ダイナミックな報酬システム（DPR）により50%〜最大100%", min_trading_days: 3, max_trading_days: 180, time_limit_note: "各ステップ最大180日。30日間に1回以上の取引が必要。", reset_option: null },
        { plan_group: "入門プラン（StartTrader）", plan_name: "入門プラン（StartTrader）— アドバンス", account_size_jpy: 10000000, challenge_price_jpy: 49800, evaluation_steps: 3, profit_target_step1_pct: 2, profit_target_step2_pct: 3, profit_target_step3_pct: 6, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -6, max_risk_per_open_position_pct: null, max_leverage: 25, profit_split_pct: null, profit_split_note: "ダイナミックな報酬システム（DPR）により50%〜最大100%", min_trading_days: 3, max_trading_days: 180, time_limit_note: "各ステップ最大180日。30日間に1回以上の取引が必要。", reset_option: null, note: "公式サイトで「最も人気なプラン」と表示" },
        { plan_group: "入門プラン（StartTrader）", plan_name: "入門プラン（StartTrader）— マスター", account_size_jpy: 20000000, challenge_price_jpy: 84800, evaluation_steps: 3, profit_target_step1_pct: 2, profit_target_step2_pct: 3, profit_target_step3_pct: 6, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -6, max_risk_per_open_position_pct: null, max_leverage: 25, profit_split_pct: null, profit_split_note: "ダイナミックな報酬システム（DPR）により50%〜最大100%", min_trading_days: 3, max_trading_days: 180, time_limit_note: "各ステップ最大180日。30日間に1回以上の取引が必要。", reset_option: null }
      ],
      plans_source: {
        note: "登録済み：「チャレンジプラン（ProTrader）」全7サイズ、「入門プラン（StartTrader）」全4サイズ。未登録：「速攻プロプラン」「チャレンジプラン・スイング」「チャレンジプラン・スリム」。",
        source_urls: {
          protrader: "https://www.fintokei.com/jp/protrader/",
          starttrader: "https://www.fintokei.com/jp/starttrader/"
        },
        fetched_at: "2026-08-28"
      },

      instruments: {
        forex: true,
        gold_metals: true,
        crypto_cfd: true,
        indices: true,
        commodities_energy: true,
        stock_cfd: false,
        source_url: "https://www.fintokei.com/jp/protrader/",
        fetched_at: "2026-08-28"
      },

      trading_style: {
        scalping_allowed: true,
        news_trading_allowed: true,
        weekend_trading_allowed: true,
        overnight_trading_allowed: true,
        note: "公式チャレンジプランページ：「取引スタイル（スキャルピング、デイトレード、スイングトレード、指標トレード、EA使用）に関係なく、市場で反映でき得る限り自由な取引を支援」と明記。",
        source_urls: {
          style: "https://www.fintokei.com/jp/protrader/",
          weekend_crypto: "https://support.fintokei.com/ja/articles/12137786"
        },
        fetched_at: "2026-08-28"
      },

      ea_policy: {
        self_created_or_self_managed_ea_allowed: true,
        third_party_ea_or_signal_copying_allowed: false,
        third_party_purchased_ea_customized_allowed: null,
        note: "公式FAQ：「アルゴリズムトレーダーとしてEA（自動売買）を使用する方も…ご自身に合った環境を見つけることができます」。一方「他人のシグナルをコピーしたり、第三者による口座管理を行うことは禁止」「第三者が提供するシグナルやボット（EA）…に完全に依存することや、他人のトレードを手動、またはコピー・トレードシステムやEAを通じてコピーすることも禁止」。購入した第三者EAをカスタマイズ利用できるかは公式一次情報で確認できず未確認。",
        source_urls: {
          platform_ea_mention: "https://support.fintokei.com/ja/articles/6538834",
          copy_ea_rule: "https://support.fintokei.com/ja/articles/10419735"
        },
        fetched_at: "2026-08-29"
      },

      hedging_policy: {
        same_account_hedging_allowed: null,
        cross_account_hedging_allowed: false,
        cross_client_hedging_allowed: false,
        hedge_arbitrage_allowed: false,
        note: "「同一口座内のヘッジ」のみ公式な明記を確認できておらず未確認。複数口座・複数顧客間・アービトラージ系のヘッジ／裁定取引はいずれも公式「禁止取引の規定について」コレクションに定義項目があり、禁止取引として分類されている。複数プロフィール保有自体が禁止されている理由として公式は「戦略の複製や逆方向のヘッジ取引：口座間で意図的に戦略を分散・反転させる行為ができてしまうため」と明記。",
        source_urls: {
          prohibited_transactions_collection: "https://support.fintokei.com/ja/collections/9293503",
          single_profile_policy: "https://support.fintokei.com/ja/articles/10166369",
          restriction_rule_cases: "https://support.fintokei.com/ja/articles/11315966"
        },
        fetched_at: "2026-08-29"
      },

      platform_policy: {
        native_platforms: ["MT4", "MT5", "cTrader"],
        tradingview_access: "via_ctrader_only",
        tradingview_direct_platforms: [],
        plan_platform_exceptions: "チャレンジプラン・スリムはMT5のみ利用可（TradingView連携も不可）。この例外プランは本DB未登録。",
        note: "「MT4/MT5/cTrader/TradingViewの4プラットフォーム対応」という単純な並列表示はミスリード。正しくは：ネイティブ対応はMT4/MT5/cTraderの3つで、TradingViewはcTrader選択時のみ連携可能な分析・発注インターフェース。公式：「cTraderを選択すれば、FintokeiアカウントをTradingViewに直接接続でき…」。",
        source_url: "https://support.fintokei.com/ja/articles/6538834",
        fetched_at: "2026-08-29"
      },

      leverage: {
        challenge_plan_max: 100,
        starttrader_plan_max: 25,
        swifttrader_plan_max: 25,
        source_url: "https://support.fintokei.com/ja/articles/6538847",
        fetched_at: "2026-08-29"
      },

      risk_restrictions: {
        restricted_countries_full: ["アメリカ", "インド", "ロシア", "ベラルーシ", "北朝鮮", "イラン", "ミャンマー", "シリア", "イエメン", "キューバ", "ベネズエラ", "スーダン", "南スーダン", "アフガニスタン", "ソマリア", "イラク"],
        restricted_countries_temporary: ["ベトナム", "パキスタン", "バングラデシュ", "中国"],
        min_age: 18,
        one_profile_per_person: true,
        refund_policy: null,
        rule_changes_note: "本サービスはデモ環境での教育・評価サービスであり、規制された金融サービスではないと公式に明記。ルールは変更され得るため、申込前に必ず公式サイトで最新条件を確認すること。",
        important_risks: [
          "取引はすべてデモ口座（仮想環境）で行われ、リアルマネーの市場取引ではない。",
          "デモ環境の「利益」がそのまま現実の入金として還元されるわけではなく、報酬（データ提供料）としての支払いスキーム。",
          "Fintokeiは規制された金融サービス業者ではない（公式FAQで明記）。",
          "ルール・価格は公式サイトで随時変更される可能性がある。",
          "複数口座・複数顧客間のヘッジ、アービトラージ、第三者EAの完全コピー等は公式に禁止・制限対象（違反時は警告・制限ルール適用・最悪の場合アカウント閉鎖）。"
        ],
        source_url: "https://www.fintokei.com/jp/protrader/",
        fetched_at: "2026-08-28"
      },

      kyc_policy: {
        affiliate_payout_kyc_required: true,
        affiliate_payout_kyc_source_url: "https://support.fintokei.com/ja/articles/8419976",
        affiliate_payout_kyc_fetched_at: "2026-08-29",

        performance_reward_payout_kyc_required: null,
        trading_account_kyc_required_to_start: null,
        unverified_third_party_notes: [
          "複数の第三者メディア（本DBの一次情報基準では不採用）は、Fintokeiが出金申請時（初回出金前）に本人確認（KYC：パスポート/運転免許証/マイナンバーカード等＋セルフィー）を必須としていると一致して報告している。信頼度の高い状況証拠だが、本DBのFACTとしては未採用（公式一次情報での直接確認待ち。docs/audit-log.jsonのCAND-002参照）。"
        ],
        source_url_confirmed: "https://support.fintokei.com/ja/articles/8419976",
        fetched_at: "2026-08-29"
      }
    },

    // ============================================================
    // 2) PROVIDER SCORE — サービス品質評価（ユーザー非依存・固定値）
    //    ※ Affiliate/収益性の要素は一切含めない
    // ============================================================
    provider_score: {
      cost_score: 62,
      drawdown_score: 70,
      trading_flexibility_score: 78,
      ea_score: 82,
      payout_score: 80,
      platform_score: 78,
      rule_score: 70,
      overall_provider_score: 74,
      last_verified_date: DATA_RETRIEVED_AT,
      methodology_note: "本スコアはFintokei公式の評価ではなく、fact内の公式ルール（利益目標、DD、Profit Split、プラットフォーム構成、EA/ヘッジ/KYCポリシー等）を基にしたAITradingFinder独自の『サービス自体の品質』評価。特定ユーザーの適合度（User Match Score）や収益性（Business Score）とは完全に独立している。未確認項目が残るフィールド（reset_option, refund_policy等）はスコアに中立的にしか反映していない。"
    },

    // ============================================================
    // 3) BUSINESS / MONETIZATION SCORE — 完全に別レーン
    //    User Match Score には絶対に混入させないこと
    // ============================================================
    business_score: {
      warning: "この区画はAITradingFinderの収益・提携価値の評価であり、User Match Scoreの計算には一切使用しない。エンドユーザー向けの『あなたへのおすすめ度』表示に混ぜてはならない。",
      affiliate_commission_tier_max_pct: 15,
      affiliate_repeat_purchase_rewarded: true,
      affiliate_commercial_value_score: 80,
      methodology_note: "最大15%・再購入報酬ありという公式アフィリエイト条件を基準にAITradingFinderが独自算出。ユーザーへの適合度評価とは無関係。",
      last_verified_date: DATA_RETRIEVED_AT
    },

    affiliate_link: {
      status: "APPROVED",
      display_url: "https://www.fintokei.com/jp/?affiliate=2329",
      note: "MyFintokeiでアフィリエイト申請が承認され、正式なアフィリエイトトラッキングリンクに置き換え済み（2026-08-31登録）。"
    }
  }
];

const SITE_DISCLAIMERS = {
  independence: "AITradingFinder is an independent comparison and discovery platform. 当サイトはFintokeiをはじめとする各社の公式サイトではありません。",
  no_profit_guarantee: "本サイトの情報・AIマッチ度は投資助言や利益を保証するものではありません。最終判断は必ずご自身で、各社の公式サイト・公式規約を確認の上、行ってください。",
  affiliate_disclosure: "本ページの一部のリンクはアフィリエイトリンク（広告）です。リンク経由でお申し込みいただいた場合、当サイトが紹介報酬を受け取ることがあります。ただし、この収益性はMatch Scoreの計算には一切使用していません。",
  data_freshness: "価格・ルール等の情報は変更される可能性があります。掲載データの取得日時は各ページに明記しています。最新情報は必ず公式サイトでご確認ください。"
};
