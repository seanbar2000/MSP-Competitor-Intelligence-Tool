import React, { useState, useEffect } from "react";
import { loadAllData } from "../utils/CsvParser";
import "./ComparisonPage.css";
import { calculateROI } from "../utils/ROICalculator";
import {
  generateHeadline,
  generateSubheading,
} from "../utils/TextGenerationUtils";
function ComparisonPage({ formData, onReset }) {
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load CSV data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadAllData();
        setCsvData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load comparison data");
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="comparison-page loading">
        <div className="loading-spinner"></div>
        <p>Generating your personalized comparison...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comparison-page error">
        <p>{error}</p>
        <button onClick={onReset}>Go Back</button>
      </div>
    );
  }

  // Find competitor data
  const competitor = csvData.competitors.find(
    (c) => (c.competitor ?? "").trim() === formData.currentSolution,
  );
  console.log("FINDING Competitor", csvData);
  // Find MSP size benefits
  const mspBenefit = csvData.mspBenefits.find(
    (b) => b.msp_size === formData.mspSize,
  );

  // Find industry benefits
  const industryBenefit = csvData.industryBenefits.find(
    (b) => b.industry === formData.industryFocus,
  );

  const roi = calculateROI(competitor, formData);
  // Generate "Why Switch" bullets
  const generateWhySwitchBullets = () => {
    const bullets = [];

    // Add MSP size benefit
    if (mspBenefit) {
      bullets.push(mspBenefit.deployment_benefit);
      bullets.push(mspBenefit.operational_benefit);
    }

    // Add industry benefit
    if (industryBenefit) {
      bullets.push(industryBenefit.key_benefit);
    }

    // Add challenge-specific benefit from competitor data
    if (competitor) {
      const challengeMap = {
        "Vendor sprawl": "Unified platform eliminates vendor sprawl",
        "False positives": "Advanced AI reduces false positives by 95%",
        "Email security": "Native email security built-in",
        Margins: "Flexible pricing improves your margins",
        Deployment: "Fast deployment - up and running in days",
        Reporting: "Professional client reports that showcase your value",
      };
      bullets.push(challengeMap[formData.biggestChallenge]);
    }

    return bullets;
  };

  const whySwitchBullets = generateWhySwitchBullets();

  // Determine which conditional rows to show in comparison table
  const shouldShowRow = (rowType) => {
    switch (rowType) {
      case "email_security":
        return formData.biggestChallenge === "Email security";
      case "integration":
        return formData.biggestChallenge === "Vendor sprawl";
      case "alert_accuracy":
        return formData.biggestChallenge === "False positives";
      case "m365":
        return formData.techStack.includes("Microsoft 365");
      case "google_workspace":
        return formData.techStack.includes("Google Workspace");
      default:
        return false;
    }
  }; //

  return (
    <div className="comparison-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>{generateHeadline(formData)}</h1>
        <p className="subheading">{generateSubheading(formData)}</p>
      </div>

      {/* Comparison Table */}
      <div className="comparison-container">
        <h2>Side-by-Side Comparison</h2>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>{competitor ? competitor.competitor : "Competitor"}</th>
                <th className="guardz-column">Guardz</th>
              </tr>
            </thead>
            <tbody>
              {/* Base rows - always shown */}
              <tr>
                <td className="feature-name">Price per Endpoint</td>
                <td>
                  {competitor
                    ? `$${competitor.price_per_endpoint}/month`
                    : "N/A"}
                </td>
                <td className="guardz-cell">$2.50/month</td>
              </tr>
              <tr>
                <td className="feature-name">Platform Type</td>
                <td>{competitor ? competitor.platform_type : "N/A"}</td>
                <td className="guardz-cell">Unified Security Platform</td>
              </tr>
              <tr>
                <td className="feature-name">Contract Terms</td>
                <td>{competitor ? competitor.contract_terms : "N/A"}</td>
                <td className="guardz-cell">Flexible, no lock-ins</td>
              </tr>
              <tr>
                <td className="feature-name">Target Audience</td>
                <td>{competitor ? competitor.target_audience : "N/A"}</td>
                <td className="guardz-cell">MSP-First</td>
              </tr>
              <tr>
                <td className="feature-name">Deployment Time</td>
                <td>{competitor ? competitor.deployment_time : "N/A"}</td>
                <td className="guardz-cell">3-5 days average</td>
              </tr>

              {/* Conditional rows based on challenge and tech stack */}
              {shouldShowRow("email_security") && (
                <tr className="conditional-row">
                  <td className="feature-name">Email Security</td>
                  <td>{competitor ? competitor.email_security : "N/A"}</td>
                  <td className="guardz-cell">✓ Native Built-in</td>
                </tr>
              )}

              {shouldShowRow("integration") && (
                <tr className="conditional-row">
                  <td className="feature-name">Integration Approach</td>
                  <td>Multiple point solutions</td>
                  <td className="guardz-cell">✓ Unified Platform</td>
                </tr>
              )}

              {shouldShowRow("alert_accuracy") && (
                <tr className="conditional-row">
                  <td className="feature-name">Alert Accuracy</td>
                  <td>
                    {competitor
                      ? `${competitor.false_positive_rate} false positives`
                      : "High false positives"}
                  </td>
                  <td className="guardz-cell">✓ 95% auto-remediation</td>
                </tr>
              )}

              {shouldShowRow("m365") && (
                <tr className="conditional-row">
                  <td className="feature-name">Microsoft 365 Integration</td>
                  <td>
                    {competitor && competitor.m365_integration === "Yes"
                      ? "✓"
                      : "❌"}
                  </td>
                  <td className="guardz-cell">✓ Deep Integration</td>
                </tr>
              )}

              {shouldShowRow("google_workspace") && (
                <tr className="conditional-row">
                  <td className="feature-name">Google Workspace Support</td>
                  <td>
                    {competitor && competitor.google_workspace_support === "Yes"
                      ? "✓"
                      : competitor &&
                          competitor.google_workspace_support === "Partial"
                        ? "Partial"
                        : "❌"}
                  </td>
                  <td className="guardz-cell">✓ Full Support</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why MSPs Like You Are Switching */}
      <div className="why-switch-section">
        <h2>Why MSPs Like You Are Switching</h2>
        <ul className="benefits-list">
          {whySwitchBullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      </div>

      {/* ROI Calculator */}
      {roi && (
        <div className="roi-section">
          <h2>Your Estimated Savings</h2>
          <div className="roi-grid">
            <div className="roi-card">
              <span className="roi-label">Your Current Monthly Cost</span>
              <span className="roi-value">
                ${roi.competitorPrice} × ${roi.endpoints.toLocaleString()} = $
                {roi.currentMonthlyCost.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="roi-card">
              <span className="roi-label">With Guardz</span>
              <span className="roi-value">
                $2.50 × ${roi.endpoints.toLocaleString()} = $
                {roi.guardzMonthlyCost.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="roi-card highlight">
              <span className="roi-label">Monthly Savings</span>
              <span className="roi-value savings">
                $
                {roi.monthlySavings.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="roi-card highlight">
              <span className="roi-label">Annual Savings</span>
              <span className="roi-value savings">
                $
                {roi.annualSavings.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="cta-section">
        <a href="#" className="cta-button primary">
          Schedule a Demo
        </a>
        <a href="#" className="cta-button secondary">
          Download Full Battle Card
        </a>
      </div>

      {/* Reset Button */}
      <div className="reset-section">
        <button onClick={onReset} className="reset-button">
          ← Start Over / Try Another Comparison
        </button>
      </div>
    </div>
  );
}

export default ComparisonPage;
