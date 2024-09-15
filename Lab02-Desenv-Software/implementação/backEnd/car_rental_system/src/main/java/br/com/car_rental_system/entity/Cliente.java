package br.com.car_rental_system.entity;

// Cliente.java
@Entity
public class Cliente extends Usuario {
    private String rg;
    private String cpf;
    private String endereco;
    private String profissao;
    private String empresa;
    private String[] salarios = new String[3];
}

// Agente.java
@Entity
public class Agente extends Usuario {
    @Enumerated(EnumType.STRING)
    private PapelAgente[] tipo;
    private String cnpj;
    private String inscricao;
}

// Automovel.java
@Entity
public class Automovel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String matricula;
    private int ano;
    private String marca;
    private String modelo;
    private String placa;
}

// Pedido.java
@Entity
public class Pedido implements DocumentoComercial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String[] rendimentosDeclarados;
    private Boolean compraSolicitada;
    private Boolean solicitacaoSeguro;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Automovel automovel;

    // Outros atributos e métodos
}

// Contrato.java
@Entity
public class Contrato implements DocumentoComercial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Pedido pedido;

    @ManyToOne
    private Usuario proprietarioVeiculo;

    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    // Outros atributos e métodos
}

// Aluguel.java
@Entity
public class Aluguel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date data;
    private String status;

    @OneToOne
    private Contrato contrato;

    // Métodos
}
