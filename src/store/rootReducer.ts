import { Action, combineReducers, Reducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Admin data reducers
import structuresReducer, {
  StructuresStore
} from './reducers/admin/structures';
import testsReducer, { TestsStore } from './reducers/admin/tests';
import usersReducer, { UsersStore } from './reducers/admin/users';
// Other reducers
import appLoaderReducer, { AppLoaderStore } from './reducers/appLoader';
import completedTestsReducer, {
  CompletedTestsStore
} from './reducers/completedTests';
import demoReducer, { DemoStore } from './reducers/demo';
import examReducer, { ExamStore } from './reducers/exam';
import inPersonTestsReducer, {
  InPersonTestsStore
} from './reducers/inPersonTests';
import modalReducer, { ModalStore } from './reducers/modal';
import notificationReducer, {
  NotificationStore
} from './reducers/notification';
import onDemandTestsReducer, {
  OnDemandTestsStore
} from './reducers/onDemandTests';
import persistAnnotationReducer, {
  AnnotationStore
} from './reducers/persistAnnotation';
import persistAuthReducer, { AuthStore, logout } from './reducers/persistAuth';
import crossOutsReducer, { CrossOutsStore } from './reducers/persistCrossOuts';
import learnersReducer, { LearnersStore } from './reducers/proctor/learners';
import reviewExamReducer, { ReviewExamStore } from './reducers/reviewExam';
import selfReducer, { SelfStore } from './reducers/self';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['persistAuth']
};

const annotationPersistConfig = {
  key: 'annotation',
  storage
};

const crossOutsPersistConfig = {
  key: 'crossOuts',
  storage
};

type RootState = {
  persistAuth: AuthStore;
  self: SelfStore;
  onDemandTests: OnDemandTestsStore;
  completedTests: CompletedTestsStore;
  inPersonTests: InPersonTestsStore;
  modal: ModalStore;
  examTest: ExamStore;
  loader: AppLoaderStore;
  persistAnnotation: AnnotationStore & {
    _persist: {
      version: number;
      rehydrated: boolean;
    };
  };
  persistCrossOuts: CrossOutsStore & {
    _persist: {
      version: number;
      rehydrated: boolean;
    };
  };
  demo: DemoStore;
  notification: NotificationStore;
  reviewExam: ReviewExamStore;
  // Admin data
  tests: TestsStore;
  users: UsersStore;
  structures: StructuresStore;
  // Proctor data
  learners: LearnersStore;
};

const combinedReducer: Reducer<RootState, Action> = combineReducers<RootState>({
  persistAuth: persistAuthReducer,
  self: selfReducer,
  onDemandTests: onDemandTestsReducer,
  completedTests: completedTestsReducer,
  inPersonTests: inPersonTestsReducer,
  modal: modalReducer,
  examTest: examReducer,
  loader: appLoaderReducer,
  persistAnnotation: persistReducer(
    annotationPersistConfig,
    persistAnnotationReducer
  ),
  persistCrossOuts: persistReducer(crossOutsPersistConfig, crossOutsReducer),
  demo: demoReducer,
  notification: notificationReducer,
  reviewExam: reviewExamReducer,
  // Admin slices
  tests: testsReducer,
  users: usersReducer,
  structures: structuresReducer,
  // Proctor data
  learners: learnersReducer
});

// Clear local storage if user finishes session.
// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
const rootReducer: Reducer<RootState, Action> = (
  state: RootState | undefined,
  action: Action
) => {
  const isUserLogOutActionType = logout.match(action);
  if (isUserLogOutActionType) {
    storage.removeItem('persist:auth');
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export default persistedReducer;
