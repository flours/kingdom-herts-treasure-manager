 import "./TreasureItem.css"
 import {ReactComponent as TreasureChest} from './TreasureChest.svg'
 import {ReactComponent as Question} from './QuestionMark.svg'

export function TreasureItem(props: {num: Number,map: string,area: string,item: string}) {
  return (
      <div className="treasure-items">
      {props.item!=="????" && <TreasureChest onClick={()=>{window.confirm(`エリア：${props.area}、アイテム：${props.item}`)}} />}
      {props.item==="????" && <Question onClick={()=>{window.confirm(`番号：${props.num}`)}}/>}
      </div>
  );
}

