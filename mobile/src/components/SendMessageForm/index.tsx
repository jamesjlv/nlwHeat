import React, { useState } from 'react';

import { TextInput, View, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setSendingMessage(true);
      await api.post('messages', { message: message });
      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert('Mensagem enviada com sucesso!');
    } else {
      Alert.alert('Escreva a mensagem para enviar');
    }
  }

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior="padding">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardAppearance="dark"
          placeholder="Qual sua expectativa para o evento"
          multiline
          maxLength={140}
          onChangeText={setMessage}
          value={message}
          placeholderTextColor={COLORS.GRAY_PRIMARY}
          editable={!sendingMessage}
        />
        <Button
          title="Enviar mensagem"
          backgroundColor={COLORS.PINK}
          color={COLORS.WHITE}
          isLoading={sendingMessage}
          onPress={handleMessageSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
