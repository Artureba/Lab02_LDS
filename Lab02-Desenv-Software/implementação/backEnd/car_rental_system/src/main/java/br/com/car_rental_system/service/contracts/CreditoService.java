package br.com.car_rental_system.service.contracts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.car_rental_system.entity.CreditContract;
import br.com.car_rental_system.repository.contracts.CreditoRepository;

@Service
public class CreditoService {

    @Autowired
    private CreditoRepository creditoRepository;

    public CreditContract criarContratoDeCredito(Long contratoId) {
        CreditContract credito = creditoRepository.findById(contratoId).orElse(null);
        // Possivelmente adiciona lógica extra para processamento do crédito
        return creditoRepository.save(credito);
    }

    public List<CreditContract> listarTodos() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'listarTodos'");
    }
}