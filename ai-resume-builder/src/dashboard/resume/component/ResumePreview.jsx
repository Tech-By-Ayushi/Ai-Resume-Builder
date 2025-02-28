import  { useContext } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext.jsx';
import PersonalDetailPreview from './preview/PersonalDetailPreview.jsx';
import SummeryPreview from './preview/SummeryPreview.jsx';
import ExperiencePreview from './preview/ExperiencePreview.jsx';
import EducationalPreview from './preview/EducationalPreview.jsx';
import SkillsPreview from './preview/SkillsPreview.jsx';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summery */}
      <SummeryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      {resumeInfo?.Experience?.length > 0 && (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}
      {/* Educational */}
      {resumeInfo?.education?.length > 0 && (
        <EducationalPreview resumeInfo={resumeInfo} />
      )}
      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeInfo} />
      )}
    </div>
  );
}

export default ResumePreview;
