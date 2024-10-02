package br.com.car_rental_system.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class PedidoDTO {
    private String status;
    private String nDocumento;
    private String duracao;
    private String tipo;
    private String proponente;
    private String contratante;
    private List<String> objetoContrato; // IDs dos veículos
    private BigDecimal valorTotal;
    private List<String> rendimentos; // Dados para contrato de crédito
    private boolean comprarVeiculoFinal;
    private boolean seguro;
}