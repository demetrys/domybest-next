import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getReviewQuestion } from 'store/actions/exam';

import { getStorage, removeStorage } from 'utils/storage';

import { ExamLayout } from 'components';
import {
  ExamReviewContent,
  ExamReviewFooter,
  ExamReviewHeader
} from './components';

const QuestionReviewPage = () => {
  const dispatch = useAppDispatch();
  const { section_title, module_nr, section_nr, id } = useAppSelector(
    (state) => state.reviewExam.question
  );
  const router = useRouter();
  const [hidden, setHidden] = useState<boolean>(false);

  const liveTestId = router.query.tid?.toString() || '';

  useEffect(() => {
    if (liveTestId && !id) {
      // Get the review question after page reload
      const position = getStorage('reviewPosition');
      const path = position || 'reading_and_writing:1:1';
      dispatch(
        getReviewQuestion(liveTestId, {
          current_path: path,
          to: { path }
        })
      );
    }
  }, [dispatch, id, liveTestId]);

  // Clear the review position from storage on component unmount
  useEffect(
    () => () => {
      removeStorage('reviewPosition');
    },
    []
  );

  const title = `Section ${section_nr}, Module ${module_nr}: ${section_title}`;

  const onToggle = () => {
    setHidden((prevState) => !prevState);
  };

  if (!liveTestId || !id) {
    // There is Global loader in action, so no need to add Loader here.
    return null;
  }

  return (
    <>
      <ExamReviewHeader id={liveTestId} title={title} sectionNr={section_nr} />
      <ExamReviewContent hidden={hidden} />
      <ExamReviewFooter
        id={liveTestId}
        hidden={hidden}
        onHideToggle={onToggle}
      />
    </>
  );
};

export default QuestionReviewPage;

QuestionReviewPage.getLayout = (page: ReactElement) => (
  <ExamLayout>{page}</ExamLayout>
);
