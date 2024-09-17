package main.java.br.com.car_rental_system.entity;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Usuario {
    private String nome;
    private String login;
    private String senha;

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // Getter e Setter para o atributo 'login'
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    // Getter e Setter para o atributo 'senha'
    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
