package br.com.car_rental_system.controller.contracts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.car_rental_system.dto.PedidoDTO;
import br.com.car_rental_system.entity.PurchaseContract;
import br.com.car_rental_system.service.contracts.CompraService;

@RestController
@RequestMapping("/api/contratos/compra")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @PostMapping
    public ResponseEntity<PurchaseContract> criarCompra(@RequestBody PedidoDTO pedido) {
        PurchaseContract compra = compraService.criarContratoDeCompra(pedido);
        return ResponseEntity.ok(compra);
    }
}