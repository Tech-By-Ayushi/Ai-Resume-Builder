import  { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext.jsx';
import { useSearchParams } from "react-router-dom";
import {UpdateResumeDetail} from '../../../../../services/GlobalApi.jsx';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [searchParams] = useSearchParams();
  const did = searchParams.get("did");
  const [educationalList, setEducationalList] = useState([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  useEffect(() => {
    if (resumeInfo) setEducationalList(resumeInfo?.education);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([...educationalList, {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    };

    UpdateResumeDetail(did, data)
      .then(() => {
        setLoading(false);
        toast('Details updated!');
      })
      .catch(() => {
        setLoading(false);
        toast('Server Error, Please try again!');
      });
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    });
  }, [educationalList]);

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label className='block text-sm font-medium'>University Name</label>
              <input
                name='universityName'
                type='text'
                value={item.universityName}
                onChange={(e) => handleChange(e, index)}
                className='w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Degree</label>
              <input
                name='degree'
                type='text'
                value={item.degree}
                onChange={(e) => handleChange(e, index)}
                className='w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Major</label>
              <input
                name='major'
                type='text'
                value={item.major}
                onChange={(e) => handleChange(e, index)}
                className='w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Start Date</label>
              <input
                type='date'
                name='startDate'
                value={item.startDate}
                onChange={(e) => handleChange(e, index)}
                className='w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>End Date</label>
              <input
                type='date'
                name='endDate'
                value={item.endDate}
                onChange={(e) => handleChange(e, index)}
                className='w-full p-2 border rounded'
              />
            </div>
            <div className='col-span-2'>
              <label className='block text-sm font-medium'>Description</label>
              <textarea
                name='description'
                value={item.description}
                onChange={(e) => handleChange(e, index)}
                className='w-full p-2 border rounded'
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <button onClick={AddNewEducation} className='px-4 py-2 border rounded text-primary'>+ Add More</button>
          <button onClick={RemoveEducation} className='px-4 py-2 border rounded text-primary'>- Remove</button>
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

export default Education;

