package br.com.car_rental_system.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class DocumentoComercial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Add this ID field
    private String status;
    private String nDocumento;
    private String duracao;
    private String tipo;
    private String proponente;     // CPF
    private String contratante;    // CPNJ    
    private String objetoContrato;  // PLACA   
    private Double valorTotal;
    
    
    
    public Boolean aprovarDocumento(){
        // Add your logic here
        return true; // or return false based on your logic
    }
}
