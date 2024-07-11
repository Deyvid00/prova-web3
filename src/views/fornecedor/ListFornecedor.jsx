import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function ListFornecedor() {
  const [listaFormFornecedores, setListaFornecedores] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  const deleteFornecedor= (id) => {
    Swal.fire({
      icon: 'question',
      title: 'Tem certeza?',
      text: 'Tem certeza de que deseja remover este fornecedor?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(ENDERECO_API + 'api/fornecedor/' + id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Fornecedor removido!',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              carregarLista();
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Erro ao remover fornecedor',
              text: 'Ocorreu um erro ao remover o fornecedor. Por favor, tente novamente.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }

  const carregarLista = () => {
    axios.get(ENDERECO_API + "api/fornecedor")
      .then((response) => {
        setListaFornecedores(response.data);
      });
  };

  const formatarData = (dataParam) => {
    if (dataParam == null || dataParam === '') {
      return '';
    }

    let dia = dataParam.substr(8, 2);
    let mes = dataParam.substr(5, 2);
    let ano = dataParam.substr(0, 4);
    let dataFormatada = dia + '/' + mes + '/' + ano;

    return dataFormatada;
  };

  return (
    <div>
      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          <h2> Fornecedor </h2>
          <Divider />
          <div style={{ marginTop: '4%' }}>
            <Button
              inverted
              circular
              icon
              labelPosition='left'
              color='orange'
              floated='right'
            >
              <Icon name='clipboard outline' />
              <Link to={'/form-fornecedor'}>Novo</Link>
            </Button>
            <br /><br /><br />
            <Table color='orange' sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign='center' width={3}>NOME</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' width={1}>ENDEREÇO</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' >DATA DA FUNDAÇÃO</Table.HeaderCell>
<Table.HeaderCell textAlign='center' width={3}>VALOR DE MERCADO</Table.HeaderCell>
<Table.HeaderCell textAlign='center' width={1}>PÁGINA WEB</Table.HeaderCell>
<Table.HeaderCell textAlign='center' width={2}>CONTATO DO VENDEDOR</Table.HeaderCell>
<Table.HeaderCell textAlign='center' width={2}>AÇÕES</Table.HeaderCell>
</Table.Row>
</Table.Header>
<Table.Body>
{listaFormFornecedores.map(fornecedor => (
<Table.Row key={fornecedor.id}>
  <Table.Cell>{fornecedor.nome}</Table.Cell>
  <Table.Cell>{fornecedor.endereco}</Table.Cell>
  <Table.Cell>{formatarData(fornecedor.dataFundacao)}</Table.Cell>
  <Table.Cell>{fornecedor.valorMercado}</Table.Cell>
  <Table.Cell>{fornecedor.paginaWeb}</Table.Cell>
  <Table.Cell>{fornecedor.contatoVendedor}</Table.Cell>
 
  <Table.Cell textAlign='center'>
    
    
  <Button
         inverted
         circular
         color='blue'
         title='Clique aqui para editar os dados deste fornecedor'
         icon>
            <Link to="/form-fornecedor" state={{id: fornecedor.id}} style={{color: 'blue'}}> <Icon name='edit' /> </Link>
      </Button>&nbsp;



    &nbsp;
    <Button
      inverted
      circular
      icon='trash'
      color='red'
      title='Clique aqui para remover este fornecedor'
      onClick={() => deleteFornecedor(fornecedor.id)}
    />
  </Table.Cell>
</Table.Row>
))}
</Table.Body>
</Table>
</div>
</Container>
</div>
</div>
);
}

export default ListFornecedor;
