import "./MapList.css"
import { ReactComponent as Logo } from  "./PlusIcon.svg"
import { useEffect, useState } from 'react';
import {getMaps} from '../api/utils'
import {ListItem} from './ListItem'

export function MapList(props: {map: string,callbackAddMap: (map: string,num_treasure: Number)=>Promise<void>,callbackSelectMap: (map: string)=>void}) {
  const [state,setState]=useState("List")
  const [mapName,setMapName] = useState("")
  const [maps,setMaps] = useState([{"map":"map一覧"}])
  const [numTreasure,setNumTreasure] = useState(0)
  useEffect(()=>{
    const getInfo = async ()=> {
      setMaps((await getMaps()).values)
    }
    console.log("render")
    getInfo()
  },[state])

  return (
      <div className="map-main">
      { state==="List" && 
        <div className="map-list">
        <div className="plus-icon">
            <Logo onClick={()=>{setState("Add")}}  />
        </div>
        マップ一覧
        <div className="maps">
        {maps.map((v)=>(<ListItem key={v.map} selected={mapName} value={v.map} callback={(v: string)=>{props.callbackSelectMap(v)}}/>))}
        </div>
        </div>
      }
      { state==="Add" && 
        <div className="map-add">
        <div className="plus-icon">
            <button onClick={async ()=>{await props.callbackAddMap(mapName,numTreasure);
              props.callbackSelectMap(mapName);
              setState("List");}}>
              マップ追加
            </button>
        </div>
        マップ名:
        <input type="text" onChange={(e)=>{setMapName(e.target.value)}}/>
        <br/>
        宝箱数:
        <input type="text" onChange={(e)=>{setNumTreasure(parseInt(e.target.value))}}/>
        </div>
      }
      </div>
  );
}

