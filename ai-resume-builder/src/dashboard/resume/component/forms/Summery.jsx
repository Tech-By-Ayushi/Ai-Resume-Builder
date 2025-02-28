import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext.jsx";
import { UpdateResumeDetail } from "../../../../../services/GlobalApi.jsx";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../services/AIModel.jsx";
import { useSearchParams } from "react-router-dom";
const prompt =
   "Job Title: {jobTitle}, Based on the job title, provide a list of summaries for three experience levels: Mid Level and Fresher level, in 3-4 lines each,attractive,also read the text box, formatted as an array with 'summery' and 'experience_level' fields in JSON format.";

function Summery({ enabledNext }) {
   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
   const [summery, setSummary] = useState("");
   const [loading, setLoading] = useState(false);
   const [searchParams] = useSearchParams();
   const did = searchParams.get("did");
   const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState(null);

   useEffect(() => {
      if (summery) {
         setResumeInfo({
            ...resumeInfo,
            summery: summery,
         });
      }
   }, [summery]);

   const GenerateSummaryFromAI = async () => {
      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle || "");
      try {
         const result = await AIChatSession.sendMessage(PROMPT);
         const parsedResult = JSON.parse(result.response.text());
         setAiGeneratedSummaryList(parsedResult);
      } catch (error) {
         console.error("AI Generation Error: ", error);
      }
      setLoading(false);
   };
    
   const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: { summery },
    };
    UpdateResumeDetail(did, data).then(
      (resp) => {
        console.log(resp)
        enabledNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };


   return (
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
         <h2 className="font-bold text-lg">Summary</h2>
         <p>Add a summary for your job title</p>

         <form className="mt-7" onSubmit={onSave}>
            <div className="flex justify-between items-end">
               <label className="text-sm font-semibold">Add Summary</label>
               <button
                  type="button"
                  className="border border-primary text-primary px-3 py-1 rounded-md flex items-center gap-2"
                  onClick={GenerateSummaryFromAI}
               >
                  <Brain className="h-4 w-4" /> Generate from AI
               </button>
            </div>
            <textarea
               className="mt-5 w-full border rounded-md p-2 h-24"
               required
               value={summery || resumeInfo?.summery || ""}
               onChange={(e) => setSummary(e.target.value)}
            />
            <div className="mt-3 flex justify-end">
               <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
               >
                  {loading ? (
                     <LoaderCircle className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                     "Save"
                  )}
               </button>
            </div>
         </form>

         {aiGeneratedSummaryList && (
            <div className="my-5">
               <h2 className="font-bold text-lg">Suggestions</h2>
               {aiGeneratedSummaryList.map((item, index) => (
                  <div
                     key={index}
                     onClick={() => setSummary(item?.summery)}
                     className="p-5 shadow-md my-4 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                     <h2 className="font-bold my-1 text-primary">
                        Level: {item?.experience_level}
                     </h2>
                     <p>{item?.summery}</p>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

export default Summery;
