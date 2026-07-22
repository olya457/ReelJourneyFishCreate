import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{createContext,PropsWithChildren,useContext,useEffect,useMemo,useRef,useState} from 'react';
import {spots as initialSpots} from '../data/content';
import {Artwork,ScreenName,Session,Spot,TabName} from '../types';
type Route={name:ScreenName;params?:Record<string,unknown>};
type PersistedState={onboarded:boolean;tab:TabName;spots:Spot[];sessions:Session[];artworks:Artwork[]};
type AppState={hydrated:boolean;onboarded:boolean;setOnboarded(v:boolean):void;tab:TabName;setTab(v:TabName):void;route:Route;navigate(name:ScreenName,params?:Record<string,unknown>):void;back():void;spots:Spot[];toggleSaved(id:string):void;addSpot(spot:Spot):void;sessions:Session[];addSession(session:Session):void;artworks:Artwork[];addArtwork(artwork:Artwork):void;deleteArtwork(id:string):void};
const STORAGE_KEY = '@reel_journey/app_state_v1';
const Context = createContext<AppState|null>(null);
export function AppProvider({children}:PropsWithChildren){
  const [hydrated,setHydrated] = useState(false); const [onboarded,setOnboarded] = useState(false); const [tab,setTab] = useState<TabName>('Spots'); const [stack,setStack] = useState<Route[]>([{name:'Home'}]); const [spots,setSpots] = useState(initialSpots); const [sessions,setSessions] = useState<Session[]>([]); const [artworks,setArtworks] = useState<Artwork[]>([]); const saveTimer = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  useEffect(()=>{let active = true; AsyncStorage.getItem(STORAGE_KEY).then(value=>{if(!active || !value){return;}const saved = JSON.parse(value) as Partial<PersistedState>; if(typeof saved.onboarded === 'boolean'){setOnboarded(saved.onboarded);}if(saved.tab){setTab(saved.tab);}if(Array.isArray(saved.spots)){setSpots(saved.spots);}if(Array.isArray(saved.sessions)){setSessions(saved.sessions);}if(Array.isArray(saved.artworks)){setArtworks(saved.artworks);}}).catch(()=>{}).finally(()=>{if(active){setHydrated(true);}}); return()=>{active = false;};},[]);
  useEffect(()=>{if(!hydrated){return;}clearTimeout(saveTimer.current); saveTimer.current = setTimeout(()=>{const state:PersistedState = {onboarded,tab,spots,sessions,artworks}; AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(state)).catch(()=>{});},180); return()=>clearTimeout(saveTimer.current);},[hydrated,onboarded,tab,spots,sessions,artworks]);
  const route = stack[stack.length - 1];
  const value = useMemo<AppState>(()=>({hydrated,onboarded,setOnboarded,tab,setTab,route,navigate:(name,params)=>setStack(current=>[...current,{name,params}]),back:()=>setStack(current=>current.length > 1 ? current.slice(0,-1) : current),spots,toggleSaved:id=>setSpots(current=>current.map(item=>item.id === id ? {...item,saved:!item.saved} : item)),addSpot:spot=>setSpots(current=>[spot,...current]),sessions,addSession:session=>setSessions(current=>[session,...current]),artworks,addArtwork:artwork=>setArtworks(current=>[artwork,...current]),deleteArtwork:id=>setArtworks(current=>current.filter(item=>item.id !== id))}),[hydrated,onboarded,tab,route,spots,sessions,artworks]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useApp = ()=>{const value = useContext(Context); if(!value){throw new Error('useApp must be used inside AppProvider');}return value;};
