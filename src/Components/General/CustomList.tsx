import { useRef } from "preact/hooks";
import { numberEntry } from "../HomePage/HomePage";
import "./CustomList.less"

export type customListProps = {
    list: numberEntry[];
    onAddNewEntry: (num: number) => void;
    onClearList: () => void;
    isWeight: boolean;
}

/**
* A módosítható lista újrahasználható komponens megvalósítása
* 
* @param list - A lista amelyet meg kell jeleníteni és műveleteket végezni rajta.
* @param onAddNewEntry - Az új elem hozzáadásakor meghívandó callback fv.
* @param onClearList - Az elemek törlésekor meghívandó callback fv.
* @param isWeight - Egy boolean paraméter, csak azt mondja meg hogy kg, vagy kcal legyen a listában ábrázolva.
* 
* 
* @returns Az elkészített HTML.
*/
export function CustomList({list, onAddNewEntry, onClearList, isWeight}: customListProps)
{
    const inputRef = useRef<HTMLInputElement>(null);

    const AddNewEntry = () => {
        const value = inputRef.current ? parseInt(inputRef.current.value, 10) : 0;
        if(value > 99999) onAddNewEntry(99999);
        else if(value < 0) onAddNewEntry(0);
        else onAddNewEntry(value);
    }


    return <div class="ListContainer">
        <div class="TableContainer">
            <table class="ListTable">
                <tbody>
                {list.map((entry, index) => (
                    <tr key={index}>
                        <td>
                            {entry.date.toLocaleDateString()}
                            <span style={{ marginLeft: "10px", marginRight: "15px" }}>:</span>
                            {entry.number} {isWeight ? "kg" : "kcal"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        <div class="InputContainer">
            <input type="number" id="Num" class="NumberInput" ref={inputRef} min="0" max="99999" value="0"/>
            <button onClick={AddNewEntry} >Új elem</button>
        </div>
        <button onClick={onClearList} >Lista törlése</button>
    </div>
}