export const generateHeadline = (formData) => {
  const sizeMap = {
    "Solo/Small (1-5 techs)": "Solo MSPs",
    "Growing (6-15 techs)": "Growing MSPs",
    "Established (16-50 techs)": "Established MSPs",
    "Enterprise MSP (50+ techs)": "Enterprise MSPs",
  };

  const size = sizeMap[formData.mspSize] || "MSPs";
  const industry =
    formData.industryFocus === "Mixed/General"
      ? "Diverse Client Bases"
      : `${formData.industryFocus} Clients`;

  return `Built for ${size} Serving ${industry}`;
};

// Generate dynamic subheading based on challenge

export const generateSubheading = (formData) => {
  const subheadingMap = {
    "Vendor sprawl": "One unified platform. Zero vendor fatigue.",
    "False positives": "95% auto-remediation. Less noise, more protection.",
    "Email security": "Native email security. No add-ons needed.",
    Margins: "Better margins. Flexible contracts. No lock-ins.",
    Deployment: "Deploy in days, not weeks. Set and forget.",
    Reporting: "Client-ready reports that sell your value.",
  };
  return (
    subheadingMap[formData.biggestChallenge] ||
    "Enterprise-grade security made simple."
  );
};
