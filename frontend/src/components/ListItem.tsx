export function ListItem(props: {selected: string,value: string,callback: (value: string)=>void}) {
  return (
    <button onClick={()=>{props.callback(props.value)}} >
      {props.selected===props.value?">":""}
      {props.value}
    </button>
  );
}
