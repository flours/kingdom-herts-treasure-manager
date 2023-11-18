import "./AreaList.css"
import { ReactComponent as Logo } from  "./PlusIcon.svg"
import { useState,useEffect } from 'react';
import {getAreas,AreaRow} from '../api/utils'
import {ListItem} from './ListItem'

export function AreaList(props: {map: string,area: string,callbackAddArea: (area: string)=>Promise<void>,callbackSelectArea: (area: string)=>void}) {
  const [state,setState]=useState("List")
  const [areaName,setAreaName] = useState(props.area)
  const [areaNameList,setAreaNameList] = useState<AreaRow[]>([])

  useEffect(()=>{
    const getInfo = async ()=> {
      setAreaNameList((await getAreas(props.map)).values)
    }
    getInfo()
  },[state])
  return (
      <div className="area-main">
      { state==="List" && 
        <div className="area-list">
        <div className="plus-icon">
            <Logo onClick={()=>{
              if(props.map!==""){
              setState("Add")
            }
            else{
              alert("マップかエリアを選択していません")
            }
            }}  />
        </div>
        エリア一覧
        <div className="areas">
        {areaNameList.map((v)=>(<ListItem selected={areaName} key={v.area} value={v.area} callback={(v: string)=>{props.callbackSelectArea(v)}}/>))}
        </div>
        </div>
      }
      { state==="Add" && 
        <div className="area-add">
        <div className="plus-icon">
            <button onClick={async ()=>{
              await props.callbackAddArea(areaName);
              props.callbackSelectArea(areaName);
              setState("List");
            }
            }>
              エリア追加
            </button>
        </div>
        エリア名：
        <input type="text" onChange={(e)=>{setAreaName(e.target.value)}}/>
        </div>
      }
      </div>
  );
}


