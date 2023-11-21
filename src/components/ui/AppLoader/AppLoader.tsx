import { useAppSelector } from 'store/hooks';

import { Loader } from '../Loader';

const AppLoader = () => {
  const { isLoading } = useAppSelector((state) => state.loader);

  if (isLoading) {
    return <Loader fixed />;
  }

  return null;
};

export default AppLoader;
