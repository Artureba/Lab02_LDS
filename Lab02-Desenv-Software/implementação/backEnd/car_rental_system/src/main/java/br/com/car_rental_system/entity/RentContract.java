package br.com.car_rental_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "contratos_locacao")
public class RentContract extends DocumentoComercial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL) // Define a relação de um-para-um com o contrato de crédito
    @JoinColumn(name = "credit_contract_id") // Nome da coluna de chave estrangeira
    private CreditContract creditContract; // idContratoCredito

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CreditContract getCreditContract() {
        return creditContract;
    }

    public void setCreditContract(CreditContract creditContract) {
        this.creditContract = creditContract;
    }
}