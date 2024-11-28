import React, { useEffect, useState } from 'react'
import LoadingAnimation from "../assets/blackLoader.svg"
import { betterAxios } from '../api/axios';
import { gcsSchema } from "../validations"
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const AudioPlayer = ({ path }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [error, setError] = useState(null);


    const fetchAudioData = async () => {
        try {
            // Ensure path is properly formatted
            const formattedPath = path.startsWith('gs://') ? path : `gs://${path}`;
            
            if (yupResolver(gcsSchema, formattedPath)) {
                const response = await betterAxios.get(`api/v1/dataset/audio?path=${formattedPath}`);
                const { mime_type, data } = response.data;
                setAudioSrc(`data:${mime_type};base64,${data}`);
            } else {
                setError("Invalid Audio URI");
                toast.error("Invalid Audio URI");
            }
        } catch (err) {
            setError(err.message);
            toast.error("Failed to load audio");
        }
    };
    useEffect(() => {
        setAudioSrc(null);
        setError(null);
        fetchAudioData();
    }, [path]);
    return (
        <div className='w-full inline-flex items-center justify-center'>
            {audioSrc ? (
                <audio controls src={audioSrc} className='h-10'>
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <div className='w-[30px] h-[30px]'>
                    <img src={LoadingAnimation} alt="Loading audio" />
                </div>
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
}

export default AudioPlayer