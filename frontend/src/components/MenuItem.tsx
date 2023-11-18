import "./MenuItem.css"
export function MenuItem(props: {text: string,onClick: ()=>void}) {
  return (
      <button className="MenuButton" onClick={props.onClick}>
        {props.text}
      </button>
  );
}

