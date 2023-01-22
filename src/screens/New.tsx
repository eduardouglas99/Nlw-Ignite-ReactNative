import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";

const avaiableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function New() {
    const [weekDays, setWeekDays] = useState<number[]>([]);

    function handleToggleWeekDay(weekDaysIndex: number) {
        if(weekDays.includes(weekDaysIndex)) {
            setWeekDays(prevState => prevState.filter((weekDays) => weekDays !== weekDaysIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDaysIndex]);
        }
    }

    return(
        <View className="flex-1 bg-background px-8 p-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            >
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Cria hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>

                {avaiableWeekDays.map((weekDay, i) => (
                    <Checkbox 
                        title={weekDay} 
                        key={weekDay} 
                        checked={weekDays.includes(i)}
                        onPress={() => handleToggleWeekDay(i)}
                    />
                ))}

                <TouchableOpacity className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6">
                    <Feather 
                        name="check"
                        size={20}
                        color={colors.white}
                    >
                        <Text className="font-semibold text-base text-white ml-2">
                            Confirmar
                        </Text>
                    </Feather>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}