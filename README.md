# MSP Competitor Intelligence Tool

A React-based web application that helps qualify MSP prospects and generates personalized competitor comparison pages based on their business profile and technical requirements.

🔗 **Live Demo**: msp-competitor-intelligence-tool.netlify.app

## Features

- Interactive discovery form collecting MSP business and technical information
- Dynamic comparison page with personalized content
- Real-time ROI calculator showing potential savings
- Responsive design that works on mobile and desktop
- Data-driven personalization using CSV files

## Tech Stack

- **Frontend**: React 18
- **CSV Parsing**: PapaParse
- **Styling**: Custom CSS with responsive design
- **Build Tool**: Create React App

---

## How to Run Locally

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone [your-repo-url]
   cd msp-tool
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install:
   - React 18
   - PapaParse (for CSV parsing)
   - React Scripts (build tools)

3. **Verify CSV files are in place**

   Make sure these files exist in the `public/csvFiles` folder:
   - `public/competitors.csv`
   - `public/msp_size_benefits.csv`
   - `public/industry_benefits.csv`

4. **Start the development server**

   ```bash
   npm start
   ```

   The app will automatically open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## How the Personalization Works

The app uses a matching system to generate personalized comparison pages. Here's the complete logic:

### Data Sources

Three CSV files power the personalization:

1. **competitors.csv** - Pricing, features, and weaknesses for each competitor (Sophos, Coro, Huntress, Blackpoint, Kaseya)
2. **msp_size_benefits.csv** - Benefits tailored to different MSP sizes (Solo, Growing, Established, Enterprise)
3. **industry_benefits.csv** - Industry-specific compliance and risk information (Healthcare, Financial Services, etc.)

### Matching Logic Flow

When a user submits the form, the system:

#### 1. **Finds Competitor Data**

```javascript
competitor = csvData.competitors.find(
  (c) => c.competitor.trim() === formData.currentSolution,
);
```

- Finds a match between selected competitor and CSV data
- Extracts pricing, platform type, contract terms, integrations, deployment time, and weaknesses

#### 2. **Generates Dynamic Headline**

Combines MSP size + Industry focus:

```javascript
const size = sizeMap[formData.mspSize]; // "Growing MSPs"
const industry = formData.industryFocus; // "Healthcare Clients"
return `Built for ${size} Serving ${industry}`;
```

#### 3. **Creates Custom Subheading**

Based on their biggest operational challenge:

- Vendor sprawl → "One unified platform. Zero vendor fatigue."
- False positives → "95% auto-remediation. Less noise, more protection."
- Email security → "Native email security. No add-ons needed."
- Margins → "Better margins. Flexible contracts. No lock-ins."
- Deployment → "Deploy in days, not weeks. Set and forget."
- Reporting → "Client-ready reports that sell your value."

#### 4. **Builds Comparison Table**

- **Always shows 5 base rows**: Price, Platform Type, Contract Terms, Target Audience, Deployment Time
- **Conditionally adds rows** based on:

  ```javascript
  // Challenge-based rows
  if (biggestChallenge === 'Email security') → Show Email Security row
  if (biggestChallenge === 'Vendor sprawl') → Show Integration Approach row
  if (biggestChallenge === 'False positives') → Show Alert Accuracy row

  // Tech stack-based rows
  if (techStack.includes('Microsoft 365')) → Show M365 Integration row
  if (techStack.includes('Google Workspace')) → Show Google Workspace row
  ```

#### 5. **Calculates ROI**

```javascript
const endpointMap = {
  'Under 500 endpoints': 500,
  '500-2,000 endpoints': 1250,
  '2,000-5,000 endpoints': 3500,
  '5,000+ endpoints': 7500
};
const endpoints = endpointMap[formData.clientBaseSize];
const competitorPrice = parseFloat(competitor.price_per_endpoint);
const guardzPrice = 2.50;

monthlySavings = (competitorPrice - guardzPrice) × endpoints;
annualSavings = monthlySavings × 12;
```

#### 6. **Generates "Why Switch" Bullets**

Pulls 3-4 personalized reasons from:

