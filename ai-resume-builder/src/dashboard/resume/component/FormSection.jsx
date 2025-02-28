import { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail.jsx";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Summery from "./forms/Summery.jsx";
import Experience from "./forms/Experience.jsx";
import Education from "./forms/Education.jsx";
import Skills from "./forms/Skills.jsx";
import { Link, Navigate,useSearchParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const [searchParams] = useSearchParams();
  const di = searchParams.get("did");
  
  const handleFormSave = (isSaved) => {
    console.log("Form save state:", isSaved);
    setEnableNext(isSaved);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to="/dashboard">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none">
              <Home />
            </button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <button
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              className="px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none"
            >
              <ArrowLeft />
            </button>
          )}
          <button
            disabled={!enableNext}
            onClick={() => {
              if (enableNext) {
                setActiveFormIndex(activeFormIndex + 1);
              }
            }}
            className="px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 focus:outline-none flex gap-2 items-center"
          >
            Next <ArrowRight />
          </button>
        </div>
      </div>

      {/* Conditional rendering of forms based on activeFormIndex */}
      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={handleFormSave} />
      ) : activeFormIndex === 2 ? (
        <Summery enabledNext={handleFormSave} />
      ) : activeFormIndex === 3 ? (
        <Experience enabledNext={handleFormSave} />
      ) : activeFormIndex === 4 ? (
        <Education enabledNext={handleFormSave} />
      ) : activeFormIndex === 5 ? (
        <Skills enabledNext={handleFormSave} />
      ) : activeFormIndex === 6 ? (
        <Navigate to={`/my-resume/${di}/view`} />
      ) : null}
    </div>
  );
}

export default FormSection;