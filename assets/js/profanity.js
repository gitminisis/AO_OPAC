

// Declare and contruct an empty set 
const profanityDict = new Set();

// Create local copy of arr from profanity.js
let arr = profanityArr;

// Initialize values of set profanityDict
for (let i = 0; i < arr.length; i++) 
    profanityDict.add(arr[i]);

const splitComment = (comment) => 
{
    let string = comment.replace(/[^a-zA-Z ]/g, "")
    console.log(string)
    return string.toLowerCase().split(' ');
}

const validateWords = (arr) => 
{

    for (let i = 0; i < arr.length; i++)
        if (profanityDict.has(arr[i])) return false;
    return true;
}

const validateComment = () => 
{
    let comment = document.getElementById('Crowd-Source-Comment');
    let wordArr = splitComment(comment.value);
    let valid = validateWords(wordArr);

    if (valid) 
    {
        toggleCrowdSubmit(valid);
        if (document.getElementById('Comment-Warning'))
            document.getElementById('Comment-Warning').remove();
    }
    else 
    {
        toggleCrowdSubmit(valid);
        warnCommenter(comment);
    }
}

const warnCommenter = (comment) => {
        if (document.getElementById('Comment-Warning')) return;

        let parent = comment.parentNode;
        let data = "Please, no vulgar comments.";
        let textNode = document.createTextNode(data);
        let p = document.createElement('p');
        p.appendChild(textNode);
        p.setAttribute('class', 'Color-Red');
        p.setAttribute('id', 'Comment-Warning');
        parent.appendChild(p)
}

const toggleCrowdSubmit = (bool) => {
    let csBtn = document.getElementById('cs-submit-btn');

    if (checkEmpty()) csBtn.disabled = true;


    if (bool) csBtn.disabled = !bool;
    else csBtn.disabled = !bool;
}

const checkEmpty = () => {
    let textValue = document.getElementById('Crowd-Source-Comment').value;
    if (textValue == '') return true;

    return false;
}