import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect, useRef } from "react";

const Speech = () => {
    const [textToCopy, setTextToCopy] = useState('');
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    const recognitionRef = useRef(null);

    const startListening = () => {
        recognitionRef.current = SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    useEffect(() => {
        setTextToCopy(transcript);
    }, [transcript]);

    const handleTextChange = (event) => {
        setTextToCopy(event.target.value);
    };

    const clearText = () => {
        setTextToCopy('');
        resetTranscript();
    };

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    return (
        <div>
            <div>
                <h2 className='text-black text-center text-[48px] leading-5 mt-8'>Speech to text Converter</h2><br />
                <p className='max-w-[50rem] text-center mt-[24px] mb-[50px]'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nemo eos perspiciatis ab placeat molestias, vero qui. Architecto, cumque impedit quo dolores quam perferendis accusantium excepturi perspiciatis dicta obcaecati ducimus.
                </p>

                <textarea
                    className='text-start text-[16px] max-w-[50rem] w-[100%] min-h-[400px] h-auto py-[18px] px-[18px] bg-slate-300 hover:bg-[#b7f3eb] shadow-black border-[1px] rounded-[20px] relative'
                    value={textToCopy}
                    onChange={handleTextChange}
                ></textarea>

                <div className='flex gap-10 p-10 justify-center items-center'>
                    
                    <button className='bg-emerald-400 text-black border-none rounded-lg py-[18px] px-[30px] text-[18px] leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={startListening}>
                        Start Listening
                    </button>
                    <button className='bg-emerald-400 text-black border-none rounded-lg py-[18px] px-[30px] text-[18px] leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={SpeechRecognition.stopListening}>
                        Stop Listening
                    </button>

                    <button className='bg-emerald-400 text-black border-none rounded-lg py-[18px] px-[40px] text-[18px] leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>

                    <button className='bg-emerald-400 text-black border-none rounded-lg py-[18px] px-[40px] text-[18px] leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={clearText}>
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Speech;
