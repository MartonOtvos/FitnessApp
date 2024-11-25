import { useState } from "preact/hooks";
import { ProgressBar } from "../General/ProgressBar";
import "./HomePage.less"
import { CustomList } from "../General/CustomList";
import { useSyncExternalStore } from "preact/compat";
import { calorieCountStore, goalCalorieCountStore, weightListStore} from "../General/Main"
import { CalorieCounter } from "../General/CalorieCounter";
import { ConfirmDialog } from "../General/ConfirmDialog";

export type numberEntry = {
    number: number;
    date: Date;
}

/**
* A Home oldal html-jét készíti el.
* Itt lehet feljegyezni a napi súlyokat.
* 
* @returns Az elkészített HTML.
*/
export function HomePage()
{
    let weightList = useSyncExternalStore(weightListStore.subscribe, weightListStore.getValue);
    let [isDialogOpen, setIsDialogOpen] = useState(false);

    let onAddNewEntry = (num: number) => {
        weightListStore.setValue([...weightList, {number: num, date: new Date()}]);
        window.playAudio("click.mp3");
    }
    let onClearList = () => {
        weightListStore.setValue([]);
        window.playAudio("click.mp3");
    }

    return <div class="HomePage">
        <CalorieCounter></CalorieCounter>
        <h1>Feljegyzett súlyok</h1>
        <CustomList list={weightList} onAddNewEntry={onAddNewEntry} onClearList={() => {setIsDialogOpen(true); window.playAudio("click.mp3")}} isWeight={true}></CustomList>
        {isDialogOpen ? <ConfirmDialog onDismiss={() => {setIsDialogOpen(false); window.playAudio("/click.mp3")}} onConfirm={onClearList}></ConfirmDialog> : null}
    </div>

}