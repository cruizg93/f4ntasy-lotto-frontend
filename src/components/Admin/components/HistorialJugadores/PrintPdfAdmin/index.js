import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
import { FormatNumberSymbol } from '../../../../../utils/__currency';

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: 500,
  },
  userInfo: {
    color: '#016666',
    fontSize: 18,
    paddingLeft: 30
  },
  dayInfo: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 10,
    justifyContent: 'center'
  },
  image: {
    width: 80,
    padding: 10,
    flex: 0.7,
    textAlign: 'left'
  },
  hour: {
    color: '#183721',
    alignSelf: 'center',
    paddingLeft: 20,
    flex: 1,
    textAlign: 'center'
  },
  day: {
    color: '#183721',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 50,
    flex: 1,
    textAlign: 'left'
  },
  winNumber: {
    width: 45,
    height: 45,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#f9f055',
    borderColor: '#008000',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
  },
  winNumberText: {
    alignSelf: 'center',
    fontSize: 28,
    color: "#183721",
    paddingRight: 3
  },
  divider: {
    width: "85%",
    height: 1,
    borderStyle: 'solid',
    borderColor: "#b7b7b7",
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 15,
  },
  apuestaListView: {
    paddingTop: 20,
  },
  apuestaList: {
    display: 'flex',
    flexDirection: "row",
    width: "50%",
    paddingTop: 10,
    paddingLeft: 30
  },
  apuestaNum: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: "#b7b7b7",
    borderWidth: 1,
    textAlign: 'center',
  },
  apuestaNumText: {
    color: 'gray',
    paddingTop: 5,
    paddingBottom: 5
  },
  apuestaVal: {
    flex: 2,
    borderStyle: 'solid',
    borderColor: "#b7b7b7",
    borderWidth: 1,
    textAlign: 'left',
  },
  apuestaValText: {
    color: 'gray',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  apuestaTotal: {
    color: 'gray',
    paddingTop: 15,
    paddingLeft: 58,
  },
  dividerSmall: {
    width: "50%",
    height: 0,
    borderBottomStyle: 'solid',
    borderBottomColor: "#b7b7b7",
    borderBottomWidth: 1,
    marginTop: 10,
    marginLeft: 15,
  },
  summary: {
    display: 'flex',
    flexDirection: "row",
    width: "60%",
    fontSize: 17,
    paddingLeft: 50,
    paddingTop: 20
  },
  summaryLeft: {
    width: 100,
    color: 'gray',
    textAlign: 'left',
    paddingTop: 5,
  },
  summaryMiddle: {
    width: 15,
    color: '#6699cc',
    textAlign: 'right',
    paddingTop: 5,
  },
  summaryRight: {
    width: 80,
    color: '#6699cc',
    textAlign: 'right',
    paddingLeft: 5,
    paddingTop: 5,
  },
  summaryTextGreen: {
    color: '#229144',
    paddingTop: 10,
    textAlign: 'left'
  },
  text: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 50,
    paddingVertical: 30,
    color: "#212121"
  }
});

const PrintPdfAdmin = (props) => {
  const total = props.list ? props.list.reduce((sum, row) => sum + row.valor, 0) : 0
  const moneda = props.summary && props.summary.currency === 'LEMPIRA' ? 'L' : '$'
  const max = (props.summary.ventas.toString()).length
  const width = 45 + (max - 1) * 10;
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Text style={styles.userInfo}>
          {props.userInfo}
        </Text>
        <View style={styles.dayInfo}>
          <Image style={styles.image} source={props.image} />
          <Text style={styles.hour}>
            {props.hour}
          </Text>
          <Text style={styles.day}>
            {props.day}
          </Text>
          <View style={styles.winNumber}>
            <Text style={styles.winNumberText}>
              {props.winNumber}
            </Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.apuestaListView}>
          {
            props.list && props.list.map((apuesta, index) =>
              <View key={index} style={styles.apuestaList}>
                <View style={styles.apuestaNum}>
                  <Text style={styles.apuestaNumText}>{apuesta.numeroText}</Text>
                </View>
                <View style={styles.apuestaVal}>
                  <Text style={styles.apuestaValText}>{apuesta.valor}</Text>
                </View>
              </View>
            )
          }
          <View style={styles.apuestaTotal}>
            <Text style={{ color: 'gray' }}>{'Total '}&mdash;{' '}{total}</Text>
          </View>
        </View>
        <View style={styles.dividerSmall}></View>
        <View style={styles.summary}>
          <View style={styles.summaryLeft}>
            <Text>Costo:</Text>
            <Text>Comisión:</Text>
            <Text>Total:</Text>
            <Text style={styles.summaryTextGreen}>Premio:</Text>
          </View>
          <View style={styles.summaryMiddle}>
            <Text>{moneda}</Text>
            <Text>{moneda}</Text>
            <Text>{moneda}</Text>
            <Text style={[styles.summaryTextGreen, { textAlign: 'right' }]}>{moneda}</Text>
          </View>
          <View style={[styles.summaryRight, { width: width }]}>
            <Text style={styles.aaa}>{FormatNumberSymbol(props.summary.ventas)}</Text>
            <Text style={styles.aaa}>{FormatNumberSymbol(props.summary.comisiones)}</Text>
            <Text style={styles.aaa}>{FormatNumberSymbol(props.summary.subTotal)}</Text>
            <Text style={[styles.summaryTextGreen, { paddingLeft: 10 }]}>{FormatNumberSymbol(props.summary.premios)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
};

export default PrintPdfAdmin;