import removeOverflow from "./hooks/removeOverflow"
import useClickOutside from "./hooks/clickOutside"
import {useConfirmationDialog} from "./stores/confirmationDialogStore"
import "./styles/confirmDialog.css"
const ConfirmationDialog = () => {
    const show = useConfirmationDialog(state => state.show)
    return <>
        {show && <ConfirmationDialogUi />}
    </>
}
const ConfirmationDialogUi = ({close}) => {
    removeOverflow()
    const {message,title,clearConfirm,action} = useConfirmationDialog()
    // ref become null if we dont use seperate compoentn for ui 
    const ref  = useClickOutside(clearConfirm)
    const handConfirm = () => {
        clearConfirm()
        action()
    }
    return <div className="confirm-dialog-card">
        <div ref={ref} className="confirm-dialog-card-content">
            <h3 className="confirm-dialog-card-title">{title}</h3>
            <p>{message}</p>
            <div className="confirm-dialoug-card-buttons">
                <button className="confirm-dialog-card-cancel" onClick={clearConfirm}>CANCEL</button>
                <button onClick={handConfirm} className="confirm-dialog-card-ok">CONFIRM</button>
            </div>
        </div>
    </div>
}
export default ConfirmationDialog