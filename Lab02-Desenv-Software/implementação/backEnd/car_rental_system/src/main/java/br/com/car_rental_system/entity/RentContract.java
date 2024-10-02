package br.com.car_rental_system.entity;

import br.com.car_rental_system.dto.PedidoAluguelDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "contratos_locacao")
public class RentContract extends DocumentoComercial {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credit_contract_id")
    private CreditContract creditContract;
    
    private String proprietario;
    private boolean comprarVeiculoFinal;
    private boolean seguro;

    public RentContract setDados(PedidoAluguelDTO pedido) {
        this.setStatus(pedido.getStatus());
        this.setnDocumento(pedido.getNumeroDocumento());
        this.setDuracao(pedido.getDuracao());
        this.setTipo(pedido.getTipo());
        this.setProponente(pedido.getProponente());
        this.setContratante(pedido.getContratante());
        this.setObjetoContrato(pedido.getObjetoContrato());
        this.setValorTotal(pedido.getValorTotal());
        this.proprietario = pedido.getProprietario();
        this.comprarVeiculoFinal = pedido.isComprarVeiculoFinal(); // Corrigido
        this.seguro = pedido.isSeguro(); // Corrigido

        return this;
    }

    // Getters e Setters
    public CreditContract getCreditContract() {
        return creditContract;
    }

    public void setCreditContract(CreditContract creditContract) {
        this.creditContract = creditContract;
    }

    public String getProprietario() {
        return proprietario;
    }

    public void setProprietario(String proprietario) {
        this.proprietario = proprietario;
    }

    public boolean isComprarVeiculoFinal() {
        return comprarVeiculoFinal;
    }

    public void setComprarVeiculoFinal(boolean comprarVeiculoFinal) {
        this.comprarVeiculoFinal = comprarVeiculoFinal;
    }

    public boolean isSeguro() {
        return seguro;
    }

    public void setSeguro(boolean seguro) {
        this.seguro = seguro;
    }
}
