// =================================== UPDATING DYNAMIC STATE ==================================================
export const dynamicHandle = (id, prop, value, setState) => {
  return setState((prev) => {
    const index = prev.findIndex((item) => item.id === id);
    if (index === -1) {
      return [...prev, { id, [prop]: value }];
    } else {
      const item = prev[index];
      let updatedValue;
      if (prop === "choice" || prop === "choice2" || prop === "matching") {
        // Check if value is an empty array
        if (Array.isArray(value) && value.length === 0) {
          updatedValue = []; // Set choice array to empty if value is []
        } else {
          // Check if item[prop] exists and is an array
          if (Array.isArray(item[prop])) {
            // Check if choice already contains object with provided name
            const existingIndex = item[prop].findIndex(
              (obj) => obj[prop] === value[prop]
            );
            if (existingIndex !== -1) {
              // Update value of existing object if found
              const updatedChoice = [...item[prop]];
              updatedChoice[existingIndex] = {
                ...updatedChoice[existingIndex],
                ...value,
              };
              updatedValue = updatedChoice;
            } else {
              // Add new object to choice array
              updatedValue = [...item[prop], value];
            }
          } else {
            // If item[prop] doesn't exist or is not an array, initialize it with the new value
            updatedValue = [value];
          }
        }
      } else {
        updatedValue = value;
      }
      return [
        ...prev.slice(0, index),
        { ...item, [prop]: updatedValue },
        ...prev.slice(index + 1),
      ];
    }
  });
};

// ============================================= RETURN DURATION =================================
export const calculateDuration = (value) => {
  if (value === "1 Hr") {
    return 1 * 60 * 60 * 1000;
  } else if (value === "2 Hrs") {
    return 2 * 60 * 60 * 1000;
  } else if (value === "3 Hrs") {
    return 3 * 60 * 60 * 1000;
  } else {
    return 30 * 60 * 1000;
  }
};

// ========================================== LATEST RESULT ======================================
export const calculateLatestTestResults = (results) => {
  // Handle empty or non-array input
  if (!Array.isArray(results) || results.length === 0) {
    return [{
      name: null, 
      excel: 0,
      good: 0,
      average: 0,
      failed: 0,
    }];
  }
  const name = results[0]?.name;
  // Use reduce for efficient calculation and object creation (assuming all elements have score and total)
  const testResults = results.reduce((acc, result) => {
    const currentRatio = (result.score / result.total) * 100;
    if (currentRatio >= 90) {
      acc.excel++;
    } else if (currentRatio >= 70 && currentRatio < 90) {
      acc.good++;
    } else if (currentRatio >= 50 && currentRatio < 70) {
      acc.average++;
    } else {
      acc.failed++;
    }
    return acc;
  }, { excel: 0, good: 0, average: 0, failed: 0 });
  return [{
    name,
    ...testResults,
  }];
};

// ========================================== SCORE ANALYSIS ======================================
export const calculateScoreAnalysis = (results) => {
  // Handle empty or non-array input
  if (!Array.isArray(results) || results.length === 0) {
    return [
      { name: "excel", value: 0 },
      { name: "good", value: 0 },
      { name: "average", value: 0 },
      { name: "failed", value: 0 },
    ];
  }
  // Use reduce for efficient calculation
  const testResults = results.reduce((acc, result) => {
    const currentRatio = (result.score / result.total) * 100;
    if (currentRatio >= 90) {
      acc.excel++;
    } else if (currentRatio >= 70 && currentRatio < 90) {
      acc.good++;
    } else if (currentRatio >= 50 && currentRatio < 70) {
      acc.average++;
    } else {
      acc.failed++;
    }
    return acc;
  }, { excel: 0, good: 0, average: 0, failed: 0 });
  // Update values in the returned array
  return [
    { name: "excel", value: testResults.excel },
    { name: "good", value: testResults.good },
    { name: "average", value: testResults.average },
    { name: "failed", value: testResults.failed },
  ];
};

