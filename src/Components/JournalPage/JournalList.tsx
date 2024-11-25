import { useRef } from "preact/hooks";
import { JournalEntry } from "./JournalPage";
import "./JournalList.less"


export type journalListProps = {
    list: JournalEntry[];
    onAddNewEntry: (title: string) => void;
    onOpenEntry: (index: number) => void;
    onClearList: () => void;
}

/**
* A napló bejegyzásek listáját megvalósító komponens.
* Meg lehet nyitni rajta keresztül bejegyzéseket olvasásra és módosításra, újat lehet felvenni, és törölni mindet.
* 
* @param list - az átvett lista amit meg kell jeleníteni és módosításokat végezni rajta.
* @param onAddNewEntry - Az új elem hozzáadásakor meghívandó callback fv.
* @param onClearList - Az elemek törlésekor meghívandó callback fv.
* @param onOpenEntry - Egy bejegyzés megnyitásakor meghívandó callback fv.
* 
* 
* @returns Az elkészített HTML.
*/
export function JournalList({list, onAddNewEntry, onOpenEntry, onClearList}: journalListProps)
{
    const inputRef = useRef<HTMLInputElement>(null);

    const AddNewEntry = () => {
        const value = inputRef.current.value;
        onAddNewEntry(value);
    }

    return <div class="JournalListContainer">
        <div class="TableContainer">
            <table class="ListTable">
                <tbody>
                {list.map((entry, index) => (
                    <tr key={index} onClick={() => onOpenEntry(index)}>
                        <td>
                            {entry.date.toLocaleDateString()}
                            <span style={{ marginLeft: "10px", marginRight: "15px" }}>:</span>
                            <b>{entry.title}</b>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        <div class="InputContainer">
            <input type="text" id="title" class="TitleInput" ref={inputRef} value="Cím"/>
            <button onClick={AddNewEntry}>Új bejegyés</button>
        </div>
        <button onClick={onClearList}>Bejegyzések törlése</button>
    </div>
}