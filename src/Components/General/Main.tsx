import { useEffect, useState } from "preact/hooks";
import { NavBar } from "../Navigation/NavBar";
import "./Main.less"
import { HomePage, numberEntry } from "../HomePage/HomePage";
import { useSyncExternalStore } from "preact/compat";
import { GlobalStore } from "../../Scripts/GlobalStore";
import { NutritionPage } from "../NutritionPage/NutritionPage";
import { WorkoutPage } from "../WorkoutPage/WorkoutPage";
import { JournalEntry, JournalPage } from "../JournalPage/JournalPage";

export enum page{
    Home,
    Nutrition,
    Workout,
    Journal
}

export const calorieCountStore = new GlobalStore(0);
export const goalCalorieCountStore = new GlobalStore(2000);
export const foodListStore = new GlobalStore<numberEntry[]>([]);
export const workoutListStore = new GlobalStore<numberEntry[]>([]);
export const weightListStore = new GlobalStore<numberEntry[]>([]);
export const journalListStore = new GlobalStore<JournalEntry[]>([]);




export function Main()
{
    let [currentPage, setCurrentPage] = useState(page.Home);
    let calorieCount = useSyncExternalStore(calorieCountStore.subscribe, calorieCountStore.getValue);
    let goalCalorieCount = useSyncExternalStore(goalCalorieCountStore.subscribe, goalCalorieCountStore.getValue);
    let foodList = useSyncExternalStore(foodListStore.subscribe, foodListStore.getValue);
    let workoutList = useSyncExternalStore(workoutListStore.subscribe, workoutListStore.getValue);
    let weightList = useSyncExternalStore(weightListStore.subscribe, weightListStore.getValue);
    let journalList = useSyncExternalStore(journalListStore.subscribe, journalListStore.getValue);


    useEffect(() => {
        const foodListFromStorage = JSON.parse(localStorage.getItem("foodList") || '[]');
        const workoutListFromStorage = JSON.parse(localStorage.getItem("workoutList") || '[]');
        const weightListFromStorage = JSON.parse(localStorage.getItem("weightList") || '[]');
        const journalListFromStorage = JSON.parse(localStorage.getItem("journalList") || '[]');
        const goalCalorieCountFromStorage = JSON.parse(localStorage.getItem("goalCalorieCount") || '0');


        foodListStore.setValue(foodListFromStorage.map(item => ({
            ...item,
            date: new Date(item.date)
        })));

        workoutListStore.setValue(workoutListFromStorage.map(item => ({
            ...item,
            date: new Date(item.date)
        })));

        weightListStore.setValue(weightListFromStorage.map(item => ({
            ...item,
            date: new Date(item.date)
        })));
        journalListStore.setValue(journalListFromStorage.map(item => ({
            ...item,
            date: new Date(item.date)
        })));

        goalCalorieCountStore.setValue(goalCalorieCountFromStorage);
    }, []);


    useEffect(() => {
        let foodsum = 0;
        foodList.forEach(element => {
            if(new Date().toLocaleDateString == element.date.toLocaleDateString) foodsum += element.number;
        });
        let workoutsum = 0;
        workoutList.forEach(element => {
            if(new Date().toLocaleDateString == element.date.toLocaleDateString) workoutsum += element.number;
        });

        let newCalorieCount = foodsum - workoutsum;
        calorieCountStore.setValue(newCalorieCount);
        
        let foodListString = JSON.stringify(foodList);
        let workoutListString = JSON.stringify(workoutList);
        localStorage.setItem('foodList', foodListString);
        localStorage.setItem('workoutList', workoutListString);
        


    }, [foodList, workoutList]);

    useEffect(() => {
        let weightListString = JSON.stringify(weightList);
        let goalCalorieCountString = JSON.stringify(goalCalorieCount);
        let journalListString = JSON.stringify(journalList);

        localStorage.setItem('weightList', weightListString);
        localStorage.setItem('goalCalorieCount', goalCalorieCountString);
        localStorage.setItem('journalList', journalListString);
    }, [weightList, goalCalorieCount, journalList])


    return <div class="Main">
        <NavBar setCurrentPage={setCurrentPage}></NavBar>
        {currentPage === page.Home && <HomePage />}
        {currentPage === page.Nutrition && <NutritionPage />}
        {currentPage === page.Workout && <WorkoutPage />}
        {currentPage === page.Journal && <JournalPage />}
        
    </div>
}

