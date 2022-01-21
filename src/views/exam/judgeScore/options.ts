const initQuesForm = () => {
  return {
    id: 0,
    examId: 0,
    quesId: 0,
    grade: 0,
    userAnswer: "",
    userAnswerJson: [],
    questionNum: 0,
    examQuestionVO: {
      id: 0,
      title: "",
      type: "",
      optionsJson: [],
      answer: "",
      fillCount: 0,
    },
  };
};
export { initQuesForm };
