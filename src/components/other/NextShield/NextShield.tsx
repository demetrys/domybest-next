import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
  NextShield as NextShieldComponent,
  NextShieldProps
} from 'next-shield';

import { useAppSelector } from 'store/hooks';

import { Roles } from 'constants/roles';
import {
  ADMIN_ROUTES,
  HYBRID_ROUTES,
  LEARNER_ROUTES,
  PRIVATE_ROUTES,
  PROCTOR_ROUTES,
  PUBLIC_ROUTES,
  ROUTES
} from 'constants/routes';

type NextShieldType = {
  children: ReactNode;
};

const NextShield = ({ children }: NextShieldType) => {
  const router = useRouter();

  const {
    isAuthorized,
    user: { role },
    masqueradeUser: { role: masqueradeRole }
  } = useAppSelector((state) => state.persistAuth);

  const currentRole = masqueradeRole || role;

  const shieldConfig: NextShieldProps<
    typeof PRIVATE_ROUTES,
    typeof PUBLIC_ROUTES
  > = {
    router,
    isAuth: isAuthorized,
    isLoading: false,
    LoadingComponent: null,
    privateRoutes: PRIVATE_ROUTES,
    publicRoutes: PUBLIC_ROUTES,
    hybridRoutes: HYBRID_ROUTES,
    loginRoute: ROUTES.login,
    RBAC: {
      [Roles.Admin]: {
        grantedRoutes: ADMIN_ROUTES,
        accessRoute: ROUTES.users
      },
      [Roles.Teacher]: {
        grantedRoutes: [],
        accessRoute: ROUTES.dashboard
      },
      [Roles.Proctor]: {
        grantedRoutes: PROCTOR_ROUTES,
        accessRoute: ROUTES.dashboard
      },
      [Roles.Learner]: {
        grantedRoutes: LEARNER_ROUTES,
        accessRoute: ROUTES.dashboard
      }
    },
    userRole: currentRole?.toString() || ''
  };

  return (
    <NextShieldComponent {...shieldConfig}>{children}</NextShieldComponent>
  );
};
export default NextShield;
