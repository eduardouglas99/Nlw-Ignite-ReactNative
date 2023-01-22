import { ScrollView, View, Text } from "react-native";
import { useRoute } from '@react-navigation/native'
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs';
import { ProgressBar } from "../components/progressBar";
import { Checkbox } from "../components/Checkbox";

interface Params {
    date: string
}

export function Habit() {
    const route = useRoute();
    const { date } = route.params as Params;

    const parsedDaste = dayjs(date);
    const dayOfWeek = parsedDaste.format('dddd');
    const dayAndMonth = parsedDaste.format('DD/MM');

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
                
                <ProgressBar progress={70} />

                <View className="mt-6">
                    <Checkbox 
                        title="Beber 2L de água"
                        checked={false}    
                    />
                </View>
            </ScrollView>
        </View>
    )
}