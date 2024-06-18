import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";

const Speech = () => {

    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    //subscribe to thapa technical for more awesome videos

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

  return (
    <div>
      <div className="container">
        <h2 className=' text-black text-center text-[48px] leading-5 mt-8'>Speech to text Converter</h2><br />
        <p className=' max-w-[50rem] text-center mt-[24px] mb-[50px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nemo eos perspiciatis ab placeat molestias, vero qui. Architecto, cumque impedit quo dolores quam perferendis accusantium excepturi perspiciatis dicta obcaecati ducimus.</p>

        <div className=' text-[16px] max-w-[50rem] w-[100%] min-h-[400px] h-auto py-[120px] px-[18px] bg-slate-300 hover:bg-[#b7f3eb] shadow-black border-[1px] rounded-[20px] relative' onClick={() =>  setTextToCopy(transcript)}>
        {transcript}
        </div>

        <div className='flex gap-20 p-10 justify-center items-center'>
            <button className='bg-emerald-400 text-black border-none rounded-lg py-[18px] px-[50px] text-[18px] leading-4  relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={setCopied}>
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
                </button>
            <button className='bg-emerald-400 text-black border-none rounded-lg py-[18px] px-[30px] text-[18px] leading-4  relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={startListening}>
                Start Lisitening</button>
            <button className='bg-emerald-400 text-black border-none rounded-lg py-[18px] px-[30px] text-[18px] leading-4  relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={SpeechRecognition.stopListening}>
                Stop Listening</button>
        </div>

      </div>
    </div>
  )
}

export default Speech
