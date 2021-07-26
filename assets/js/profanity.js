import { profanityDict } from './profanityDict.js';

const getComment = () => 
{
    console.log("Getting the comment");
}

const splitComment = (comment) => 
{
    console.log('return array of words from sentence');
}

const validateWords = (arr) => 
{
    console.log('validate each word of array')
}

const validateComment = () => 
{
    let comment = getComment();
    let wordArr = splitComment(comment);

    return validateWords(wordArr);
}