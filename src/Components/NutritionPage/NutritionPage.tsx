import { useState, useSyncExternalStore } from "preact/compat";
import { foodListStore } from "../General/Main";
import { CustomList } from "../General/CustomList";
import { CalorieCounter } from "../General/CalorieCounter";
import "./NutritionPage.less"
import { ConfirmDialog } from "../General/ConfirmDialog";


export function NutritionPage()
{
    let foodList = useSyncExternalStore(foodListStore.subscribe, foodListStore.getValue);
    let [isDialogOpen, setIsDialogOpen] = useState(false);

    let AddNewEntry = (num: number) => {
        foodListStore.setValue([...foodList, {number: num, date: new Date()}]);
        window.playAudio("/click.mp3");
    }
    let ClearList = () => {
        foodListStore.setValue([]);
        setIsDialogOpen(false);
        window.playAudio("/click.mp3");
    }
    
    return <div class="container">
        <CalorieCounter></CalorieCounter>
        <h1>Rögzített étkezések</h1>
        <CustomList list={foodList} onAddNewEntry={AddNewEntry} onClearList={() => {setIsDialogOpen(true); window.playAudio("/click.mp3")}} isWeight={false}></CustomList>
        {isDialogOpen ? <ConfirmDialog onDismiss={() => {setIsDialogOpen(false); window.playAudio("/click.mp3")}} onConfirm={ClearList}></ConfirmDialog> : null}
    </div>
}