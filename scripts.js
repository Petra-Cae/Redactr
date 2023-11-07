document.addEventListener('DOMContentLoaded', function () {
  const originalText = document.getElementById('originalText');
  const wordsToRedact = document.getElementById('wordsToRedact');
  const replacementText = document.getElementById('replacementText');
  const redactButton = document.getElementById('redactButton');
  const redactedText = document.getElementById('redactedText');
  const stats = document.getElementById('stats');

  redactButton.addEventListener('click', function () {
    const startTime = performance.now();

    const originalContent = originalText.value;
    const words = wordsToRedact.value.trim().split(' ');
    const replacement = replacementText.value;

    let redactedContent = originalContent;
    let wordsScanned = 0;
    let wordsRedacted = 0;
    let charactersRedacted = 0;

    words.forEach(word => {
      if (word !== '') {
        const regex = new RegExp(word, 'gi');
        redactedContent = redactedContent.replace(regex, match => {
          wordsScanned++;
          if (match.length === word.length) {
            wordsRedacted++;
            charactersRedacted += match.length;
            return replacement;
          } else {
            return match;
          }
        });
      }
    });

    const endTime = performance.now();
    const timeElapsed = ((endTime - startTime) / 1000).toFixed(2); // in seconds

    redactedText.textContent = redactedContent;

    const statistics = `Words Scanned: ${wordsScanned}, Words Redacted: ${wordsRedacted}, Characters Redacted: ${charactersRedacted}, Time Elapsed: ${timeElapsed} seconds`;
    stats.textContent = statistics;
  });
});
