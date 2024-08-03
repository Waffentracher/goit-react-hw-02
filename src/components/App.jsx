import { useState, useEffect } from 'react';
import Feedback from './Feedback';
import Options from './Options';
import Notification from './Notification';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  // Зчитування даних з локального сховища під час першого завантаження компонента
  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedback');
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback)); // Перетворення рядка JSON на об'єкт
    }
  }, []);

  // Збереження даних у локальне сховище при кожній зміні стану feedback
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback)); // Перетворення об'єкта feedback на рядок JSON
  }, [feedback]);

  const updateFeedback = type => {
    setFeedback(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const relevantFeedback = feedback.good + feedback.bad; // Враховуємо тільки good і bad відгуки
  const positiveFeedbackPercentage = relevantFeedback ? Math.round((feedback.good / relevantFeedback) * 100) : 0;

  return (
    <div>
      <h1>Sip Happens Café</h1>
      <p>Please leave your feedback about our service by selecting one of the options below.</p>
      <div>
        <button onClick={() => updateFeedback('good')}>Good</button>
        <button onClick={() => updateFeedback('neutral')}>Neutral</button>
        <button onClick={() => updateFeedback('bad')}>Bad</button>
        {totalFeedback > 0 && <button onClick={resetFeedback}>Reset</button>}
      </div>
      {totalFeedback > 0 ? (
        <div>
          <h2>Statistics</h2>
          <p>Good: {feedback.good}</p>
          <p>Neutral: {feedback.neutral}</p>
          <p>Bad: {feedback.bad}</p>
          <p>Total: {totalFeedback}</p>
          <p>Positive feedback: {positiveFeedbackPercentage}%</p>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
