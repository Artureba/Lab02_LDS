// package br.com.car_rental_system.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;



// @RestController
// @RequestMapping("/requests")
// public class RequestController {
//     @Autowired
//     private RequestService requestService;

//     @PostMapping
//     public ResponseEntity<Request> criarRequest(@RequestBody Request request) {
//         Request newRequest = requestService.criarRequest(request);
//         return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
//     }

//     @PutMapping("/{id}/solicitar-compra")
//     public ResponseEntity<Request> solicitarCompra(@PathVariable Long id) {
//         Request requestAtualizado = requestService.solicitarCompra(id);
//         return ResponseEntity.ok(requestAtualizado);
//     }

//     @PutMapping("/{id}/solicitar-seguro")
//     public ResponseEntity<Request> solicitarSeguro(@PathVariable Long id) {
//         Request requestAtualizado = requestService.solicitarSeguro(id);
//         return ResponseEntity.ok(requestAtualizado);
//     }
// }

