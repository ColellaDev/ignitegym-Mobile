import { HStack, VStack, Heading, Text, useToast, Toast, ToastTitle} from '@gluestack-ui/themed'
import { useState, useEffect, useCallback } from 'react'
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect  } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/ExerciseCard'
import { Loading } from '@components/Loading';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState('antebraço');

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';
      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor='$red500' action="error" variant="outline">
            <ToastTitle  color="$white">{title}</ToastTitle>
          </Toast>
        ),
      });
    }
  }

  async function fecthExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios por grupo';
      toast.show({
        placement: "top",
        render: () => (
          <Toast backgroundColor='$red500' action="error" variant="outline">
            <ToastTitle  color="$white">{title}</ToastTitle>
          </Toast>
        ),
      });
    }  finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  },[])

  useFocusEffect(
    useCallback(() => {
      fecthExercisesByGroup()
    },[groupSelected])
  )

  return (
    <VStack flex={1}>
      <HomeHeader/>

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <Group
          name={item}
          isActive={groupSelected.toLowerCase() === item.toLowerCase()}
          onPress={() => setGroupSelected(item)}
        />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
        />

      {
        isLoading ? <Loading/> :
      <VStack px="$8"  flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md">
            Exercícios
          </Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExerciseCard data={item} onPress={() => handleOpenExerciseDetails(item.id)}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
      }
      
    </VStack>

     
  )
}