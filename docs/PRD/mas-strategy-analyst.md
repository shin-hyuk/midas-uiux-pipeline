# [MAS] Strategy Analyst

Categories: AI, Web App
Reviewer: Vincent Lo, Choi Daniel
Created by: Leona Wong
Priority: High
Impact: High
Last Updated: October 22, 2025
User Stories: Personalize Recommendation (3) (https://www.notion.so/Personalize-Recommendation-3-2d91191b72fc803abd15eb413dcbc66a?pvs=21), New Strategy Creation (AI-Assisted) (https://www.notion.so/New-Strategy-Creation-AI-Assisted-2f51191b72fc8040b356e697645c7e36?pvs=21), Strategy Refinement & Iteration (AI-Assisted) (https://www.notion.so/Strategy-Refinement-Iteration-AI-Assisted-2f51191b72fc80019b92dbb4b7181252?pvs=21), Strategy Recommendation & Comparison (AI-Assisted) (https://www.notion.so/Strategy-Recommendation-Comparison-AI-Assisted-2f51191b72fc80c1881aeea65d85c37f?pvs=21), Outperforming Strategy Recommendation & Comparison (AI-Assisted) (https://www.notion.so/Outperforming-Strategy-Recommendation-Comparison-AI-Assisted-2f51191b72fc80c0aaf2eb0bcb3cd4c0?pvs=21), Conversional AI Assistant (https://www.notion.so/Conversional-AI-Assistant-2e21191b72fc80c2b4a7f1aec46f0d0d?pvs=21)
ID: PF-7
Description: Responsible for helping users ideate, construct, and refine trading and investment strategies across multiple asset classes.
Status: In Review
PRDs: Personalized Investment Companion (https://www.notion.so/Personalized-Investment-Companion-2f61191b72fc806b846eddfdb5fa8a98?pvs=21)

### 1. Overview

The **Strategy Analyst Agent** is a specialized component within the Multi-Agents System (MAS), responsible for helping users ideate, construct, and refine trading and investment strategies across multiple asset classes. Leveraging natural language understanding, the agent transforms user prompts into actionable, structured strategy definitions, supports rule-based and AI-enhanced strategy generation, and provides educational guidance and recommendations - all within a transparent, user-friendly workflow.

### 2. Objectives

1. **Democratize Strategy Design:** Enable both novice and experienced users to create and refine institutional-grade trading strategies via intuitive prompts and guided workflows.
2. **Deliver Actionable Recommendations:** Generate clear, explainable, and data-driven strategy suggestions tailored to user risk-appetite, asset preference, and market context.
3. **Support Iterative Improvement:** Allow users to iteratively test, modify, and enhance strategies, fostering learning and optimization.
4. **Enable Seamless Collaboration:** Integrate tightly with the Backtest AI Agent, Asset Picker, and Portfolio Manager for end-to-end workflow, while respecting MAS orchestration and escalation protocols.
5. **Educate and Empower:** Provide educational resources, explainers, and template strategies to build user confidence and market literacy (TBC).

### 3. Key Functionalities

<aside>
🏆

**MVP Goals & Scope**
Prioritize user-friendly strategy creation and editing tools for the crypto/stock market. Enable handoff to Backtest AI Agent for validation, and support rapid strategy iteration based on user feedback.

</aside>

**3.1 Strategy Ideation & Prompt Understanding**

- Parse user input (web/app/API) to identify strategy intent, rules, and constraints
(e.g., “Design a momentum strategy for ETH with volatility filter”).
- Guide users with clarifying questions if input is ambiguous or incomplete.

**3.2 Strategy Construction & Rule Definition**

- Generate structured strategy definitions, including entry/exit rules, indicators, position sizing, stop-loss, and take-profit logic.
- Offer both template-driven and AI-generated suggestions based on user context and market data.

**3.3 Recommendation & Explanation**

- Provide clear, actionable recommendations, including rationale and risk/return trade-offs.
- Explain strategy logic in both technical and layman’s terms to enhance user understanding.

**3.4 Iterative Refinement & Versioning**

- Allow users to modify, clone, or version strategies for further improvement.
- Summarize changes and their expected impact before handoff to backtesting.

**3.5 Integration with Other Agents**

- Seamlessly route validated strategies to the Backtest AI Agent for simulation and analytics.
- Enable handoff to Portfolio Manager for deployment and ongoing monitoring.
- Escalate to Asset Picker or Research Analyst if further data or asset suggestions are needed

**3.6 Educational Support (TBC)**

- Surface best-practice templates, strategy explainers, and curated educational content via the Academy module.

### 4. Use Cases & Scenarios

**4.1 New Strategy Creation**

> **US-62** [New Strategy Creation (AI-Assisted)](https://www.notion.so/New-Strategy-Creation-AI-Assisted-2f51191b72fc8040b356e697645c7e36?pvs=21) 
Enable users to easily create new, custom trading strategies using conversational AI, making sophisticated strategy design accessible to all.
> 

***Example Prompt:***

1. *“Create a trend-following strategy for BTC using two moving averages and an RSI filter.”*
2. *"Hi, can you help me build a new trading strategy for Bitcoin using moving averages and RSI? Please walk me through the setup and tell me why these choices might work.”*

| **Orchestrator Action** | **Strategy Analyst Actions** | **Output** |
| --- | --- | --- |
| Parses user intent, confirms a new strategy design request | • Extracts key strategy components (asset, indicator types, filter)
• Generates rule-based strategy template
• Explains logic and rationale
• Presents to user for review | Structured strategy definition, rationale, and next-step prompt (e.g., “Would you like to backtest this?”) |

**4.2 Strategy Refinement & Iteration**

> **US-63** [**Strategy Refinement & Iteration (AI-Assisted)**](https://www.notion.so/Strategy-Refinement-Iteration-AI-Assisted-2f51191b72fc80019b92dbb4b7181252?pvs=21) 
Enable users to easily create new, custom trading strategies using conversational AI, making sophisticated strategy design accessible to all.
> 

***Example Prompt:***

1. *“Add a volatility stop to my ETH momentum strategy and explain the expected impact.”*
2. *"Can you tweak my Ethereum strategy by adding a rule to protect me from big price swings? Also, could you explain how this change might help or hurt my results?”*

| **Orchestrator Action** | **Strategy Analyst Actions** | **Output** |
| --- | --- | --- |
| Parses user request for strategy modification | • Loads user’s existing strategy
• Adds volatility-based exit rule
• Summarizes change and expected effect on performance/risk
• Presents updated strategy | Updated strategy definition, summary of changes, impact explanation |

**4.3 Strategy Recommendation & Comparison**

> **US-64 [Strategy Recommendation & Comparison (AI-Assisted)](https://www.notion.so/Strategy-Recommendation-Comparison-AI-Assisted-2f51191b72fc80c1881aeea65d85c37f?pvs=21)** 
Equip users with actionable, AI-driven strategy recommendations and side-by-side comparisons, increasing transparency and confidence in decision-making.
> 

***Example Prompt:***

1. *“Suggest two alternative strategies for ADA in a ranging market and compare with my current setup.”*
2. *“I’m not sure if my ADA strategy is the best for today’s market. Could you show me two other ideas and make it easy to compare them with what I’m using now?*

| **Orchestrator Action** | **Strategy Analyst Actions** | **Output** |
| --- | --- | --- |
| Identifies a strategy recommendation and comparison request | • Analyzes user’s current ADA strategy
• Generates two alternative strategies (e.g., mean reversion, breakout)
• Summarizes each approach, strengths and weaknesses
• Structures output for easy comparison | Two alternative strategies, pro/con analysis, comparison table |

**4.4 Outperforming Strategy Recommendation & Conversational Comparison**

> **US-65** [Outperforming Strategy Recommendation & Comparison (AI-Assisted)](https://www.notion.so/Outperforming-Strategy-Recommendation-Comparison-AI-Assisted-2f51191b72fc80c0aaf2eb0bcb3cd4c0?pvs=21) 
Proactively surface outperforming strategies using conversational AI, providing transparent, actionable recommendations and easy comparisons to maximize user outcomes.
> 

***Example Prompts:***

1. *"Have any strategies done better than mine in the platform like this? If so, could you show me how they stack up next to my current plan and explain the differences?”*
2. *"Based on my current portfolio, can you identify any strategies on the platform that have outperformed in similar market conditions? Please show a side-by-side comparison with my current strategy and explain why these alternatives might be better for me now.”*

***Example Conversational Flow:***

1. *“While you were testing this, we noticed some strategies have shown steadier results in similar market conditions… Here are a few you might want to look at. You don’t need to switch—but many people like to compare these side by side before deciding.”*
2. *[Comparison cards/tables: Your Strategy vs. Steady Market Follower, showing volatility, drawdown, consistency, and recommendations.]*

| Step | Orchestrator Action | Strategy Analyst Actions | Output |
| --- | --- | --- | --- |
| **User Prompt** | Detects user’s request (or proactively identifies opportunity) to find outperforming strategies and compare them conversationally. | N/A | N/A |
| **Intent Parsing** | Parses user’s intent, determines relevant asset, strategy, and market context. | N/A | N/A |
| **Strategy Discovery** | Queries platform data for strategies that have historically outperformed under similar market conditions and user profiles. | Identifies outperforming strategies based on recent performance, volatility, and market regime (e.g., steady market follower vs. user’s high-volatility approach). | List of recommended outperforming strategies relevant to the user’s context. |
| **Explanation Prep** | Prepares conversational explanation to introduce findings to the user in natural, easy-to-understand language. | Summarizes each recommended strategy’s logic, strengths, and why it is a good fit for current market conditions. | Friendly, conversational AI chat that explains why these strategies are being recommended (e.g., “We noticed a few strategies with steadier results in similar market conditions...”) |
| **Comparison Build** | Structures a side-by-side comparison of user’s current strategy versus recommended outperformers. | Compiles key metrics for each strategy (volatility, drawdown, consistency, etc.); highlights differences and advantages of alternatives. | Visual or tabular comparison (e.g., cards) showing user strategy vs. recommended strategies, with clear performance/risk metrics and badges (e.g., “Recommended,” “Smoother Performance”) |
| **Action Enablement** | Offers actionable next steps based on the comparison (e.g., apply, backtest, clone, or explore further). | Prepares backend logic to handle user’s choice and updates strategy or portfolio as requested. | CTAs in conversational UI (e.g., “Apply Strategy,” “Run Backtest”), enabling seamless transition from insight to action. |

<aside>
🤖

For end-to-end multi-agent workflows (e.g., backtesting, asset selection, portfolio deployment), please refer to [[Infra] Multi-Agent System](https://www.notion.so/Infra-Multi-Agent-System-2931191b72fc805296e5d6902089cbe8?pvs=21)  for orchestration protocols and agent collaboration details.

</aside>

**4.4 Prompt Restriction**

<aside>
⛔

**Restricted Use Cases**

- The Strategy Analyst Agent and Orchestrator must not accept, process, or escalate prompts that would trigger unsupported or computationally intensive workflows (e.g., automated large-scale optimization, unsupported assets, or integrations).
- All such intents should be detected and gracefully rejected with a clear, user-friendly explanation.
</aside>

### 5. Non-Functional Requirements

**5.1 Performance & Responsiveness**

1. Generate strategy suggestions and explanations within seconds for a responsive user experience. This responsiveness is critical to support a smooth and interactive user experience, reducing decision latency and helping users iterate efficiently on their strategy ideas.
2. The system should be able to handle multiple concurrent user requests without noticeable lag, utilizing effective concurrency management and rate limiting to maintain platform stability during periods of high demand.
3. Monitoring tools should track system throughput and usage patterns to proactively identify performance bottlenecks before they impact the end user.

**5.2 Transparency & Traceability**

1. Every action by the Strategy Analyst, including prompt parsing, strategy generation, versioning, and handoff to other agents must be logged in detail. This ensures that all steps in the user workflow are auditable and can be traced for compliance or support queries.
2. Transparent analytics should be provided to users, including a clear breakdown of strategy logic, rationale for recommendations, and access to previous versions of their strategies for comparison and review.
3. The system must enable institutional-grade traceability by maintaining records of which data sources, algorithms, and market conditions influenced each recommendation or strategy output.
4. Progress and workflow status indicators should be visible to users (e.g., “strategy generated,” “sent to backtest agent,” “portfolio updated”), further enhancing platform trust and clarity

**5.3 Security & Data Privacy**

Handle all user prompts, strategy logic, and recommendations securely, with access restrictions by role and session

### 6. Required Technical Components

1. **AI Agent Orchestrator:** NLP, intent parsing, agent routing.
2. **MCP Protocol:** Multi-agent coordination, escalation, context management.
3. **Strategy Builder:** Core strategy authoring and editing.
4. **Backtest Engine Integration:** For handoff and simulation.
5. **Portfolio Manager Integration:** For deployment and monitoring.
6. **Educational Content/Academy:** Templates, explainers, tutorials.
7. **Notification Service:** Result and update delivery as required.

### 7. Success Metrics

1. 80% of strategy prompts successfully parsed and structured.
2. <10% manual escalations for supported asset classes.
3. Positive user feedback on clarity, usefulness, and educational value.
4. Increased user engagement with strategy creation and refinement tools.