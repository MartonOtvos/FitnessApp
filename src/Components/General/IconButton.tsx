import "./IconButton.less"

export type IconButtonProps = {
    icon: string;
    onClick?: () => void;
}

/**
* Egy saját iconButton megvalósítás, egy gomb ami tartalmaz egy img-t.
* 
* @param icon - az megjelenítendő ikon.
* @param onClick - a button onClick eseményének callback fv-e.
* 
* @returns Az elkészített HTML.
*/
export function IconButton({icon, onClick} : IconButtonProps)
{
    return <button className="IconButton" onClick={onClick}>
        <img src={`${icon}.svg`} alt="" />
    </button>
}