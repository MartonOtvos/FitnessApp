import { useEffect, useState } from "preact/hooks";
import "./JournalPage.less"
import { useSyncExternalStore } from "preact/compat";
import { journalListStore } from "../General/Main";
import { JournalList } from "./JournalList";
import { JournalTextInput } from "./JournalTextInput";
import { ConfirmDialog } from "../General/ConfirmDialog";

export type JournalEntry = {
    title: string;
    content: string;
    date: Date;
}

export function JournalPage()
{
    let journalList = useSyncExternalStore(journalListStore.subscribe, journalListStore.getValue);
    let [isDialogOpen, setIsDialogOpen] = useState(false);

    

    let [openEntry, setOpenEntry] = useState(-1);

    let AddNewEntry = (title: string) => {
        let newEntry = {title: title, content: "", date: new Date()};
        journalListStore.setValue([...journalList, newEntry]);
        setOpenEntry(journalList.length);
    }

    let OnClear = () => {
        journalListStore.setValue([]);
        setIsDialogOpen(false);
        window.playAudio("/click.mp3");
    }

    return <div class="JournalContainer">
        <h1>Személyes napló</h1>
        {(openEntry == -1) ? <JournalList list={journalList} onAddNewEntry={(title: string) => {AddNewEntry(title); window.playAudio("/click.mp3")}} onClearList={() => {setIsDialogOpen(true); window.playAudio("/click.mp3")}} onOpenEntry={(index) => {setOpenEntry(index); window.playAudio("/click.mp3")}}></JournalList>
        : <JournalTextInput index={openEntry} onSaveEntry={() => {setOpenEntry(-1); window.playAudio("/click.mp3")}}></JournalTextInput> }
        {isDialogOpen ? <ConfirmDialog onDismiss={() => {setIsDialogOpen(false); window.playAudio("/click.mp3")}} onConfirm={OnClear}></ConfirmDialog> : null}
        
    </div>
}