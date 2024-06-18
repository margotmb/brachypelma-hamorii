
import React, { useState } from 'react'; 
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 35 }
  ];

const tableData = {
    tableHead: ['Temp ºC', 'Umidade %', 'Luz', 'DataHora'],
    tableData: [
      ['25', '80', 'true', '15:30 15/06/2024'],
      ['27', '70', 'false','14:30 15/06/2024'],
      ['28', '60', 'true','13:30 15/06/2024'],
    ],
}
  
const TableExample = () => { 
  const [data, setData] = useState(tableData);
  return (
      <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: 'orange' }}>
              <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
              <Rows data={data.tableData} textStyle={styles.text} />
          </Table>
      </View>
  )
}; 
  
// npm install react-native-table-component
// https://www.waldo.com/blog/react-native-table
  
const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 15, padding: 0, justifyContent: 'center', backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: 'white' },
  headText: { fontSize: 13, fontWeight: 'bold' , textAlign: 'center', color: 'black' },
  text: { margin: 6, fontSize: 14, fontWeight: 'bold' , textAlign: 'center' },
})
export default TableExample; 