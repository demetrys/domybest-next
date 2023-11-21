// Layout components
export { AuthLayout, ExamLayout, MainLayout } from './layout';

// UI components
export {
  AppLoader,
  Breadcrumbs,
  Dialog,
  Image,
  Link,
  Loader,
  Menu,
  Pagination,
  Progress,
  Select,
  SwiperNavButton,
  Table,
  TextField,
  Textarea,
  FileInput
} from './ui';

// Shared components related to Tests
export {
  QuestionsOverview,
  TestIcon,
  TestLabel,
  TestsAccordion,
  TestsFallback
} from './test';

// Shared components related to Tables
export {
  AnswerCell,
  CorrectAnswerCell,
  SortHeaderCell,
  UnusedTimeLabelCell
} from './table';

// Shared components related to Exam
export {
  AnnotationWrapper,
  Countdown,
  DesmosCalculator,
  DraggableDialog,
  ReferenceSheet,
  Stopwatch,
  GridInPassage,
  BorderDashed,
  ExpandButton,
  TitleBadge,
  NavigationItem,
  Directions
} from './exam';

// Shared components that are not related to any entity
export {
  CompletedTest,
  FullWidthBg,
  HeroBanner,
  TestBanner,
  InPersonTest,
  MathDirectionTable,
  MathDirection,
  RWDirection
} from './shared';

// Global Dialogs (modals)
export { GlobalDialogs } from './dialogs';

// Other components that are not shared and not related to any entity
export { NextShield, Notifier } from './other';

export {
  DemoBanner,
  DemoFooter,
  DemoBody,
  DemoTooltip,
  DemoTestsContent,
  DemoDirections
} from './demo';
