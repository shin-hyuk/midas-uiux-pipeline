# Asset Discovery

Reviewer: Vincent Lo, Choi Daniel
Created by: Leona Wong
Impact: High
User Stories: Asset Picker (https://www.notion.so/Asset-Picker-2da1191b72fc808ea4ebc13e284b3d54?pvs=21), Asset Comparison (https://www.notion.so/Asset-Comparison-2f71191b72fc8061b909fb6c15895b0b?pvs=21), API Access for Asset Discovery (https://www.notion.so/API-Access-for-Asset-Discovery-2f71191b72fc804dba68dff3f23e580e?pvs=21), Asset Discovery Alerts (https://www.notion.so/Asset-Discovery-Alerts-2f71191b72fc8075a7f2f8926f678195?pvs=21), Asset Recommendation (https://www.notion.so/Asset-Recommendation-2f71191b72fc80c58207d3d9ddb330a2?pvs=21), In-Depth Asset Analytics (https://www.notion.so/In-Depth-Asset-Analytics-2f71191b72fc80db8f16d8dc1aac7b16?pvs=21), AI-Powered Trending Asset Discovery (https://www.notion.so/AI-Powered-Trending-Asset-Discovery-2f71191b72fc80f4b323ff562a1497ca?pvs=21), Unified Multi-Asset Search (https://www.notion.so/Unified-Multi-Asset-Search-2f71191b72fc80e2a356ebfd42ccfb7c?pvs=21)
ID: PF-50
Status: In Progress
PRDs: Asset Discovery (https://www.notion.so/Asset-Discovery-2f61191b72fc80028e49cd3a4784dbfd?pvs=21)

### **1. Overview**

MIDAS Asset Discovery will democratize access to institutional-grade, AI-powered investment research by providing a unified, transparent, multi-asset platform. This module is foundational, enabling seamless cross-asset discovery, personalized alerts, and analytics-driven decision support for both B2B and B2C users. Robust architecture ensures security, compliance, and future extensibility.

### 2. Objectives

1. Deliver an exceptional, frictionless asset discovery experience across all supported asset classes.
2. Enable AI-driven personalization to surface the most relevant assets for every user profile.
3. Empower both B2B and B2C users with powerful, real-time, and actionable analytics.
4. Provide APIs for seamless B2B integration and future extensibility.
5. Guarantee security, privacy, and compliance throughout the discovery workflow.

### 3. **User Requirements**

**3.1 User Segments & Journeys**

**3.1.1 B2B Users (External/Institutional)**

- Access asset discovery features programmatically via secure API.
- Integrate real-time data and screening tools into proprietary systems.
- Require auditability and compliance support.

**3.1.2 B2C Users (Retail/Individual)**

- Intuitive UI for searching, filtering, and discovering new assets.
- Set personalized alerts for emerging opportunities.
- Receive AI-driven recommendations tailored to personal strategy/goals.
- Easily compare, analyze, and act on discovered assets.

**3.2 Desired User Experiences**

1. Unified, cross-asset search interface with advanced filters.
2. Timely, personalized recommendations and alerts (push, email, Telegram and WhatsApp … etc.).
3. In-depth analytics and comparison tools for informed decision-making.
4. Transparent, explainable AI recommendations and analytics.
5. Seamless onboarding and access, with clear documentation for APIs and user actions.

### **4. Key Features & Functionalities**

**4.1 Asset Discovery Core**

> **US-67 [Unified Multi-Asset Search](https://www.notion.so/Unified-Multi-Asset-Search-2f71191b72fc80e2a356ebfd42ccfb7c?pvs=21)**
> 
> 
> Enable users to search and filter across all supported asset classes with advanced criteria (market cap, volume, volatility, sentiment, etc.) in a single interface.
> 

**4.1.1 Asset Search Interface**

Users can search and filter assets across various asset classes from a unified search bar. Filters include asset class, market cap, liquidity, volatility, sentiment, and custom tags. Results update in real time as filters are applied.

**4.1.2 Asset List Table**

Displays key asset attributes in a sortable table that is dual-mode views:

**i) For Retail Traders (Simple View)**

The asset list table presents a curated set of essential data fields for each asset which supports visual cues (color-coded changes, icons for trending assets) and non-financial-jargon tooltips for novice understanding. The table should support the mobile-responsive layout for easy access and navigation on all devices.

1. Asset Name & Symbol
2. Asset Class
3. Market Cap
4. Market Price (real-time)
5. 24h Volume
6. Sentiment Score (On Hold)
7. Recent Performance (1d, 7d, 30d)

**ii) For Pro Traders (Professional View)**

The asset list table displays an expanded set of columns, including advanced metrics that professional traders usually required, including inline analytics (eg. Sparkline charts, micro heatmaps, and instant analytics popovers for key metrics), similar to InvestingPro offers.

**4.1.3 Quick Actions**

Each row offers streamlined actions:

1. View Analytics
2. Set Price Alert
3. Add to Watchlist

**4.1.4 Filter & Search Options**

1. Users can apply quick filters (eg. Asset Classes, Theme, Sector, Category, Top Movers, Market Cap buckets) and sort by basic metrics.
2. Enable search for ticker and symbols of different asset classes

**4.2 AI-Powered Trending Asset Discovery**

> **US-68** [AI-Powered Trending Asset Discovery](https://www.notion.so/AI-Powered-Trending-Asset-Discovery-2f71191b72fc80f4b323ff562a1497ca?pvs=21)
Use proprietary AI models to surface trending, high-conviction, or under-the-radar assets, with explainable signals and customizability for user-defined “trending” indicators.
> 

**4.2.1 Trending Assets**
Highlights assets surfaced by proprietary AI models as “Trending” or “Under-the-Radar.” Criteria include price momentum, volume spikes, sentiment surges, and news-driven activity.

<aside>
🤖

Please also refer [Midas Recommendation](https://www.notion.so/Midas-Recommendation-2931191b72fc80c8a7e0d22cc9095b93?pvs=21) for the desired AI algorithms (TBC).

</aside>

**4.3  In-Depth Asset Analytics**

> **US-69 [In-Depth Asset Analytics](https://www.notion.so/In-Depth-Asset-Analytics-2f71191b72fc80db8f16d8dc1aac7b16?pvs=21)**
Comprehensive asset profiles, including live and historical data, technical indicators, sentiment indices, news/events, and holdings breakdown.
> 

**4.3.1 Asset Analytics Page**

Detailed analytics dashboard for each asset, covering:

1. Real-time and historical price charts
2. Technical indicators (MA, RSI, MACD, etc.)
3. Sentiment indices
4. News/events feed
5. Social media and KOL signals
6. Holdings breakdown (if applicable)

**4.3.2 Data Visualization**

Interactive, modular widgets; users can customize which analytics panels are visible.

**4.3.3 Export/Download**

Option to export analytics data as CSV and report as PDF for further research.

**4.4 Asset Comparison Tool**

> **US-70** [Asset Comparison](https://www.notion.so/Asset-Comparison-2f71191b72fc8061b909fb6c15895b0b?pvs=21) 
****Users can select multiple assets and compare key metrics (volatility, risk, historical performance, sentiment, etc.) side-by-side.
> 

**4.4.1 Multi-Asset Comparison**

Users can select up to 3 assets to compare side-by-side.

**4.4.2 Comparison Table**

Displays metrics for each asset in columns:

1. Volatility
2. Historical Returns (various periods)
3. Max Drawdown
4. Sentiment Score
5. Risk-Adjusted Ratios (Sharpe, Sortino)
6. Current Price, Volume, Market Cap

**4.4.3 Customization**

Users can add/remove metrics, save comparison templates, and export comparison results as CSV or PDF.

**4.5 Asset Recommendation**

> **US-71** [Asset Recommendation](https://www.notion.so/Asset-Recommendation-2f71191b72fc80c58207d3d9ddb330a2?pvs=21)
Personalized recommendations based on user profile, past behaviors, and stated preferences. Continuous feedback loop for improving relevance.
> 

**4.5.1 Recommendation Engine**

The platform generates a daily/weekly list of recommended assets for each user, based on:

1. User’s historical activity (search, watchlist, trades)
2. Profiled risk appetite and asset preferences
3. Market conditions and AI opportunity models

**4.5.2 Recommendation Feed**

Recommendations are shown in a dedicated feed, each with:

1. Asset Name & Symbol
2. Reason for Recommendation (e.g., “Matches your risk profile,” “Similar to assets in your portfolio”)
3. Expected Return/Risk Estimate (if available)
4. Action buttons: View Analytics, Add to Watchlist, Compare

**4.5.3 Feedback Loop (Out of Scope)**

Users can “like,” “dismiss,” or “flag” recommendations to refine future suggestions.

<aside>
🤖

Please also refer [Midas Recommendation](https://www.notion.so/Midas-Recommendation-2931191b72fc80c8a7e0d22cc9095b93?pvs=21) for the desired AI algorithms (TBC).

</aside>

**4.6 Asset Discovery Alerts**

> **US-72 [Asset Discovery Alerts](https://www.notion.so/Asset-Discovery-Alerts-2f71191b72fc8075a7f2f8926f678195?pvs=21)**
Users set custom alert criteria (price moves, volume, new listing, sentiment change, etc.). Alerts are delivered via multiple channels, with a management dashboard for viewing and editing alerts
> 

**4.6.1 Alert Creation**

Users can define personalized alerts for new or existing assets based on:

1. Price thresholds
2. Volume spikes
3. Sentiment changes
4. Asset listing or delisting events

**4.6.2 Notification Methods**

Alerts are delivered via in-app notification, email, WhatsApp and Telegram integration.

<aside>
🤖

Please also refer to [User Settings](https://www.notion.so/User-Settings-2df1191b72fc80b5b581eb0d02737a70?pvs=21) for further details (TBC).

</aside>

**4.7 API Access**

> **US-73** [API Access for Asset Discovery](https://www.notion.so/API-Access-for-Asset-Discovery-2f71191b72fc804dba68dff3f23e580e?pvs=21) 
Serve the B2B users with secure endpoints for real-time asset search, analytics, recommendations, and alerts.
> 

**4.7.1 API Endpoints**

B2B users access RESTful endpoints for:

1. Asset Search & Filtering
2. Trending/Recommendation Data
3. Asset Analytics Data
4. Alert Management (creation, status, deletion)

**4.7.2 Documentation & Monitoring**

Interactive API docs (Swagger/OpenAPI)

- Usage dashboard for query volume, errors, and alert triggers.

### 5. Non-Functional Requirement

**5.1 Performance & Scalability**

1. **Response Time:** All user-initiated queries (search, filter, analytics load) must return results within 2 seconds for 95% of requests under standard load; <1 second for API queries under 100 RPS.
2. **Concurrent Users:** The platform must support at least 10,000 concurrent B2C users and 100 concurrent B2B API clients without degradation in service.
3. **Data Freshness:** Market data, analytics, and trending signals must update on the interface with a maximum lag of 5 seconds from the latest available source.

**5.2 Security & Compliance**

1. **Authentication:** All user and API access must be protected by secure, industry-standard authentication (OAuth2, JWT, or equivalent).
2. **Authorization:** Role-based access control (RBAC) to restrict B2B/B2C, admin, and support views.
3. **Data Protection:** All sensitive user and trading data must be encrypted at rest and in transit (AES-256, TLS 1.2+).
4. **Audit Logging:** All access and actions on sensitive data or APIs must be logged for compliance and review.
5. **Compliance:** Platform and data handling must adhere to relevant financial regulations (GDPR, SOC2, etc.) for all supported jurisdictions.

**5.3 Availability & Reliability**

1. **Uptime:** The platform must maintain 99.9% uptime with automated failover and disaster recovery for all core services.
2. **Monitoring & Alerts:** Continuous monitoring for all APIs, UI endpoints, and data sources, with automated alerts for service degradation or outages.
3. **Graceful Degradation:** In the event of partial system outages, the platform should continue to serve cached data and degrade non-essential features first.

**5.4 Usability & Accessibility**

1. **Mobile Responsiveness:** All retail (B2C) user interfaces must be fully responsive and usable on devices ≥375px wide.
2. **Accessibility:** Interfaces must comply with WCAG 2.1 AA guidelines for color contrast, keyboard navigation, and screen reader compatibility.
3. **Localization:** TBC

**5.5 Extensibility & Maintainability**

1. **API-First:** All major features must be accessible via documented APIs to support B2B integrations and future third-party apps.
2. **Modular Architecture:** Codebase and infrastructure must support the addition of new asset classes, analytics modules, and alert types with minimal downtime or refactoring.
3. **Documentation:** Up-to-date, versioned technical and user documentation must be maintained for both internal and external stakeholders

### 6. UI/UX Design

### **7. Technical Documents**

### **8. Success Metrics**