import  { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext.jsx';
import {UpdateResumeDetail} from '../../../../../services/GlobalApi.jsx';
import { useSearchParams } from "react-router-dom";
import { toast } from 'sonner';

function Skills() {
    const [skillsList, setSkillsList] = useState([{ name: '', rating: 0 }]);
    const [searchParams] = useSearchParams();
    const did = searchParams.get("did");
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        if (resumeInfo) setSkillsList(resumeInfo?.skills || []);
    }, []);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const addNewSkill = () => {
        setSkillsList([...skillsList, { name: '', rating: 0 }]);
    };

    const removeSkill = () => {
        setSkillsList(skillsList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: { skills: skillsList.map(({ id, ...rest }) => rest) }
        };

        UpdateResumeDetail(did, data)
            .then(() => {
                setLoading(false);
                toast('Details updated!');
            })
            .catch(() => {
                setLoading(false);
                toast('Server Error, Try again!');
            });
    };

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, skills: skillsList });
    }, [skillsList]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10 bg-white'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p className='text-gray-600'>Add your top professional key skills</p>

            <div className='space-y-3 mt-4'>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex justify-between items-center border rounded-lg p-3 bg-gray-50'>
                        <div className='w-full'>
                            <label className='text-xs text-gray-600'>Skill Name</label>
                            <input
                                className='w-full p-2 border rounded-md focus:outline-primary'
                                value={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handleChange(index, 'rating', v)} />
                    </div>
                ))}
            </div>

            <div className='flex justify-between items-center mt-4'>
                <div className='flex gap-2'>
                    <button onClick={addNewSkill} className='px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition'>
                        + Add Skill
                    </button>
                    <button onClick={removeSkill} className='px-4 py-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition'>
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

export default Skills;


