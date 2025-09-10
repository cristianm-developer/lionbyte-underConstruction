
import { MouseEvent, useState } from 'react';
import style from './guiComponent.module.scss';
import { ContactViewSection } from './components/contactSectionComponent';

export const GuiComponent = () => {

    const [showContactView, setShowContactView] = useState<boolean|undefined>(undefined);

    const handleOutsideClick = (evt: MouseEvent) => {
        if(evt.target !== evt.currentTarget) return;
        setShowContactView(false);
    }

    return <div className={style.mainComponent} onClick={handleOutsideClick}>
        <div className="buttons">
            <button className="button" onClick={() => setShowContactView(true)}>Contact</button>
        </div>
        <ContactViewSection closeFunction={handleOutsideClick} show={showContactView}/>
    </div>
}