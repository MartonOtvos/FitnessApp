import "./IconButton.less"

export type IconButtonProps = {
    icon: string;
    onClick?: () => void;
}


export function IconButton({icon, onClick} : IconButtonProps)
{
    return <button className="IconButton" onClick={onClick}>
        <img src={`/${icon}.svg`} alt="" />
    </button>
}