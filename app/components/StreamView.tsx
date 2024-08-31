import { useRef, useState } from "react";
import { Video } from "../types/Video";
import { Appbar } from "./Appbar";
import { ToastContainer } from 'react-toastify';

export default function StreamView(
    {
        creatorId,
        playVideo = false
    }: {
        creatorId: string;
        playVideo: boolean;
    }
) {
    //url link to add 
    const [inputLink, setInputLink] = useState('');
    //what video to play next 
    const [queue, setQueue] = useState<Video[]>([]);
    //current video can be empty or something playing 
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(false);
    //next item on the list 
    const [playNextLoader, setPlayNextLoader] = useState(false);
    const videoPlayerRef = useRef<HTMLVideoElement>();


    //refresh the current stream 
    


    return (
        <div className="flex flex-col min-h-screen bg-[rgb(10,10,10)] text-gray-200">
            <Appbar />
            <div className="flex justify-center"></div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
        </div>




    )
}

