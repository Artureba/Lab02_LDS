package br.com.car_rental_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "contratos_credito")
public class CreditContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double valorTotalCredito;
    private String[] rendimentos;

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getValorTotalCredito() {
        return valorTotalCredito;
    }

    public void setValorTotalCredito(double valorTotalCredito) {
        this.valorTotalCredito = valorTotalCredito;
    }

    public String[] getRendimentos() {
        return rendimentos;
    }

    public void setRendimentos(String[] rendimentos) {
        this.rendimentos = rendimentos;
    }
}