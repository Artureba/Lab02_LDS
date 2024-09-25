// package br.com.car_rental_system.entity;

// import jakarta.persistence.MappedSuperclass;

// @MappedSuperclass
// public abstract class Usuario {
//     private String nome;
//     private String login;
//     private String senha;

//     // Getters e Setters
//     public String getNome() {
//         return nome;
//     }

//     public void setNome(String nome) {
//         this.nome = nome;
//     }

//     // Getter e Setter para o atributo 'login'
//     public String getLogin() {
//         return login;
//     }

//     public void setLogin(String login) {
//         this.login = login;
//     }

//     // Getter e Setter para o atributo 'senha'
//     public String getSenha() {
//         return senha;
//     }

//     public void setSenha(String senha) {
//         this.senha = senha;
//     }
// }

package br.com.car_rental_system.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Add this ID field

    private String nome;
    private String login;
    private String senha;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
