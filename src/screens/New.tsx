import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const avaiableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function New() {
    const [HabitWeekDays, setHabitWeekDays] = useState<number[]>([]);
    const [title, setTitle] = useState('');

    function handleToggleWeekDay(weekDaysIndex: number) {
        if(HabitWeekDays.includes(weekDaysIndex)) {
            setHabitWeekDays(prevState => prevState.filter((weekDays) => weekDays !== weekDaysIndex));
        } else {
            setHabitWeekDays(prevState => [...prevState, weekDaysIndex]);
        }
    }

    async function handleCreateNewHabit() {
        try {
            if(!title.trim() || HabitWeekDays.length === 0) {
                Alert.alert('Novo Hábito', 'Informe o nome do novo hábito e escolha a periodicidade.')
            }
            await api.post('/habits' , { title, HabitWeekDays });
            setTitle('');
            setHabitWeekDays([]);
            Alert.alert('Novo Hábito', 'Habito criado com sucesso :)')
        } catch (error) {
            console.log('erro:' + error)
            Alert.alert('Ops', 'Não foi possível criar o novo hábito');
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
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>

                {avaiableWeekDays.map((weekDay, i) => (
                    <Checkbox 
                        title={weekDay} 
                        key={weekDay} 
                        checked={HabitWeekDays.includes(i)}
                        onPress={() => handleToggleWeekDay(i)}
                    />
                ))}

                <TouchableOpacity className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6">
                    <Feather 
                        name="check"
                        size={20}
                        color={colors.white}
                        onPress={handleCreateNewHabit}
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