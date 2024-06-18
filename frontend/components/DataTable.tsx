
import React, { useState, useEffect } from 'react'; 
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

/*
  SampleData:
  tableData = {
    tableHead: ['Temp ºC', 'Umidade %', 'Luz', 'DataHora'],
    tableData: [
      ['25', '80', 'true', '15:30 15/06/2024'],
      ['27', '70', 'false','14:30 15/06/2024'],
      ['28', '60', 'true','13:30 15/06/2024'],
    ],
*/   


let tableData = {tableHead: [''], tableData: [['']]}

const TableExample = () => { 
  const [data, setData] = useState(tableData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => fetch('https://universalis.app/api/v2/extra/stats/least-recently-updated?world=siren&dcName=aether&entries=10')
                .then(data => data.json())
                .then((data) => {
                  console.log(data['items'][0]);
                  data = data['items']
                  let dataArray = []
                  for(var i = 0; i<=9; i++){
                    dataArray.push([data[i]['itemID'], data[i]['lastUploadTime'], data[i]['worldID'], data[i]['worldName']])
                  }
                  
                  tableData = {
                    tableHead: ['itemID', 'lastUploadTime', 'worldID', 'worldName'],
                    tableData: dataArray,
                  }
                  setData(tableData)
                })
              
  return (
      <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: 'orange' }}>
              <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
              <Rows data={data.tableData} textStyle={styles.text} />
          </Table>
      </View>
  )
}; 
  

  
const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 15, padding: 0, justifyContent: 'center', backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: 'white' },
  headText: { fontSize: 13, fontWeight: 'bold' , textAlign: 'center', color: 'black' },
  text: { margin: 6, fontSize: 14, fontWeight: 'bold' , textAlign: 'center' },
})
export default TableExample; 