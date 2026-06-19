const textInput = document.getElementById('textInput');
const countbtn = document.getElementById('countbtn');
const totalword = document.getElementById('total-word');
const totalchar = document.getElementById('total-char');
const totalSentence = document.getElementById('total-sentence');
const readTime = document.getElementById('reading-time');
const reverse = document.getElementById('reverse');

countbtn.addEventListener('click', () => {
    const text = textInput.value;

    //1. character count
    totalchar.textContent = text.length;

    //2. words count
    const words = text.trim().split(/\s+/);//remove (space, tab, newline)
    const wordCount = text.trim() === '' ? 0 : words.length;
    totalword.textContent = wordCount;

    //3. Sentence count
    const sentence = 
    text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0 );
    totalSentence.textContent = sentence.length;

    //4. Reading Timing
    const wordsperminutes = 200;
    const minutes = wordCount / wordsperminutes;
    if(wordCount === 0){
        readTime.textContent = '0m';
    }
    else if(minutes < 1){
        readTime.textContent = '<1m';
    }
    else{
        readTime.textContent = `${Math.ceil(minutes)}m`;
    }

    //5. Reverse
    const reversewords = text.split('').reverse().join('');
    reverse.value = reversewords;

//6. Frequently used words
if (wordCount === 0) {
    document.getElementById('top-word').textContent = '-';
} else {
    const wordMap = {};
    words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanWord) {
            wordMap[cleanWord] = (wordMap[cleanWord] || 0) + 1;
        }
    });
    let maxWord = '-';
    let maxCount = 0;
    for (const word in wordMap) {
        if (wordMap[word] > maxCount) {
            maxCount = wordMap[word];
            maxWord = `${word} - ${maxCount}`;
        }
    }
    document.getElementById('top-word').textContent = maxWord;
}
});

const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', async () => {
    if(!reverse.value){
        return;
    }
    await navigator.clipboard.writeText(reverse.value);
    const originalText = copyBtn.innerHTML;
    copyBtn.textContent = "✓";
    setTimeout(() => copyBtn.innerHTML = originalText, 2000);
});

const clearbtn = document.getElementById('clearbtn');
clearbtn.addEventListener('click', () => {
    textInput.value = ''; 
    reverse.value = '';  
    totalword.textContent = '0';
    totalSentence.textContent = '0';
    totalchar.textContent = '0';
    readTime.textContent = '0';
    const topWordEl = document.getElementById('top-word');
    if (topWordEl) {
        topWordEl.textContent = '-';
    }
    copyBtn.innerHTML = `
        <div class="outer-card"></div>
        <div class="card"></div>
    `;
});