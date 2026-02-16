import Papa from "papaparse";

// Parse a CSV file from the public directory
export const parseCSV = (filename) => {
  return new Promise((resolve, reject) => {
    Papa.parse(`/${filename}`, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

// Load all three CSV files
export const loadAllData = async () => {
  try {
    const [competitors, mspBenefits, industryBenefits] = await Promise.all([
      parseCSV("csvFiles/competitors.csv"),
      parseCSV("csvFiles/msp_size_benefits.csv"),
      parseCSV("csvFiles/industry_benefits.csv"),
    ]);
    console.log(competitors);
    return {
      competitors,
      mspBenefits,
      industryBenefits,
    };
  } catch (error) {
    console.error("Error loading CSV data:", error);
    throw error;
  }
};
