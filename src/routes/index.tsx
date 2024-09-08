import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { useContext } from 'react';
import { useAuth } from '@hooks/useAuth';

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { Box } from '@gluestack-ui/themed'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  const { user } = useAuth();

  console.log("USUÁRIO LOGADO =>", user);

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}