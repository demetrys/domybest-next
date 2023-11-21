import { TextField } from 'components';

type GridInReviewProps = {
  hidden: boolean;
  answer: null | string;
};

const GridInReview = ({ hidden, answer }: GridInReviewProps) => (
  <TextField value={hidden ? '' : answer || ''} variant='gridin' isReadOnly />
);

export default GridInReview;
