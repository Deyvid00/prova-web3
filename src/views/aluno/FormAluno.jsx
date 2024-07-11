import axios from "axios";
import InputMask from 'react-input-mask';
import { Link,useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import React, { useState, useEffect} from 'react';


import { ENDERECO_API } from '../util/Constantes';


function formatarData(data) {
	// Lógica para formatar a data no formato desejado (DD/MM/AAAA)
	const dataObj = new Date(data);
	const dia = String(dataObj.getDate()).padStart(2, '0');
	const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
	const ano = dataObj.getFullYear();
	return `${dia}/${mes}/${ano}`;
  }


export default function FormAluno() {
  const { state } = useLocation();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios.get(ENDERECO_API + "api/aluno/" + state.id)
        .then((response) => {
          setIdAluno(response.data.id);
          setNome(response.data.nome);
          setDataNascimento(formatarData(response.data.dataNascimento));
          setFoneCelular(response.data.foneCelular);
          
        })
        .catch((error) => {
          console.log('Erro ao obter os dados do aluno.');
        });
    }
  }, [state]);

  const [idAluno, setIdAluno] = useState();
  const [nome, setNome] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();

  function salvar() {
    let alunoRequest = {
      nome: nome,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      
    }

    if (idAluno != null) { // Alteração
      axios.put(ENDERECO_API + "api/aluno/" + idAluno, alunoRequest)
        .then((response) => {
          console.log('aluno alterado com sucesso.');
        })
        .catch((error) => {
          console.log('Erro ao alterar um aluno.');
        });
    } else { // Cadastro
      axios.post(ENDERECO_API + "api/aluno", alunoRequest)
        .then((response) => {
          console.log('aluno cadastrado com sucesso.');
        })
        .catch((error) => {
          console.log('Erro ao incluir o aluno.');
        });
    }
  }

  return (
    <div>
      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          {idAluno === undefined &&
            <h2> <span style={{ color: 'darkgray' }}> aluno &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
          }
          {idAluno !== undefined &&
            <h2> <span style={{ color: 'darkgray' }}> aluno &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
          }
          <Divider />
          <div style={{ marginTop: '4%' }}>
            <Form>
              <Form.Group widths='equal'>
                
                <Form.Input
                  required
                  fluid
                  label='Nome'
                  maxLength="100"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              

              
              <Form.Input
                                        fluid
                                        label='Data Nascimento'
                                        width={6}
                                    >
                                        <InputMask 
                                            mask="99/99/9999" 
                                            maskChar={null}
                                            placeholder="Ex: 20/03/1985"
											value={dataNascimento}
											onChange={e =>setDataNascimento(e.target.value)}
                                        /> 
                                    </Form.Input>

								</Form.Group>
								
								<Form.Group>

									<Form.Input
										fluid
										label='Fone Celular'
                                        width={6}>
										<InputMask 
											mask="(99) 9999.9999" 
											value={foneCelular}
											onChange={e => setFoneCelular( e.target.value)}/> 
	
											
									</Form.Input>

									

								</Form.Group>

								<Form.Group widths='equal' style={{marginTop: '4%'}}  className='form--empresa-salvar'>

									<Button
										type="button"
										inverted
										circular
										icon
										labelPosition='left'
										color='orange'
									>
										<Icon name='reply' />
										<Link to={'/list-aluno'}>Voltar</Link>
									</Button>

									<Container textAlign='right'>
										
									<Button
inverted
circular
icon
labelPosition='left'
color='blue'
floated='right'
onClick={() => salvar()}
>
<Icon name='save' />
Salvar
</Button>

										
									</Container>

								</Form.Group>

							</Form>
						</div>
                    </Container>
                </div>
			</div>
		)
	}

