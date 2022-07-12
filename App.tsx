import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Platform, SafeAreaView, Text, View} from 'react-native';

export default function App() {
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        await request(PERMISSIONS.ANDROID.CAMERA);
        await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        setIsGranted(true);
      } else {
        await request(PERMISSIONS.IOS.CAMERA);
        await request(PERMISSIONS.IOS.MICROPHONE);
        setIsGranted(true);
      }
    } catch (e) {
      setIsGranted(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        {isGranted ? (
          <WebView
            style={{flex: 1, width: '100%', height: '100%'}}
            useWebKit
            originWhitelist={['*']}
            allowsInlineMediaPlayback
            source={{
              uri: 'https://verify.synaps.io?session_id=aaaaaa-bbbbbb-cccccc-dddddd',
            }}
          />
        ) : (
          <Text onPress={checkPermissions}>Accorder les permissions</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
