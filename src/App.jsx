import "./App.css";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import { useEffect, useState } from "react";

const initialStates = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  const [states, setStates] = useState(() => {
    const localStates = localStorage.getItem(`saveStates`);
    return localStates ? JSON.parse(localStates) : initialStates;
  });

  useEffect(() => {
    localStorage.setItem(`saveStates`, JSON.stringify(states));
  }, [states]);

  const updateFeedback = (feedbackType) => {
    setStates({ ...states, [feedbackType]: states[feedbackType] + 1 });
  };

  const resetFeedback = () => {
    setStates(initialStates);
  };

  const totalFeedback = states.good + states.neutral + states.bad;
  const positiveFeedback = Math.round(
    ((states.good + states.neutral) / totalFeedback) * 100
  );

  return (
    <>
      <Description />
      <Options
        options={[`Good`, `Neutral`, `Bad`]}
        onFeedbackBtnClick={updateFeedback}
        onResetBtnClick={resetFeedback}
        isResetBtnVisible={totalFeedback > 0}
      />
      {totalFeedback ? (
        <Feedback
          good={states.good}
          neutral={states.neutral}
          bad={states.bad}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
