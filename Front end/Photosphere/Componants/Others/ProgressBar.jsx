import React, { useEffect, useState } from 'react'
import './ProgressBar.css'

function ProgressBar({ progress, bar }) {
    const [barWidth, setBarWidth] = useState(0)
    const [currentProgress, setCurrentProgress] = useState(0);

    // useEffect(() => {
    //     if (progress) {
    //         setCurrentProgress(0);
    //         const timer = setInterval(() => {
    //             setCurrentProgress((prevProgress) => {
    //                 if (prevProgress < 100) {
    //                     return prevProgress + 0.1;
    //                 }
    //                 return prevProgress;
    //             });
    //         }, 20);

    //         return () => {
    //             clearInterval(timer);
    //         };
    //     } else {
    //         setCurrentProgress(0);
    //     }
    // }, [progress]);

    useEffect(() => {
        setBarWidth(bar[progress]);
    }, [bar]);

    return (
        <div className='col rounded bg-secondary px-0 mx-1' >
            <div className='rounded'
                style={{ maxWidth: `${barWidth}%`, minHeight: '6px', backgroundColor: 'black' }}
            ></div>
        </div>
    )
}

export default ProgressBar