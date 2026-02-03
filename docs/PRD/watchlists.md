# Watchlists

Categories: Web App
Reviewer: Vincent Lo
Created by: Leona Wong
Priority: Medium
Impact: High
Comments: 3.3 strategy integration - would like more clarification on portfolio management versus trade execution.  These strategy are more related to trade execution.  Want to understand more how this relates to Portfolio Management.  
3.6 Scenario analysis - feels this can be separate from Portfolio mgmt.  it’s more related to a specific module called ‘What-if’ - that works on scenarios and applying different strategies (e.g. 3.3) to an asset or a group of assets.
US-31 - it seems to be more related to trade execution/what-if analysis
User Stories: Multiple Watchlists (https://www.notion.so/Multiple-Watchlists-2d91191b72fc80729448c1669a7c1601?pvs=21), Asset Tracking (https://www.notion.so/Asset-Tracking-2d91191b72fc80acb22ace090224242d?pvs=21), Backtest (https://www.notion.so/Backtest-2d91191b72fc804bb44efc18b0ddab5b?pvs=21), Performance Metrics (https://www.notion.so/Performance-Metrics-2d91191b72fc8015b5e9e2e41c86be23?pvs=21), Risk Assessment (https://www.notion.so/Risk-Assessment-2d91191b72fc80e6abbcfbd1a377100a?pvs=21), Scenario Analysis (https://www.notion.so/Scenario-Analysis-2d91191b72fc80898068d6e197c04915?pvs=21), Personalize Recommendation (3) (https://www.notion.so/Personalize-Recommendation-3-2d91191b72fc803abd15eb413dcbc66a?pvs=21), Asset Picker (https://www.notion.so/Asset-Picker-2da1191b72fc808ea4ebc13e284b3d54?pvs=21), Strategy Review (https://www.notion.so/Strategy-Review-2da1191b72fc803a9153f59295d12aaa?pvs=21), Add to Watchlist (https://www.notion.so/Add-to-Watchlist-2da1191b72fc809b950ccc30fda1c33a?pvs=21), Apply Strategy (https://www.notion.so/Apply-Strategy-2da1191b72fc809a8a53c773c432a2a4?pvs=21)
ID: PF-49
Description: Empower users to monitor, analyze, and optimize their investments across multiple asset classes
Status: In Review

<aside>
💡

**Watchlists** are for **pre-trade** monitoring, research, and strategy simulation (ie. **no real account connection**); ideal for **discovery and planning**.

</aside>

### 1. Overview

The Watchlists module on the Midas Platform is an intelligent, action-oriented workspace designed to empower users to efficiently track, analyze, and act on trading opportunities across multiple asset classes, including crypto, stocks, FX, and commodities. Watchlists is a dynamic pre-trade staging area, seamlessly bridging the gap between market discovery and trade execution. By integrating real-time analytics, AI-driven recommendations, and direct access to backtesting and strategy application, Watchlists enable users to monitor assets and strategies of interest, receive timely alerts, and quickly initiate trade workflows from a unified dashboard. This empowers retail and institutional investors alike to transform insights into decisive action, optimizing their trading performance in fast-moving markets.

### 2. Objectives

1. **Accelerate Trade Preparation:** Provide users with an actionable workspace for curating and monitoring assets and strategies, enabling rapid response to market signals and reducing friction between idea generation and order execution.
2. **Enable Real-Time Signal Tracking:** Deliver live price updates, sentiment changes, and AI-driven alerts directly within watchlists, helping users stay ahead of market moves and act on actionable signals instantly.
3. **Streamline Execution Workflows:** Allow users to initiate backtests, apply strategies, or execute trades directly from the watchlist, transforming monitored opportunities into portfolio actions with minimal steps.
4. **Personalize Opportunity Management:** Let users organize watchlists by themes, strategies, or asset classes, with customizable tags, labels, and alert preferences to align with individual trading styles and objectives.
5. **Empower Data-Driven Decision Making:** Integrate performance analytics, risk scores, and AI explanations into watchlists, supporting informed pre-trade decisions and reinforcing user confidence in execution.
6. **Facilitate Seamless Integration:** Support one-click transfers of assets or strategies from watchlists to portfolio, and provide APIs for programmatic monitoring and trade execution to serve both retail and B2B users.

### 3. Key Features & Functionalities

> [**US-32 Asset Picker**](https://www.notion.so/Asset-Picker-2da1191b72fc808ea4ebc13e284b3d54?pvs=21)
Users need intuitive tools to search, filter, and add or import the assets via CSV, enabling rapid onboarding and dynamic adjustments in the watchlist or portfolio.
> 

**3.1 Asset Picker & Bulk Onboarding**

**3.1.1 Asset Picker**

1. Search and filter assets by class, name, performance, or compatibility with user strategies.
2. Show instant preview of key metrics, recent trends, sentiment and risk scores in the asset selection interface.
3. Support batch selection and addition to portfolio or watchlists.

**3.1.2 Bulk Import**

1. Enable bulk onboarding by allowing users to upload a CSV file with their positions.
2. Use a step-by-step wizard to map columns, validate data, and resolve conflicts.
3. Provide a summary and error feedback for seamless onboarding.

> **US-34** [Add to Watchlist](https://www.notion.so/Add-to-Watchlist-2da1191b72fc809b950ccc30fda1c33a?pvs=21) 

Users need capabilities to create, organize, and manage multiple watchlists for assets and strategies, including quick access to single-asset overviews and the ability to run backtests directly from the watchlist.

Users expect to add assets to watchlists directly from any single-asset overview for efficient tracking.
> 

**3.2 Watchlists**

**3.2.1 Create and Manage Watchlists**

1. Users can create new watchlists with custom names, descriptions, and tags to organize assets by themes, strategies, or asset classes.
2. Provide intuitive UI for reordering, renaming, and deleting watchlists via drag-and-drop and contextual menus.
3. Allow color-coding or icon assignment for personalization and quick recognition.
4. Enable bulk actions (e.g., move/remove multiple assets across watchlists) for efficient management.

**3.2.2 List and Dashboard View**

1. Present a centralized dashboard listing all watchlists, each with summary statistics (e.g., total assets, daily PnL, alert status).
2. Include quick-access icons for editing, deleting, or sharing each watchlist.
3. Provide hover or expand-on-click previews showing top-performing assets and recent activity.

**3.2.3 Single Asset Overview** 

1. Clicking an asset opens a detailed modal or page with real-time price, historical charts, risk analytics, recent news/events, and asset-specific strategy fit.
2. Offer contextual actions (e.g., add to watchlist, run backtest, view strategies) directly from the overview.

**3.2.4 Run Backtest from Watchlist**

1. Users can trigger backtest on any asset or strategy within a watchlist via a single click or menu action.
2. Deliver the results to users via preferred channels (eg. email, TG or whatsapp), including key performance metrics, visualizations, and historical scenario outcomes.

> **US-33** [Strategy Review](https://www.notion.so/Strategy-Review-2da1191b72fc803a9153f59295d12aaa?pvs=21) 
Users expect to browse, select, and clone strategies aligned to their asset interests, with the option to add directly to their watchlist or run backtests.
> 

> **US-35 [Apply Strategy](https://www.notion.so/Apply-Strategy-2da1191b72fc809a8a53c773c432a2a4?pvs=21)** 
Users expect to apply strategies to watchlists directly for efficient tracking.
> 

**3.3 Strategy Integration**

**3.3.1 Strategy Recommendation**

1. Under the watchlist, the UI should display a curated list of strategies that based on fit with the asset’s profile and user’s risk appetite. Each suggested strategy is presented as a clear, concise details showing:
    - Strategy Name and Brief Description
    - Performance Metrics
    - Risk Score
    - Call to Action Buttons (eg. Apply to Watchlist)
2. All strategy interactions are embedded within the existing watchlist or asset screens. Users do not require to leave the portfolio context, ensuring streamlined and intuitive experiences. 

**3.3.2 One-Click Application to Watchlist**

1. Based on 3.3.1, users can apply the suggested strategy to their multiple-assets with a single click. Upon selection, the system:
    - Prompts the users to confirm the addition of the strategy to their watchlist for tracking
    - Allows the users to have customize label of the application for future reference
    - Toast notification and badges to display the active strategy alongside the watchlist and specific asset

**3.3.3 Customization**

1. Users can personalize their strategies by a “Clone” button, allowing easy parameter adjustment (eg. risk levels, timeframes … etc) before applying it to the watchlist or running another backtest.

> **US-28**[Performance Metrics](https://www.notion.so/Performance-Metrics-2d91191b72fc8015b5e9e2e41c86be23?pvs=21) 
Users require real-time and historical performance analytics (e.g., PnL, drawdown, Sharpe ratio) at both aggregate portfolio and individual asset levels.
> 

**3.4 Performance Metrics**

**3.4.1 Real-Time Performance Metrics**

1. Display the real-time and historical performance metrics: total and per-asset PnL, Sharpe ratio, drawdown, win rate, volatility, and allocation breakdown.
2. Support multiple timeframes (1D, 1W, 1M, YTD, Custom) and allow users to toggle between absolute and percentage views.

**3.4.2 Interactive Visualizations**

1. Include dynamic charts (line, bar, pie, heatmap) for asset performance, allocation, and risk exposure.
2. Enable mouse-over tooltips for detailed data points, zoom/pan functionality, and downloadable chart images or CSVs.
3. Offer comparison mode - users can overlay multiple assets or strategies for side-by-side analysis.

> **US-29 [Risk Assessment](https://www.notion.so/Risk-Assessment-2d91191b72fc80e6abbcfbd1a377100a?pvs=21)** 
Users expect a clear breakdown of portfolio risk, including exposure analytics (PnL), correlation analysis, and proactive alerts when risk thresholds are breached.
> 

**3.5** **Risk Assessment**

**3.5.1 Risk Panel**

1. Under each watchlist, a risk panel will be displayed to present a visual summary of portfolio risk, including exposure breakdown by asset classes or industrial sector.
2. Show correlation matrices/heatmaps to reveal asset interdependencies and diversification levels.
3. Show the quantitative risk scoring regarding the aggregate risk level, VaR (Value at Risk), beta, and downside risk, visually represented with gauges or color codes (e.g., “Portfolio drawdown exceeds 10%,” “Asset X volatility rising”).

**3.5.2 Custom Alerts**

1. Allow users to set personal risk thresholds (e.g., max drawdown, single asset exposure) and notification preferences for each portfolio or watchlist.
2. Display proactive alerts in a notification center, with clear indication on relevant dashboards and actionable suggestions to mitigate risk.

<aside>
🤖

**AI-Driven Risk Analyse** would be available in the later stage to provide clear, actionable recommendations tailored to the specific risk scenario. For example:

- “Reduce allocation to Asset Y to lower exposure below your set threshold”
- “Consider adding a hedging strategy with suggested options”
- “Rebalance your portfolio to improve diversification (one-click simulation available)”

Each alert or dashboard indication is paired with direct action buttons, allowing users to simulate or apply the suggested mitigation with minimal effort. These recommendations are personalized, factoring in both user preferences and real-time analytics.

</aside>

> **US-30** [Scenario Analysis](https://www.notion.so/Scenario-Analysis-2d91191b72fc80898068d6e197c04915?pvs=21)
Users want to simulate “what-if” scenarios (e.g., asset reallocation, stress tests) and receive impact assessments on the performance and risk.
> 

**3.6 Scenario Analysis**

**3.6.1 Simulation Engine**

1. Provide an interactive interface that enable users to simulate “what-if” scenarios, such as rebalancing, asset addition/removal, or market shocks.
2. Provide sliders or input fields for users to adjust allocations or simulate market events, with instant feedback on projected portfolio impact.

<aside>
🤖

**AI-Driven Recommendations** would be available in the later stage to present actionable suggestions for optimizing risk/reward. For example:

- “Reduce exposure to Asset X”
- “Rebalance towards defensive sectors”

Offer clear, explainable rationale for each recommendation, with one-click actions to apply or further explore the reasons behind.

</aside>

> **US-31** [Personalize Recommendation (3)](https://www.notion.so/Personalize-Recommendation-3-2d91191b72fc803abd15eb413dcbc66a?pvs=21) 
Users would like to have strategy and asset suggestions that match their risk appetite and investment goals.
> 

**3.7 Personalize Recommendation**

1. **Dynamic, Contextual Recommendations:** The watchlist continuously surfaces personalized strategy and asset suggestions tailored to each user’s risk profile, investment objectives, and current watchlist composition. Suggestions dynamically update as the user’s preferences, market conditions, or watchlist content change.
2. **Actionable Explanations and Hints:** Each recommended asset or strategy displays concise explanatory hints, such as “Why this is suggested” (e.g., matching your growth objective, outperforming peers, or aligning with your selected risk level). These hints increase transparency and user trust.
3. **Recent Performance Statistics:** Recommendations are accompanied by recent quantitative performance metrics—such as short-term/long-term returns, Sharpe ratio, drawdown, and win rate—providing users with immediate context for decision-making.
4. **Quick-Action Buttons:** For every suggested strategy or asset, offer prominent, single-click actions: Add to Watchlist (Asset), Apply Strategy & Simulate Impact. This enables users to efficiently act on recommendations without leaving the watchlist context.
5. **Strategy-Asset Fit Visualization:** Visual indicators (such as badges or color-coding) highlight how well each recommendation aligns with the user’s risk appetite, portfolio themes, or sector interests.
6. **Alert Integration:** Enable users to receive alerts (via Telegram, email, WhatsApp, etc.) when new personalized recommendations become available or when suggested assets/strategies hit predefined triggers (e.g., price breakout, signal confirmation).
7. **Transparency and Explainability:** All AI-driven suggestions include a “How it’s picked”, offering transparency into data sources, performance backtests, and logic behind each recommendation.

<aside>
💡

Please refer to ****[[Infra] Personalisation](https://www.notion.so/Infra-Personalisation-2931191b72fc806aa1b7c4f7a9e88ed3?pvs=21) for more information.

</aside>

### 4. Non-Functional Requirement

**4.1 Performance & Scalability**

1. **System Responsiveness:** All portfolio dashboard and watchlist operations (including asset search, adding/removing assets, running backtests, updating risk metrics) should complete within 2 seconds under normal load and 5 seconds under peak load.
2. **Bulk Data Handling:** The platform must able to process and display large portfolios (1,000+ assets) and bulk imports (1,000+ records) without degradation in responsiveness efficiently.
3. **Real-time Updates:** Performance analytics, risk assessments, and alerts should update in real time (≤5 seconds latency) when market data or user positions change.

**4.2 Reliability & Availability**

1. **Uptime:** The module must be available 99.9% of the time, including during peak trading hours.
2. **Error Handling:** All critical operations (asset import, watchlist updates, strategy application, alert delivery) must have robust error handling, clear user messaging, and automatic recovery where possible.

**4.3 Security & Compliance**

1. **Data Privacy:** User portfolio and strategy data must be encrypted at rest and in transit, following industry best practices (e.g., AES-256, TLS 1.2+).
2. **Access Control:** Only authenticated and authorized users can access, modify, or export portfolio data and settings.
3. **Auditability:** Every user action (e.g., adding/removing assets, strategy application, running backtests, importing/exporting data) must be logged for compliance and troubleshooting.
4. **Regulatory Compliance:** The platform must provide transparent reporting and audit trails to meet institutional and regulatory standards.

**4.4 Usability & Accessibility**

1. **User Experience:** All workflows (asset picker, watchlist, strategy integration, risk assessment, scenario analysis) must be intuitive, with clear UI cues and contextual help to reduce learning curve for both retail and institutional users.
2. **Accessibility:** Meet WCAG 2.1 AA standards for color contrast, keyboard navigation, and screen reader compatibility.
3. **Personalization:** Support user-configurable dashboards, notification preferences, and strategy settings.

**4.5 Interoperability & Integration**

1. **API Integration:** Provide well-documented APIs for portfolio and strategy operations, enabling B2B integrations and programmatic trading.
2. **Data Import/Export:** Support CSV and API methods for data onboarding, export, and third-party tools.

**4.6 Transparency**

1. **Explainability:** All AI-driven recommendations, risk alerts, and performance metrics must be accompanied by clear explanations and rationale, supporting user trust and regulatory transparency.
2. **Audit Logs:** All changes and system-driven actions are recorded and retrievable for user review and compliance purposes.

### 5. UI/UX Design (TBD)

### 6 Technical Specification (TBD)

### 7. Success Metrics

**7.1 User Engagement & Adoption**

1. **Onboarding Success Rate:** ≥95% of users successfully complete portfolio onboarding (via asset picker or bulk import) without support requests.
2. **Watchlist Utilization:** ≥80% of active users create and manage at least one watchlist within their first week.
3. **Strategy Application Rate:** ≥60% of users apply or backtest at least one strategy within their first month.

**7.2 Performance & Reliability**

1. **Page Load Time:** ≥95% of portfolio dashboard and watchlist pages load within 2 seconds.
2. **Alert Delivery Latency:** ≥99% of risk/performance alerts delivered within 5 seconds of triggering event.
3. **System Uptime:** ≥99.9% monthly uptime for all portfolio management features.

**7.3 Quality & Accuracy**

1. **Data Accuracy:** Portfolio performance and risk metrics must match reference calculations or third-party benchmarks ≥99.5% of the time.
2. **Error Rate:** Less than 0.1% failed transactions or critical errors in portfolio operations (asset addition, strategy apply, import/export).

**7.4 User Satisfaction & Transparency**

1. **User Satisfaction Score:** Average rating of ≥4.5/5 from user feedback on portfolio management features within the first 3 months post-launch.
2. **Clarity of AI Recommendations:** ≥90% of users rate the transparency of AI-driven alerts and recommendations as "clear" or better.
3. **Resolution Time for Support Requests:** ≥95% of portfolio-related support tickets resolved within 24 hours (TBC).

**7.5 Compliance & Auditability**

1. **Audit Log Completeness:** 100% of compliance-related user actions and system changes are logged and retrievable.
2. **Regulatory Incident Rate:** 0 unresolved compliance or audit incidents post-launch.