import { useRef } from "preact/hooks";
import { journalListStore } from "../General/Main";
import { JournalEntry } from "./JournalPage";
import "./JournalTextInput.less"


export type journalTextInputProps = {
    index: number;
    onSaveEntry: () => void;
}

/**
* Egy saját textInput megvalósítás a naplóbejegyzések szerkesztésére.
* 
* @param index - a megnyitott naplóbejegyzés indexe.
* @param onSaveEntry - A bejegyzés mentésekor meghívando callback fv.
* 
* @returns Az elkészített HTML.
*/
export function JournalTextInput({index, onSaveEntry}: journalTextInputProps)
{
    let journalEntry = journalListStore.getValue()[index];

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const SaveEntry = () => {
        const value = inputRef.current.value;
        journalEntry.content = value;
        journalEntry.date = new Date();
        let newList = journalListStore.getValue();
        newList[index] = journalEntry;
        journalListStore.setValue(newList);
        onSaveEntry();
    }


    return <div class="JournalTextInputContainer">
        <h2>{journalEntry.title}</h2>
        <textarea name="content" id="journalcontent" class="JournalContent" ref={inputRef} value={journalEntry.content}></textarea>
        <button onClick={SaveEntry}>Módosítások mentése</button>
    </div>
}