// ================================================= FILTER DATA BASED ON YEAR ==============================
export const filterDataBasedOnYear = (results, year) => {
  return results.filter((item) => item?.Test?.scheduled_at.split("-")[0] === year);
};
// ========================================== FILTER BASED ON YEAR AND HALF ==============================
export const filterDataBasedOnYearAndHalf = (results, year, halfYear = "all") => {
  return results.filter((item) => {
    if (!item?.Test?.scheduled_at) {
      return false; // Handle missing data gracefully
    }

    const scheduledYear = parseInt(item.Test.scheduled_at.split("-")[0], 10);
    const month = parseInt(item.Test.scheduled_at.split("-")[1], 10);

    if (scheduledYear !== year) {
      return false; // Filter by year
    }

    if (halfYear === "first") {
      return month <= 6; // Filter for first half of the year
    } else if (halfYear === "second") {
      return month > 6; // Filter for second half of the year
    }

    // Return true for all conditions met (year and optional half-year)
    return true;
  });
};
// =================================== FILTER BASED ON CURRENT YEAR AND CURRENT MONTH ============================
export const filterDataBasedOnCurrentYearAndMonth = (results) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Months are zero-indexed

  return results.filter((item) => {
    if (!item?.Test?.scheduled_at) {
      return false; // Handle missing data gracefully
    }
    const [yearString, monthString] = item.Test.scheduled_at.split("-");
    const year = parseInt(yearString, 10);
    const month = parseInt(monthString, 10);

    return year === currentYear && month === currentMonth;
  });
};


// ================================================== GET UNIQUE TEST NAME ===============================
export const getUniqueTestNames = (results) => {
  const testNames = new Set();
  for (const result of results) {
    testNames.add(result.Test.name);
  }
  return Array.from(testNames);
};
//  ================================================ REPORT COLUMNS =====================================
export const reportColumns = (data) => {
  const columns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "name", headerName: "Name", width: 160 },
    { field: "empId", headerName: "Employee ID", width: 130 },
    { field: "ccs", headerName: "Customer Care & Service", width: 200 },
    {
      field: "pksl",
      headerName: "Product Knowledge & Self Learning",
      width: 250,
    },
  ];
  // Loop through data and insert test columns
  for (let i = 0; i < data.length; i++) {
    columns.splice(i + 3, 0, { field: data[i], headerName: data[i], width: 100 });
  }

  return columns;
};

// ================================================= YEARLY REPORT ==========================================
export const yearlyReport = (results) => {
  const output = [];
  const userMap = {};
  // Assign unique IDs while creating user objects
  for (const result of results) {
    const { User: user, Test: { name: testName }, score, total } = result;
    const { name, empId } = user;
    const userId = result?.User?.id;

    if (!userMap[name]) {
      userMap[name] = { id: userId, name, empId, ...{}, totalScore: 0,
        totalMark: 0 };
    }
    userMap[name][testName] = parseFloat((score / total) * 100).toFixed(2);
    userMap[name].totalScore += score;
    userMap[name].totalMark += total;
  }
    // Calculate CCS and PSKL based on total score and mark
  for (const userName in userMap) {
    const user = userMap[userName];
    user.ccs = parseFloat((user.totalScore / user.totalMark) * 5).toFixed(2);
    user.pksl = parseFloat((user.totalScore / user.totalMark) * 2 + 3).toFixed(2);
  }
  // Convert userMap values to desired output format
  for (const userName in userMap) {
    output.push(userMap[userName]);
  }
  return output;
};

// ================================================================== USER YEAR GRAPH DATA ==============================
export const userYearGraphData = (results) => {
  return results?.map((item) => ({
      name: item?.Test?.name,
      score: parseFloat((item?.score/item?.total)*100).toFixed(2)
  }))
};

//  ===========================================================  REARRANGE ARRAY ITEMS ==================================
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}