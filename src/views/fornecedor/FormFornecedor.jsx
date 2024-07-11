import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';

class FormFornecedor extends React.Component {
  state = {
    nome: '',
    endereco: '',
    dataFundacao: '',
    valorMercado: '',
    paginaWeb: '',
    contatoVendedor: '',
    dataFundacaoError: false
  };

  salvar = () => {
    const { nome, endereco, valorMercado, dataFundacao, contatoVendedor, paginaWeb } = this.state;

    // Verificar se a data de fundação foi fornecida
    if (!dataFundacao) {
      this.setState({ dataFundacaoError: true });
      return;
    }

    let fornecedorRequest = {
      nome,
      endereco,
      valorMercado,
      dataFundacao,
      contatoVendedor,
      paginaWeb
    };

    axios
      .post(ENDERECO_API + "api/fornecedor", fornecedorRequest)
      .then((response) => {
        console.log("Fornecedor cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao incluir um Fornecedor.");
      });
  };

  render() {
    const { dataFundacao, dataFundacaoError } = this.state;

    return (
      <div>
        <div style={{ marginTop: "3%" }}>
          <Container textAlign="justified">
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Fornecedor &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro{" "}
            </h2>
            <Divider />

            <div style={{ marginTop: "4%" }}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    label="NOME"
                    maxLength="100"
                    value={this.state.nome}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                  />

                  <Form.Input
                    fluid
                    label="Data DA FUNDAÇÃO"
                    width={3}
                    error={dataFundacaoError ? 'Por favor, informe a data de fundação.' : false}
                  >
                    <InputMask
                      mask="99/99/9999"
                      maskChar={null}
                      placeholder="Ex: 20/03/1995"
                      value={dataFundacao}
                      onChange={(e) => this.setState({ dataFundacao: e.target.value })}
                      required
                    />
                  </Form.Input>
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="ENDEREÇO"
                    maxLength="100"
                    value={this.state.endereco}
                    onChange={(e) => this.setState({ endereco: e.target.value })}
                  />

                  <Form.Input
                    fluid
                    label="VALOR DE MERCADOR"
                    width={3}
                    maxLength="100"
                    value={this.state.valorMercado}
                    onChange={(e) => this.setState({ valorMercado: e.target.value })}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label='CONTATO DO VENDEDOR'
                    width={6}>
                    <InputMask
                      mask="(99) 9999.9999"
                      value={this.state.contatoVendedor}
                      onChange={(e) => this.setState({ contatoVendedor: e.target.value })}
                    />
                  </Form.Input>

                  <Form.Input
                    fluid
                    label="PÁGINA WEB"
                    maxLength="100"
                    value={this.state.paginaWeb}
                    onChange={(e) => this.setState({ paginaWeb: e.target.value })}
                  />
                </Form.Group>

                <Form.Group widths="equal" style={{ marginTop: "4%" }} className="form--fornecedor-salvar">
                  <Button
                    type="button"
                    inverted
                    circular
                    icon
                    labelPosition="left"
                    color="orange"
                  >
                    <Icon name="reply" />
                    <Link to={"/list-fornecedor"}>Voltar</Link>
                  </Button>

                  <Container textAlign="right">
                    <Button
                      inverted
                      circular
                      icon
                      labelPosition="left"
                      color="blue"
                      floated="right"
                      onClick={this.salvar}
                    >
                      <Icon name="save" />
                      Salvar
                    </Button>
                  </Container>
                </Form.Group>
              </Form>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default FormFornecedor;
