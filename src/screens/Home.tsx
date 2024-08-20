import { HStack, VStack} from '@gluestack-ui/themed'
import { useState } from 'react'

import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas')

  return (
    <VStack flex={1}>
      <HomeHeader/>

      <Group
          name="Costas"
          isActive={groupSelected === 'costas'}
          onPress={() => setGroupSelected('costas')}
        />

        <Group
        name="Ombro"
        isActive={groupSelected === "ombro"}
        onPress={()=> setGroupSelected("ombro")}
        />

    </VStack>
  )
}