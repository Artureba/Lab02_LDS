// package br.com.car_rental_system.entity;

// // Cliente.java
// @Entity
// public class Cliente extends Usuario {
//     private String rg;
//     private String cpf;
//     private String endereco;
//     private String profissao;
//     private String empresa;
//     private String[] salarios = new String[3];
// }

// // Agente.java
// @Entity
// public class Agente extends Usuario {
//     @Enumerated(EnumType.STRING)
//     private PapelAgente[] tipo;
//     private String cnpj;
//     private String inscricao;
// }

// // Automovel.java
// @Entity
// public class Automovel {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String matricula;
//     private int ano;
//     private String marca;
//     private String modelo;
//     private String placa;
// }

// // Pedido.java
// @Entity
// public class Pedido implements DocumentoComercial {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String[] rendimentosDeclarados;
//     private Boolean compraSolicitada;
//     private Boolean solicitacaoSeguro;

//     @ManyToOne
//     private Cliente cliente;

//     @ManyToOne
//     private Automovel automovel;

//     // Outros atributos e métodos
// }

// // Contrato.java
// @Entity
// public class Contrato implements DocumentoComercial {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @OneToOne
//     private Pedido pedido;

//     @ManyToOne
//     private Usuario proprietarioVeiculo;

//     @Enumerated(EnumType.STRING)
//     private Tipo tipo;

//     // Outros atributos e métodos
// }

// // Aluguel.java
// @Entity
// public class Aluguel {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private Date data;
//     private String status;

//     @OneToOne
//     private Contrato contrato;

//     // Métodos
// }

package br.com.car_rental_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "clientes")
public class Cliente extends Usuario {

    private String rg;
    private String cpf;
    private String endereco;
    private String profissao;
    private String empresa;
    private String[] salarios = new String[3];

    // Getters e Setters

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
}
