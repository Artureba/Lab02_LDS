// package br.com.car_rental_system.controller.contracts;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import br.com.car_rental_system.dto.PedidoAluguelDTO;
// import br.com.car_rental_system.entity.RentContract;
// import br.com.car_rental_system.service.contracts.LocacaoService;

// @RestController
// @RequestMapping("/api/contratos/locacao")
// public class LocacaoController {

//     @Autowired
//     private LocacaoService locacaoService;

//     @PostMapping
//     public ResponseEntity<RentContract> criarLocacao(@RequestBody PedidoAluguelDTO pedido) {
//         RentContract locacao = locacaoService.criarContratoDeLocacao(pedido);
//         return ResponseEntity.ok(locacao);
//     }
// }


package br.com.car_rental_system.controller.contracts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.car_rental_system.dto.PedidoAluguelDTO;
import br.com.car_rental_system.entity.RentContract;
import br.com.car_rental_system.service.contracts.LocacaoService;

@RestController
@RequestMapping("/api/contratos/locacao")
public class LocacaoController {

    @Autowired
    private LocacaoService locacaoService;

    @PostMapping
    public ResponseEntity<RentContract> criarLocacao(@RequestBody PedidoAluguelDTO pedido) {
        RentContract locacao = locacaoService.criarContratoDeLocacao(pedido);
        return ResponseEntity.ok(locacao);
    }
}
