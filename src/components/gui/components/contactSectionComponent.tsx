
import { MouseEvent } from 'react';
import style from './contactSectionComponent.module.scss';
import { IconComponent } from '@/components/icon/iconComponent';

export const ContactViewSection = ({ show, closeFunction }: { show?: boolean, closeFunction: (evt: MouseEvent) => void }) => {

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    const CopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        if(!isMobile)
            alert('Copied');
    }

    return <div className={`contactSection ${style.mainComponent} ${show == undefined ? '' : show ? 'show' : 'hide'}`} >
        <h2>Contact me</h2>
        <h3>Contact me now to request an early quotation and get incredible discounts when closing contracts during our pre-launch period!</h3>
        <button className="buttonClose" onClick={(evt) => closeFunction(evt)}>
            <IconComponent icon='close' />
        </button>

        <a href="mailto:contact@lionbyte-solutions.com">
            <IconComponent icon='email' />
            <span>Email me</span>
            <button className='copyButton' onClick={(e: MouseEvent) => { e.preventDefault(); CopyToClipboard('contact@lionbyte-solutions.com') }}>
                <IconComponent icon="copy" />
            </button>
        </a>


        <a href="https://wa.me/5541996403942" target='_blank' rel='noreferrer'>
            <IconComponent icon='whatsapp' />
            <span>WhatsApp</span>
            <button className='copyButton' onClick={(e: MouseEvent) => { e.preventDefault(); CopyToClipboard('5541996403942') }}>
                <IconComponent icon="copy" />
            </button>
        </a>


        <a href="https://www.linkedin.com/in/dev-cristian-marin/" target='_blank' rel='noreferrer'>
            <IconComponent icon='linkedin' />
            <span>Linkedin</span>
            <button className='copyButton' onClick={(e: MouseEvent) => { e.preventDefault(); CopyToClipboard('https://www.linkedin.com/in/dev-cristian-marin/') }}>
                <IconComponent icon="copy" />
            </button>
        </a>


        <a href="https://github.com/cristianm-developer" target='_blank' rel='noreferrer'>
            <IconComponent icon='github' />
            <span>Github</span>
            <button className='copyButton' onClick={(e: MouseEvent) => { e.preventDefault(); CopyToClipboard('https://github.com/cristianm-developer') }}>
                <IconComponent icon="copy" />
            </button>
        </a>

    </div>
}