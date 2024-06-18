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
                <p className='max-w-3xl text-white mx-auto text-center mb-6 text-sm md:text-base lg:text-lg font-medium'>
                "Our Speech to Text Converter project enables users to effortlessly transcribe spoken English and Sinhala <span className=' font-bold  text-[15px]'> (සිංහල)</span> language into accurate text. 
                Whether capturing lectures, meetings, or personal notes, our advanced technology ensures seamless and reliable transcription, enhancing accessibility 
                and productivity across languages."
                </p>


                <div className='flex flex-wrap gap-4 p-4 justify-center items-center mb-6 '>
                    <div className='flex gap-4'>
                        <button className='bg-[#2bd3ca] focus:bg-[#65fcf4] shadow-md hover:bg-[#80d7ff] text-black font-medium border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer ' onClick={() => startListening('en-IN')}>
                            Start Listening (English)
                        </button>
                        <button className='bg-[#2bd3ca] focus:bg-[#65fcf4] shadow-md hover:bg-[#80d7ff] text-black font-medium border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer ' onClick={() => startListening('si-LK')}>
                            Start Listening <span className=' font-bold text-[15px]'> (සිංහල)</span>
                        </button>
                    </div>
                </div>    

                <textarea
                    className='text-start text-[20px] drop-shadow-xl  max-w-3xl w-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] h-auto py-4 px-4 bg-white hover:bg-[#e1fffb] focus:bg-[#b7f3eb] border rounded-lg relative mx-auto'
                    value={textToCopy}
                    onChange={handleTextChange}
                ></textarea>

                <div className='flex flex-wrap gap-4 p-4 justify-center items-center mt-6 font-medium text-white '>
                    <div className='flex gap-4 mt-4 md:mt-0'>

                        <button className='bg-[#d44545] shadow-md focus:bg-[#ff4747] hover:bg-[#db4a4a] text-white  rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer ' onClick={SpeechRecognition.stopListening}>
                            Stop Listening
                        </button>

                        <button className='bg-[#4bd536]  focus:bg-[#6fff52] hover:bg-[#72d35f] hover:text-[#000000] shadow-md  border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer ' onClick={setCopied}>
                            {isCopied ? 'Copied!' : 'Copy'}
                        </button>

                        <button className='bg-[#4bd536]  focus:bg-[#6fff52] hover:bg-[#72d35f] hover:text-[#000000]  shadow-md  border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer' onClick={clearText}>
                            Clear
                        </button>
                        
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Speech;
