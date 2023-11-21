import { DemandTestSubType } from 'types/global';

type IconTypeProps = {
  [key in DemandTestSubType]: {
    title: string;
    color: string;
  };
};

const ICON_TYPE_PROPERTIES: IconTypeProps = {
  act: {
    title: 'ACT',
    color: 'red.500'
  },
  sat: {
    title: 'SAT',
    color: '#009ADA'
  }
};

export default ICON_TYPE_PROPERTIES;
