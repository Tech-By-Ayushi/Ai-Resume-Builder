import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr className="border" style={{ borderColor: resumeInfo?.themeColor }} />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            <div className="w-[120px] h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${skill.rating * 20}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
