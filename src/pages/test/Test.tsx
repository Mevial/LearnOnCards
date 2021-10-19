import React, {useState} from "react";
import s from './Test.module.scss'
import {Button} from "../../common/components/button/Button";
import {InputText} from "../../common/components/inputText/InputText";
import {Checkbox} from "../../common/components/checkbox/Checkbox";
import {EditableSpan} from "../../common/components/editableSpan/EditableSpan";
import {Select} from "../../common/components/select/Select";
import {Radio} from "../../common/components/radioButton/Radio";
import {Range} from "../../common/components/range/Range";

export const Test: React.FC = () => {
    const [textSpan, setTextSpan] = useState<string>('Double click to edit')
    const [valueForRadio, setValueForRadio] = useState<string>('')

    return (
        <div className={s.page}>
            <div className={s.pageTitle}>Test page</div>

            <div className={s.testBox}>
                <div>
                    <InputText label={'Default input:'} className={s.input}/>
                    <InputText label={'Error input:'} error={'Some test error'} className={s.input}/>
                </div>

                <Button value={'Default button'} className={s.btn}/>
                <Button value={'Red button'} red className={s.btn}/>
                <Button value={'Disabled button'} disabled className={s.btn}/>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Checkbox>Default checkbox</Checkbox>
                    <Checkbox checked>Checked checkbox</Checkbox>
                    <Checkbox disabled>Disabled checkbox</Checkbox>
                </div>

                <EditableSpan value={textSpan} onChangeText={setTextSpan}/>

                <Select className={s.select} options={['Option 1', 'Option 2', 'Option 3']}/>

                <Radio
                    options={['Option 1', 'Option 2', 'Option 3']}
                    value={valueForRadio}
                    onChange={e => setValueForRadio(e.currentTarget.value)}/>

                <Range />
            </div>
        </div>
    )
}