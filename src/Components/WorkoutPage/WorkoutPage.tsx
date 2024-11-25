import { useState, useSyncExternalStore } from "preact/compat";
import { CalorieCounter } from "../General/CalorieCounter";
import { CustomList } from "../General/CustomList";
import { workoutListStore } from "../General/Main";
import "./WorkoutPage.less"
import { ConfirmDialog } from "../General/ConfirmDialog";


/**
* Az edzés oldal html-jét készíti el.
* Itt lehet feljegyezni a napi edzéseket, és égetett kalóriákat.
* 
* @returns Az elkészített HTML.
*/
export function WorkoutPage()
{
    let workoutList = useSyncExternalStore(workoutListStore.subscribe, workoutListStore.getValue);
    let [isDialogOpen, setIsDialogOpen] = useState(false);

    let AddNewEntry = (num: number) => {
        workoutListStore.setValue([...workoutList, {number: num, date: new Date()}]);
        window.playAudio("click.mp3");
    }
    let ClearList = () => {
        workoutListStore.setValue([]);
        setIsDialogOpen(false);
        window.playAudio("click.mp3");
    }

    return <div class="container">
        <CalorieCounter></CalorieCounter>
        <h1>Rögzített edzések</h1>
        <CustomList list={workoutList} onAddNewEntry={AddNewEntry} onClearList={() => {setIsDialogOpen(true); window.playAudio("click.mp3")}} isWeight={false}></CustomList>
        {isDialogOpen ? <ConfirmDialog onDismiss={() => {setIsDialogOpen(false); window.playAudio("click.mp3")}} onConfirm={ClearList}></ConfirmDialog> : null}
    </div>
}