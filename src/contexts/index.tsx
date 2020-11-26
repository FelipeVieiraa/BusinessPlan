import React, { ReactNode } from 'react';

import AuthProvider from './auth';
import DataProvider from './data';

interface PropsProvider {
  children: ReactNode
}

export default function Provider({children}: PropsProvider) {
  return(
    <AuthProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </AuthProvider>
  );
}
