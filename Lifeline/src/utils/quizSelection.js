// Shuffles an array using Fisher-Yates method.
function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
}

// Picks the questions for a round.
// Will prioritize questions in the wrong category first, followed by unseen, and then the rest.
export function pickQuestions(pool, questionStats, count) {
  const wrong = [];
  const unseen = [];
  const rest = [];

  for (let i = 0; i < pool.length; i++) {
    const question = pool[i];
    const stat = questionStats[question.id];

    if (!stat) {
      unseen.push(question);
    } else if (stat.wrong > stat.correct) {
      wrong.push(question);
    } else {
      rest.push(question);
    }
  }

  const ordered = shuffle(wrong).concat(shuffle(unseen), shuffle(rest));
  return ordered.slice(0, count);
}

// Shuffles the answer options and finds where the correct answer ended up.
export function shuffleOptions(question) {
  const correctText = question.options[question.answer];
  const options = shuffle(question.options);
  const answer = options.indexOf(correctText);

  return { options, answer };
}
