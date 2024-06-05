import css from "./Options.module.css";

export default function Options({
  options,
  onFeedbackBtnClick,
  onResetBtnClick,
  isResetBtnVisible,
}) {
  return (
    <div className={css.options}>
      {options.map((option) => (
        <button
          className={css.button}
          onClick={() => onFeedbackBtnClick(option)}
          key={option}
        >
          {option}
        </button>
      ))}
      {isResetBtnVisible && (
        <button className={css.button} onClick={onResetBtnClick}>
          Reset
        </button>
      )}
    </div>
  );
}
