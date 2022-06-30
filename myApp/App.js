import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

let crono = null;
let ms = 0;
let ss = 0;
let mm = 0;
let hh = 0;

const App = () => {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('PLAY');
  const [modoNorturno, setModoNoturno] = useState(false);
  const corDeFundo = modoNorturno ? '#222' : '#00aeef';
  const [historic, setHistoric] = useState(null);

  function comecar() {
    if (crono == null) {
      crono = setInterval(() => {
        ss++;
        if (ss == 60) {
          ss = 0;
          mm++;
        }

        if (mm == 60) {
          mm = 0;
          hh++;
        }
        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mm < 10 ? '0' + mm : mm) +
          ':' +
          (ss < 10 ? '0' + ss : ss);
        setNumero(format);
        setBotao('STOP');
      }, 1000);
    } else {
      clearInterval(crono);
      crono = null;
      setBotao('PLAY');
    }
  }

  function limpar() {
    if (crono !== null) {
      clearInterval(crono);
      crono = null;
    }

    setNumero(0);
    let ss = 0;
    let mm = 0;
    let hh = 0;
    setBotao('PLAY');
    setHistoric(numero);
  }

  return (
    <View style={[styles.container, {backgroundColor: corDeFundo}]}>
      <Switch
        value={modoNorturno}
        onValueChange={valor => setModoNoturno(valor)}
        trackColor={{false: '#333', true: '#00aeff'}}
        thumbColor={modoNorturno ? '#00aeff' : '#333'}
      />
      <Image source={require('./src/crono.png')} />
      <Text style={styles.timer}>{numero === 0 ? '' : numero}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.botao} onPress={comecar}>
          <Text style={[styles.btnTexto, {color: corDeFundo}]}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={limpar}>
          <Text style={[styles.btnTexto, {color: corDeFundo}]}>LIMPAR</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.historyTimer}>
          {historic && 'Ultimo tempo: ' + historic}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    color: 'white',
    fontSize: 45,
    marginTop: -160,
  },
  btnArea: {
    flexDirection: 'row',

    marginTop: 160,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  btnTexto: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '700',
  },
  botao: {
    borderWidth: 2,
    borderColor: 'white',
    width: 135,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  historyTimer: {
    color: 'white',
    fontSize: 30,
    margin: 15,
    fontStyle: 'italic',
  },
});

export default App;
