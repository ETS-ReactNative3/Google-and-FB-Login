import React, { Component } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';

class Loader extends Component {

    render() {
        const { loading } = this.props;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => {
                    // console.log("modal is closed")
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="large" animating={loading} color={"white"} />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000000'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#000000b0',
        height: 80,
        width: 80,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
};

export default Loader;
