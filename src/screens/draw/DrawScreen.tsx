import React,{useRef,useState} from 'react';
import {GestureResponderEvent,LayoutChangeEvent,PanResponder,StyleSheet,Text,View} from 'react-native';
import {Button,Header,Screen} from '../../components/UI';
import {drawPrompts} from '../../data/content';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';

type Dot={id:number;x:number;y:number;color:string;size:number};
const palette = ['#2D9DEC','#FF8618','#37C391','#EF6F80','#FFD05A','#B59AF2','#FFFFFF','#071724'];

export function DrawScreen(){
  const {navigate,addArtwork} = useApp();
  const [dots,setDots] = useState<Dot[]>([]);
  const [color,setColor] = useState(palette[0]);
  const colorRef = useRef(color);
  const pointId = useRef(0);
  const lastPoint = useRef<{x:number;y:number}|null>(null);
  const canvasSize = useRef({width:1,height:1});
  const prompt = drawPrompts[new Date().getDate() % drawPrompts.length];
  const chooseColor = (nextColor:string)=>{colorRef.current = nextColor; setColor(nextColor);};
  const addPoint = (event:GestureResponderEvent,force = false)=>{
    const nativeEvent = event.nativeEvent;
    if(!nativeEvent){return;}
    const x = nativeEvent.locationX; const y = nativeEvent.locationY;
    if(!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || y < 0){return;}
    const previous = lastPoint.current;
    if(!force && previous && Math.hypot(x - previous.x,y - previous.y) < 3){return;}
    lastPoint.current = {x,y};
    const dot:Dot = {id:pointId.current++,x,y,color:colorRef.current,size:8};
    setDots(current=>[...current,dot]);
  };
  const panResponder = useRef(PanResponder.create({onStartShouldSetPanResponder:()=>true,onMoveShouldSetPanResponder:()=>true,onPanResponderGrant:event=>{lastPoint.current = null; addPoint(event,true);},onPanResponderMove:event=>addPoint(event),onPanResponderRelease:()=>{lastPoint.current = null;},onPanResponderTerminate:()=>{lastPoint.current = null;}})).current;
  const clear = ()=>{lastPoint.current = null; setDots([]);};
  const measureCanvas = (event:LayoutChangeEvent)=>{canvasSize.current = {width:event.nativeEvent.layout.width,height:event.nativeEvent.layout.height};};
  const save = ()=>{if(!dots.length){return;}const {width,height} = canvasSize.current; addArtwork({id:`art-${Date.now()}`,title:`Fishing Art ${new Date().toLocaleDateString()}`,prompt,createdAt:new Date().toISOString(),points:dots.map(dot=>({x:dot.x / width,y:dot.y / height,color:dot.color,size:dot.size / Math.min(width,height)}))}); navigate('Gallery');};
  return <Screen scroll={false}>
    <Header eyebrow="Creative challenge" title="Draw & Create" right={<Text onPress={()=>navigate('Gallery')} style={styles.gallery}>Gallery</Text>}/>
    <View style={styles.prompt}><Text style={styles.promptTop}>🎨 TODAY'S PROMPT</Text><Text style={styles.promptTitle}>{prompt}</Text></View>
    <View style={styles.canvas} onLayout={measureCanvas} {...panResponder.panHandlers}>{dots.map(dot=><View key={dot.id} pointerEvents="none" style={[styles.dot,{left:dot.x - dot.size / 2,top:dot.y - dot.size / 2,width:dot.size,height:dot.size,borderRadius:dot.size / 2,backgroundColor:dot.color}]}/>)}</View>
    <View style={styles.palette}>{palette.map(item=><Text key={item} onPress={()=>chooseColor(item)} style={[styles.swatch,{backgroundColor:item},color === item && styles.selected]}/>)}</View>
    <View style={styles.actions}><View style={styles.flex}><Button title="Clear" variant="secondary" onPress={clear}/></View><View style={styles.flex}><Button title="Save" disabled={!dots.length} onPress={save}/></View></View>
  </Screen>;
}
const styles = StyleSheet.create({gallery:{color:colors.text,backgroundColor:colors.surface,padding:11,borderRadius:12,fontWeight:'700'},prompt:{padding:14,backgroundColor:'#103A57',borderWidth:1,borderColor:colors.blue,borderRadius:15},promptTop:{fontSize:10,color:colors.blue,fontWeight:'900'},promptTitle:{color:colors.text,fontWeight:'800',marginTop:4},canvas:{flex:1,minHeight:210,marginVertical:12,borderRadius:16,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,overflow:'hidden'},dot:{position:'absolute'},palette:{flexDirection:'row',gap:7},swatch:{width:23,height:23,borderRadius:12,borderWidth:1,borderColor:colors.muted},selected:{borderWidth:3,borderColor:'white'},actions:{flexDirection:'row',gap:9,marginTop:12},flex:{flex:1}});
