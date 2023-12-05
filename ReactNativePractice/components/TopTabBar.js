import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VectorIcon from '../utils/VectorIcon';
import { Colors } from '../utils/Colors';
import { TabNavigation } from './TabNavigation';

const Tab = createMaterialTopTabNavigator();

const TopTabBar = () => {
    return (
        <>
            <Tab.Navigator
                screenOptions={() => ({
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#591aaf',
                    tabBarInactiveTintColor: Colors.grey,
                    tabBarIndicatorStyle: {
                        backgroundColor: '#591aaf',
                        height: 2,
                    },
                })}>
                {TabNavigation.map(tab => (
                    <Tab.Screen
                        key={tab.id}
                        name={tab.name}
                        component={tab.route}
                        options={{
                            tabBarIcon: ({ color, focused }) => (
                                <VectorIcon
                                    type={focused ? tab.activeiconType : tab.inactiveIconType}
                                    name={focused ? tab.activeIconName : tab.inactiveIconName}
                                    size={focused ? tab.size : tab.unFocusSize}
                                    color={color}
                                />
                            ),
                        }}
                    />
                ))}
            </Tab.Navigator>
        </>
    );
};

export default TopTabBar;