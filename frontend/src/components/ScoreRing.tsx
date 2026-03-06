
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ScoreRingProps {
    score: number;
    riskLevel: string;
}

export default function ScoreRing({ score, riskLevel }: ScoreRingProps) {
    let pathColor = '#22C55E'; // Low Risk
    if (riskLevel.includes('Moderate')) {
        pathColor = '#F59E0B'; // Moderate Risk
    } else if (riskLevel.includes('High')) {
        pathColor = '#EF4444'; // High Risk
    }

    return (
        <div className="w-48 h-48 mx-auto relative drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)]">
            <CircularProgressbar
                value={score}
                maxValue={100}
                text={`${score}`}
                styles={buildStyles({
                    pathColor: pathColor,
                    textColor: '#111827',
                    trailColor: '#F5F7FA',
                    textSize: '24px',
                    pathTransitionDuration: 1.5,
                    strokeLinecap: 'round',
                })}
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col top-14">
                <span className={`text-sm font-bold mt-8 uppercase tracking-widest ${riskLevel.includes('Low') ? 'text-[#22C55E]' :
                    riskLevel.includes('Moderate') ? 'text-[#F59E0B]' :
                        'text-[#EF4444]'
                    }`}>
                    {riskLevel} Risk
                </span>
            </div>
        </div>
    );
}
