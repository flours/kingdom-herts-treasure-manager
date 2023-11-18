import './App.css';
import { useState } from 'react';
import { MenuItem } from './components/MenuItem'
import { Menu } from './components/Menu'
import { TreasureList } from './components/TreasureList'
import { MapList } from './components/MapList'
import { AreaList } from './components/AreaList'
import { StatusHeader } from './components/StatusHeader'
import {addTreasure,addMap,addArea} from './api/utils'

function App() {
  const [ page , setPage ]=useState("MapList")
  const [ selectedMap , selectMap ]=useState("")
  const [ selectedArea , selectArea ]=useState("")

  return (
    <div className="App">
      <div className="map-header">
        <StatusHeader map={selectedMap} area={selectedArea} />
      </div>
      <div className="main-contents">
      { page==="TreasureList" && <TreasureList map={selectedMap} area={selectedArea} callback={async (map,area,num,item)=>{await addTreasure(map,area,num,item)}} />}
      { page==="MapList" && <MapList map={selectedMap} callbackAddMap={async (map: string,num_treasure: Number)=>{await addMap(map,num_treasure)}} callbackSelectMap={(v)=>{selectMap(v);selectArea("")}}/>}
      { page==="AreaList" && <AreaList map={selectedMap} area={selectedArea} callbackAddArea={async (v)=>{await addArea(selectedMap,v)}} callbackSelectArea={(v)=>{selectArea(v)}} />}
      </div>
      <Menu
       treasureMenu={ <MenuItem text="treasure" onClick={():void=>{setPage("TreasureList")}}/> }
       mapMenu={<MenuItem text="map" onClick={()=>{setPage("MapList")}}/>}
       areaMenu={<MenuItem text="area" onClick={()=>{setPage("AreaList")}}/>}
      />
    </div>
  );
}

export default App;
