import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditBook from "./screens/EditBook";
import Home from "./screens/Home";
import ViewBook from "./screens/ViewBook";

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            children={
                <>
                    <Stack.Screen name='Books' component={Home} />
                    <Stack.Screen name='ViewBook' component={ViewBook} options={{}} />
                    <Stack.Screen name='EditBook' component={EditBook} options={{}} />
                </>
            }
        />
    );
}

export default function Navigation() {
    return (
        <NavigationContainer
            children={
                <MyStack />
            }
        />
    );
}