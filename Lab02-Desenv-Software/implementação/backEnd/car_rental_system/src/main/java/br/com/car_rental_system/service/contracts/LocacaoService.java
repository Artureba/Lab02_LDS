package br.com.car_rental_system.service.contracts;

import br.com.car_rental_system.dto.PedidoDTO;
import br.com.car_rental_system.entity.CreditContract;
import br.com.car_rental_system.entity.RentContract;
import br.com.car_rental_system.repository.contracts.AluguelRepository;
import br.com.car_rental_system.repository.contracts.CreditoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocacaoService {

    @Autowired
    private AluguelRepository rentContractRepository;

    @Autowired
    private CreditoRepository creditContractRepository;

    public RentContract createRentContract(RentContract rentContract, boolean createCreditContract, CreditContract creditDetails) {
        if (createCreditContract) {
            // Cria o contrato de crédito se necessário
            CreditContract creditContract = new CreditContract();
            creditContract.setValorTotalCredito(creditDetails.getValorTotalCredito());
            creditContract.setRendimentos(creditDetails.getRendimentos());

            // Salva o contrato de crédito no banco de dados
            CreditContract savedCreditContract = creditContractRepository.save(creditContract);

            // Associa o contrato de crédito ao contrato de locação
            rentContract.setCreditContract(savedCreditContract);
        }

        // Salva o contrato de locação com o contrato de crédito associado
        return rentContractRepository.save(rentContract);
    }

    public RentContract criarContratoDeLocacao(PedidoDTO pedido) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'criarContratoDeLocacao'");
    }
}