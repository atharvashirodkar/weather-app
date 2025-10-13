import React, { useState, useEffect } from 'react';

const SunriseSunsetCard = ({ sunInfo }) => {
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [currentPosition, setCurrentPosition] = useState('');

  useEffect(() => {
    if (!sunInfo?.sunrise || !sunInfo?.sunset || !sunInfo?.timezone) return;

    const calculateSunPosition = () => {
      const now = new Date();
      const today = now.toLocaleDateString('en-US', { timeZone: sunInfo.timezone });

      // Convert "6:45 AM" → valid Date object in correct timezone
      const sunrise = new Date(`${today} ${sunInfo.sunrise}`);
      const sunset = new Date(`${today} ${sunInfo.sunset}`);

      if (isNaN(sunrise) || isNaN(sunset)) return;

      const current = now.getTime();
      const start = sunrise.getTime();
      const end = sunset.getTime();

      if (current < start) {
        setProgressBarWidth(0);
        setCurrentPosition('Before Sunrise');
      } else if (current > end) {
        setProgressBarWidth(100);
        setCurrentPosition('After Sunset');
      } else {
        const totalDaylight = end - start;
        const elapsed = current - start;
        console.log(elapsed);
        console.log(totalDaylight);
        
        const percentage = (elapsed / totalDaylight) * 100;
        setProgressBarWidth(percentage);
        setCurrentPosition('Daytime');
      }
    };

    calculateSunPosition(); // Initial call
    const interval = setInterval(calculateSunPosition, 60000); // Update every 1 min

    return () => clearInterval(interval);
  }, [sunInfo]);

  return (
    sunInfo?.sunrise && (
      <div className="sunInfo">
        {/* Header Row */}
        <div className="sunrise">
          <div className="sunrise-label">Sunrise:</div>
          <div className="sunset-label">Sunset:</div>
        </div>

        {/* Progress Bar */}
        <div className="progressBarContainer">
          <div className="currentPosition">{currentPosition}</div>
          <div
            className="progressBar"
            style={{
              width: `${progressBarWidth}%`,
            }}
          ></div>
          <div
            className="progressDot"
            style={{ left: `${progressBarWidth}%` }}
          ></div>
        </div>
        {/* Footer Row */}
        <div className="sunset">
          <div className="sunrise-value">{sunInfo.sunrise}</div>
          <div className="sunset-value">{sunInfo.sunset}</div>
        </div>
      </div>
    )
  );
};

export default SunriseSunsetCard;
