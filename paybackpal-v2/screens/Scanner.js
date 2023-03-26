import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function Scanner() {

  return (
    <View style={styles.container}>
      <Text >This is the Scanning page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});