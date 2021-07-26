import { profanityArr } from './profanityWords.js';

// Declare and contruct an empty set 
export const profanityDict = new Set();

// Create local copy of arr from profanity.js
let arr = profanityArr;

// Initialize values of set profanityDict
for (let i = 0; i < arr.length; i++) 
    profanityDict.add(arr[i]);

