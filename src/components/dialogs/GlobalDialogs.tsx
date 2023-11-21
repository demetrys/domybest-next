import { useAppDispatch, useAppSelector } from 'store/hooks';
import { closeModals } from 'store/reducers/modal';

import { Dialog } from 'components/ui';
import {
  AttendanceValidation,
  DetectDevice,
  FinishExam,
  LearnerEdit,
  PauseTest,
  PerformTest,
  RestartExam,
  ResumeError,
  SaveExam,
  ScoreReportForm,
  StartTest
} from './components';

const GlobalDialogs = () => {
  const dispatch = useAppDispatch();
  const {
    modals: {
      device,
      report,
      perform,
      saveExam,
      finishExam,
      restartExam,
      resumeError,
      learnerEdit,
      pauseTest,
      startTest,
      attendance
    },
    perform: { type, id },
    step,
    inPersonTestActionData
  } = useAppSelector((state) => state.modal);

  const onClose = () => {
    dispatch(closeModals());
  };

  return (
    <>
      <Dialog
        isOpen={device}
        onClose={onClose}
        size='sm'
        title='This device may not be used to take a practice test.'
      >
        <DetectDevice onClose={onClose} />
      </Dialog>
      <Dialog
        isOpen={report}
        onClose={onClose}
        title='Share Score Report (PDF)'
      >
        <ScoreReportForm />
      </Dialog>
      <Dialog
        isOpen={perform}
        onClose={onClose}
        title={type === 'start' ? 'Start test' : 'Restart test?'}
      >
        <PerformTest type={type} examId={id} onClose={onClose} />
      </Dialog>
      <Dialog isOpen={saveExam} onClose={onClose} variant='examAction'>
        <SaveExam step={step} onClose={onClose} />
      </Dialog>
      <Dialog isOpen={finishExam} onClose={onClose} variant='examAction'>
        <FinishExam step={step} onClose={onClose} />
      </Dialog>
      <Dialog isOpen={restartExam} onClose={onClose} variant='examAction'>
        <RestartExam onClose={onClose} />
      </Dialog>
      <Dialog isOpen={resumeError} onClose={onClose} variant='examAction'>
        <ResumeError onClose={onClose} />
      </Dialog>
      <Dialog isOpen={learnerEdit} onClose={onClose} size='2xl'>
        <LearnerEdit />
      </Dialog>
      <Dialog isOpen={pauseTest} onClose={onClose}>
        <PauseTest {...inPersonTestActionData} onClose={onClose} />
      </Dialog>
      <Dialog isOpen={startTest} onClose={onClose}>
        <StartTest {...inPersonTestActionData} onClose={onClose} />
      </Dialog>
      <Dialog isOpen={attendance} onClose={onClose}>
        <AttendanceValidation />
      </Dialog>
    </>
  );
};

export default GlobalDialogs;
