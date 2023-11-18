import "./TreasureList.css"
import { ReactComponent as Logo } from  "./PlusIcon.svg"
import { useEffect, useState } from 'react';
import {TreasureRow, getTreasures} from '../api/utils'
import { TreasureItem } from './TreasureItem'

export function TreasureList(props: {map: string,area: string,callback: (map: string,area: string,num: Number,itemname: string)=>Promise<void>}) {
  const [state,setState]=useState("List")
  const [treasureNum,setTreasureNum]=useState(-1)
  const [treasureItem,setTreasureItem]=useState("不明")
  const [treasureList,setTreasureList]=useState<TreasureRow[]>([])
  useEffect(()=>{
    const getInfo = async ()=> {
      setTreasureList((await getTreasures(props.map)).values)
      console.log(await getTreasures(props.map))
    }
    console.log("called")
    getInfo()
  },[state])
  return (
      <div className="map-main">
      { state==="List" && 
        <div className="treasure-list">
        <div className="plus-icon">
            <Logo onClick={()=>{
              if(props.area!=="" && props.map!==""){
              setState("Add")
            }
            else{
              alert("マップかエリアを選択していません")
            }
            }}  />
        </div>
        宝箱一覧
        <div className="treasures">
        {treasureList.map((v)=>(<TreasureItem item={v.item} num={parseInt(v.num)} map={v.map} area={v.area}/>))}
        </div>
        </div>
      }
      { state==="Add" && 
        <div className="treasure-add">
        <div className="plus-icon">
            <button onClick={async ()=>{await props.callback(props.map,props.area,treasureNum,treasureItem);setState("List");}}>
              宝箱追加
            </button>
        </div>
        何番目の宝箱か？
        <input type="text" onChange={(e)=>{setTreasureNum(parseInt(e.target.value))}}/>
        <br/>
        アイテムはなんでしたか
        <input type="text" onChange={(e)=>{setTreasureItem(e.target.value)}}/>
        </div>
      }
      </div>
  );
}
