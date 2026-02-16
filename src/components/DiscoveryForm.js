import React, { useState } from "react";
import "./DiscoveryForm.css";

function DiscoveryForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    currentSolution: "",
    mspSize: "",
    clientBaseSize: "",
    industryFocus: "",
    techStack: [],
    biggestChallenge: "",
    decisionTimeline: "",
  });

  const [errors, setErrors] = useState({});

  // Handle single select changes (dropdowns and radio buttons)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user makes a selection
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle multi-select checkboxes for tech stack
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      techStack: checked
        ? [...prev.techStack, value]
        : prev.techStack.filter((item) => item !== value),
    }));
    // Clear error when user selects at least one
    if (errors.techStack) {
      setErrors((prev) => ({ ...prev, techStack: "" }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentSolution)
      newErrors.currentSolution =
        "Please select your current security solution";
    if (!formData.mspSize) newErrors.mspSize = "Please select your MSP size";
    if (!formData.clientBaseSize)
      newErrors.clientBaseSize = "Please select your client base size";
    if (!formData.industryFocus)
      newErrors.industryFocus = "Please select your primary industry focus";
    if (formData.techStack.length === 0)
      newErrors.techStack = "Please select at least one technology";
    if (!formData.biggestChallenge)
      newErrors.biggestChallenge = "Please select your biggest challenge";
    if (!formData.decisionTimeline)
      newErrors.decisionTimeline = "Please select your decision timeline";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="discovery-form-container">
      <div className="form-header">
        <h1>Guardz Competitor Intelligence Tool</h1>
        <p>Tell us about your MSP to see a personalized comparison</p>
      </div>

      <form onSubmit={handleSubmit} className="discovery-form">
        {/* Section 1: Business Profile */}
        <div className="form-section">
          <h2>Business Profile</h2>

          {/* Question 1: Current Security Solution */}
          <div className="form-group">
            <label htmlFor="currentSolution">
              1. Current Security Solution *
            </label>
            <select
              id="currentSolution"
              name="currentSolution"
              value={formData.currentSolution}
              onChange={handleChange}
              className={errors.currentSolution ? "error" : ""}
            >
              <option value="">Select your current solution...</option>
              <option value="Sophos">Sophos</option>
              <option value="Coro">Coro</option>
              <option value="Blackpoint">Blackpoint Cyber</option>
              <option value="Huntress">Huntress</option>
              <option value="Kaseya">Kaseya</option>
              <option value="None">None/Evaluating options</option>
            </select>
            {errors.currentSolution && (
              <span className="error-message">{errors.currentSolution}</span>
            )}
          </div>

          {/* Question 2: MSP Size */}
          <div className="form-group">
            <label htmlFor="mspSize">2. MSP Size *</label>
            <select
              id="mspSize"
              name="mspSize"
              value={formData.mspSize}
              onChange={handleChange}
              className={errors.mspSize ? "error" : ""}
            >
              <option value="">Select your MSP size...</option>
              <option value="Solo/Small (1-5 techs)">
                Solo/Small (1-5 techs)
              </option>
              <option value="Growing (6-15 techs)">Growing (6-15 techs)</option>
              <option value="Established (16-50 techs)">
                Established (16-50 techs)
              </option>
              <option value="Enterprise MSP (50+ techs)">
                Enterprise MSP (50+ techs)
              </option>
            </select>
            {errors.mspSize && (
              <span className="error-message">{errors.mspSize}</span>
            )}
          </div>

          {/* Question 3: Client Base Size */}
          <div className="form-group">
            <label htmlFor="clientBaseSize">3. Client Base Size *</label>
            <select
              id="clientBaseSize"
              name="clientBaseSize"
              value={formData.clientBaseSize}
              onChange={handleChange}
              className={errors.clientBaseSize ? "error" : ""}
            >
              <option value="">Select your client base size...</option>
              <option value="Under 500 endpoints">Under 500 endpoints</option>
              <option value="500-2,000 endpoints">500-2,000 endpoints</option>
              <option value="2,000-5,000 endpoints">
                2,000-5,000 endpoints
              </option>
              <option value="5,000+ endpoints">5,000+ endpoints</option>
            </select>
            {errors.clientBaseSize && (
              <span className="error-message">{errors.clientBaseSize}</span>
            )}
          </div>

          {/* Question 4: Primary Industry Focus */}
          <div className="form-group">
            <label htmlFor="industryFocus">4. Primary Industry Focus *</label>
            <select
              id="industryFocus"
              name="industryFocus"
              value={formData.industryFocus}
              onChange={handleChange}
              className={errors.industryFocus ? "error" : ""}
            >
              <option value="">Select your primary industry...</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Professional Services">
                Professional Services (Legal, Accounting)
              </option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail/Hospitality">Retail/Hospitality</option>
              <option value="Mixed/General">Mixed/General</option>
            </select>
            {errors.industryFocus && (
              <span className="error-message">{errors.industryFocus}</span>
            )}
          </div>
        </div>

        {/* Section 2: Technical Profile */}
        <div className="form-section">
          <h2>Technical Profile</h2>

          {/* Question 5: Current Tech Stack (Multi-select) */}
          <div className="form-group">
            <label>5. Current Tech Stack (select all that apply) *</label>
            <div className="checkbox-group">
              {[
                "Microsoft 365",
                "Google Workspace",
                "SentinelOne EDR",
                "CrowdStrike EDR",
                "Microsoft Defender",
                "RMM Tools (ConnectWise, NinjaOne, Datto)",
              ].map((tech) => (
                <label key={tech} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={tech}
                    checked={formData.techStack.includes(tech)}
                    onChange={handleCheckboxChange}
                  />
                  {tech}
                </label>
              ))}
            </div>
            {errors.techStack && (
              <span className="error-message">{errors.techStack}</span>
            )}
          </div>

          {/* Question 6: Biggest Operational Challenge */}
          <div className="form-group">
            <label htmlFor="biggestChallenge">
              6. Biggest Operational Challenge *
            </label>
            <select
              id="biggestChallenge"
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleChange}
              className={errors.biggestChallenge ? "error" : ""}
            >
              <option value="">Select your biggest challenge...</option>
              <option value="Vendor sprawl">
                Too many point solutions (vendor sprawl)
              </option>
              <option value="False positives">
                High false positive alert fatigue
              </option>
              <option value="Email security">
                Lack of email security coverage
              </option>
              <option value="Deployment">Complex deployment/management</option>
              <option value="Margins">Poor margins/profitability</option>
              <option value="Reporting">Weak client reporting</option>
            </select>
            {errors.biggestChallenge && (
              <span className="error-message">{errors.biggestChallenge}</span>
            )}
          </div>

          {/* Question 7: Decision Timeline */}
          <div className="form-group">
            <label htmlFor="decisionTimeline">7. Decision Timeline *</label>
            <select
              id="decisionTimeline"
              name="decisionTimeline"
              value={formData.decisionTimeline}
              onChange={handleChange}
              className={errors.decisionTimeline ? "error" : ""}
            >
              <option value="">Select your timeline...</option>
              <option value="Active evaluation (next 30 days)">
                Active evaluation (next 30 days)
              </option>
              <option value="Planning (next quarter)">
                Planning (next quarter)
              </option>
              <option value="Researching (6+ months)">
                Researching (6+ months)
              </option>
            </select>
            {errors.decisionTimeline && (
              <span className="error-message">{errors.decisionTimeline}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Generate My Comparison
        </button>
      </form>
    </div>
  );
}

export default DiscoveryForm;
