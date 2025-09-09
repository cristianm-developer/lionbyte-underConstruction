import style from './iconComponent.module.scss';

export type IconName = 'linkedin' | 'github' | 'email' | 'whatsapp' | 'copy' | 'close';


export const IconComponent = ({icon}: {icon: IconName}) => {

    return <i className={`${style.mainComponent}`} style={{ "--icon": `url('/icons/${icon}.svg')` } as React.CSSProperties}></i>

}