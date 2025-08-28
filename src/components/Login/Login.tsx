import React, { useState } from 'react';
import styled from 'styled-components';
import type { LoginCredentials } from '../../types/User';
import { api } from '../../services/api';
import { Container, Form, Input, Button, Title, ErrorMessage } from './Login.styles';

interface LoginProps {
  onLogin: (user: any, token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    userName: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user, token } = await api.login(credentials);
      onLogin(user, token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Sistema de CRUD de Usuários</Title>
        
        <Input
          type="text"
          name="userName"
          placeholder="Nome de usuário"
          value={credentials.userName}
          onChange={handleChange}
          required
        />
        
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <DemoCredentials>
          <p>Credenciais de demonstração:</p>
          <p>Usuário: admin</p>
          <p>Senha: admin123</p>
        </DemoCredentials>
      </Form>
    </Container>
  );
};

const DemoCredentials = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
  
  p {
    margin: 5px 0;
    font-size: 14px;
    color: #6c757d;
  }
  
  p:first-child {
    font-weight: bold;
    color: #495057;
  }
`;

export default Login;