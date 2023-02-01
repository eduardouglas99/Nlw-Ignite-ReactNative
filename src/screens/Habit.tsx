import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from '@react-navigation/native'
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs';
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";

interface Params {
    date: string
}

type DayInfoProps = {
    completedHabits: string[],
    possibleHabits: {
        id: string,
        title: string
    }[]
}

export function Habit() {
    const [loading, setLoading] = useState<boolean>(true);
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
    const [completedHabits, setCompletedHabits] = useState<string[]>([]);
    
    const route = useRoute();
    const { date } = route.params as Params;

    const parsedDaste = dayjs(date);
    const isDateInPaste = parsedDaste.endOf('day').isBefore(new Date ());
    const dayOfWeek = parsedDaste.format('dddd');
    const dayAndMonth = parsedDaste.format('DD/MM');

    const habitProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, dayInfo.completedHabits.length) : 0;

    async function fetchData() {
       try {
        setLoading(true);
        const response = await api.get('/day', {params: { date }});
        setDayInfo(response.data);
        setCompletedHabits(response.data.completedHabits ?? []);
       } catch (error) {
        Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos.')
       } finally {
        setLoading(false);
       }
    }

    useEffect(() => {
        fetchData();
    }, [])

    async function handleToggleHabits(HabitId: string) {
        try {
            await api.patch(`/habits/${HabitId}/toggle`);

            if(completedHabits.includes(HabitId)) {
                setCompletedHabits(prev => prev.filter(habit => habit !== HabitId));
            } else {
                setCompletedHabits(prev => [...prev, HabitId]);
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Ops', 'Não foi possível atualizar o status do hábito.')
        }
    }

    if(loading) {
        return(
            <Loading />
        )
    }

    return(
        <View className="flex-1 bg-background px-8 p-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}>

                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>
                
                <ProgressBar progress={habitProgress} />

                <View className= {clsx("mt-6", {
                    ['opacity-50']: isDateInPaste
                })}>
                    {dayInfo?.possibleHabits ?  
                        dayInfo.possibleHabits.map((habit) => (
                            <Checkbox 
                                title={habit.title}
                                key={habit.id}
                                onPress={() => handleToggleHabits(habit.id)}
                                checked={completedHabits?.includes(habit.id)}
                                disabled={isDateInPaste}
                            />
                        )) 
                    :
                    
                        "" 
                    }
                </View>
                {
                    isDateInPaste && (
                        <Text className="text-white mt-10 text-center">
                            Você não pode editar hábitos de uma data passada.
                        </Text>
                    )
                }
            </ScrollView>
        </View>
    )
}