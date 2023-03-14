import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import RNPrint from 'react-native-print';
import RenderHtml from 'react-native-render-html';

export default function Print() {
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [bill, setBill] = useState('<html> <div>Hii</div></html>');

  const printHTML = async () => {
    await RNPrint.print({
      html: `${bill}`,
    });
  };

  // const printPDF = async () => {
  //   const results = await RNHTMLtoPDF.convert({
  //     html: '<h1>Demo Text to converted to PDF</h1>',
  //     fileName: 'test',
  //     base64: true,
  //   });
  //   await RNPrint.print({filePath: results.filePath});
  // };

  // const printRemotePDF = async () => {
  //   await RNPrint.print({
  //     filePath: 'http://www.africau.edu/images/default/sample.pdf',
  //   });
  // };

  const printingOptions = () => {
    return (
      <View>
        {selectedPrinter && (
          <View>
            <Text>{`Selected Printer Name: ${selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${selectedPrinter.url}`}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.buttonStyle} onPress={selectPrinter}>
          <Text>Click to Select Printer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={silentPrint}>
          <Text>Click for Silent Print</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const dataToPrint = () => {
    setBill('<html>hjkh kjhgkjhlkjlkjlkjfvjdvjdhhdfjjdhn</html>');
  };

  useEffect(function () {
    dataToPrint();
  }, []);

  //   const source = {
  //     html: `
  // <p style='text-align:center;'>
  //   Hello World!
  // </p>`,
  //   };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && printingOptions()}
        <Text>
          <RenderHtml source={{html: bill}} />
        </Text>

        <TouchableOpacity style={styles.buttonStyle} onPress={printHTML}>
          <Text>Click to Print HTML</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.buttonStyle} onPress={dataToPrint}>
          <Text>Click to Print HTML</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.buttonStyle} onPress={printPDF}>
          <Text>Click to Print PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={printRemotePDF}>
          <Text>Click to Print Remote PDF</Text> */}
        {/* </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginVertical: 10,
  },
});
