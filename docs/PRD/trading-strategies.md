# Trading Strategies

Categories: Web App
Reviewer: Vincent Lo
Created by: Leona Wong
Priority: High
Impact: High
Last Updated: November 27, 2025
Feedback 20251129: I have read through most of these - i think there is one small confusion - it tends to describe strategy on an aseet class or multiple asset.  However, what we should focus on is a single asset - it's a trading strategy (signal generation) of a single asset

We need to be also careful about where we would expose prompts for users - it's prone to AI injection attacks and initially we should minimize this or control this in a way that user can only run our pre-defined prompts

essentially clicking a button or some sort - without knowing they are running a prompt
Comments: Reviewed further 20260105
Sprints: Sprint 7
User Stories: Predefined Strategies (https://www.notion.so/Predefined-Strategies-2d91191b72fc80ee8ca8cdc06fd21f29?pvs=21), Personalize Recommendation (1) (https://www.notion.so/Personalize-Recommendation-1-2d91191b72fc80a8a242c4c4c814d103?pvs=21), Create Strategies (https://www.notion.so/Create-Strategies-2d91191b72fc801dbb12d06f8dd1fffd?pvs=21), Backtest Strategies (https://www.notion.so/Backtest-Strategies-2d91191b72fc8054859bc0d7d5c2190a?pvs=21), Personalize Recommendation (2) (https://www.notion.so/Personalize-Recommendation-2-2d91191b72fc807490dfe2c09eeb5979?pvs=21), Backtest Result Alerts (https://www.notion.so/Backtest-Result-Alerts-2d91191b72fc8093aa89fb073dde6b55?pvs=21), Strategy Recommendations Alerts (https://www.notion.so/Strategy-Recommendations-Alerts-2d91191b72fc80189292fe7afc1e4961?pvs=21), Bookmark Predefined Strategy (https://www.notion.so/Bookmark-Predefined-Strategy-2e21191b72fc807ead0acbee30b8fa59?pvs=21), Customize Strategy (https://www.notion.so/Customize-Strategy-2e21191b72fc80f9a3b6dd74e5216a52?pvs=21), Related Strategies (https://www.notion.so/Related-Strategies-2e21191b72fc8013b7affd5a62b4c303?pvs=21), Share Strategies via Social Media (https://www.notion.so/Share-Strategies-via-Social-Media-2e21191b72fc8088ae60f57ae3ca5ea4?pvs=21), Trending Strategies (1) (https://www.notion.so/Trending-Strategies-1-2e21191b72fc8046a373c87ae0703c47?pvs=21), Trending Strategies (2) (https://www.notion.so/Trending-Strategies-2-2e31191b72fc80e68ff8cf8c6eb6afed?pvs=21), Strategies Leaderboard (https://www.notion.so/Strategies-Leaderboard-2e31191b72fc807da8a6d19662cd5f89?pvs=21), Apply Strategy (https://www.notion.so/Apply-Strategy-2da1191b72fc809a8a53c773c432a2a4?pvs=21), Add to Watchlist (https://www.notion.so/Add-to-Watchlist-2da1191b72fc809b950ccc30fda1c33a?pvs=21)
ID: PF-16
Description: Empowers users to create, backtest, and manage multi-asset trading strategies with intuitive tools and actionable analytics
Status: Approved
Approval Date: December 17, 2025
Review Date: January 5, 2026
PRDs: Strategy Creation & Customization (https://www.notion.so/Strategy-Creation-Customization-2d91191b72fc80959eaffcb2491fa02c?pvs=21)

<aside>
🏆

**MVP Goals & Scope**
The focus will be on delivering all critical functionalities required for the strategies section to ensure users can view, construct, customize, and validate trading strategies across supported asset classes. This includes the predefined strategies gallery with performance cards, a visual strategy builder, essential parameter configuration, comprehensive backtesting with results dashboard, and basic user actions such as cloning and editing strategies.

</aside>

### 1. Overview

**Strategies** **module** is an advanced, user-focused feature to facilitate the ideation, construction, and customization of trading strategies spanning multiple assets. It blends a visual, drag-and-drop interface with prompt-driven AI assistance, enabling users of all levels to turn their investment ideas or market perspectives into robust, structured strategies. 

The system supports both traditional rule-based and AI-enhanced strategy generation, seamless backtesting, and direct integration of performance analytics, alerts, and educational materials, ensuring a transparent, interactive, and guided end-to-end strategy creation workflow.

### **2. Objective**

1. **Democratize Strategy Creation:** Make institutional-grade strategy design accessible to all users through visual tools and natural language prompts, lowering the barrier to sophisticated trading analytics
2. **Personalize Actionable Recommendations:** Generate explainable, data-driven strategy suggestions that match individual user risk appetite, asset focus, and live market conditions, all presented as interactive performance cards
3. **Foster Iterative Learning and Optimization:** Allow users to iteratively backtest, refine, and optimize strategies, with full visibility into performance metrics, risk factors, and confidence scoring, supporting cloning and ongoing customization of predefined models
4. **Integrate Seamlessly with Platform Ecosystem:** Ensure tight connection with core modules, including the Backtest Engine, Asset Picker, Portfolio Manager, and Multi-Agent System to support a seamless, end-to-end workflow
5. **Empower Users with Configurable Alerts:** Let users set up delivery of backtest and live strategy signals via Telegram or WhatsApp, according to their subscription plan, all managed conveniently from their user settings

### 3. Key Features & Functionalities

<aside>
🚧

The frontend elements and functionality is informed by comprehensive UI/UX research analysis and will be designed with reference to industry-leading platforms such as `InvestingPro` and `Tokenmetrics`. 

Our approach ensures an intuitive, data-rich, and user-centric interface, leveraging best practices for performance visualization, usability, and workflow transparency. The design emphasizes interactive cards, guided workflows, and responsive layouts to enhance accessibility and user engagement, in alignment with the standards set by top-tier investment intelligence platforms.

</aside>

> **US-19** [Predefined Strategies](https://www.notion.so/Predefined-Strategies-2d91191b72fc80ee8ca8cdc06fd21f29?pvs=21) 
A series of predefined strategies are required to enable seamless user experience for users to browse the strategies as per their risk appetite
> 

**3.1 Predefined Strategies Gallery**

**3.1.1 Performance Cards** 
Each strategy appears as a card summarizing with:

1. Strategy Name & Type (e.g. SMA Crossover, AI Trend)
2. Asset Class/Market Focus
3. Recent Performance Metrics (eg. `Total Return`, `Max Drawdown`, `Win Rate`, `Sharpe Ratio`, `Profit Factor`)
4. Risk Level (matched to user’s risk appetite as set in their profile)
5. Tags (e.g., `Low Risk`, `Momentum`, `Composite`)
6. Clicking the card leads to a detail page with the following:
    - **Full Performance Metrics**
    These are quantitative measures that summarize the effectiveness and risk profile of a trading strategy over a specified historical period or in live execution, for example, `Total Return`, `Final Capital`, `Max Drawdown`, `Win Rate`, `Average Win`, `Average Loss` `Sharpe Ratio`, `Profit Factor` , `Total Trades` , `Sortino Ratio` , `Trade List`
    - **Complete Strategy Logic**
    This section details the rules, parameters, and decision structure that define how the strategy generates trading signals, for example, `Strategy Type` , `Indicators` , `Parameters` , `Signal Generation Logic` , `Composite Logic` , `Timeframes` , `Risk Management Rules` , `AI Model Logic` (if any)
    - **List of Aligned Assets**
    This refers to the specific financial instruments (cryptos, stocks, FX pairs, commodities) that the strategy is designed to operate on, or has historically performed well with.
        - **Asset List:** Names and tickers/symbols for all assets to which the strategy is currently applied or recommended (e.g., BTC-USDT, ETH-USDT for crypto; AAPL, TSLA for stocks).
        - **Asset Class/Market Focus:** Clear identification (crypto, equities, FX, or commodities), so users can filter by their area of interest.
        - **Performance by Asset:** Optionally, show strategy performance broken down per asset (e.g., “+18% on BTC, +12% on ETH”) to help users see which assets are most compatible.
        - **Asset Matching:** Assets are aligned based on user profile (risk appetite, preferences), backtest results, or AI/algorithmic recommendations.
        - **Dynamic Asset List:** If the strategy is generic (e.g., a moving average crossover), the system may suggest a list of assets where this strategy has outperformed, based on recent data
        - **Personalized Sorting:** Strategies most aligned with the user’s risk appetite and preferences are shown first.
        - **Filtering & Sorting:** By asset class, risk, performance, or tags.
        

> **US-22** [Backtest Strategies](https://www.notion.so/Backtest-Strategies-2d91191b72fc8054859bc0d7d5c2190a?pvs=21) 
****Users require to backtest strategies and view its comprehensive results to make informed decisions before trade execution
> 

**3.2 Backtesting & Validation**

1. **One-Click Backtest**: Users can backtest any (custom or predefined) strategy over a selected historical range (eg. predefined short-term period, long-term period or a custom period). Composite strategies are backtested with automatic aggregation of sub-strategy performance.
2. **Results Dashboard**:
Upon completion, the UI displays:
    - Performance Summary Card: Key metrics, risk profile, and confidence level.
    - Equity Curve Chart: Visualizes capital progression.
    - Trade Table: Entry/exit timing, PnL per trade.
    - Risk Metrics: Max drawdown, risk-adjusted ratios.
    - Action Buttons: `Apply`, `Download Report`, `Run New Backtest` to activate the following actions on the platform.
    
    i) `Apply`
    Activates the selected strategy for live monitoring, signals, or integration with the user’s portfolio, enabling real-time alerts and analytics on chosen assets according to user preferences and subscription tier.
        
        ii) `Download Report`
        Generates and downloads a comprehensive report of backtest results, including key performance metrics, trade logs, risk analytics, and equity curves, allowing users to review or share strategy performance offline.
        
        iii) `Run New Backtest`
        Initiates a fresh backtest of the selected strategy on specified assets and timeframes, updating all performance metrics and analytics to reflect the latest data or parameter adjustments.
        

**3.3 Call To Actions**

Other key CTAs under the predefined strategies module create a dynamic, user-centric experience that enhances engagement, personalization, and social sharing:

> **US-35 [Apply Strategy](https://www.notion.so/Apply-Strategy-2da1191b72fc809a8a53c773c432a2a4?pvs=21)**
Allow users to directly apply a predefined investment strategy to their own asset portfolio or watchlist, enabling quick adaptation and hands-on use of proven strategies without needing to build from scratch.
> 

**3.2.1 Apply Strategy**

1. **Direct, Contextual CTA:** On every predefined strategy card and detail view, the “Apply Strategy” button is prominently available. Users can instantly attach a strategy to their portfolio, watchlist, or specific assets.
2. **Guided Confirmation Flow:** Upon clicking, a modal guides the user to select the destination (watchlist, asset, timeframe) and asks for confirmation before applying.
3. **Immediate Feedback:** Users receive a confirmation and see the strategy reflected in their dashboard or asset overview.

> **US-39** [Customize Strategy](https://www.notion.so/Customize-Strategy-2e21191b72fc80f9a3b6dd74e5216a52?pvs=21) 
****Empower users to clone an save any predefined strategy and modify its parameters, indicators, or asset focus, supporting personalized experimentation and innovation while maintaining the core logic of the original strategy.
> 

**3.2.2 Clone Strategy**

1. **Clone & Edit:** Every strategy card/detail view provides a “Clone” and “Edit” button.
2. **Parameter Editing Interface:** After cloning, users access an interactive editor where they can adjust parameters, swap indicators, and change the asset focus.
3. **Real-time Validation:** Changes are validated in real-time (e.g., if a parameter is outside recommended bounds, the system highlights issues).
4. **Strategy Save & Review:** Users can save customized strategies as private, public, or proprietary, and review performance projections based on edits.
5. **Backtest Integration:** Seamlessly run backtests on the customized strategy before saving/applying, with results and risk metrics shown instantly.

> **US-38** [Bookmark Predefined Strategy](https://www.notion.so/Bookmark-Predefined-Strategy-2e21191b72fc807ead0acbee30b8fa59?pvs=21)
Let users bookmark strategies from galleries or detail pages, ensuring they can quickly access, compare, or revisit their preferred or high-potential strategies for further review or action at a later time.
> 

**3.2.3 Bookmark**

1. **Bookmark Button:** Clear bookmark icon available on strategy cards and detail pages.
2. **One-Click Save:** Clicking bookmarks adds the strategy to a personalized list accessible from the user dashboard.
3. **Bookmark Gallery:** Users view and manage all bookmarked strategies in a dedicated section, with search, tagging, and sorting capabilities.
4. **Cross-Session Persistence:** Bookmarks persist across devices/sessions for logged-in users.
5. **Actionable Bookmarks:** From their bookmarks, users can quickly launch backtests, apply, or customize the strategies.
6. **Help:** Explanations for how to use bookmarks and their benefits are available.

> **US-42** [Share Strategies via Social Media](https://www.notion.so/Share-Strategies-via-Social-Media-2e21191b72fc8088ae60f57ae3ca5ea4?pvs=21)
Users can promote their strategic insights and results by sharing strategies directly to popular social networks. This not only encourages knowledge sharing and community building but also expands the platform’s reach through organic user advocacy
> 

**3.2.4 Share Strategy**

1. **Share CTA:** Prominently placed share button on every strategy card and detail view.
2. **Multi-Channel Integration:** Support sharing to Telegram, YouTube, X/Twitter, WhatsApp, and other social platforms. The system generates a shareable strategy summary with performance highlights.
3. **Custom Message Option:** Users can add personal notes or commentary before posting.
4. **Attribution & Tracking:** Shared links include attribution and can be tracked for engagement analytics.
5. **Immediate Preview:** Users see a preview of what their shared content will look like.
6. **Community Incentives:** Encourage sharing by recognizing top contributors or providing badges for shared strategies.

> **US-34** [Add to Watchlist](https://www.notion.so/Add-to-Watchlist-2da1191b72fc809b950ccc30fda1c33a?pvs=21) 
****Enable users to quickly add assets to their personal watchlist directly from the asset overview page, ensuring they can efficiently monitor and track potential investment opportunities without missing out.
> 

**3.2.5 Add to Watchlist**

1. **Watchlist Button:** “Add to Watchlist” CTA is always available on asset overview cards and detail views.
2. **Quick Add Modal:** Clicking opens a quick modal allowing users to pick which watchlist (if multiple) or create a new one.
3. **Instant Feedback:** Immediate confirmation and visual feedback (e.g., icon fill or checkmark) upon adding.
4. **Smart Suggestions:** AI suggests related assets or strategies for the watchlist, based on user interests and activity.
5. **Central Watchlist Management:** Users access and manage all their watchlists from a dedicated dashboard, with options to remove, group, or act on assets.

> **US-21** [Create Strategies](https://www.notion.so/Create-Strategies-2d91191b72fc801dbb12d06f8dd1fffd?pvs=21) 
Enable strategy building for user to create or customize their own strategies in user-friendly ways
> 

**3.3 Custom Strategy Builder**

1. **Visual Construction:**
    
    Input / Drag-and-drop interface to assemble strategies from building blocks (indicators, logical operators, signals), supporting nested logic for composites
    
2. **Parameter Configuration**:
Intuitive forms and sliders for fine-tuning parameters (e.g. SMA period, thresholds, weights).
3. **Version Control:**
    
    Automatic versioning with each save, enabling rollback and auditing.
    
4. **Strategy Metadata**:
Users can label, describe, and tag strategies. Optionally, strategies can be shared for copy trading and for AI learning/optimization, creating a collaborative ecosystem.

> **US-24** [Backtest Result Alerts](https://www.notion.so/Backtest-Result-Alerts-2d91191b72fc8093aa89fb073dde6b55?pvs=21) 
****Users would like to receive the backtest results and live signals as per their preferred channels
> 

**3.4 Alerts & Messaging** *(Settings Configuration)*

**3.4.1 Settings Integration**
Alert and messaging preferences are managed under a unified Settings page.

1. Notification Channels: Enable/disable Telegram or WhatsApp for receiving backtest results and live signals.
2. Plan-based Availability: Only show channels/features available according to the user’s current subscription plan.
3. Confidence Threshold: Users can set minimum confidence levels for receiving alerts.

**3.4.2 Messaging API Integration**
All alerts (backtest results, live signals) are routed through secure platform flows *(see API Flow 3, 4, 6),* respecting plan limits and user preferences.

> **US-23** [Personalize Recommendation (2)](https://www.notion.so/Personalize-Recommendation-2-2d91191b72fc807490dfe2c09eeb5979?pvs=21) 
****Empower users to discover new investment opportunities that fit their risk profile with strategy recommendations
> 

> **US-40** [Conversional AI Assistant](https://www.notion.so/Conversional-AI-Assistant-2e21191b72fc80c2b4a7f1aec46f0d0d?pvs=21) 
Enable AI agent to assist users to discover, compare and act on suitable strategies or assets based on their risk appetite and preferences via a conversational and intuitive interface by prompts
> 

**3.5 Conversional AI Assistant**

1. Enable users to use AI Assistant questions about market trends, specific assets, or trading strategies using plain language.
2. The AI Assistant can recommend strategies or assets based on users’ risk appetite, investment goals, or portfolio holdings, and explain the reasoning behind its suggestions.
3. Enable users to request the AI Assistant to backtest strategies, analyze portfolio performance, or generate alerts through a conversational flow.
4. The AI Assistant provides educational resources, references, and actionable insights to help users make confident and informed decisions.
5. The interface supports both text input and voice commands for accessibility.
6. I can use quick action buttons (e.g., “Apply Strategy,” “Add to Watchlist,” “Run Backtest”) directly from the chat interface.
7. For advanced users, the AI Assistant can guide the process of building or customizing strategies step-by-step.
8. The Assistant offers transparency by stating the reasons for its recommendations on strategies and assets.

<aside>
🤖

Please also refer to Section 3.5 in [Midas Recommendation](https://www.notion.so/Midas-Recommendation-2931191b72fc80c8a7e0d22cc9095b93?pvs=21) for the desired UX and functionalities of Conversional AI Assistant.

</aside>

> **US-41** [Related Strategies](https://www.notion.so/Related-Strategies-2e21191b72fc8013b7affd5a62b4c303?pvs=21)
Enable users to discover and cross-explore strategies with similar characteristics, enhancing user engagement, cross-sell opportunities, and the value of the ecosystem by leveraging AI-driven recommendations based on strategy performance, assets, and timeframe.
> 

**3.6 Midas Recommended Strategies**

1. Under each single strategy page (and backtest result), display a section "Midas Recommended Strategies" that the user may also be interested in, based on similarity in performance, underlying assets, strategy logic, and applicable timeframe.
2. Each recommended strategy should show key metrics: performance (e.g., annualized return, Sharpe ratio), asset class, risk level, and time period covered by the strategy.
3. Recommendations must be dynamically generated using AI/ML or rule-based filtering, and should adapt to the user’s risk appetite and historical actions when possible.
4. Provide clear explanations for why each strategy is recommended (e.g., “Similar performance profile,” “Shares 80% of underlying assets,” “Popular with users who viewed this strategy”).
5. Include “Bookmark,” “Add to Watchlist,” “Clone Strategy” and “Share Strategy” actions button for each recommended strategy.
6. For advanced users, allow filtering or sorting of related strategies by similarity score, asset class, or timeframe.

<aside>
🤖

For implementation logic of the core recommendation algorithms in details, please refer to [Midas Recommendation](https://www.notion.so/Midas-Recommendation-2931191b72fc80c8a7e0d22cc9095b93?pvs=21) . 
This dedicated PRD covers all algorithmic methodologies and desired user experience related to AI-driven recommendations, ensuring full alignment with the platform’s vision for actionable, transparent, and personalized insights.

</aside>

### **4. Non-Functional Requirement**

**4.1 Performance & Scalability**

1. **System Responsiveness:** All key UI actions (loading strategy galleries, running backtests, cloning/customizing strategies) should complete within 2 seconds under normal load and 5 seconds under peak load.
2. **Backtest Throughput:** The system must handle concurrent backtest requests efficiently (minimum 100 simultaneous users), queuing or scaling as needed without drops in performance.
3. **Real-time Updates:** Strategy performance cards, analytics, and alerts should update in real time (≤5 seconds latency) for new data or user-triggered actions

**4.2 Reliability & Availability**

1. **Uptime:** The strategies section must be available 99.9% of the time, including during global trading hours across all supported asset classes.
2. **Fault Tolerance:** Critical user actions (saving, cloning, running backtests) must have robust error handling, clear messaging, and automatic retries for transient failures.
3. **Data Integrity:** All strategy configurations, user customizations, and backtest results must be securely stored and recoverable from system interruptions or outages.

**4.3 Security & Compliance**

1. **Data Privacy:** User-created strategies and backtest data are encrypted at rest and in transit, following industry encryption standards (e.g., AES-256, TLS 1.2+).
2. **Access Control:** Only authenticated users can view, create, or modify strategies. Role-based permissions must limit access to advanced/custom features as per plan.
3. **Auditability:**  All create/edit/clone/backtest actions are logged for compliance and troubleshooting.

<aside>
⚠️

**IMPORTANT**

- To mitigate AI injection risks, user interaction with AI prompts must be strictly controlled.
- Users should only trigger pre-defined, system-vetted prompts via UI elements (e.g., button clicks), with no access to freeform or custom prompt input.
- All prompt executions must be sandboxed and parameterized to prevent injection of arbitrary instructions.
- These measures are critical to maintaining platform integrity, protecting sensitive data, and meeting institutional security standards
</aside>

**4.4 Usability & Accessibility**

1. **User Experience:** The visual builder, performance cards, and prompt dialogs must be intuitive and accessible, minimizing the learning curve for both novice and advanced users.
2. **Accessibility:** Meet WCAG 2.1 AA standards for color contrast, keyboard navigation, and screen reader compatibility.
3. **Personalization:** Users can set preferences for strategies, alerts, and notifications, all easily configurable from a unified settings page.

**4.5 Interoperability & Integration**

1. **API Coverage:** The strategies module must expose APIs for constructing, backtesting, and retrieving strategies, supporting B2B integrations and future automation.
2. **Modular Connectivity:** Seamless integration with Backtest Engine, Asset Picker, Portfolio Manager, and notification services is required for end-to-end workflows.

**4.6 Transparency & Explainability**

1. **Explainability:** All AI-driven strategy recommendations, performance analytics, and risk scores must include clear explanations to build user trust and support compliance.
2. **Audit Logs:** Every user and system action is logged and retrievable for review and compliance.

### **5. UI/UX Design**

[User Flow Diagram](https://www.figma.com/board/RXMZ38PqqTSSYOBKcF4Em9/UX-Design?node-id=378-1201&t=L1s6EoHxscEB59VO-1)

### **6. Technical Documents**

https://github.com/mvktech-ai/midas-backend/blob/strategy_backtest_rearch_design/docs/STRATEGY_BACKTEST_REARCHITECTURE.md

### **7. Success Metrics**

**7.1 User Engagement & Adoption**

1. **Strategy Gallery Engagement:** ≥70% of new users browse predefined strategies.
2. **Strategy Creation Rate:** ≥40% of active users create or customize at least one strategy within their first month.
3. **Backtest Utilization:** ≥60% of users run at least one backtest per month.
4. **Recommendation Usage:** ≥30% of users interact with the “Get Recommendations” dialog within the first month.

**7.2 Performance & Reliability**

1. **Page Load Time:** ≥95% of strategy gallery and builder UI load within 2 seconds.
2. **Backtest Completion Time:** ≥95% of backtest jobs complete and display results within 10 seconds for standard datasets.
3. **System Uptime:** ≥99.9% monthly uptime for all strategy-related services.

**7.3 Quality & Accuracy**

1. **Data Accuracy:** 100% accuracy of performance metrics and backtest analytics compared to benchmark calculations.
2. **Error Rate:** Less than 0.1% failed transactions or critical errors in strategy creation, customization, or backtesting workflows.

**7.4 User Satisfaction & Transparency**

1. **User Satisfaction Score:** ≥4.5/5 average rating from users for the strategies section post-launch.
2. **Clarity of AI Recommendations:** ≥90% of users rate the transparency of AI-driven alerts and recommendations as "clear" or better.
3. **Resolution Time for Support Requests:** ≥95% of strategy-related support tickets resolved within 24 hours (TBC).

**7.5 Compliance & Auditability**

1. **Audit Log Completeness:** 100% of strategy and backtest actions logged and retrievable.
2. **Incident Rate:** 0 unresolved compliance or data integrity incidents post-launch.