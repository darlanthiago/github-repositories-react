/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: Boolean(false),
    };
  }

  // carregar os dados do localstorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // salvar os dados do localstorage

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== this.state.repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    // console.log(e.target.value);
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: Boolean(true) });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: Boolean(false),
    });
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <>
        <Container>
          <h1>
            <FaGithubAlt />
            Repositórios
          </h1>

          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading}>
              {loading ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                  <FaPlus color="#fff" size={14} />
                )}
            </SubmitButton>
          </Form>

          <List>
            {repositories.map(repo => (
              <li key={repo.name}>
                <span>{repo.name}</span>
                <Link to={`/repositories/${encodeURIComponent(repo.name)}`}>
                  Detalhes
                </Link>
              </li>
            ))}
          </List>
        </Container>
      </>
    );
  }
}
