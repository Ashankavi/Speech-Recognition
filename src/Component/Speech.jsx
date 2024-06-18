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
        <div className='container mx-auto p-4'>
            <div>
                <h2 className='text-black text-center text-3xl md:text-4xl lg:text-5xl leading-5 mt-8 '>Speech to Text Converter</h2><br />
                <p className='max-w-3xl mx-auto text-center mt-6 mb-12 text-sm md:text-base lg:text-lg'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nemo eos perspiciatis ab placeat molestias, vero qui. Architecto, cumque impedit quo dolores quam perferendis accusantium excepturi perspiciatis dicta obcaecati ducimus.
                </p>

                <textarea
                    className='text-start text-base max-w-3xl w-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] h-auto py-4 px-4 bg-slate-300 hover:bg-[#b7f3eb] shadow-black border rounded-lg relative mx-auto'
                    value={textToCopy}
                    onChange={handleTextChange}
                ></textarea>

                <div className='flex flex-col md:flex-row gap-4 p-4 justify-center items-center mt-6'>
                    <button className='bg-emerald-400 text-black border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={startListening}>
                        Start Listening
                    </button>
                    <button className='bg-emerald-400 text-black border-none rounded-lg py-2 px-4 text-sm md:text-base lg:text-lg leading-4 relative cursor-pointer focus:bg-[#73db5f] hover:bg-[#82f16c]' onClick={SpeechRecognition.stopListening}>
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
    );
};

export default Speech;
