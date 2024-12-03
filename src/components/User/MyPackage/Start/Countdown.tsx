import React, { useState, useEffect, useMemo } from 'react';

interface CountdownProps {
    end_time: string; // End time passed as a string (e.g., "2024-12-31T23:59:59")
}

const Countdown = ({ end_time }: CountdownProps) => {
    // Memoize the endDate to prevent unnecessary recalculations
    const endDate = useMemo(() => new Date(end_time), [end_time]);

    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const timeDifference = endDate.getTime() - now.getTime();

            if (timeDifference <= 0) {
                clearInterval(intervalId); // Stop the countdown
                alert('Waktu habis!'); // Trigger alert when the time is up
            } else {
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setTimeLeft({
                    hours,
                    minutes,
                    seconds,
                });
            }
        }, 1000); // Update the countdown every second

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [endDate]); // Dependency on endDate only

    return (
        <div className="flex w-fit md:gap-10 gap-5 bg-primary rounded-lg md:rounded-xl md:p-3 p-2 md:text-sm text-xs">
            <div className="flex flex-col items-center">
                <div>{timeLeft.hours}</div>
                <div>Jam</div>
            </div>
            <div className="flex flex-col items-center">
                <div>{timeLeft.minutes}</div>
                <div>Menit</div>
            </div>
            <div className="flex flex-col items-center">
                <div>{timeLeft.seconds}</div>
                <div>Detik</div>
            </div>
        </div>
    );
};

export default Countdown;
