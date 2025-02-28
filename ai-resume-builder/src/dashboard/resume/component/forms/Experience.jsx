import  { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext.jsx";;
import {UpdateResumeDetail}  from "../../../../../services/GlobalApi.jsx";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [searchParams] = useSearchParams();
  const did = searchParams.get("did");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.Experience?.length > 0) {
      setExperienceList(resumeInfo.Experience);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const removeExperience = () => {
    setExperienceList((prev) => prev.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experienceList,
    });
  }, [experienceList]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data:{ Experience: experienceList.map(({ id, ...rest }) => rest),
    }};
    UpdateResumeDetail(did, data).then(
      (resp) => {
        console.log(resp)
        //enabledNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };


  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add Your previous Job experience</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.title}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.companyName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.city}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <input
                  type="text"
                  name="state"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.state}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.endDate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummery}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "workSummery", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addNewExperience}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-100 rounded"
          >
            + Add More Experience
          </button>
          <button
            type="button"
            onClick={removeExperience}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-100 rounded"
          >
            - Remove
          </button>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={onSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-5 w-5 mr-2" />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}

export default Experience;
