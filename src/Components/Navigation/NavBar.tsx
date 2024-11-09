import { IconButton } from "../General/IconButton";
import "./NavBar.less"
import { page } from "../General/Main";

type NavBarProps = {
    setCurrentPage: React.Dispatch<React.SetStateAction<page>>;
};

export function NavBar({ setCurrentPage }: NavBarProps)
{
    
    return <div class="NavBar">
        <IconButton icon="home" onClick={() => {setCurrentPage(page.Home); window.playAudio("click.mp3")} }></IconButton>
        <IconButton icon="food" onClick={() => {setCurrentPage(page.Nutrition); window.playAudio("click.mp3")}}></IconButton>
        <IconButton icon="weight" onClick={() => {setCurrentPage(page.Workout); window.playAudio("click.mp3")}}></IconButton>
        <IconButton icon="journal" onClick={() => {setCurrentPage(page.Journal); window.playAudio("click.mp3")}}></IconButton>
    </div>
}