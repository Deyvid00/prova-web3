import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import ListMaterial from './views/material/ListMaterial';

import FormMaterial from './views/material/FormMaterial';
import FormComprador from './views/comprador/FormComprador';
import ListComprador from './views/comprador/ListComprador';
import FormFornecedor from './views/fornecedor/FormFornecedor';
import ListFornecedor from './views/fornecedor/ListFornecedor';
import FormAluno from './views/aluno/FormAluno';
import ListAluno from './views/aluno/ListAluno';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="list-cliente" element={<ListCliente />} />
                <Route path="form-cliente" element={<FormCliente />} />
                <Route path="form-produto" element={<FormProduto />} />
                <Route path="list-produto" element={<ListProduto />} />
                <Route path="form-entregador" element={<FormEntregador />} />
                <Route path="list-entregador" element={<ListEntregador />} />
                <Route path="list-material" element={<ListMaterial />} />
                <Route path="form-material" element={<FormMaterial />} />
                <Route path="list-comprador" element={<ListComprador />} />
                <Route path="form-comprador" element={<FormComprador />} />
                <Route path="form-fornecedor" element={<FormFornecedor />} />
                <Route path="list-fornecedor" element={<ListFornecedor />} />
               
                <Route path="list-aluno" element={<ListAluno />} />
                <Route path="form-aluno" element={<FormAluno />} />


            </Routes>
        </>
    )
}

export default Rotas;
