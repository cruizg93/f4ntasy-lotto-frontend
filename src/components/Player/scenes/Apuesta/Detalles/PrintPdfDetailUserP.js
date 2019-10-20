import React, { useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
import { FormatNumberSymbol } from '../../../../../utils/__currency';
import FaFileExcel from '../../../../View/assets/FileExcel.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20
  },
  detailText: {
    color: '#016666',
    fontSize: 18,
    paddingRight: 20
  },
  imageExcel: {
    width: 20,
  },
  dayInfo: {
    width: "80%",
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
  divider: {
    width: "80%",
    height: 1,
    borderStyle: 'solid',
    borderColor: "#b7b7b7",
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 15,
  },
  detailUser: {
    paddingLeft: 20,
  },
  titleUserText: {
    color: 'gray',
    paddingTop: 15,
    paddingLeft: 85,
    fontSize: 16,
  },
  apuestaRow: {
    display: 'flex',
    flexDirection: 'row',
    width: "55%",
    paddingTop: 10,
    paddingLeft: 50,
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
  total: {
    display: 'flex',
    flexDirection: "row",
    width: "50%",
    paddingTop: 5,
    paddingLeft: 20,
    marginLeft: 25,
    color: 'gray',
    fontSize: 15,
  },
  totalText: {
    flex: 1,
    textAlign: 'right',
  },
  totalVal: {
    flex: 2,
    textAlign: 'left',
    paddingLeft: 35
  },
  costo: {
    display: 'flex',
    flexDirection: "row",
    width: "50%",
    paddingLeft: 20,
    marginLeft: 25,
    color: 'gray',
    fontSize: 15,
  },
  costoText: {
    flex: 1,
    textAlign: 'right',
  },
  costoVal: {
    color: '#6699cc',
    flex: 2,
    textAlign: 'left',
    paddingLeft: 35
  },
});

const PrintPdfDetailUserP = (props) => {
  // const total = props.list ? props.list.reduce((sum, row) => sum + row.valor, 0) : 0
  // const moneda = props.summary && props.summary.currency === 'LEMPIRA' ? 'L' : '$'
  // const max = (props.summary.ventas.toString()).length
  // const width = 45 + (max - 1) * 10;

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.details}>
          <Text style={styles.detailText}>
            Detalle
        </Text>
          <Image style={styles.imageExcel} source={FaFileExcel} />
        </View>
        <View style={styles.dayInfo}>
          <Image style={styles.image} source={props.image} />
          <Text style={styles.hour}>
            {props.hour}
          </Text>
          <Text style={styles.day}>
            {props.day}
          </Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.detailListView}>
          {
            props.list && props.list.map((detailUser, index) =>
              <View key={index} style={styles.detailUser}>
                <View>
                  <Text style={styles.titleUserText}>{detailUser.title}</Text>
                </View>
                {
                  detailUser.apuestas.map((apuesta, index) =>
                    <View key={index} style={styles.apuestaRow}>
                      <View style={styles.apuestaNum}>
                        <Text style={styles.apuestaNumText}>{apuesta.numeroText}</Text>
                      </View>
                      <View style={styles.apuestaVal}>
                        <Text style={styles.apuestaValText}>{apuesta.valor}</Text>
                      </View>
                    </View>
                  )
                }
                <View style={styles.total}>
                  <Text style={styles.totalText}>total:</Text>
                  <Text style={styles.totalVal}>
                    {detailUser.apuestas.reduce((sum, row) => sum + row.valor, 0)}
                  </Text>
                </View>
                <View style={styles.costo}>
                  <Text style={styles.costoText}>costo:</Text>
                  <Text style={styles.costoVal}>
                    {props.moneda}{'  '}{FormatNumberSymbol(detailUser.total)}
                  </Text>
                </View>
              </View>
            )
          }
        </View>
      </Page>
    </Document>
  )
};

export default PrintPdfDetailUserP;