
import React, { useState, useEffect } from 'react'; 
import { StyleSheet, View, Button } from 'react-native';
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

  function onPressLearnMore(){
    fetchData()
  }
  const fetchData = async () => fetch('https://stunning-spark-xax8.onrender.com/sensorevents')
                .then(data => data.json())
                .then((data) => {
                  let dataArray = []
                  for(var j = data.length-1; j >= 0; j--){
                    data[j]['createdAt'] = data[j]['createdAt'].replace("T", "   ")
                    data[j]['createdAt'] = data[j]['createdAt'].replace(/....Z/, '')
                  }
                  let arrayStart = 0
                  if (data.length >= 10){
                    arrayStart = 10
                  }
                  else{
                    arrayStart = data.length
                  }
                  for(var i = arrayStart-1; i >= 0; i--){
                    dataArray.push([data[i]['sensorMoisture'], data[i]['sensorTemp'], data[i]['sensorLight'], data[i]['createdAt']])
                  }
                  
                  tableData = {
                    tableHead: ['Umidade %', 'Temp ºC', 'Luz', 'DataHora'],
                    tableData: dataArray,
                  }
                  setData(tableData)
                })
              
  return (
      <View>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: 'orange' }}>
              <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
              <Rows data={data.tableData} textStyle={styles.text} />
          </Table>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonSettings}>
          <Button 
            onPress={onPressLearnMore}
            title="Update 🔁"
            color="#841584"
            accessibilityLabel="Update button"
          />
          </View>
        </View>
      </View>
  )
}; 
  

//borderColor: 'red', borderStyle: 'dotted', borderWidth:2
const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 15, padding: 0, justifyContent: 'center', backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: 'white' },
  headText: { fontSize: 13, fontWeight: 'bold' , textAlign: 'center', color: 'black' },
  text: { margin: 6, fontSize: 14, fontWeight: 'bold' , textAlign: 'center' },
  buttonContainer: { flex: 2, flexDirection:'row-reverse', justifyContent: 'center',marginBottom: 15, padding: 0},
  buttonSettings: {width:'40%'}
})
export default TableExample; 