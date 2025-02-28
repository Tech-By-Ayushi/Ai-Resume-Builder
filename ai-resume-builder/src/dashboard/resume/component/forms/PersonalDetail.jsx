import { LoaderCircle } from 'lucide-react'; // Icon for loading spinner
import  { useContext, useState, useEffect } from 'react';

import {UpdateResumeDetail} from '../../../../../services/GlobalApi.jsx';
import { toast } from 'sonner';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext.jsx';
import { useSearchParams } from "react-router-dom";
function PersonalDetail({ enabledNext }) {

  const [searchParams] = useSearchParams();
    const did = searchParams.get("did");
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("---", resumeInfo);
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
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
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              defaultValue={resumeInfo?.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <input
              type="text"
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
          >
            {loading ? (
              <LoaderCircle className="animate-spin h-5 w-5 mr-2" />
            ) : (
              'Save'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
