import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {Animated, Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle} from 'react-native';
import {colors, radius, shadow} from '../constants/theme';

export function Screen({children,scroll = true,style}:{children:React.ReactNode;scroll?:boolean;style?:StyleProp<ViewStyle>}) {
  const content = scroll ? <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={[styles.screenContent,style]}>{children}</ScrollView> : <View style={[styles.screenContent,styles.flex,style]}>{children}</View>;
  return <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>{content}</KeyboardAvoidingView>;
}
export function FadeIn({children,delay = 0,style}:{children:React.ReactNode;delay?:number;style?:StyleProp<ViewStyle>}) {
  const opacity = useRef(new Animated.Value(0)).current; const y = useRef(new Animated.Value(16)).current;
  useEffect(()=>{Animated.parallel([Animated.timing(opacity,{toValue:1,duration:420,delay,useNativeDriver:true}),Animated.spring(y,{toValue:0,delay,damping:14,useNativeDriver:true})]).start();},[delay,opacity,y]);
  return <Animated.View style={[style,{opacity,transform:[{translateY:y}]}]}>{children}</Animated.View>;
}
export function Header({eyebrow,title,right,onBack}:{eyebrow?:string;title:string;right?:React.ReactNode;onBack?:()=>void}) {
  return <View style={styles.header}>{onBack && <Pressable style={styles.back} onPress={onBack}><Text style={styles.backText}>‹</Text></Pressable>}<View style={styles.headerTitle}>{eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}<Text style={styles.title} numberOfLines={1}>{title}</Text></View>{right}</View>;
}
export function Button({title,onPress,variant = 'primary',disabled = false}:{title:string;onPress?:()=>void;variant?:'primary'|'secondary'|'danger'|'green';disabled?:boolean}) {
  return <Pressable disabled={disabled} onPress={onPress} style={({pressed})=>[styles.button,styles[`button_${variant}`],pressed && {opacity:0.78},disabled && {opacity:0.45}]}><Text style={[styles.buttonText,variant === 'secondary' && {color:colors.text}]}>{title}</Text></Pressable>;
}
export function Card({children,style}:{children:React.ReactNode;style?:StyleProp<ViewStyle>}) {return <View style={[styles.card,style]}>{children}</View>;}
export function Chip({label,active,onPress}:{label:string;active?:boolean;onPress?:()=>void}) {return <Pressable onPress={onPress} style={[styles.chip,active && styles.chipActive]}><Text style={[styles.chipText,active && styles.chipTextActive]}>{label}</Text></Pressable>;}
export function Field(props:TextInputProps) {return <TextInput placeholderTextColor="#69879A" {...props} style={[styles.input,props.multiline && styles.multiline,props.style]}/>;}
export function Label({children}:PropsWithChildren) {return <Text style={styles.label}>{children}</Text>;}
export function Empty({icon,title,text,action}:{icon:string;title:string;text:string;action?:React.ReactNode}) {return <View style={styles.empty}><Text style={styles.emptyIcon}>{icon}</Text><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyText}>{text}</Text>{action}</View>;}

const styles = StyleSheet.create({
  flex:{flex:1}, screen:{flex:1,backgroundColor:colors.background},screenContent:{paddingHorizontal:Math.max(16,Dimensions.get('window').width * 0.045),paddingTop:Platform.OS === 'ios' ? 54 : 28,paddingBottom:110},
  header:{minHeight:56,flexDirection:'row',alignItems:'center',gap:12,marginBottom:18},headerTitle:{flex:1},eyebrow:{color:colors.muted,fontSize:12,marginBottom:2},title:{color:colors.text,fontSize:25,fontWeight:'800'},back:{width:42,height:42,borderRadius:13,backgroundColor:colors.surface,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:colors.border},backText:{color:colors.text,fontSize:34,lineHeight:36,fontWeight:'300'},
  button:{minHeight:50,paddingHorizontal:18,borderRadius:radius.md,alignItems:'center',justifyContent:'center'},button_primary:{backgroundColor:colors.orange,...shadow},button_secondary:{backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border},button_danger:{backgroundColor:colors.red},button_green:{backgroundColor:colors.green},buttonText:{color:'#071018',fontWeight:'800',fontSize:15},
  card:{backgroundColor:colors.surface,borderRadius:radius.md,borderWidth:1,borderColor:colors.border,padding:16},chip:{paddingVertical:8,paddingHorizontal:13,borderRadius:radius.sm,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border},chipActive:{backgroundColor:colors.blue,borderColor:colors.blue},chipText:{color:colors.muted,fontWeight:'700',fontSize:12},chipTextActive:{color:'white'},input:{backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,borderRadius:radius.sm,minHeight:48,paddingHorizontal:14,color:colors.text,fontSize:15},multiline:{height:88,textAlignVertical:'top',paddingTop:13},label:{color:colors.muted,fontWeight:'700',fontSize:12,marginBottom:7,marginTop:14},
  empty:{flex:1,minHeight:420,alignItems:'center',justifyContent:'center',padding:30},emptyIcon:{fontSize:46,marginBottom:16},emptyTitle:{fontSize:19,fontWeight:'800',color:colors.text},emptyText:{color:colors.muted,textAlign:'center',lineHeight:20,marginVertical:9,maxWidth:290},emptyTitle2:{},
});
export const ui = styles;
