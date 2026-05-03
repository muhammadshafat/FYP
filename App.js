import React from "react";
import createclass from "./Assert/CodeFile/Principal/CreateClass";
import login from "./Assert/CodeFile/login";

import parentdashboard from "./Assert/CodeFile/Parent/ParentDashboard"
/*import entercomplaint from "./Assert/CodeFile/Parent/EnterComplaint"
import viewcomplaint from "./Assert/CodeFile/Parent/ViewComplaint"*/
import studentdairy from "./Assert/CodeFile/Parent/StudentDiary"


import principaldashboard from "./Assert/CodeFile/Principal/DashBoard";
import teacherdashboard from "./Assert/CodeFile/Teacher/TeacherPannel";
import addnewdairy from "./Assert/CodeFile/Teacher/AddNewDairy"
import teacherdiaryview from "./Assert/CodeFile/Teacher/TeacherDairyVIew"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function LoginNavigation() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login" component={login} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="teacherdashboard" component={teacherdashboard} />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="principaldashboard" component={principaldashboard} />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="addnewdairy" component={addnewdairy} />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="parentdashboard" component={parentdashboard} />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="studentdairy" component={studentdairy} />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="teacherdiaryview" component={teacherdiaryview} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}