import { createContext, useState } from "react";

export const JobDataContext = createContext();

export const JobDataProvider = ({ children }) => {
  const [jobData, setJobData] = useState(null);
  const [percentageIncrease, setPercentageIncrease] = useState(0);

  return (
    <JobDataContext.Provider
      value={{ jobData, setJobData, percentageIncrease, setPercentageIncrease }}
    >
      {children}
    </JobDataContext.Provider>
  );
};

