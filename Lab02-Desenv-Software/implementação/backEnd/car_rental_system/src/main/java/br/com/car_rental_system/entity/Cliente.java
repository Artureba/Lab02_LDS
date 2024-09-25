package br.com.car_rental_system.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes")
public class Cliente extends Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String rg;
    private String cpf;
    private String endereco;
    private String profissao;
    private String empresa;
    private String[] salarios = new String[3];

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cliente_id")
    private List<UsuarioAcesso> usuariosAcesso = new ArrayList<>();

    @PrePersist
    public void criarUsuarioAcesso() {
        UsuarioAcesso usuarioAcesso = new UsuarioAcesso();
        usuarioAcesso.setNome(this.getNome());
        usuarioAcesso.setLogin(this.getLogin());
        usuarioAcesso.setSenha("senha_padrao"); // Define uma senha padrão
        usuariosAcesso.add(usuarioAcesso);
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public String[] getSalarios() {
        return salarios;
    }

    public void setSalarios(String[] salarios) {
        this.salarios = salarios;
    }

    public List<UsuarioAcesso> getUsuariosAcesso() {
        return usuariosAcesso;
    }

    public void setUsuariosAcesso(List<UsuarioAcesso> usuariosAcesso) {
        this.usuariosAcesso = usuariosAcesso;
    }
}
