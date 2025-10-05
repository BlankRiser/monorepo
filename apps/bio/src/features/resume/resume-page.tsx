import { ResumeLayout } from "@/src/features/resume/resume-layout";
import { ResumeData } from "./data";
import { ResumeEducation } from "./resume-education";
import { ResumeExperience } from "./resume-experience";
import { ResumeHeader } from "./resume-header";
import { ResumeProjects } from "./resume-projects";

export const ResumePage = () => {
  return (
    <ResumeLayout className="grid gap-8">
      <ResumeHeader header={ResumeData.header} />
      <ResumeExperience data={ResumeData.experience} />
      <ResumeEducation data={ResumeData.education} />
      <ResumeProjects data={ResumeData.projects} />
    </ResumeLayout>
  );
};
