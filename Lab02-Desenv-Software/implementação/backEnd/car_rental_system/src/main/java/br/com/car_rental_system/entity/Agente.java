package br.com.car_rental_system.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import br.com.car_rental_system.enuns.PapelAgente;

@Entity
@Table(name = "agentes")
public class Agente extends Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection(targetClass = PapelAgente.class)
    @CollectionTable(name = "agente_tipos", joinColumns = @JoinColumn(name = "agente_id"))
    @Enumerated(EnumType.STRING)  // Armazenar os enums como string ou alterar para ORDINAL conforme sua necessidade
    @Column(name = "tipo")
    private List<PapelAgente> tipo = new ArrayList<>();

    private String cnpj;
    private String inscricao;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "agente_id")
    private List<UsuarioAcesso> usuariosAcesso = new ArrayList<>();

    @PrePersist
    public void criarUsuarioAcesso() {
        UsuarioAcesso usuarioAcesso = new UsuarioAcesso();
        usuarioAcesso.setNome(this.getNome());
        usuarioAcesso.setLogin(this.getLogin());
        usuarioAcesso.setSenha("12345"); // Define uma senha padrão
        usuariosAcesso.add(usuarioAcesso);
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<PapelAgente> getTipo() {
        return tipo;
    }
    
    public void setTipo(List<PapelAgente> tipo) {
        this.tipo = tipo;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getInscricao() {
        return inscricao;
    }

    public void setInscricao(String inscricao) {
        this.inscricao = inscricao;
    }

    public List<UsuarioAcesso> getUsuariosAcesso() {
        return usuariosAcesso;
    }

    public void setUsuariosAcesso(List<UsuarioAcesso> usuariosAcesso) {
        this.usuariosAcesso = usuariosAcesso;
    }
}

