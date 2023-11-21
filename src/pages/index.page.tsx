import { ReactElement } from 'react';

import { AuthLayout } from 'components';
import Login from './login';

// Use Homepage as Login
const Homepage = () => <Login />;

export default Homepage;

Homepage.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;
