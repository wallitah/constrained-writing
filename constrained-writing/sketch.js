function setup() {
  noCanvas();

  let inputNew = select('#userText');
  let button = select('#processText');
  let output = select('#outputText');

  button.mousePressed(() => {
    let newText = inputNew.value();
    let processedText = processText(newText);
    output.html(processedText);
  });
}

// process the text based on the rules

function processText(newText) {
  let punctuationReplaced = '';
  let punctuation = ['?', '!'];
  let punctIndex = 0;

  for (let char of newText) {
    if (char === '.' || char === ',') {
      punctuationReplaced += punctuation[punctIndex];
      punctIndex = 1 - punctIndex;
    } else {
      punctuationReplaced += char;
    }
  }

  // Step 2: Split into sentences, alternating a: and b:
  let sentences = punctuationReplaced.split(/(?<=[?!])/); // Split at punctuation marks
  let labeledSentences = sentences.map((sentence, index) => {
    if (sentence.trim() === '') return ''; // Skip empty results
    return (index % 2 === 0 ? 'a: ' : 'b: ') + sentence.trim();
  });

  // Join the labeled sentences into new lines
  return labeledSentences.join('\n');
}