- MSP size-specific benefits (deployment, operational, pricing)
- Industry-specific benefits (compliance, key benefits, risk profile)
- Challenge-specific advantages

---

## Personalization Examples

### Example 1: Healthcare MSP with Email Security Concerns

**User Selections:**

- Current Solution: **Huntress**
- MSP Size: **Growing (6-15 techs)**
- Client Base: **500-2,000 endpoints**
- Industry: **Healthcare**
- Tech Stack: **Microsoft 365, RMM Tools**
- Challenge: **Lack of email security coverage**
- Timeline: **Active evaluation (next 30 days)**

**Generated Output:**

**Headline:** "Built for Growing MSPs Serving Healthcare Clients"

**Subheading:** "Native email security. No add-ons needed."

**Comparison Table:**

- Shows **Huntress** at **$9.39/endpoint** vs Guardz at **$2.50/endpoint**
- Huntress email security: "API-only (no native)" vs Guardz: "✓ Native Built-in"
- **Additional rows shown:**
  - Email Security row (because challenge = email security)
  - M365 Integration row (because tech stack includes M365)

**ROI Calculator:**

- Endpoints: 1,250 (midpoint of 500-2,000 range)
- Current monthly cost: $9.39 × 1,250 = **$11,737**
- With Guardz: $2.50 × 1,250 = **$3,125**
- **Monthly savings: $8,612**
- **Annual savings: $103,350**

**Why Switch Bullets:**

1. "Onboard 10+ clients per week" (from Growing MSP benefits)
2. "Automated workflows reduce tech time by 40%" (from Growing MSP benefits)
3. "Protects PHI with automated compliance tracking" (from Healthcare industry)
4. "Native email security built-in" (from Email Security challenge)

---

### Example 2: Enterprise MSP with Vendor Sprawl

**User Selections:**

- Current Solution: **Coro**
- MSP Size: **Enterprise MSP (50+ techs)**
- Client Base: **5,000+ endpoints**
- Industry: **Financial Services**
- Tech Stack: **Microsoft 365, Google Workspace, CrowdStrike EDR**
- Challenge: **Too many point solutions (vendor sprawl)**
- Timeline: **Planning (next quarter)**

**Generated Output:**

**Headline:** "Built for Enterprise MSPs Serving Financial Services Clients"

**Subheading:** "One unified platform. Zero vendor fatigue."

**Comparison Table:**

- Shows **Coro** at **$9.50/endpoint** vs Guardz at **$2.50/endpoint**
- Contract terms: "Contract lock-ins" vs "Flexible, no lock-ins"
- **Additional rows shown:**
  - Integration Approach row (because challenge = vendor sprawl)
  - M365 Integration row (M365 in tech stack)
  - Google Workspace Support row (Google Workspace in tech stack)

**ROI Calculator:**

- Endpoints: 7,500
- Current monthly cost: $9.50 × 7,500 = **$71,250**
- With Guardz: $2.50 × 7,500 = **$18,750**
- **Monthly savings: $52,500**
- **Annual savings: $630,000**

**Why Switch Bullets:**

1. "White-label portal for enterprise clients" (from Enterprise MSP benefits)
2. "Multi-tenant management with full RBAC" (from Enterprise MSP benefits)
3. "Meets strict financial regulatory requirements" (from Financial Services industry)
4. "Unified platform eliminates vendor sprawl" (from Vendor Sprawl challenge)

---

## What I'd Improve with More Time

### Interactive ROI Calculator

**Feature:** Allow users to adjust the number of endpoints with a slider to see savings update in real-time.

**Why:** Prospects could explore different scenarios and see exactly how Guardz pricing scales. This makes the value proposition tangible and helps them envision their specific use case.

## Project Structure

```
msp-tool/
├── public/
│   ├── index.html
|   ├── csvFiles/
|   │   ├── competitors.csv
│   |   ├── msp_size_benefits.csv
│   |   └── industry_benefits.csv
├── src/
│   ├── components/
│   │   ├── DiscoveryForm.js
│   │   ├── DiscoveryForm.css
│   │   ├── ComparisonPage.js
│   │   └── ComparisonPage.css
│   ├── utils/
│   │   └── csvParser.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```
