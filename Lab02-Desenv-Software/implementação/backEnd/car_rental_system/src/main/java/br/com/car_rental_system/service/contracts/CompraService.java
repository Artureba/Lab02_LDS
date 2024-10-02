package br.com.car_rental_system.service.contracts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.car_rental_system.dto.PedidoDTO;
import br.com.car_rental_system.entity.PurchaseContract;
import br.com.car_rental_system.repository.contracts.CompraRepository;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    public PurchaseContract criarContratoDeCompra(PedidoDTO pedido) {
        PurchaseContract compra = new PurchaseContract();
        // Popula os dados da compra com base no pedido
        compra.setDados(pedido);
        return compraRepository.save(compra);
    }
}
