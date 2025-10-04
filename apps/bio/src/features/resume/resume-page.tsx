import { ResumeLayout } from "@/src/features/resume/resume-layout";
import { ResumeHeader } from "./resume-header";
import { ResumeData } from "./data";
import { ResumeEducation } from "./resume-education";
import { ResumeExperience } from "./resume-experience";
import { ResumeProjects } from "./resume-projects";

type Props = {};

export const ResumePage = (props: Props) => {
  return (
    <ResumeLayout className="grid gap-8">
      <ResumeHeader header={ResumeData.header} />
      <ResumeExperience data={ResumeData.experience} />
      <ResumeEducation data={ResumeData.education} />
      <ResumeProjects data={ResumeData.projects} />
    </ResumeLayout>
  );
};
