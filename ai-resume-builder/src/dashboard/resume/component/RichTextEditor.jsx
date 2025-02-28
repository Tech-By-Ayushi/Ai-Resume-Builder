import { ResumeInfoContext } from '../../../context/ResumeInfoContext.jsx';
import { Brain, LoaderCircle } from 'lucide-react';
import  { useContext, useState } from 'react';
import { 
  BtnBold, 
  BtnBulletList, 
  BtnItalic, 
  BtnLink, 
  BtnNumberedList, 
  BtnStrikeThrough, 

  BtnUnderline, 
  Editor, 
  EditorProvider,  
  Separator, 
  Toolbar 
} from 'react-simple-wysiwyg';
import { AIChatSession } from '../../../../services/AIModel.jsx';
import { toast } from 'sonner';

const PROMPT =
'Position title: {positionTitle}. Based on the position title, provide 5-7 non-empty bullet points highlighting relevant managerial experience for my resume. The output must be a complete HTML unordered list (<ul>) with each bullet point enclosed in <li> tags. Do not include any JSON format,newline characters, extra quotes, or any additional text.';
function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.Experience[index]?.title) {
      toast('Please Add Position Title');
      return;
    }
    setLoading(true);
    const promptText = PROMPT.replace(
      '{positionTitle}',
      resumeInfo.Experience[index].title
    );
    const result = await AIChatSession.sendMessage(promptText);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace('[', '').replace(']', ''));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
        <button
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border border-primary text-primary px-2 py-1 rounded disabled:opacity-50"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-5 w-5" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
