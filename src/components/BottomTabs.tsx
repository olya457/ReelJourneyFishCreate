import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/theme';
import {useApp} from '../store/AppContext';
import {TabName} from '../types';
const tabs:{name:TabName;icon:string}[] = [{name:'Spots',icon:'⌂'},{name:'Map',icon:'⌖'},{name:'Sessions',icon:'◷'},{name:'Game',icon:'♠'},{name:'Draw',icon:'✎'}];
export function BottomTabs(){const {tab,setTab} = useApp(); return <View style={styles.wrap}>{tabs.map(item=>{const active = tab === item.name; return <Pressable key={item.name} style={styles.item} onPress={()=>setTab(item.name)}><Text style={[styles.icon,active && styles.active]}>{item.icon}</Text><Text style={[styles.label,active && styles.active]}>{item.name}</Text></Pressable>;})}</View>;}
const styles = StyleSheet.create({wrap:{position:'absolute',left:0,right:0,bottom:0,height:82,paddingBottom:18,flexDirection:'row',backgroundColor:'#091D2C',borderTopWidth:1,borderTopColor:colors.border},item:{flex:1,alignItems:'center',justifyContent:'center'},icon:{color:colors.muted,fontSize:21,fontWeight:'700'},label:{color:colors.muted,fontSize:10,fontWeight:'700',marginTop:3},active:{color:colors.orange}});
