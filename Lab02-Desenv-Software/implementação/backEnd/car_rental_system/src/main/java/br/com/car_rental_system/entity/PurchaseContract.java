package br.com.car_rental_system.entity;

import br.com.car_rental_system.dto.PedidoCompraDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contratos_compra")
public class PurchaseContract extends DocumentoComercial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String proprietario;
    private boolean seguro;

    public void setDados(PedidoCompraDTO pedido) {
        this.setStatus(pedido.getStatus());
        this.setnDocumento(pedido.getNumeroDocumento());
        this.setTipo(pedido.getTipo());
        this.setProponente(pedido.getProponente()); // Presumindo que seja um objeto Agente
        this.setContratante(pedido.getContratante()); // Presumindo que seja um objeto Cliente
        this.setObjetoContrato(pedido.getObjetoContrato());
        this.setValorTotal(pedido.getValorTotal());
        this.proprietario = pedido.getProprietario();
        this.seguro = pedido.isSeguro();
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProprietario() {
        return proprietario;
    }

    public void setProprietario(String proprietario) {
        this.proprietario = proprietario;
    }

    public boolean isSeguro() {
        return seguro;
    }

    public void setSeguro(boolean seguro) {
        this.seguro = seguro;
    }
}