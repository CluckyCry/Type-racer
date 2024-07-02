import Label from './Label'
import styles from './selection.module.css'

export default function({check, setCheck}){
    return (
        <div className={styles.selection}>
            <Label name="difficulty" id="easy" val="Easy" check={check} setCheck={setCheck}/>
            <Label name="difficulty" id="med" val="Medium" check={check} setCheck={setCheck}/>
            <Label name="difficulty" id="hard" val="Hard" check={check} setCheck={setCheck}/>
        </div>
    )
}