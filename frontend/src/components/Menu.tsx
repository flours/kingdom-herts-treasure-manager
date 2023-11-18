import './Menu.css';
import {ReactElement} from 'react';
export function Menu(props: {treasureMenu: ReactElement<{text: string,onClick:()=>void }>,mapMenu:ReactElement<{text: string,onClick:()=>void}> ,areaMenu: ReactElement<{text: string,onClick:()=>void}>}) {
  return (
    <div className="Menu">
      <div className="MenuItem1">
        {props.treasureMenu}
      </div>
      <div className="MenuItem2">
        {props.mapMenu}
      </div>
      <div className="MenuItem3">
        {props.areaMenu}
      </div>
    </div>
  );
}
