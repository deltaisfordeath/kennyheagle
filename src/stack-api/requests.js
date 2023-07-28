import axios from 'axios';

export async function getQuestions(query) {
  try {
    let res = await axios.get(
      `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${encodeURIComponent(
        query
      )}&site=stackoverflow&filter=!nKzQUR3Ecy&client_id=22738&key=jKeOpVrIkULnfB0fQehUfQ((&redirect_uri=https://stackexchange.com/oauth/login_success`
    );
    return res.data.items;
  } catch (error) {
    console.error(error);
    alert(
      'An error has occurred retrieving your request. Please try again in a moment.'
    );
    return [];
  }
}

export async function getAnswers(answerList) {
  let answers = [];
  for (let a of answerList) {
    try {
      let res = await axios.get(
        `https://api.stackexchange.com/2.3/answers/${a.answer_id}?order=desc&sort=activity&site=stackoverflow&filter=!nKzQURF6Y5&client_id=22738&key=jKeOpVrIkULnfB0fQehUfQ((&redirect_uri=https://stackexchange.com/oauth/login_success`
      );
      answers.push(res.data.items[0]);
    } catch (error) {
      console.error(error);
      alert(
        'An error has occurred retrieving your request. Please try again in a moment.'
      );
      return [];
    }
  }
  return answers;
}
