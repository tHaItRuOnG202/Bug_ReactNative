import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import FacebookLogo from '../images/fblogo.png';
import ImprookLogo from '../images/ip_logo.png'
import VectorIcon from '../utils/VectorIcon';
import { Colors } from '../utils/Colors';

const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={ImprookLogo} style={styles.fbLogoStyle} />
            <View style={styles.headerIcons}>
                <View style={styles.searchBg}>
                    <VectorIcon
                        name="search"
                        type="FontAwesome5"
                        size={19}
                        color={Colors.grey}
                    />
                </View>
                <View style={styles.searchBg}>
                    <VectorIcon
                        name="messenger"
                        type="Fontisto"
                        size={22}
                        color={Colors.grey}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fbLogoStyle: {
        height: 35,
        width: 150,
    },
    searchBg: {
        backgroundColor: '#EBECF0',
        height: 35,
        width: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    container: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcons: {
        flexDirection: 'row',
    },
});

export default Header;