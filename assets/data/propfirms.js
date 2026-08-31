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
  },

  {
    id: "ftmo",
    verified: true,

    // ============================================================
    // 1) FACT — 公式一次情報のみ（STEP 22-A / 22-Aで確認済みの値のみ登録。
    //    未確認は null のまま）
    // ============================================================
    fact: {
      basic: {
        company_name: null,
        brand_name: "FTMO",
        official_url: "https://ftmo.com/en/",
        country: "チェコ共和国（プラハ）",
        founded: null,
        website_language: null,
        affiliate_program: true,
        affiliate_commission: null,
        affiliate_cookie: null,
        affiliate_conditions: null,
        source_urls: {
          top: "https://ftmo.com/en/",
          pricing_1step: "https://ftmo.com/en/1-step-challenge/",
          pricing_2step: "https://ftmo.com/en/2-step-challenge/",
          company_address: "https://ftmo.com/en/1-step-challenge/"
        },
        fetched_at: "2026-08-31"
      },

      // 1-Step / 2-Step とも実ブラウザレンダリング後のDOMから直接確認（WebFetchでは
      // JS描画のため価格テーブルを取得できず、Playwrightで直接ページを読み込んで確認）。
      plans: [
        { plan_group: "FTMO Challenge — 1-Step", plan_name: "FTMO Challenge: 1-Step — $10,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 10000, account_size_currency: "USD", challenge_price: 79, challenge_price_currency: "EUR", evaluation_steps: 1, profit_target_step1_pct: 10, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, best_day_rule_pct: 50, profit_split_pct: 90, min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。Best Day Ruleにより1日の利益が総利益の50%を超えてはならない。", reset_option: null, refund_pct: 0, refund_note: "One-time fee（非返金）。", note: "Standardレバレッジ区分（1:100）。Swing区分（1:30）は本DB未登録。" },
        { plan_group: "FTMO Challenge — 1-Step", plan_name: "FTMO Challenge: 1-Step — $25,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 25000, account_size_currency: "USD", challenge_price: 199, challenge_price_currency: "EUR", evaluation_steps: 1, profit_target_step1_pct: 10, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, best_day_rule_pct: 50, profit_split_pct: 90, min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, refund_pct: 0, refund_note: "One-time fee（非返金）。" },
        { plan_group: "FTMO Challenge — 1-Step", plan_name: "FTMO Challenge: 1-Step — $50,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 50000, account_size_currency: "USD", challenge_price: 319, challenge_price_currency: "EUR", evaluation_steps: 1, profit_target_step1_pct: 10, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, best_day_rule_pct: 50, profit_split_pct: 90, min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, refund_pct: 0, refund_note: "One-time fee（非返金）。" },
        { plan_group: "FTMO Challenge — 1-Step", plan_name: "FTMO Challenge: 1-Step — $100,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 100000, account_size_currency: "USD", challenge_price: 399, challenge_price_currency: "EUR", evaluation_steps: 1, profit_target_step1_pct: 10, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, best_day_rule_pct: 50, profit_split_pct: 90, min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。掲載時点で「20% Off」の期間限定割引表示あり（通常€499）。", reset_option: null, refund_pct: 0, refund_note: "One-time fee（非返金）。", note: "「公式サイトでBest Value表示」。" },
        { plan_group: "FTMO Challenge — 1-Step", plan_name: "FTMO Challenge: 1-Step — $200,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 200000, account_size_currency: "USD", challenge_price: 999, challenge_price_currency: "EUR", evaluation_steps: 1, profit_target_step1_pct: 10, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, best_day_rule_pct: 50, profit_split_pct: 90, min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, refund_pct: 0, refund_note: "One-time fee（非返金）。" },

        { plan_group: "FTMO Challenge — 2-Step", plan_name: "FTMO Challenge: 2-Step — $10,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 10000, account_size_currency: "USD", challenge_price: 89, challenge_price_currency: "EUR", evaluation_steps: 2, profit_target_step1_pct: 10, profit_target_step2_pct: 5, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, profit_split_pct: null, profit_split_max_pct: 90, profit_split_note: "公式表示は「Up to 90%」。正確な開始%は公式一次情報で確認できず未確認。", min_trading_days: 4, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, refund_pct: 100, refund_note: "合格・初回Reward受取時に手数料が100%返金される。", note: "「Our flagship since 2015」と公式表示。" },
        { plan_group: "FTMO Challenge — 2-Step", plan_name: "FTMO Challenge: 2-Step — $25,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 25000, account_size_currency: "USD", challenge_price: 250, challenge_price_currency: "EUR", evaluation_steps: 2, profit_target_step1_pct: 10, profit_target_step2_pct: 5, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, profit_split_pct: null, profit_split_max_pct: 90, profit_split_note: "公式表示は「Up to 90%」。正確な開始%は未確認。", min_trading_days: 4, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, refund_pct: 100, refund_note: "合格・初回Reward受取時に手数料が100%返金される。" },
        { plan_group: "FTMO Challenge — 2-Step", plan_name: "FTMO Challenge: 2-Step — $50,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 50000, account_size_currency: "USD", challenge_price: 345, challenge_price_currency: "EUR", evaluation_steps: 2, profit_target_step1_pct: 10, profit_target_step2_pct: 5, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, profit_split_pct: null, profit_split_max_pct: 90, profit_split_note: "公式表示は「Up to 90%」。正確な開始%は未確認。", min_trading_days: 4, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, refund_pct: 100, refund_note: "合格・初回Reward受取時に手数料が100%返金される。" },
        { plan_group: "FTMO Challenge — 2-Step", plan_name: "FTMO Challenge: 2-Step — $100,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 100000, account_size_currency: "USD", challenge_price: 439, challenge_price_currency: "EUR", evaluation_steps: 2, profit_target_step1_pct: 10, profit_target_step2_pct: 5, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, profit_split_pct: null, profit_split_max_pct: 90, profit_split_note: "公式表示は「Up to 90%」。正確な開始%は未確認。", min_trading_days: 4, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。掲載時点で期間限定割引表示あり（通常€540）。", reset_option: null, refund_pct: 100, refund_note: "合格・初回Reward受取時に手数料が100%返金される。", note: "「公式サイトでBest Value表示」。" },
        { plan_group: "FTMO Challenge — 2-Step", plan_name: "FTMO Challenge: 2-Step — $200,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 200000, account_size_currency: "USD", challenge_price: 1080, challenge_price_currency: "EUR", evaluation_steps: 2, profit_target_step1_pct: 10, profit_target_step2_pct: 5, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, profit_split_pct: null, profit_split_max_pct: 90, profit_split_note: "公式表示は「Up to 90%」。正確な開始%は未確認。", min_trading_days: 4, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, refund_pct: 100, refund_note: "合格・初回Reward受取時に手数料が100%返金される。" }
      ],
      plans_source: {
        note: "1-Step / 2-Stepとも公式チャレンジページのJS描画後DOMを実ブラウザ（Playwright）で直接確認。他のチャレンジ区分（Swing等）は本DB未登録。",
        source_urls: { one_step: "https://ftmo.com/en/1-step-challenge/", two_step: "https://ftmo.com/en/2-step-challenge/" },
        fetched_at: "2026-08-31"
      },

      instruments: {
        forex: null, gold_metals: null, crypto_cfd: null, indices: null, commodities_energy: null, stock_cfd: null,
        source_url: null, fetched_at: null, note: "本フェーズでは価格・DD等ルール確認を優先し、取扱銘柄の一次情報確認は未実施。"
      },

      trading_style: {
        scalping_allowed: null,
        news_trading_allowed: null,
        weekend_trading_allowed: true,
        overnight_trading_allowed: null,
        note: "Challenge期間中は週末を跨いだポジション保有が公式に許可されている。ただしFTMO Account（Funded）ではStandard区分は週末前クローズ必須／ロールオーバー2時間、Swing区分は制限なしと account type により異なるため、overnight_trading_allowedは単一のtrue/falseに単純化せずnullとし本noteで説明する。",
        source_urls: {
          weekend_challenge: "https://ftmo.com/en/blog/holding-trades-over-the-weekend/",
          overnight_funded: "https://ftmo.com/en/faq/do-i-have-to-close-my-positions-overnight-or-before-the-weekend/"
        },
        fetched_at: "2026-08-31"
      },

      ea_policy: {
        self_created_or_self_managed_ea_allowed: true,
        third_party_ea_or_signal_copying_allowed: false,
        third_party_purchased_ea_customized_allowed: null,
        note: "公式FAQに基づきEA（自動売買）の使用自体は許可されているが、第三者口座への裁量アクセスを伴うコピートレード等は禁止されている。",
        source_urls: { faq: "https://ftmo.com/en/" },
        fetched_at: "2026-08-31"
      },

      hedging_policy: {
        same_account_hedging_allowed: null,
        cross_account_hedging_allowed: null,
        cross_client_hedging_allowed: null,
        hedge_arbitrage_allowed: null,
        note: "ヘッジ取引はBest Day Rule（1日の利益が総利益の50%を超えてはならないルール）との兼ね合いで制約を受けることが確認されているが、同一口座内／複数口座間／複数顧客間の分類ごとの可否は公式一次情報で個別に確認できておらず未確認。",
        source_urls: {},
        fetched_at: "2026-08-31"
      },

      platform_policy: {
        native_platforms: ["MT4", "MT5", "cTrader", "TradingView"],
        tradingview_access: null,
        tradingview_direct_platforms: null,
        note: "公式FAQ「Which platforms can I use for trading?」にてMT4/MT5/cTrader/TradingViewの利用が確認された。Fintokeiのように連携方式（直接対応か経由対応か）までは今回未確認。",
        source_url: "https://ftmo.com/en/faq/which-platforms-can-i-use-for-trading/",
        fetched_at: "2026-08-31"
      },

      leverage: {
        standard_max: 100,
        swing_max: 30,
        note: "Standard区分は最大1:100、Swing区分は最大1:30。本DBのplansはStandard区分（1-Step/2-Step Challenge）のみ登録。",
        source_url: "https://ftmo.com/en/faq/what-are-the-account-specifications/",
        fetched_at: "2026-08-31"
      },

      risk_restrictions: {
        restricted_countries_full: null,
        restricted_countries_temporary: null,
        min_age: null,
        one_profile_per_person: null,
        refund_policy: "1-Step: 非返金。2-Step: 合格・初回Reward受取時に手数料が100%返金される。",
        rule_changes_note: null,
        important_risks: [],
        source_url: null,
        fetched_at: "2026-08-31"
      },

      kyc_policy: {
        affiliate_payout_kyc_required: null,
        performance_reward_payout_kyc_required: true,
        trading_account_kyc_required_to_start: false,
        kyc_timing_note: "本人確認（Identity Verification）は評価合格後に実施。具体的な必要書類の種類は公式一次情報で個別に確認できておらず未確認。",
        source_url_confirmed: "https://ftmo.com/en/faq/when-do-i-complete-ftmo-identity/",
        fetched_at: "2026-08-31"
      }
    },

    // ============================================================
    // 2) PROVIDER SCORE — AITradingFinder独自のサービス品質評価
    //    （FACTではない。未確認項目が残るフィールドはスコアに中立的にしか反映していない）
    // ============================================================
    provider_score: {
      cost_score: 60,
      drawdown_score: 68,
      trading_flexibility_score: 55,
      ea_score: 65,
      payout_score: 70,
      platform_score: 75,
      rule_score: 60,
      overall_provider_score: 65,
      last_verified_date: "2026-08-31",
      methodology_note: "本スコアはFTMO公式の評価ではなく、fact内の公式ルール（価格表、DD、Profit Split、プラットフォーム構成、EA/KYCポリシー等）を基にしたAITradingFinder独自の『サービス自体の品質』評価。特定ユーザーの適合度（User Match Score）や収益性（Business Score）とは完全に独立している。ヘッジ詳細区分・KYC必要書類・Instruments等、公式一次情報で未確認のフィールドはスコアへ中立的にしか反映していない。"
    },

    // ============================================================
    // 3) BUSINESS / MONETIZATION SCORE — 完全に別レーン
    //    User Match Score には絶対に混入させないこと
    // ============================================================
    business_score: {
      warning: "この区画はAITradingFinderの収益・提携価値の評価であり、User Match Scoreの計算には一切使用しない。エンドユーザー向けの『あなたへのおすすめ度』表示に混ぜてはならない。",
      affiliate_commission_tier_max_pct: null,
      affiliate_repeat_purchase_rewarded: null,
      affiliate_commercial_value_score: null,
      methodology_note: "FTMOのアフィリエイト条件（報酬率・Cookie期間等）は今回未調査・未承認のため算出不可。affiliate_link.status=PLACEHOLDER_NOT_YET_APPROVED。",
      last_verified_date: "2026-08-31"
    },

    affiliate_link: {
      status: "PLACEHOLDER_NOT_YET_APPROVED",
      display_url: null,
      note: "FTMOの正式アフィリエイト提携は現時点で未承認。未承認URLは生成しない。承認後、正式なトラッキングリンクに置き換える。"
    }
  },

  {
    id: "fundednext",
    verified: true,

    // ============================================================
    // 1) FACT — 公式一次情報のみ（STEP 22-Aで確認済みの値のみ登録）
    // ============================================================
    fact: {
      basic: {
        company_name: null,
        brand_name: "FundedNext",
        official_url: "https://fundednext.com/",
        country: null,
        founded: null,
        website_language: null,
        affiliate_program: null,
        affiliate_commission: null,
        affiliate_cookie: null,
        affiliate_conditions: null,
        source_urls: {
          top: "https://fundednext.com/",
          cfd_challenge_terms: "https://fundednext.com/cfd-challenge-terms",
          instant_account_terms: "https://fundednext.com/instant-account-terms",
          ea_hedge_copy_faq: "https://help.fundednext.com/en/articles/8020351",
          weekend_overnight_faq: "https://help.fundednext.com/en/articles/7971501",
          leverage_faq: "https://help.fundednext.com/en/articles/8019669-what-is-the-maximum-leverage-offered-by-fundednext",
          kyc_faq: "https://help.fundednext.com/en/articles/15442628-understanding-the-kyc-verification-process-at-fundednext",
          instant_pricing_faq: "https://help.fundednext.com/en/articles/11641161",
          payout_faq: "https://help.fundednext.com/en/articles/11982431"
        },
        fetched_at: "2026-08-31"
      },

      // Challenge系5モデルはfundednext.com/cfd-challenge-terms（規約本文、法的文言のため
      // 数値の曖昧さがない）から直接確認。Stellar Instantは別商品ラインで、価格のみ
      // help.fundednext.com記事から直接確認（評価ステップが無いためprofit_target/drawdownは対象外＝null）。
      plans: [
        { plan_group: "FundedNext CFD Challenge — Evaluation", plan_name: "Evaluation Model", account_size_jpy: null, challenge_price_jpy: null, account_size: null, account_size_currency: null, challenge_price: null, challenge_price_currency: null, evaluation_steps: 2, profit_target_step1_pct: 10, profit_target_step2_pct: 5, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: null, profit_split_pct: null, min_trading_days: 5, max_trading_days: null, time_limit_note: null, reset_option: null, note: "口座サイズ・価格は本モデルでは未確認。" },
        { plan_group: "FundedNext CFD Challenge — Express", plan_name: "Express Model", account_size_jpy: null, challenge_price_jpy: null, account_size: null, account_size_currency: null, challenge_price: null, challenge_price_currency: null, evaluation_steps: 1, profit_target_step1_pct: 25, profit_target_step2_pct: null, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: null, profit_split_pct: null, min_trading_days: 10, max_trading_days: null, time_limit_note: null, reset_option: null, note: "口座サイズ・価格は本モデルでは未確認。" },
        { plan_group: "FundedNext CFD Challenge — Stellar 1-Step", plan_name: "Stellar 1-Step Model", account_size_jpy: null, challenge_price_jpy: null, account_size: null, account_size_currency: null, challenge_price: null, challenge_price_currency: null, evaluation_steps: 1, profit_target_step1_pct: 10, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -6, max_risk_per_open_position_pct: null, max_leverage: 30, profit_split_pct: null, min_trading_days: 2, max_trading_days: null, time_limit_note: null, reset_option: null, note: "レバレッジはForex基準（1:30）。Indices/Commodities/Cryptoは資産クラスごとに異なる（fact.leverage参照）。口座サイズ・価格は未確認。" },
        { plan_group: "FundedNext CFD Challenge — Stellar 2-Step", plan_name: "Stellar 2-Step Model", account_size_jpy: null, challenge_price_jpy: null, account_size: null, account_size_currency: null, challenge_price: null, challenge_price_currency: null, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 5, max_daily_drawdown_pct: -5, max_total_drawdown_pct: -10, max_risk_per_open_position_pct: null, max_leverage: 100, profit_split_pct: null, min_trading_days: 5, max_trading_days: null, time_limit_note: null, reset_option: null, note: "レバレッジはForex基準（1:100）。口座サイズ・価格は未確認。" },
        { plan_group: "FundedNext CFD Challenge — Stellar Lite", plan_name: "Stellar Lite Model", account_size_jpy: null, challenge_price_jpy: null, account_size: null, account_size_currency: null, challenge_price: null, challenge_price_currency: null, evaluation_steps: 2, profit_target_step1_pct: 8, profit_target_step2_pct: 4, max_daily_drawdown_pct: -4, max_total_drawdown_pct: -8, max_risk_per_open_position_pct: null, max_leverage: 100, profit_split_pct: null, min_trading_days: 5, max_trading_days: null, time_limit_note: null, reset_option: null, note: "レバレッジはForex基準（1:100）。口座サイズ・価格は未確認。" },

        { plan_group: "FundedNext Stellar Instant", plan_name: "Stellar Instant — $2,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 2000, account_size_currency: "USD", challenge_price: 59.99, challenge_price_currency: "USD", evaluation_steps: 0, profit_target_step1_pct: null, profit_target_step2_pct: null, max_daily_drawdown_pct: null, max_total_drawdown_pct: null, max_risk_per_open_position_pct: null, max_leverage: null, profit_split_pct: null, min_trading_days: null, max_trading_days: null, time_limit_note: "評価ステップなし（インスタントファンディング）。継続費用なし。", reset_option: null },
        { plan_group: "FundedNext Stellar Instant", plan_name: "Stellar Instant — $5,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 5000, account_size_currency: "USD", challenge_price: 149.99, challenge_price_currency: "USD", evaluation_steps: 0, profit_target_step1_pct: null, profit_target_step2_pct: null, max_daily_drawdown_pct: null, max_total_drawdown_pct: null, max_risk_per_open_position_pct: null, max_leverage: null, profit_split_pct: null, min_trading_days: null, max_trading_days: null, time_limit_note: "評価ステップなし（インスタントファンディング）。継続費用なし。", reset_option: null },
        { plan_group: "FundedNext Stellar Instant", plan_name: "Stellar Instant — $10,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 10000, account_size_currency: "USD", challenge_price: 299.99, challenge_price_currency: "USD", evaluation_steps: 0, profit_target_step1_pct: null, profit_target_step2_pct: null, max_daily_drawdown_pct: null, max_total_drawdown_pct: null, max_risk_per_open_position_pct: null, max_leverage: null, profit_split_pct: null, min_trading_days: null, max_trading_days: null, time_limit_note: "評価ステップなし（インスタントファンディング）。継続費用なし。", reset_option: null },
        { plan_group: "FundedNext Stellar Instant", plan_name: "Stellar Instant — $20,000", account_size_jpy: null, challenge_price_jpy: null, account_size: 20000, account_size_currency: "USD", challenge_price: 599.99, challenge_price_currency: "USD", evaluation_steps: 0, profit_target_step1_pct: null, profit_target_step2_pct: null, max_daily_drawdown_pct: null, max_total_drawdown_pct: null, max_risk_per_open_position_pct: null, max_leverage: null, profit_split_pct: null, min_trading_days: null, max_trading_days: null, time_limit_note: "評価ステップなし（インスタントファンディング）。継続費用なし。", reset_option: null }
      ],
      plans_source: {
        note: "Challenge系5モデルのDLL/MLL/Profit Target/最低取引日数はfundednext.com/cfd-challenge-terms（規約本文）から直接確認。Stellar Instantの価格はhelp.fundednext.com記事内の直接fetchで確認。",
        source_urls: {
          cfd_terms: "https://fundednext.com/cfd-challenge-terms",
          instant_pricing: "https://help.fundednext.com/en/articles/11641161"
        },
        fetched_at: "2026-08-31"
      },

      instruments: {
        forex: null, gold_metals: null, crypto_cfd: null, indices: null, commodities_energy: null, stock_cfd: null,
        source_url: null, fetched_at: null, note: "leverage表にForex/Indices/Commodities/Cryptoの区分は確認できたが、取扱可否そのものは個別未確認。"
      },

      trading_style: {
        scalping_allowed: null,
        news_trading_allowed: null,
        weekend_trading_allowed: true,
        overnight_trading_allowed: true,
        note: "公式ヘルプ記事に金曜〜火曜のポジション保有継続の実例が明記されており、週末・オーバーナイト保有はともに許可されている。",
        source_urls: { weekend_overnight: "https://help.fundednext.com/en/articles/7971501" },
        fetched_at: "2026-08-31"
      },

      ea_policy: {
        self_created_or_self_managed_ea_allowed: null,
        third_party_ea_or_signal_copying_allowed: null,
        third_party_purchased_ea_customized_allowed: null,
        automated_trading_requires_authorization: true,
        note: "公式ヘルプ記事にて「Bot／Script／AIエージェントは許可なしでは制限される」旨を確認。自作／第三者の区別までは明記されておらず未確認。",
        source_urls: { ea_hedge_copy: "https://help.fundednext.com/en/articles/8020351" },
        fetched_at: "2026-08-31"
      },

      hedging_policy: {
        same_account_hedging_allowed: true,
        cross_account_hedging_allowed: false,
        cross_client_hedging_allowed: null,
        hedge_arbitrage_allowed: null,
        note: "同一口座内でのヘッジは許可、複数口座間のヘッジは禁止と確認。複数顧客間・アービトラージ系は未確認。",
        source_urls: { ea_hedge_copy: "https://help.fundednext.com/en/articles/8020351" },
        fetched_at: "2026-08-31"
      },

      copy_trading_policy: {
        allowed: null,
        fundednext_account_only: true,
        note: "コピートレードはFundedNext口座間に限り条件付きで許可（外部シグナル提供者からのコピー等は不可と解される）。",
        source_url: "https://help.fundednext.com/en/articles/8020351",
        fetched_at: "2026-08-31"
      },

      platform_policy: {
        native_platforms: null,
        tradingview_access: null,
        tradingview_direct_platforms: null,
        note: "本フェーズでは未確認。",
        source_url: null,
        fetched_at: null
      },

      leverage: {
        challenge_account: {
          stellar_1step: { forex: 30, indices: 10, commodities: 15, crypto: 1 },
          stellar_2step_lite: { forex: 100, indices: 25, commodities: 25, crypto: 1 }
        },
        funded_account: {
          stellar_1step: { forex: 30, indices: 10, commodities: 10, crypto: 1 },
          stellar_2step_lite: { forex: 100, indices: 15, commodities: 15, crypto: 1 }
        },
        note: "help.fundednext.com記事内のレバレッジ表画像2枚（Challenge Account／FundedNext Account）を直接ダウンロードし目視確認。Evaluation/Express/Stellar Instantモデルのレバレッジは同表に含まれず未確認。",
        source_url: "https://help.fundednext.com/en/articles/8019669-what-is-the-maximum-leverage-offered-by-fundednext",
        fetched_at: "2026-08-31"
      },

      risk_restrictions: {
        restricted_countries_full: null,
        restricted_countries_temporary: null,
        min_age: null,
        one_profile_per_person: null,
        refund_policy: "Stellar Instant: 購入後7日間、取引活動が無ければ返金可。初回取引後、または重大な規約違反後は返金不可。",
        rule_changes_note: null,
        important_risks: [],
        source_url: "https://fundednext.com/instant-account-terms",
        fetched_at: "2026-08-31"
      },

      kyc_policy: {
        affiliate_payout_kyc_required: null,
        performance_reward_payout_kyc_required: true,
        trading_account_kyc_required_to_start: false,
        kyc_timing_note: "プロフィール単位のKYC。Stellar Challengeはフェーズ合格後（サーバーリセット後）、Stellar Instantは初回Performance Reward申請前に実施。",
        required_documents: ["National ID", "Passport", "Permanent Residence Permit", "Driving License（米国・オーストラリア・ニュージーランド・カナダ居住者のみ）"],
        liveness_check_required: true,
        proof_of_address_required_if_requested: true,
        proof_of_address_documents: ["Utility Bill", "Bank Statement（発行から3ヶ月以内）"],
        validity_days: 90,
        renewal_required: true,
        submission_attempts: 3,
        submission_attempts_exception: "イラク・ナイジェリア居住者は5回。",
        source_url_confirmed: "https://help.fundednext.com/en/articles/15442628-understanding-the-kyc-verification-process-at-fundednext",
        fetched_at: "2026-08-31"
      },

      payout_policy: {
        profit_split_cfd_max_pct: 90,
        profit_split_futures_pct: 100,
        payout_processing_note: "Performance Reward申請から24時間以内に処理。",
        source_url: "https://help.fundednext.com/en/articles/11982431",
        fetched_at: "2026-08-31"
      }
    },

    provider_score: {
      cost_score: 62,
      drawdown_score: 66,
      trading_flexibility_score: 72,
      ea_score: 50,
      payout_score: 75,
      platform_score: 50,
      rule_score: 68,
      overall_provider_score: 63,
      last_verified_date: "2026-08-31",
      methodology_note: "本スコアはFundedNext公式の評価ではなく、fact内の公式ルール（規約本文のDLL/MLL/Profit Target、レバレッジ表、KYC/EA/ヘッジ/週末保有ポリシー等）を基にしたAITradingFinder独自の『サービス自体の品質』評価。プラットフォーム構成・自作EA可否・Challenge系の口座サイズと価格等、未確認のフィールドはスコアへ中立的にしか反映していない。"
    },

    business_score: {
      warning: "この区画はAITradingFinderの収益・提携価値の評価であり、User Match Scoreの計算には一切使用しない。エンドユーザー向けの『あなたへのおすすめ度』表示に混ぜてはならない。",
      affiliate_commission_tier_max_pct: null,
      affiliate_repeat_purchase_rewarded: null,
      affiliate_commercial_value_score: null,
      methodology_note: "FundedNextのアフィリエイト条件は今回未調査・未承認のため算出不可。affiliate_link.status=PLACEHOLDER_NOT_YET_APPROVED。",
      last_verified_date: "2026-08-31"
    },

    affiliate_link: {
      status: "PLACEHOLDER_NOT_YET_APPROVED",
      display_url: null,
      note: "FundedNextの正式アフィリエイト提携は現時点で未承認。未承認URLは生成しない。承認後、正式なトラッキングリンクに置き換える。"
    }
  },

  {
    id: "the5ers",
    verified: true,

    // ============================================================
    // 1) FACT — 公式一次情報のみ（STEP 22-Aで確認済みの値のみ登録）
    // ============================================================
    fact: {
      basic: {
        company_name: "Five Percent Online Ltd.",
        brand_name: "The5ers",
        official_url: "https://the5ers.com/",
        country: "イギリス（ロンドン）",
        founded: null,
        website_language: null,
        affiliate_program: null,
        affiliate_commission: null,
        affiliate_cookie: null,
        affiliate_conditions: null,
        source_urls: {
          top: "https://the5ers.com/",
          hyper_growth: "https://the5ers.com/hyper-growth/",
          bootcamp: "https://the5ers.com/bootcamp/",
          prohibited_practices: "https://the5ers.com/faqs/prohibited-trading-practices/",
          terms: "https://the5ers.com/terms-and-conditions/",
          asset_specifications: "https://the5ers.com/asset-specifications/",
          refund_policy: "https://the5ers.com/futures-faqs/cancellation-and-refund-policy/",
          company_registration: "https://the5ers.com/hyper-growth/"
        },
        fetched_at: "2026-08-31"
      },

      // Growth系（Pro Growth / Hyper Growth）はthe5ers.com/hyper-growth/、
      // Bootcamp系はthe5ers.com/bootcamp/を実ブラウザで直接確認。
      plans: [
        { plan_group: "Growth Program — Pro Growth", plan_name: "Pro Growth", account_size_jpy: null, challenge_price_jpy: null, account_size: null, account_size_currency: "USD", challenge_price: 52, challenge_price_currency: "USD", evaluation_steps: 1, profit_target_step1_pct: 10, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -6, max_risk_per_open_position_pct: null, max_leverage: 30, profit_split_pct: null, profit_split_max_pct: 100, profit_split_note: "公式表示は「Up to 100%」。", min_trading_days: 3, min_trading_days_note: "Minimum profitable days（利益が出た取引日数の最低要件）。", max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, note: "開始口座サイズは$5,000 / $10,000 / $20,000 / $50,000から選択可（ターゲット達成ごとに口座残高が倍増、最大$4,000,000まで拡大）。ファンディング後のフェーズも同一ルールが継続。platform: Mt5 Hedge。" },
        { plan_group: "Growth Program — Hyper Growth", plan_name: "Hyper Growth", account_size_jpy: null, challenge_price_jpy: null, account_size: null, account_size_currency: "USD", challenge_price: null, challenge_price_currency: null, evaluation_steps: 1, profit_target_step1_pct: 10, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -6, max_risk_per_open_position_pct: null, max_leverage: 30, profit_split_pct: null, profit_split_max_pct: 100, profit_split_note: "公式表示は「Up to 100%」。", min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, note: "一律の申込手数料はなく、$15からのBonusモデル。開始口座サイズは$5,000〜$50,000から選択可（同上）。platform: Mt5 Hedge。週末・ニュース取引とも許可（fact.trading_style参照）。" },

        { plan_group: "Bootcamp Program", plan_name: "Bootcamp — Step 1", account_size_jpy: null, challenge_price_jpy: null, account_size: 5000, account_size_currency: "USD", challenge_price: 22, challenge_price_currency: "USD", evaluation_steps: 3, profit_target_step1_pct: 6, profit_target_step2_pct: null, max_daily_drawdown_pct: null, max_total_drawdown_pct: -5, max_risk_per_open_position_pct: null, max_leverage: 30, profit_split_pct: null, min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, note: "合格でHub Credit $2のボーナス。platform: the Hub。" },
        { plan_group: "Bootcamp Program", plan_name: "Bootcamp — Step 2", account_size_jpy: null, challenge_price_jpy: null, account_size: 10000, account_size_currency: "USD", challenge_price: null, challenge_price_currency: null, evaluation_steps: 3, profit_target_step1_pct: 6, profit_target_step2_pct: null, max_daily_drawdown_pct: null, max_total_drawdown_pct: -5, max_risk_per_open_position_pct: null, max_leverage: 30, profit_split_pct: null, min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, note: "Step1合格後に進む段階。追加費用の記載は公式ページ上で確認できず（「–」表示）。platform: the Hub。" },
        { plan_group: "Bootcamp Program", plan_name: "Bootcamp — Step 3", account_size_jpy: null, challenge_price_jpy: null, account_size: 15000, account_size_currency: "USD", challenge_price: null, challenge_price_currency: null, evaluation_steps: 3, profit_target_step1_pct: 6, profit_target_step2_pct: null, max_daily_drawdown_pct: null, max_total_drawdown_pct: -5, max_risk_per_open_position_pct: null, max_leverage: 30, profit_split_pct: null, min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, note: "Step2合格後に進む段階。追加費用の記載は公式ページ上で確認できず（「–」表示）。platform: the Hub。" },
        { plan_group: "Bootcamp Program", plan_name: "Bootcamp — Funded Trader", account_size_jpy: null, challenge_price_jpy: null, account_size: 20000, account_size_currency: "USD", challenge_price: 50, challenge_price_currency: "USD", evaluation_steps: 3, profit_target_step1_pct: 5, profit_target_step2_pct: null, max_daily_drawdown_pct: -3, max_total_drawdown_pct: -4, max_risk_per_open_position_pct: null, max_leverage: 30, profit_split_pct: null, profit_split_max_pct: 100, profit_split_note: "公式表示は「Up to 100%」。", min_trading_days: null, max_trading_days: null, time_limit_note: "取引期間無制限（Unlimited）。", reset_option: null, note: "Funded Trader段階の$50は公式ページ上「Cost」列に表示された値で、Step1〜3との正確な課金関係（直接申込用か等）は本文からは判別できず未確認のまま記載。platform: the Hub。" }
      ],
      plans_source: {
        note: "Pro Growth / Hyper Growthはthe5ers.com/hyper-growth/、Bootcamp（Step1〜3・Funded Trader）はthe5ers.com/bootcamp/の料金・ルール表を実ブラウザで直接確認。",
        source_urls: { hyper_growth: "https://the5ers.com/hyper-growth/", bootcamp: "https://the5ers.com/bootcamp/" },
        fetched_at: "2026-08-31"
      },

      instruments: {
        forex: true, gold_metals: true, crypto_cfd: true, indices: true, commodities_energy: null, stock_cfd: null,
        note: "Hyper Growthページに「Assets available: FX, Metals, Indices, crypto」と明記（Growth系プログラムの記載。Bootcamp/他プログラムでの取扱いは個別未確認）。",
        source_url: "https://the5ers.com/hyper-growth/",
        fetched_at: "2026-08-31"
      },

      trading_style: {
        scalping_allowed: null,
        news_trading_allowed: true,
        weekend_trading_allowed: true,
        overnight_trading_allowed: true,
        reset_policy: null,
        note: "公式アセット仕様ページ・Hyper Growth／Bootcampページの複数箇所で「週末・オーバーナイトのポジション保有は許可（Indices/Commoditiesの週末保有はスワップ高）」「ニュース取引は許可（一部ブラケット戦略を除く）」と一致して確認。Reset Policyについては公式ページ（旧リセット商品ページ含む）・Terms and Conditions・FAQ一覧のいずれにも該当情報が見つからず、未確認のままnullとする（ページ不在＝falseとは推測しない）。",
        source_urls: {
          asset_specifications: "https://the5ers.com/asset-specifications/",
          hyper_growth: "https://the5ers.com/hyper-growth/",
          bootcamp: "https://the5ers.com/bootcamp/"
        },
        fetched_at: "2026-08-31"
      },

      ea_policy: {
        self_created_or_self_managed_ea_allowed: null,
        third_party_ea_or_signal_copying_allowed: null,
        third_party_purchased_ea_customized_allowed: null,
        note: "公式「禁止取引の規定」ページにEA単独を名指しした禁止条項は確認できず、EA可否そのものは未確認のまま。",
        source_url: "https://the5ers.com/faqs/prohibited-trading-practices/",
        fetched_at: "2026-08-31"
      },

      hedging_policy: {
        same_account_hedging_allowed: null,
        cross_account_hedging_allowed: false,
        cross_client_hedging_allowed: false,
        hedge_arbitrage_allowed: false,
        note: "公式「禁止取引の規定」ページにヘッジ・コピートレード・アービトラージが禁止行為として明記されている。同一口座内のヘッジ可否は個別に確認できておらず未確認。",
        source_url: "https://the5ers.com/faqs/prohibited-trading-practices/",
        fetched_at: "2026-08-31"
      },

      copy_trading_policy: {
        allowed: false,
        note: "公式「禁止取引の規定」ページにてコピートレードは禁止行為として明記。",
        source_url: "https://the5ers.com/faqs/prohibited-trading-practices/",
        fetched_at: "2026-08-31"
      },

      platform_policy: {
        native_platforms: null,
        tradingview_access: null,
        tradingview_direct_platforms: null,
        note: "Growth系はMt5 Hedge、Bootcamp系は独自プラットフォーム「the Hub」と公式ページに表示。MT4/cTrader/TradingView等の対応可否は未確認。",
        source_url: "https://the5ers.com/hyper-growth/",
        fetched_at: "2026-08-31"
      },

      leverage: {
        growth_programs_max: 30,
        bootcamp_max: 30,
        note: "Pro Growth / Hyper Growth / Bootcampのいずれも公式ページで最大1:30と確認。",
        source_urls: { hyper_growth: "https://the5ers.com/hyper-growth/", bootcamp: "https://the5ers.com/bootcamp/" },
        fetched_at: "2026-08-31"
      },

      risk_restrictions: {
        restricted_countries_full: ["アフガニスタン", "ベラルーシ", "ブルンジ", "中央アフリカ共和国", "キューバ", "コンゴ共和国", "クリミア", "コンゴ民主共和国", "エリトリア", "ギニア", "ギニアビサウ", "イラク", "イラン", "イスラエル", "ラオス", "レバノン", "リベリア", "リビア", "ミャンマー", "北朝鮮", "パレスチナ自治区", "パプアニューギニア", "ロシア", "南スーダン", "スーダン", "ソマリア", "シリア", "バヌアツ", "ベネズエラ", "イエメン"],
        restricted_countries_temporary: null,
        min_age: null,
        one_profile_per_person: null,
        refund_policy: "Evaluation Programs: 購入後14日以内に取引が一切なければ返金可。Black Arrow Pro（本DB未登録プログラム）: 取引有無に関わらず返金不可。処理は元の支払い方法で5〜7営業日。",
        rule_changes_note: "取引はすべてシミュレーション環境で行われ、実際の金融取引ではないと公式に明記。",
        important_risks: [
          "取引はすべてシミュレーション環境（Hub上の仮想資金）で行われ、実際の市場取引ではない。",
          "Five Percent Online Ltdは規制対象の金融機関・カストディアン・取引所等ではないと公式に明記。",
          "Funded Userになれることは保証されない。"
        ],
        source_url: "https://the5ers.com/futures-faqs/cancellation-and-refund-policy/",
        fetched_at: "2026-08-31"
      },

      kyc_policy: {
        affiliate_payout_kyc_required: null,
        performance_reward_payout_kyc_required: true,
        trading_account_kyc_required_to_start: null,
        kyc_timing_note: "評価合格後に本人確認を実施。ビデオ面談が求められる場合があり、手続きは5営業日以内。",
        source_url_confirmed: "https://the5ers.com/terms-and-conditions/",
        fetched_at: "2026-08-31"
      },

      payout_policy: {
        weekly_payout_cap_usd: 10000,
        payout_name_match_required: true,
        note: "出金は週あたり$10,000が上限。登録名義と同一口座への出金のみ許可。",
        source_url: "https://the5ers.com/terms-and-conditions/",
        fetched_at: "2026-08-31"
      }
    },

    provider_score: {
      cost_score: 70,
      drawdown_score: 72,
      trading_flexibility_score: 78,
      ea_score: 50,
      payout_score: 60,
      platform_score: 55,
      rule_score: 65,
      overall_provider_score: 64,
      last_verified_date: "2026-08-31",
      methodology_note: "本スコアはThe5ers公式の評価ではなく、fact内の公式ルール（Hyper Growth/Bootcampの料金表、DD、Profit Split、禁止取引規定、資産仕様ページ等）を基にしたAITradingFinder独自の『サービス自体の品質』評価。EA可否・プラットフォーム対応範囲・Reset Policy等、未確認のフィールドはスコアへ中立的にしか反映していない。"
    },

    business_score: {
      warning: "この区画はAITradingFinderの収益・提携価値の評価であり、User Match Scoreの計算には一切使用しない。エンドユーザー向けの『あなたへのおすすめ度』表示に混ぜてはならない。",
      affiliate_commission_tier_max_pct: null,
      affiliate_repeat_purchase_rewarded: null,
      affiliate_commercial_value_score: null,
      methodology_note: "The5ersのアフィリエイト条件は今回未調査・未承認のため算出不可。affiliate_link.status=PLACEHOLDER_NOT_YET_APPROVED。",
      last_verified_date: "2026-08-31"
    },

    affiliate_link: {
      status: "PLACEHOLDER_NOT_YET_APPROVED",
      display_url: null,
      note: "The5ersの正式アフィリエイト提携は現時点で未承認。未承認URLは生成しない。承認後、正式なトラッキングリンクに置き換える。"
    }
  }
];

const SITE_DISCLAIMERS = {
  independence: "AITradingFinder is an independent comparison and discovery platform. 当サイトはFintokeiをはじめとする各社の公式サイトではありません。",
  no_profit_guarantee: "本サイトの情報・AIマッチ度は投資助言や利益を保証するものではありません。最終判断は必ずご自身で、各社の公式サイト・公式規約を確認の上、行ってください。",
  affiliate_disclosure: "本ページの一部のリンクはアフィリエイトリンク（広告）です。リンク経由でお申し込みいただいた場合、当サイトが紹介報酬を受け取ることがあります。ただし、この収益性はMatch Scoreの計算には一切使用していません。",
  data_freshness: "価格・ルール等の情報は変更される可能性があります。掲載データの取得日時は各ページに明記しています。最新情報は必ず公式サイトでご確認ください。"
};
