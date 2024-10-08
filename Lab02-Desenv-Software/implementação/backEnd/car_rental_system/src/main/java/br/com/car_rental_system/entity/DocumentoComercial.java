package br.com.car_rental_system.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.math.BigDecimal;

@MappedSuperclass
public abstract class DocumentoComercial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private String nDocumento;
    private String duracao;
    private String tipo;
    private Agente proponente;     // idAgente
    private Cliente contratante;   // idCliente    
    private String objetoContrato;  // idVeiculo   
    private BigDecimal valorTotal;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getnDocumento() {
        return nDocumento;
    }

    public void setnDocumento(String nDocumento) {
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

    public Boolean aprovarDocumento() {
        // Adicione sua lógica aqui
        return true; // ou retorne false baseado na sua lógica
    }
}