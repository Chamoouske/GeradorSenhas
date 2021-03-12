import React, { useState } from 'react';
import { Clipboard } from 'react-native';
import styled from 'styled-components/native';

const Pagina = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #000;
`;

const Texto = styled.Text`
  font-size: 20px;
`;

const Result = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  width: 90%;
  padding: 1px;
  border: 3px solid;
  background-color: #eee;
`;

const Box = styled.SafeAreaView`
  align-items: center;
`;

const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  font-size: 18px;
  background-color: #eee;
  margin-top: 20px;
  border-radius: 10px;
  border: 3px solid;
  padding: 10px;
`;

const GerarButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: #41aef4;
  padding: 5px;
`;

const TextoBtn = styled.Text`
  color: #000;
  font-size: 15px;
`;

const Imagem = styled.Image`
  width: 200px;
  height: 200px;
  margin-top: 10px;
`;

let charset =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!#&';

export default function App() {
  // criação das states
  // state da senha que vai ser gerada
  const [psw, setPsw] = useState('');
  // state do tamanho da senha
  const [size, setSize] = useState('');
  // state com o caminho da img usada e depois é trocada
  const [img, setImg] = useState({
    source: require('./src/images/unicornDormindo.png'),
  });
  // state pra mudar styles variados
  const [model, setModel] = useState({ style: { borderColor: 'purple' } });
  const [sizeErro, setSizeErro] = useState({});
  const [statusCopia, setStatusCopia] = useState({
    style: { backgroundColor: '#41aef4' },
  });
  // state com mensagem caso copiada a senha gerada
  const [copia, setCopia] = useState('Copiar');
  // função pra escolher e colocar uma das cores estabelecidas nas bordas
  function borda() {
    let cor = [
      '#FFB6B6',
      '#FFCEB6',
      '#FFDDB6',
      '#FFEFB6',
      '#FCFFB6',
      '#EDFFB6',
      '#DDFFB6',
      '#D0FFB6',
      '#BEFFB6',
      '#B6FFC3',
      '#B6FFD8',
      '#B6FFE8',
      '#B6FFFA',
      '#B6EFFF',
      '#B6DDFF',
      '#B6CBFF',
      '#B6B6FF',
      '#DAB6FF',
      '#EDB6FF',
      '#FFB6FA',
    ];
    let nCor = Math.floor(Math.random() * cor.length);
    setModel({ style: { borderColor: cor[nCor] } });
  }
  setTimeout(borda, 2000);

  function geraPsw() {
    let pass = '';
    let n = charset.length;

    if (size < 1 || size > 15 || isNaN(size)) {
      alert('Tamanho da senha inválido');
      setSizeErro({ style: { backgroundColor: 'red' } });
      // muda a imagem que aparece para o user
      setImg({ source: require('./src/images/unicornDormindo.png') });
    } else {
      setCopia('Copiar');
      setStatusCopia({ style: { backgroundColor: '#41aef4' } });
      // muda a imagem que aparece para o user
      setImg({ source: require('./src/images/unicornPass.png') });
      setSizeErro({ style: { backgroundColor: '#eee' } });
      // copia caracteres aleatórios para a senha
      for (let i = 0; i < size; i++) {
        pass += charset.charAt(Math.floor(Math.random() * n));
      }
      // atualiza o campo senha (psw)
      setPsw(pass);
    }
  }

  const copiarClipboard = () => {
    if (psw != '') {
      Clipboard.setString(psw);
      setCopia('Copiada!');
      setStatusCopia({ style: { backgroundColor: '#BEFFB6' } });
    }
  };

  return (
    <Pagina>
      <Texto style={{ color: '#fff', marginTop: 15 }}>Gerador de Senhas</Texto>
      <Imagem source={img.source} resizeMode="center" />
      <Texto style={{ color: '#fff', marginTop: 10 }}>{size} Caracteres</Texto>
      <Input
        style={[model.style, sizeErro.style]}
        placeholder="Tamanho da Senha (1 a 15)"
        palceholderTextColor="#000"
        keyboardType="numeric"
        value={size}
        onChangeText={(n) => setSize(n)}
      />

      <GerarButton onPress={geraPsw}>
        <TextoBtn>Gerar Senha</TextoBtn>
      </GerarButton>

      <Result style={model.style}>
        <Box style={{ marginLeft: 0 }}>
          <GerarButton
            style={[{ margin: 1, padding: 5 }, statusCopia.style]}
            onPress={() => copiarClipboard()}
          >
            <TextoBtn>{copia}</TextoBtn>
          </GerarButton>
        </Box>
        <Box style={{ width: '65%', alignItems: 'center' }}>
          <Texto style={{ fontSize: 15 }} value={psw}>
            {psw}
          </Texto>
        </Box>
      </Result>
      <Result
        style={[
          {
            width: '50%',
            bottom: 10,
            position: 'absolute',
            justifyContent: 'center',
          },
          model.style,
        ]}
      >
        <Texto style={{ fontSize: 15 }}>Ajax Lima de Matos</Texto>
      </Result>
    </Pagina>
  );
}
