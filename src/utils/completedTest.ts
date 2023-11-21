import {
  CompletedSections,
  CompletedTestScores,
  CompletedTransformedQuestions
} from 'types/models';

export const getSectionScores = ({
  reading_and_writing,
  math: mathSection
}: CompletedSections): Omit<CompletedTestScores, 'total'> => ({
  rw: {
    min: reading_and_writing?.lower_grade || 0,
    max: reading_and_writing?.upper_grade || 0
  },
  math: {
    min: mathSection?.lower_grade || 0,
    max: mathSection?.upper_grade || 0
  }
});

export const getQuestions = ({
  reading_and_writing,
  math
}: CompletedSections): CompletedTransformedQuestions => {
  const questions: CompletedTransformedQuestions = {
    reading_and_writing: [],
    math: []
  };

  if (reading_and_writing) {
    const { id, modules, title } = reading_and_writing;

    modules.forEach(({ id: moduleId, questions: moduleQuestions }) => {
      moduleQuestions.forEach((question) => {
        questions.reading_and_writing.push({
          ...question,
          sectionTitle: title,
          sectionId: id,
          moduleId
        });
      });
    });
  }

  if (math) {
    const { id, modules, title } = math;

    modules.forEach(({ id: moduleId, questions: moduleQuestions }) => {
      moduleQuestions.forEach((question) => {
        questions.math.push({
          ...question,
          sectionTitle: title,
          sectionId: id,
          moduleId
        });
      });
    });
  }

  return questions;
};
