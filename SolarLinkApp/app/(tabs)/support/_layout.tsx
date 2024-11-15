import { View, Text } from 'react-native'
import React from 'react'
import { DataProvider } from '@/context/DataContext/DataContext'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="support"
            options={{ title: 'Support' }}
        />
    </Stack>
  )
}