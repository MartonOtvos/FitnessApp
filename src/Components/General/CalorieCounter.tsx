import { useRef, useSyncExternalStore } from "preact/compat";
import { ProgressBar } from "./ProgressBar";
import { calorieCountStore, goalCalorieCountStore } from "./Main";
import "./CalorieCounter.less"

/**
* A kalóriaszámláló újrahasználható HTML generáló függvénye.
* A kalóriaszámlálón lehet beállítani a napi célkalória fogyasztást.
* 
* @returns Az elkészített HTML.
*/
export function CalorieCounter()
{
    let calorieCount = useSyncExternalStore(calorieCountStore.subscribe, calorieCountStore.getValue);
    let goalCalorieCount = useSyncExternalStore(goalCalorieCountStore.subscribe, goalCalorieCountStore.getValue);

    let overLimit = (calorieCount > goalCalorieCount*1.1);
    let justRight = (calorieCount >= goalCalorieCount*0.9 && calorieCount <= goalCalorieCount*1.1);

    const inputRef = useRef<HTMLInputElement>(null);

    const setGoal = () => {
        const value = inputRef.current ? parseInt(inputRef.current.value, 10) : 0;
        if(value <= 0) goalCalorieCountStore.setValue(1);
        else goalCalorieCountStore.setValue(value);
        window.playAudio("click.mp3");
    }


    return <div>
        <h1>Napi fogyasztás</h1>
        <h1 class="CalorieCounter" style={overLimit ? "color: red" : justRight ? "color: green" : "color: white"}>{calorieCount} / {goalCalorieCount} kcal</h1>
        <ProgressBar progress = {calorieCount} maximum = {goalCalorieCount}></ProgressBar>


        <div class="CalorieInputContainer">
            <input type="number" id="calorie" class="NumberInput" ref={inputRef} min="0" max="99999" value="0"/>
            <button onClick={setGoal} >Új cél beállítása</button>
        </div>
        

    </div>

}

