import "./ProgressBar.less"

export type ProgressBarProps = {
    progress: number;
    maximum: number;
}



export function ProgressBar({progress, maximum}: ProgressBarProps)
{
    let percentage = (progress/maximum) * 100;
    if(percentage > 100) percentage = 100;
    if(progress < 0) percentage = 0;

    return <div class="ProgressContainer">
        <div class="Progress" style={{ width: `${percentage}%` }}></div>
    </div>
}