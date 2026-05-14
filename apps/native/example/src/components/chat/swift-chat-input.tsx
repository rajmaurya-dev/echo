import { Button, HStack, Host, TextField } from '@expo/ui/swift-ui';
import {
  buttonStyle,
  cornerRadius,
  frame,
  lineLimit,
  onSubmit,
  padding,
  submitLabel,
  textFieldStyle,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const FIELD_MODIFIERS = [
  textFieldStyle('plain'),
  lineLimit({ min: 1, max: 5 }),
  submitLabel('send'),
  padding({ horizontal: 14, vertical: 11 }),
  frame({ minHeight: 44, maxWidth: 1000, alignment: 'leading' }),
  cornerRadius(18),
];

const BUTTON_MODIFIERS = [buttonStyle('borderedProminent'), tint('#111111'), frame({ height: 38 })];

type SwiftChatInputProps = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChangeText: (value: string) => void;
  onSend: () => void;
};

export function SwiftChatInput({
  value,
  placeholder = 'Message Echo',
  disabled = false,
  onChangeText,
  onSend,
}: SwiftChatInputProps) {
  const fieldKey = React.useMemo(() => `chat-input-${value.length === 0 ? 'empty' : 'typing'}`, [
    value.length,
  ]);

  return (
    <View style={styles.hostShell}>
      <Host matchContents={{ vertical: true }} style={styles.host}>
        <HStack alignment="bottom" spacing={10} modifiers={[padding({ all: 2 })]}>
          <TextField
            key={fieldKey}
            defaultValue={value}
            placeholder={placeholder}
            axis="vertical"
            onValueChange={onChangeText}
            modifiers={[...FIELD_MODIFIERS, onSubmit(onSend)]}
          />
          <Button
            label="Send"
            systemImage="arrow.up"
            onPress={onSend}
            modifiers={BUTTON_MODIFIERS}
            testID="send-message-button"
          />
        </HStack>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  hostShell: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  host: {
    width: '100%',
    minHeight: 52,
  },
});
