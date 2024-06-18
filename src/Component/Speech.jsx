import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect, useRef } from "react";

const Speech = () => {
    const [textToCopy, setTextToCopy] = useState('');
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });
    const [language, setLanguage] = useState('en-IN');

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    const recognitionRef = useRef(null);

    const startListening = (lang) => {
        setLanguage(lang);
        recognitionRef.current = SpeechRecognition.startListening({ continuous: true, language: lang });
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
        <div className='mx-auto p-4 text-center items-center justify-center'>
            <div>
                <h2 className='text-white font-bold uppercase text-center text-4xl md:text-4xl lg:text-5xl leading-[35px] mt-8 '>Speech to Text Converter</h2><br />
                <p className='max-w-3xl text-white mx-auto text-center mb-6 text-xl md:text-base lg:text-lg'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nemo eos perspiciatis ab placeat molestias, vero qui. Architecto, cumque impedit quo dolores quam perferendis accusantium excepturi perspiciatis dicta obcaecati ducimus.
                </p>


                <div className='flex flex-wrap gap-4 p-4 justify-center items-center mb-6'>
                    <div className='flex gap-4'>
                        <button className='bg-emerald-400 text-black border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={() => startListening('en-IN')}>
                            Start Listening (English)
                        </button>
                        <button className='bg-emerald-400 text-black border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={() => startListening('si-LK')}>
                            Start Listening (Sinhala)
                        </button>
                    </div>
                </div>    

                <textarea
                    className='text-start text-[20px] drop-shadow-xl  max-w-3xl w-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] h-auto py-4 px-4 bg-white hover:bg-[#e1fffb] focus:bg-[#b7f3eb] border rounded-lg relative mx-auto'
                    value={textToCopy}
                    onChange={handleTextChange}
                ></textarea>

                <div className='flex flex-wrap gap-4 p-4 justify-center items-center mt-6'>
                    <div className='flex gap-4 mt-4 md:mt-0'>

                        <button className='bg-[#d35050] focus:bg-[#e24b4b] hover:bg-[#ff5858] text-white border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer ' onClick={SpeechRecognition.stopListening}>
                            Stop Listening
                        </button>

                        <button className='bg-emerald-400 text-black border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={setCopied}>
                            {isCopied ? 'Copied!' : 'Copy'}
                        </button>

                        <button className='bg-emerald-400 text-black border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={clearText}>
                            Clear
                        </button>
                        
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Speech;
