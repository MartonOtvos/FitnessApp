import { useState } from "preact/hooks"
import "./ConfirmDialog.less"

export type ConfirmDialogProps= {
    onConfirm: () => void;
    onDismiss: () => void;
}


export function ConfirmDialog( { onConfirm, onDismiss } : ConfirmDialogProps )
{


    return <div class="dialog-background" onClick={onDismiss}>
        <div class="dialog">
            <h2>Biztos benne?</h2>
            <h3>A törlés nem visszavonható</h3>
            <button onClick={onDismiss}>Nem</button>
            <button onClick={onConfirm}>Igen</button>
        </div>
    </div>
}