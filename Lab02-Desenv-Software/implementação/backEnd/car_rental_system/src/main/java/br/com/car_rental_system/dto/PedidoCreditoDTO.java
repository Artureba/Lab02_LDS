package br.com.car_rental_system.dto;

import java.math.BigDecimal;
import java.util.List;
import br.com.car_rental_system.entity.Agente;
import br.com.car_rental_system.entity.Cliente;

public class PedidoCreditoDTO {
    private String status;
    private String nDocumento;
    private String duracao;
    private String tipo;
    private Agente proponente;  // Presumindo que seja o objeto Agente
    private Cliente contratante; // Presumindo que seja o objeto Cliente
    private String objetoContrato; // IDs dos veículos
    private BigDecimal valorTotal;
    private List<String> rendimentos;

    // Getters e Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNumeroDocumento() {
        return nDocumento;
    }

    public void setNumeroDocumento(String nDocumento) {
        this.nDocumento = nDocumento;
    }

    public String getDuracao() {
        return duracao;
    }

    public void setDuracao(String duracao) {
        this.duracao = duracao;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Agente getProponente() {
        return proponente;
    }

    public void setProponente(Agente proponente) {
        this.proponente = proponente;
    }

    public Cliente getContratante() {
        return contratante;
    }

    public void setContratante(Cliente contratante) {
        this.contratante = contratante;
    }

    public String getObjetoContrato() {
        return objetoContrato;
    }

    public void setObjetoContrato(String objetoContrato) {
        this.objetoContrato = objetoContrato;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public List<String> getRendimentos() {
        return rendimentos;
    }

    public void setRendimentos(List<String> rendimentos) {
        this.rendimentos = rendimentos;
    }
}