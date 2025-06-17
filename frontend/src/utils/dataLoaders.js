// Loads all problems from multiple company files
export async function loadProblemsFromFiles(companyFiles) {
  let allProblems = [];
  for (const company of companyFiles) {
    try {
      const response = await fetch(`/data/problems_${company}.json`);
      if (!response.ok) continue;
      const data = await response.json();
      if (Array.isArray(data)) {
        allProblems = allProblems.concat(data.map((p, idx) => ({
          ...p,
          id: p.id || `${company}_${idx}`,
          company,
        })));
      }
    } catch (err) {
      // Optionally handle error per company
      continue;
    }
  }
  return allProblems;
}

// Loads all interview experiences from multiple company files
export async function loadInterviewExperiences(companyFiles) {
  let allExperiences = [];
  for (const company of companyFiles) {
    try {
      const response = await fetch(`/data/interview_${company}.json`);
      if (!response.ok) continue;
      const data = await response.json();
      if (Array.isArray(data)) {
        allExperiences = allExperiences.concat(data.map((exp, idx) => ({
          ...exp,
          id: exp.id || `${company}_${idx}`,
          company,
        })));
      }
    } catch (err) {
      // Optionally handle error per company
      continue;
    }
  }
  return allExperiences;
}