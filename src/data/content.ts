import {Spot} from '../types';

export const spots: Spot[] = [
  {id:'emerald', name:'Emerald Bay', region:'Lake Tahoe, CA', country:'USA', coordinates:[38.9545,-120.1003], about:'A sheltered mountain bay surrounded by pine-covered slopes, granite shoreline, and exceptionally clear blue water.', conditions:'Cold, clear, deep water. Winds may become stronger during the afternoon.', bestTime:'May–October, early morning', facilities:['Seasonal restrooms','Kayak access','Hiking trails','Shoreline access'], species:['Lake Trout','Rainbow Trout','Brown Trout','Kokanee Salmon'], rules:'Check current California fishing license requirements and Lake Tahoe catch regulations before visiting.', saved:true},
  {id:'minnewanka', name:'Lake Minnewanka', region:'Banff, Alberta', country:'Canada', coordinates:[51.248,-115.498], about:'A long mountain reservoir framed by steep forested slopes and the Canadian Rockies.', conditions:'Cold, deep water with rapidly changing mountain weather.', bestTime:'May–September, morning', facilities:['Parking','Marina','Boat launch','Restrooms'], species:['Lake Trout','Mountain Whitefish','Cutthroat Trout'], rules:'A Canadian national park fishing permit is required.'},
  {id:'jenny', name:'Jenny Lake', region:'Grand Teton, WY', country:'USA', coordinates:[43.7547,-110.7309], about:'A clear glacial lake located directly beneath the dramatic peaks of the Teton Range.', conditions:'Cold, clear mountain water with deep sections close to shore.', bestTime:'June–September, early morning', facilities:['Parking','Boat launch','Campground','Hiking trails'], species:['Lake Trout','Cutthroat Trout','Mountain Whitefish'], rules:'A valid Wyoming fishing license is required.'},
  {id:'bled', name:'Lake Bled', region:'Upper Carniola', country:'Slovenia', coordinates:[46.363,14.0938], about:'An Alpine lake surrounded by wooded hills, mountain views, and the famous island church.', conditions:'Generally calm water with deeper central sections.', bestTime:'April–October, early morning', facilities:['Parking','Boat access','Shoreline paths'], species:['Pike','Carp','Lake Trout','Perch'], rules:'A valid fishing permit is required.'},
];

export const fishingTips = [
  'Fish are often most active during the cooler hours just after sunrise and before sunset.',
  'Match the size and color of your lure to the natural prey found in the water.',
  'Cast near submerged rocks, fallen trees, reeds, and shaded banks where fish may hide.',
  'Check the wind direction before casting. Wind can push baitfish toward one side of the water.',
  'Keep your hooks sharp. A dull hook can turn a strong bite into a missed catch.',
];

export const drawPrompts = ['Draw your dream fishing spot at sunrise.','Draw the biggest fish you can imagine.','Create a funny fish wearing a hat.','Design your own colorful fishing lure.','Draw an underwater city built by fish.'];
export const honestQuestions = [
  'What is something you have never told anyone in this group?',
  'What was your first impression of the person sitting to your left?',
  'What is the most embarrassing thing you have done to impress someone?',
  'What is one habit you wish you could stop?',
  'Who in this group would you trust with an important secret?',
  'What is the biggest excuse you have used to avoid an event?',
  'What is something you pretend to understand but actually do not?',
  'What is the strangest thing you have searched for online?',
  'What is one decision you would change if you could?',
  'What is your most irrational fear?',
  'When was the last time you lied, and what was it about?',
  'What is something you are secretly proud of?',
  'Who in this group would survive longest in the wilderness?',
  'What is the worst gift you have ever received?',
  'What is one thing people often misunderstand about you?',
  'What is the most childish thing you still enjoy?',
  'Have you ever blamed someone else for something you did?',
  'What is one compliment you still remember?',
  'What is the longest you have pretended to like something?',
  'What is your funniest failed attempt at cooking?',
  'Who in this group would you call first in an emergency?',
  'What is one place you would never visit again?',
  'What is something you wish you were better at?',
  'Have you ever ignored someone’s message on purpose?',
  'What is the most awkward conversation you have had?',
  'What is one thing you would do if nobody could judge you?',
  'What is your guilty pleasure?',
  'What is the biggest risk you have ever taken?',
  'What is something you believed for far too long?',
  'Which person in this group knows you best?',
];
export const tasks = ['Perform your best impression of a fish being reeled in.','Tell a true story that sounds completely made up.','Create a short victory dance and perform it.','Pretend to present a weather forecast for today’s fishing trip.','Give every player one sincere compliment.'];
