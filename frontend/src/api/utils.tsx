import { Database } from 'sqlite3';
import axios from 'axios';



export interface TreasureRow {
  item: string;
  num: string;
  map: string;
  area: string;
}

interface TreasureJson {
  values: TreasureRow[];
}

export interface MapRow {
  map: string;
  num_treasures: Number;
}
interface MapJson {
  values: MapRow[];
}

export interface AreaRow {
  map: string;
  area: string;
}
interface AreaJson {
  values: AreaRow[];
}


export async function getMaps(): Promise<MapJson>{
  return (await axios.get<MapJson>(`/api/v1/maps`)).data
}

export async function addMap(map: string,num_treasures: Number){
  await axios.post(`/api/v1/maps`,{"map":map,"num_treasures":num_treasures})
  return true
}

export async function getAreas(map: string){
  return (await axios.get<AreaJson>(`/api/v1/areas?map=${map}`)).data
}
export async function addArea(map: string,area: string){
  await axios.post(`/api/v1/areas`,{"map":map,"area":area})
  return true
}


export async function getTreasures(map: string){
  return (await axios.get<TreasureJson>(`/api/v1/treasures?map=${map}`)).data
}

export async function addTreasure(map: string,area: string ,num: Number,item: string){
  await axios.post(`/api/v1/treasures`,{"map":map,"area":area,"num":num,"item":item})
  return true
}
