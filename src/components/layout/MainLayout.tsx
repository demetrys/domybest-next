import { ReactNode, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getSelfData } from 'store/actions/user';

import { Roles } from 'constants/roles';

import { Container, Footer, Header } from './components';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.persistAuth.user);
  const { role: masqueradeRole } = useAppSelector(
    (state) => state.persistAuth.masqueradeUser
  );
  const { self } = useAppSelector((state) => state.self);

  const currentRole = masqueradeRole || role;

  useEffect(() => {
    if (!self.username) {
      dispatch(getSelfData());
    }
  }, [dispatch, self.username]);

  return (
    <Container>
      <Header />
      <main>{children}</main>
      {currentRole !== Roles.Admin && <Footer />}
    </Container>
  );
};

export default MainLayout;
