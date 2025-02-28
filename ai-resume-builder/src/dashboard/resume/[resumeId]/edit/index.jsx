import { useEffect, useState } from 'react';
import FormSection from '../../component/FormSection.jsx';
import ResumePreview from '../../component/ResumePreview.jsx';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext.jsx';
import { GetResumeById } from '../../../../../services/GlobalApi.jsx';
import { useSearchParams } from "react-router-dom";
function EditResume() {
  const [searchParams] = useSearchParams();
    const did = searchParams.get("did");
  const [resumeInfo,setResumeInfo]=useState();
  useEffect(()=>{
     
      GetResumeInfo();
  },[])


  const GetResumeInfo=()=>{
      GetResumeById(did).then(resp=>{
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
      })
  }

return (
  <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
  <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* Form Section  */}
        <FormSection/>
      {/* Preview Section  */}
       <ResumePreview/>
  </div>
  </ResumeInfoContext.Provider>
)
}

export default EditResume

